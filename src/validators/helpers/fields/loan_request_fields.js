const Joi = require("joi");

const {
    statusMessages,
    receiverMessages,
    descriptionMessages,
    loanAmountMessages,
    interestRateMessages,
    overdueInterestRateMessages,
    loanTenureMonthsMessages,
    loanReasonTypeMessages,
    loanReasonMessages,
    videoConfirmationUrlMessages,
    portraitPhotoUrlMessages,
    idCardFrontPhotoUrlMessages,
    idCardBackPhotoUrlMessages,
    senderBankMessages} = require("../messags/loan_request_messages");

    const statusField = Joi.string()
    .valid('pending', 'approved', 'rejected', 'cancelled', 'paid')
    .messages(statusMessages)
    .label("Status");


const receiverField = Joi.string()
    .messages(receiverMessages)
    .label("Receiver");

const descriptionField = Joi.string()
    .messages(descriptionMessages)
    .label("Description");

const loanAmountField = Joi.number()
    .messages(loanAmountMessages)
    .label("Loan Amount");

const interestRateField = Joi.number()
    .messages(interestRateMessages)
    .label("Interest Rate");

const overdueInterestRateField = Joi.number()
    .messages(overdueInterestRateMessages)
    .label("Overdue Interest Rate");

const loanTenureMonthsField = Joi.number() 
    .messages(loanTenureMonthsMessages)
    .label("Loan Tenure Months");

const loanReasonTypeField = Joi.string()
    .valid('business', 'education', 'travel', 'medical', 'shopping', 'houseBuying', 'carBuying', 'other')
    .messages(loanReasonTypeMessages)
    .label("Loan Reason Type");

const loanReasonField = Joi.string()
    .messages(loanReasonMessages)
    .label("Loan Reason");

const videoConfirmationUrlField = Joi.string()
    .messages(videoConfirmationUrlMessages)
    .label("Video Confirmation Url");

const portraitPhotoUrlField = Joi.string()
    .messages(portraitPhotoUrlMessages)
    .label("Portrait Photo Url");

const idCardFrontPhotoUrlField = Joi.string()
    .messages(idCardFrontPhotoUrlMessages)
    .label("Id Card Front Photo Url");

const idCardBackPhotoUrlField = Joi.string()
    .messages(idCardBackPhotoUrlMessages)
    .label("Id Card Back Photo Url");

const senderBankField = Joi.string()
    .messages(senderBankMessages)
    .label("Sender Bank");

module.exports = {
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
};
