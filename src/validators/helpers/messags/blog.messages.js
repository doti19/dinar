const titleMessages = {
    'string.base': 'Title must be a string',
    'string.empty': 'Title must not be empty',
    'string.min': 'Title must be at least {#limit} characters long',
    'string.max': 'Title must be at most {#limit} characters long',
    'any.required': 'Title is required',
}

const shortDescriptionMessages = {
    'string.base': 'Short description must be a string',
    'string.empty': 'Short description must not be empty',
    'string.min': 'Short description must be at least {#limit} characters long',
    'string.max': 'Short description must be at most {#limit} characters long',
    'any.required': 'Short description is required',
}

const contentMessages = {
    'string.base': 'Content must be a string',
    'string.empty': 'Content must not be empty',
    'string.min': 'Content must be at least {#limit} characters long',
    'string.max': 'Content must be at most {#limit} characters long',
    'any.required': 'Content is required',
}

const thumbnailMessages = {
    'string.base': 'Thumbnail must be a string',
    'string.empty': 'Thumbnail must not be empty',
    'string.min': 'Thumbnail must be at least {#limit} characters long',
    'string.max': 'Thumbnail must be at most {#limit} characters long',
}

module.exports = {
    titleMessages,
    shortDescriptionMessages,
    contentMessages,
    thumbnailMessages,
}