const Joi = require('joi');
const {validate} = require('../helpers/schema.validation.helper');

const {
    nameField,
    codeField,
    binField,
    shortNameField,
    logoField,
    accountsField,
} = require('./helpers/fields/bank.fields');

const createBankSchema = (body)=>{
    const schema = Joi.object().keys({
        name: nameField.required(),
        code: codeField.required(),
        bin: binField,
        shortName: shortNameField.required(),
        logo: logoField.required(),
        accounts: accountsField,
    });
    validate(schema, body);
}

module.exports = {
    createBankSchema
}