const Joi = require("joi");

const { bankCodeMessages,
    cardNumberMessages,
    brandMessages} = require("../messags/bank_card.messages");

const bankCodeField = Joi.string()
    .messages(bankCodeMessages)
    .label("BankCode");

const cardNumberField = Joi.string()
    .messages(cardNumberMessages)
    .label("CardNumber");

const brandField = Joi.string()
    .messages(brandMessages)
    .label("Brand");

module.exports = {
    bankCodeField,
    cardNumberField,
    brandField,
};