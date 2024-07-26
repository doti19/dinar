

const status = {
    'string.empty': 'Status cannot be empty',
    'any.required': 'Status is required',
    'string.base': 'Status must be a string',
    'any.only': 'Status must be either pending, approved, rejected or hidden',

}

const type = {
    'string.empty': 'Type cannot be empty',
    'any.required': 'Type is required',
    'string.base': 'Type must be a string',
    'any.only': 'Type must be salary, property, or other',
}

const value={
    'number.base': 'Value must be a number',
    'any.required': 'Value is required',
    'number.positive': 'Value must be a positive number',
    'number.min': 'Value must be greater than 0',

}

const description = {
    'string.empty': 'Description cannot be empty',
    'any.required': 'Description is required',
    'string.base': 'Description must be a string',
}

module.exports = {
    status,
    type,
    value,
    description
}