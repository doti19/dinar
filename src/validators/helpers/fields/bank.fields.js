const Joi = require("joi");
const {
    nameMessages,
    codeMessages,
    binMessages,
    shortNameMessages,
    logoMessages,
    accountsMessages,
} = require("../messags/bank.messages");

const nameField = Joi.string()
    .messages(nameMessages)
    .label("Name");

const codeField = Joi.string()
    .messages(codeMessages)
    .label("Code");

const binField = Joi.string()
    .messages(binMessages)
    .label("Bin");

const shortNameField = Joi.string() 
    .messages(shortNameMessages)
    .label("ShortName");

const logoField = Joi.string()
    .messages(logoMessages)
    .label("Logo");

const accountsField = Joi.array()

    .messages(accountsMessages)
    .label("Accounts");

module.exports = {
    nameField,
    codeField,
    binField,
    shortNameField,
    logoField,
    accountsField,
};