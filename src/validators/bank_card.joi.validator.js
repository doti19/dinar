const Joi = require('joi');
const {validate} = require('../helpers/schema.validation.helper');

const{
    bankCodeField,
    cardNumberField,
    brandField,
} = require('./helpers/fields/bank_card.fields');

const createBankCardSchema = (body)=>{
    const schema = Joi.object().keys({
        bankCode: bankCodeField.required(),
        cardNumber: cardNumberField.required(),
        brand: brandField,
    });
    validate(schema, body);
}

module.exports = {
    createBankCardSchema
}