const Joi = require('joi');

const {
    titleMessages,
    shortDescriptionMessages,
    contentMessages,
    thumbnailMessages,
} = require('../messags/blog.messages');


const titleField = Joi.string()
    .messages(titleMessages)
    .label('Title');

const shortDescriptionField = Joi.string()
    .messages(shortDescriptionMessages)
    .label('Short Description');

const contentField = Joi.string()
    .messages(contentMessages)
    .label('Content');

const thumbnailField = Joi.string() 
    .messages(thumbnailMessages)
    .label('Thumbnail');

module.exports = {
    titleField,
    shortDescriptionField,
    contentField,
    thumbnailField,
};