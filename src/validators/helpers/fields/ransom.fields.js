const Joi = require('joi');
const {
    status,
    type,
    value,
    description
} = require('../messags/ransom.messages');

const ransomStatusField = Joi.string()
    .valid('pending', 'approved', 'rejected', 'hidden')
    .messages(status)
    .label("Ransom Status");

const ransomTypeField = Joi.string()
    .valid('salary', 'property', 'other')
    .messages(type)
    .label("Ransom Type");

const ransomValueField = Joi.number()
    .positive()
    .min(1)
    .messages(value)
    .label("Ransom Value");

const ransomDescriptionField = Joi.string()
    .messages(description)
    .label("Ransom Description");


module.exports = {
    ransomStatusField,
    ransomTypeField,
    ransomValueField,
    ransomDescriptionField
};