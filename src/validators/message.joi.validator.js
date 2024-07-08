const Joi = require('joi');
const {validate} = require('../helpers/schema.validation.helper');

const {
    receiverField,
    senderField,
    contentField,
    isReadField,
    chatIdField,
    conversationIdField,
} = require('./helpers/fields/message.fields');

const createMessageSchema = (body)=>{
    
    const schema = Joi.object().keys({
       
        receiver: receiverField,
        // sender: senderField.required(),
        content: contentField.required(),
        chatId: chatIdField.required(),
        
        // conversationId: conversationIdField,
    });

    validate(schema, body);
    // return true;
}

const updateMessageSchema = (body)=>{
    const schema = Joi.object().keys({
        content: contentField,
        isRead: isReadField,
    });
    validate(schema, body);
}


module.exports = {
    createMessageSchema,
    updateMessageSchema
} 
