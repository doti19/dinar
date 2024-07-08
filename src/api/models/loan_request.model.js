const mongoose = require('mongoose');

const loanRequestSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected', 'cancelled', 'paid'],
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    receiver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    loanAmount:{
        type: Number,
        required: true,
    },
    interestRate:{
        type: Number,
        required: true,
    },
    overdueInterestRate:{
        type: Number,
        required: true,
    },
    loanTenureMonths:{
        type: Number,
        required: true,
    },
    loanReasonType:{
        type: String,
        required: true,
        enum: ['business', 'education', 'travel', 'medical', 'shopping', 'houseBuying', 'carBuying', 'other'],

    },
    loanReason:{
        type: String,
        required: true,
    },
    videoConfirmationUrl:{
        type: String,
        required: true,
    },
    portraitPhotoUrl:{
        type: String,
        required: true,
    },
    idCardFrontPhotoUrl:{
        type: String,
        required: true,
    },
    idCardBackPhotoUrl:{
        type: String,
        required: true,
    },
    senderBankCard:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankCard',
        required: true,
    },
   receiverBankCard:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankCard',
       
    },
    rejectReason:{
        type: String,
    },
    loanContract:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoanContract',
        }
    ]
    
},{
    timestamps: true,
});


module.exports = mongoose.model('LoanRequest', loanRequestSchema);