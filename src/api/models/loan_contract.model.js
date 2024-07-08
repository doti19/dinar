const mongoose = require('mongoose');

const loanContractSchema = new mongoose.Schema({
    loanRequest:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LoanRequest',
        required: true,
    },
    lender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    lenderBankCard:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankCard',
        required: true,
    },
    borrower:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    borrowerBankCard:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankCard',
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
    amount:{
        type: Number,
        required: true,
    
    },
    interestRate:{
        type: Number,
        required: true,
    },

    tenureInMonths:{
        type: Number,
        required: true,
    },
    overdueInterestRate:{
        type: Number,
        required: true,
    },


    
}, {
    timestamps: true,
});


module.exports = mongoose.model('LoanContract', loanContractSchema);