const statusMessages = {
    'string.empty': 'Status cannot be empty',
    'any.required': 'Status is required',
    'string.base': 'Status must be a string',
    'any.only': 'Status must be either pending, approved, rejected, paid or cancelled ',

}

const receiverMessages = {
    'string base': 'Receiver Id must be a string',
    'string length': 'Receiver Id must be 24 characters',
    'string hex': 'Receiver Id must be a hexadecimal',
    'string empty': 'Receiver Id must not be empty',
    'any required': 'Receiver Id is required',
}

const descriptionMessages = {
    'string.empty': 'Content cannot be empty',
    'any.required': 'Content is required',
    'string.base': 'Content must be a string',
}

const loanAmountMessages = {
    'number.base': 'Loan Amount must be a number',
    'any.required': 'Loan Amount is required',

}

const interestRateMessages = {
    'number.base': 'Interest rate must be a number',
    'any.required': 'Interest rate is required',

}

const overdueInterestRateMessages = {
    'number.base': 'Overdue interest rate must be a number',
    'any.required': 'Overdue interest rate is required',

}
const loanTenureMonthsMessages = {
    'number.base': 'Loan tenure must be a number',
    'any.required': 'Loan tenure is required',

}


const loanReasonTypeMessages = {
    'string.empty': 'Loan reason cannot be empty',
    'any.required': 'Loan reason is required',
    'string.base': 'Loan reason must be a string',
    'any.only': 'Loan reason must be either business, education, travel, medical, shopping, houseBuying, carBuying or other',
}

const loanReasonMessages = {
    'string.base': 'Loan reason description must be a string',
}


const videoConfirmationUrlMessages={
    'string.empty': 'Video confirmation url cannot be empty',
    'any.required': 'Video confirmation url is required',
    'string.base': 'Video confirmation url must be a string',

}

const portraitPhotoUrlMessages={
    'string.empty': 'Portrait photo url cannot be empty',
    'any.required': 'Portrait photo url is required',
    'string.base': 'Portrait photo url must be a string',

}

const idCardFrontPhotoUrlMessages={
    'string.empty': 'Id card front photo url cannot be empty',
    'any.required': 'Id card front photo url is required',
    'string.base': 'Id card front photo url must be a string',

}

const idCardBackPhotoUrlMessages={
    'string.empty': 'Id card back photo url cannot be empty',
    'any.required': 'Id card back photo url is required',
    'string.base': 'Id card back photo url must be a string',

}

const senderBankMessages={
    'string base': 'Sender Bank Id must be a string',
    'string length': 'Sender Bank Id must be 24 characters',
    'string hex': 'Sender Bank Id must be a hexadecimal',
    'string empty': 'Sender Bank Id must not be empty',
    'any required': 'Sender Bank Id is required',

}




module.exports = {
    statusMessages,
    receiverMessages,
    descriptionMessages,
    loanAmountMessages,
    interestRateMessages,
    overdueInterestRateMessages,
    loanTenureMonthsMessages,
    loanReasonTypeMessages,
    loanReasonMessages,
    videoConfirmationUrlMessages,
    portraitPhotoUrlMessages,
    idCardFrontPhotoUrlMessages,
    idCardBackPhotoUrlMessages,
    senderBankMessages
}
