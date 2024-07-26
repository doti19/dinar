const {User, LoanContract} = require("../models");
const {APIError} = require("../../errors/apiError");
const APIFeatures = require("../../utils/apiFeatures");

const logger = require("../../config/logger");

const getBorrowerLoanContracts = async(user, query)=>{
    const apiFeatures = new APIFeatures(LoanContract.find({borrower: user._id}), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const loanContracts = await apiFeatures.query
        .populate("loanRequest", "amount status")
        .populate("sender", "firstName lastName email avatar")
        .populate("borrower", "firstName lastName email avatar")
        .populate("receiverBankCard", "bank")
        .populate("senderBankCard", "bank");

        limit = query.limit? query.limit : 10;
        return {
            result: loanContracts,
            num_of_pages: Math.ceil(loanContracts.length / limit)};
}

const getLenderLoanContracts = async(user, query)=>{
    const apiFeatures = new APIFeatures(LoanContract.find({sender: user._id}), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const loanContracts = await apiFeatures.query
        .populate("loanRequest", "amount status")
        .populate("sender", "firstName lastName email avatar")
        .populate("borrower", "firstName lastName email avatar")
        .populate("receiverBankCard", "bank")
        .populate("senderBankCard", "bank");
        limit = query.limit? query.limit : 10;
        return {
            result: loanContracts,
            num_of_pages: Math.ceil(loanContracts.length / limit)};
}

module.exports = {
    getBorrowerLoanContracts,
    getLenderLoanContracts
}   