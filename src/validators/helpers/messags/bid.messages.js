const status = {
    'string.empty': 'Status cannot be empty',
    'any.required': 'Status is required',
    'string.base': 'Status must be a string',
    'any.only': 'Status must be either pending, approved or rejected',

}

const type = {
    'string.empty': 'Type cannot be empty',
    'any.required': 'Type is required',
    'string.base': 'Type must be a string',
    'any.only': 'Type must be either inCash or inKind',
}

const images = {
    'array.base': 'Images must be an array',
    'any.required': 'Images is required',
    'array.min': 'Images must have at least one image',
    'array.max': 'Images must have at most 5 images',
    'string.base': 'Images must be a string',
    'string.empty': 'Images cannot be empty',
    'string.uri': 'Images must be a valid uri',
    'string.uriCustomScheme': 'Images must be a valid uri with a custom scheme',

}

const interestRate = {
    'number.base': 'Interest rate must be a number',
    'any.required': 'Interest rate is required',

}

const amount = {
    'number.base': 'Amount must be a number',
    'any.required': 'Amount is required',

}

const duration = {
    'number.base': 'Tenure must be a number',
    'any.required': 'Tenure is required',

}

const unit={
    'string.empty': 'Unit cannot be empty',
    'any.required': 'Unit is required',
    'string.base': 'Unit must be a string',
    'any.only': 'Unit must be either month or year',
}

module.exports = {
    status,
    type,
    images,
    interestRate,
    amount,
    duration,
    unit
}