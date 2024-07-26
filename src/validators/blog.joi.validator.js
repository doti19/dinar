const Joi = require('joi');

const {validate} = require('../helpers/schema.validation.helper');

const {
    titleField,
    shortDescriptionField,
    contentField,
    thumbnailField,
} = require('./helpers/fields/blog.field');

const createBlogSchema = (body)=>{
    const schema = Joi.object().keys({
        title: titleField.required(),
        shortDescription: shortDescriptionField.required(),
        content: contentField.required(),
        thumbnail: thumbnailField.required(),
    });
    validate(schema, body);
}

module.exports = {
    createBlogSchema
}