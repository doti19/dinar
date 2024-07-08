const receiverMessages ={
    'string.base': 'Reciever must be a string',
    'string.length': 'Reciever must be 24 characters',
    'string.hex': 'Reciever must be a hexadecimal',
    'string.empty': 'Reciever must not be empty',
    'any.required': 'Reciever is required',
    
}
const senderMessages ={
    'string.base': 'Sender must be a string',
    'string.length': 'Sender must be 24 characters',
    'string.hex': 'Sender must be a hexadecimal',
    'string.empty': 'Sender must not be empty',
    'any.required': 'Sender is required',
    
}
const contentMessages ={
    'string.base': 'Message must be a string',
    'string.empty': 'Message must not be empty',
    'any.required': 'Message is required',   
}

const isReadMessages ={
    'boolean.base': 'IsRead must be a boolean',
    'any.required': 'IsRead is required',
}

//TODO is this objectId?
const chatIdMessages ={
    'string.base': 'Chat Id must be a string',
    'string.empty': 'Chat id must not be empty',
    'any.required': 'Chat id is required',
}

module.exports = {
    receiverMessages,
    senderMessages,
    contentMessages,
    isReadMessages,
    chatIdMessages
}

