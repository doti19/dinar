const bankCodeMessages = {
    'string.empty': 'Bank code is required',
    'any.required': 'Bank code is required',
    'string.base': 'Bank code must be a string',
    'string.min': 'Bank code should have a minimum length of {#limit}',
    'string.max': 'Bank code should have a maximum length of {#limit}',
    'string.pattern.base': 'Bank code should contain only numbers',

};

const cardNumberMessages = {
    'string.empty': 'Card number is required',
    'any.required': 'Card number is required',
    'string.base': 'Card number must be a string',
    'string.min': 'Card number should have a minimum length of {#limit}',
    'string.max': 'Card number should have a maximum length of {#limit}',
    'string.pattern.base': 'Card number should contain only numbers',
};

const brandMessages = {
    'string.empty': 'Brand is required',
    'any.required': 'Brand is required',
    'string.base': 'Brand must be a string',
    'string.min': 'Brand should have a minimum length of {#limit}',
    'string.max': 'Brand should have a maximum length of {#limit}',
};

module.exports = {
    bankCodeMessages,
    cardNumberMessages,
    brandMessages,
};