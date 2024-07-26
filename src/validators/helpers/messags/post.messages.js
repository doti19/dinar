const status = {
    'string.empty': 'Status cannot be empty',
    'any.required': 'Status is required',
    'string.base': 'Status must be a string',
    'any.only': 'Status must be either pending, approved, rejected or hidden',

}

const loanReason = {
    'string.empty': 'Loan reason cannot be empty',
    'any.required': 'Loan reason is required',
    'string.base': 'Loan reason must be a string',
    'any.only': 'Loan reason must be either business, education, travel, medical, shopping, wedding, houseBuying, carBuying or other',
}

const loanReasonDescription = {
    'string.base': 'Loan reason description must be a string',
}

const type = {
    'string.empty': 'Type cannot be empty',
    'any.required': 'Type is required',
    'string.base': 'Type must be a string',
    'any.only': 'Type must be either inCash or inKind',
}

const images = {
    'string.empty': 'Images cannot be empty',
    'any.required': 'Images is required',
    'string.base': 'Images must be a string',

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

const overdueInterestRate = {
    'number.base': 'Overdue interest rate must be a number',
    'any.required': 'Overdue interest rate is required',

}

const maxInterestRate = {
    'number.base': 'Max interest rate must be a number',
    'any.allowOnly': 'Max interest rate can only be a number or null',

    
}

const maxAmount = {
    'number.base': 'Max amount must be a number',
    'any.allowOnly': 'Max amount can only be a number or null',
}

const maxDuration = {
    'number.base': 'Max tenure must be a number',
    'any.allowOnly': 'Max tenure can only be a number or null',
}

const maxOverdueInterestRate = {
    'number.base': 'Max overdue interest rate must be a number',
    'any.allowOnly': 'Max overdue interest rate can only be a number or null',
}

const rejectionReason = {
    'string.base': 'Rejection reason must be a string',
    'any.allowOnly': 'Rejection reason can only be a number or null',
}



const postTitle = {
    'string.empty': 'Title cannot be empty',
    'any.required': 'Title is required',
    'string.base': 'Title must be a string',
}

const postDescription = {
    'string.empty': 'Content cannot be empty',
    'any.required': 'Content is required',
    'string.base': 'Content must be a string',
}

const postExpiresAfter={
    'number.base': 'Post expires after must be a number',
    'any.required': 'Post expires after is required',
    'number.positive': 'Post expires after must be a positive number',
    'number.integer': 'Post expires after must be an integer',
    'number.min': 'Post expires after must be greater than 0',
    'number.max': 'Post expires after must be less than 15',

}


module.exports = {
     postTitle,
    postDescription,
    status,
    loanReason,
    loanReasonDescription,
    type,
    images,
    interestRate,
    amount,
    duration,
    overdueInterestRate,
    maxInterestRate,
    maxAmount,
    maxDuration,
    maxOverdueInterestRate,
    rejectionReason,
    postExpiresAfter
}