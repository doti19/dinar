const Joi = require('joi');
const {validate} = require('../helpers/schema.validation.helper');


const {
   userIdField
} = require('./helpers/fields/chat.fields');

const createChatSchema = (body)=>{
    const schema = Joi.object().keys({
        userId: userIdField.required(),
       
    });
    validate(schema, body);
}


module.exports = {
    createChatSchema
}


