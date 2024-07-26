const Joi = require('joi');
const {validate} = require('../helpers/schema.validation.helper');

const{
    ransomStatusField,
    ransomTypeField,
    ransomValueField,
    ransomDescriptionField
} = require('./helpers/fields/ransom.fields');

const createRansomSchema = (body)=>{
    const schema = Joi.object().keys({
        type: ransomTypeField.required(),
        value: ransomValueField.required(),
        description: ransomDescriptionField,
    });

    validate(schema, body);
    // return true;
}

const updateRansomSchema = (body)=>{
   const schema = Joi.object().keys({
    type: ransomTypeField,
    value: ransomValueField,
    description: ransomDescriptionField,
});
validate(schema, body);
}

const approveRansomSchema = (body)=>{
    // const schema = Joi.object().keys({
    //     status: ransomStatusField.required().valid('approved'),
    // });
    // validate(schema, body);
}

const rejectRansomSchema = (body)=>{
    // const schema = Joi.object().keys({
    //     status: ransomStatusField.required().valid('rejected'),
    // });
    // validate(schema, body);
}

module.exports = {
    createRansomSchema,
    updateRansomSchema,
    approveRansomSchema,
    rejectRansomSchema
}
