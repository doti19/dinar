const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const { userIdMessages} = require("../messags/chat.messages");


const userIdField = Joi.objectId()
    .messages(userIdMessages)
    .label("UserId");

module.exports = {
    userIdField,
};