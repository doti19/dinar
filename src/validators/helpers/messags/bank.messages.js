const nameMessages = {
    'string.base': 'Name must be a string',
    'string.empty': 'Name must not be empty',
    'string.min': 'Name must be at least {#limit} characters long',
    'string.max': 'Name must be at most {#limit} characters long',
    'any.required': 'Name is required',

}

const codeMessages = {
    'string.base': 'Code must be a string',
    'string.empty': 'Code must not be empty',
    'string.min': 'Code must be at least {#limit} characters long',
    'string.max': 'Code must be at most {#limit} characters long',
    'any.required': 'Code is required',
}

const binMessages = {
    'string.base': 'Bin must be a string',
    'string.empty': 'Bin must not be empty',
    'string.min': 'Bin must be at least {#limit} characters long',
    'string.max': 'Bin must be at most {#limit} characters long',
}

const shortNameMessages = {
    'string.base': 'Short name must be a string',
    'string.empty': 'Short name must not be empty',
    'string.min': 'Short name must be at least {#limit} characters long',
    'string.max': 'Short name must be at most {#limit} characters long',
    'any.required': 'Short name is required',
}

const logoMessages = {
    'string.base': 'Logo must be a string',
    'string.empty': 'Logo must not be empty',
    'string.min': 'Logo must be at least {#limit} characters long',
    'string.max': 'Logo must be at most {#limit} characters long',
    'any.required': 'Logo is required',
}

const accountsMessages = {
    'array.base': 'Accounts must be an array',
    'array.empty': 'Accounts must not be empty',
    'any.required': 'Accounts is required',
}

module.exports = {
    nameMessages,
    codeMessages,
    binMessages,
    shortNameMessages,
    logoMessages,
    accountsMessages,
}