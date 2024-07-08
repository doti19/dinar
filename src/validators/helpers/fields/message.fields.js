const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { receiverMessages,
    senderMessages,
    messageMessages,
    isReadMessages,
    chatIdMessages} = require("../messags/message.messages");

const receiverField = Joi.objectId()
    .messages(receiverMessages)
    .label("Receiver");
const senderField = Joi.objectId()
    .messages(senderMessages)
    .label("Sender");
const contentField = Joi.string()
    .messages(messageMessages)
    .label("Message");
const isReadField = Joi.boolean()
    .messages(isReadMessages)
    .label("IsRead");
const chatIdField = Joi.objectId()
    .messages(chatIdMessages)
    .label("ChatIdField");

module.exports = {
    receiverField,
    senderField,
    contentField,
    isReadField,
    chatIdField,
};