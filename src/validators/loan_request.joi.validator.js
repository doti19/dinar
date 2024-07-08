const joi = require("joi");
const {validate} = require('../helpers/schema.validation.helper');

const {
    statusField,
    receiverField,
    descriptionField,
    loanAmountField,
    interestRateField,
    overdueInterestRateField,
    loanTenureMonthsField,
    loanReasonTypeField,
    loanReasonField,
    videoConfirmationUrlField,
    portraitPhotoUrlField,
    idCardFrontPhotoUrlField,
    idCardBackPhotoUrlField,
    senderBankField
} = require('./helpers/fields/loan_request_fields');

const createLoanRequestSchema = (body)=>{
    const schema = joi.object().keys({
        status: statusField.required(),
        receiver: receiverField.required(),
        description: descriptionField.required(),
        loanAmount: loanAmountField.required(),
        interestRate: interestRateField.required(),
        overdueInterestRate: overdueInterestRateField.required(),
        loanTenureMonths: loanTenureMonthsField.required(),
        loanReasonType: loanReasonTypeField.required(),
        loanReason: loanReasonField.required(),
        videoConfirmationUrl: videoConfirmationUrlField.required(),
        portraitPhotoUrl: portraitPhotoUrlField.required(),
        idCardFrontPhotoUrl: idCardFrontPhotoUrlField.required(),
        idCardBackPhotoUrl: idCardBackPhotoUrlField.required(),
        senderBank: senderBankField.required(),
    });

    validate(schema, body);
}

const updateLoanRequestSchema = (body)=>{
}

const approveLoanRequestSchema = (body)=>{
}

const rejectLoanRequestSchema = (body)=>{
}

module.exports = {
    createLoanRequestSchema,
    updateLoanRequestSchema,
    approveLoanRequestSchema,
    rejectLoanRequestSchema,
}