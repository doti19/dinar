const {User, LoanRequest, LoanContract, BankCard} = require('../models');
const {APIError} = require('../../errors/apiError');
const APIFeatures = require('../../utils/apiFeatures');

const logger = require('../../config/logger');
const {loanRequestJoiValidator} = require('../../validators');
const {getPrimaryBankCard} = require('./bank_card.service');


const createLoanRequest = async (user, body) => {
    loanRequestJoiValidator.createLoanRequestSchema(body);
    const receiver = await User.findById(body.receiver);
    if (!receiver) {
        throw new APIError(404, "Receiver not found");
    }

    const bankCard = await BankCard.findById(body.bankCard);
    if (!bankCard) {
        throw new APIError(404, "Bank Card not found");
    }

    if(receiver._id.toString() === user._id.toString()){
        throw new APIError(400, "You can not send loan request to yourself");
    }
    else if(bankCard.user.toString() !== user._id.toString()){
        throw new APIError(400, "Bank Card does not belong to you");
    }

    const userLoans = await LoanRequest.find({
        sender: user._id,
        status: {$in: ['pending', 'approved']}
    });
    const totalLoanAmount = userLoans.reduce((acc, loan) => acc + loan.loanAmount, 0);


    const ransoms = user.ransoms;
    let totalAmountUserCanBorrow = 0;
    ransoms.forEach(ransom =>{
        if(ransom.type === 'salary'){
            totalAmountUserCanBorrow +=ransom.value*0.3;
        }else if(ransom.type === 'property'){
            totalAmountUserCanBorrow +=ransom.value*0.75;
    }
});

if(totalLoanAmount + body.loanAmount > totalAmountUserCanBorrow){
    throw new APIError(400, "You can not borrow more than 30% of your salary or 75% of your property value");
}

    const newLoanRequest = new LoanRequest({

        status: "pending",
        sender: user._id,
        ...body,
    });

    const loanRequest = await LoanRequest.create(newLoanRequest);
    return loanRequest;
}

const getSentLoanRequests = async (user, query) => {
    const apiFeatures = new APIFeatures(LoanRequest.find({sender: user._id}), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const loanRequests = await apiFeatures.query
        .populate("receiver", "firstName lastName email avatar")
        .populate("sender", "firstName lastName email avatar")
        .populate('receiverBankCard', 'bank')
        .populate('senderBankCard', 'bank');
        
        limit = query.limit? query.limit : 10;
        return {
            result: loanRequests,
            num_of_pages: Math.ceil(loanRequests.length / limit)};
};

const getReceivedLoanRequests = async (user, query) => {
    const apiFeatures = new APIFeatures(LoanRequest.find({receiver: user._id}), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const loanRequests = await apiFeatures.query
    .populate("receiver", "firstName lastName email avatar")
    .populate("sender", "firstName lastName email avatar")
    .populate('receiverBankCard', 'bank')
    .populate('senderBankCard', 'bank');;

    limit = query.limit? query.limit : 10;
        return {
            result: loanRequests,
            num_of_pages: Math.ceil(loanRequests.length / limit)};
};

const approveLoanRequest = async (user, loanRequestId) => {
   const loanRequest = await getInvolvedLoanRequest(user, loanRequestId);

    if(loanRequest.status != "pending"){
        throw new APIError(400, "Loan Request is not pending");
    }

    if (loanRequest.sender._id.toString() === user._id.toString()) {
        throw new APIError(403, "You can not approve this loan request");
    }

    const bankCard = await getPrimaryBankCard(user._id);
    if (!bankCard) {
        throw new APIError(400, "You must have a primary bank card to approve loan request");
    }


    loanRequest.status = "approved";
    loanRequest.receiverBankCard = bankCard._id;
    await loanRequest.save();
     await LoanContract.create({
        borrower: loanRequest.sender,
        lender: loanRequest.receiver,
        amount: loanRequest.loanAmount,
        loanRequest: loanRequest._id,
        tenureInMonths: loanRequest.loanTenureMonths,
        interestRate: loanRequest.interestRate,
        loanReason: loanRequest.loanReason,
        loanReasonType: loanRequest.loanReasonType,
        overdueInterestRate: loanRequest.overdueInterestRate,
        borrowerBank: loanRequest.senderBankCard,
        lenderBank: loanRequest.receiverBankCard,
    });
    return loanRequest;
}

const rejectLoanRequest = async (user, loanRequestId) => {
    const loanRequest = await getInvolvedLoanRequest(user, loanRequestId);

    if(loanRequest.status != "pending"){
        throw new APIError(400, "Loan Request is not pending");
    }

    // if (loanRequest.sender._id.toString() === user._id.toString()) {
    //     throw new APIError(403, "You can not reject this loan request");
    // }

    loanRequest.status = "rejected";
    await loanRequest.save();
    return loanRequest;
}

const cancelLoanRequest = async(user, loanRequestId)=>{
    const loanRequest = await getInvolvedLoanRequest(user, loanRequestId);
    const allowedStatusSenders = ['pending', 'approved'];
    const allowedStatusReceivers = ['approved'];

    if((loanRequest.sender._id.toString() === user._id.toString()
        && !allowedStatusSenders.includes(loanRequest.status)) ||
    (loanRequest.receiver._id.toString() === user._id.toString()
        && !allowedStatusReceivers.includes(loanRequest.status))
    ){
        throw new APIError(400, "Loan Request can not be cancelled");
    }

    loanRequest.status = "cancelled";
    await loanRequest.save();
    return loanRequest;
}

const payLoanRequest = async(user, loanRequestId)=>{
    const loanRequest = await getInvolvedLoanRequest(user, loanRequestId);
    const allowStatus = ['approved'];

    if(user._id.toString() != loanRequest.receiver.toString()){
        throw new APIError(403, "You are not receiver of this loan request");
    }else if(!allowStatus.includes(loanRequest.status)){
        throw new APIError(400, "Loan Request is not approved");
    }

    // return this.zalopayService.createOrder({
    //     amount: 10000,
    //     description: 'Pay loan request',
    //     app_user: userId,
    //     item: [
    //       {
    //         item: 'Loan request',
    //         id: loanRequest.id,
    //       },
    //     ],
    //     embed_data: {
    //       loan_request_id: loanRequest.id,
    //     },
    //     bank_code: 'zalopayapp',
    //     app_time: new Date(),
    //   });


    return loanRequest;
}

const markLoanRequestAsPaid = async(user, loanRequestId)=>{
    const request = await LoanRequest.findOneAndUpdate({_id: loanRequestId,
        //  receiver: user._id, 
         status: 'approved'}, {status: 'paid'}, {new: true})
        ;
        
        const loanContract = await LoanContract.create({
            borrower: request.sender,
            lender: request.receiver,
            amount: request.loanAmount,
            loanRequest: request._id,
            tenureInMonths: request.loanTenureMonths,
            interestRate: request.interestRate,
            loanReason: request.loanReason,
            loanReasonType: request.loanReasonType,
            overdueInterestRate: request.overdueInterestRate,
            borrowerBank: request.senderBankCard,
            lenderBank: request.receiverBankCard,
        });

        return loanContract;
        
        
}

const getInvolvedLoanRequest = async(user, loanRequestId)=>{
    const loanRequest = await LoanRequest.find({$and: {_id: loanRequestId, $or: [{receiver: user._id}, {sender: user._id}]}})
    .populate("receiver", "firstName lastName email avatar")
    .populate("sender", "firstName lastName email avatar")
    .populate('receiverBankCard', 'cardNumber bankName')
    .populate('senderBankCard', 'cardNumber bankName');
    if (!loanRequest) {
        throw new APIError(404, "Loan Request not found");
    }
    return loanRequest;
}


module.exports = {
    createLoanRequest,
    getSentLoanRequests,
    getReceivedLoanRequests,
    approveLoanRequest,
    rejectLoanRequest,
    cancelLoanRequest,
    payLoanRequest,
    markLoanRequestAsPaid
}
