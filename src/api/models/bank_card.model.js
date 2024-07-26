const mongoose = require('mongoose');
// const { User } = require('./user.model');

const bankCardSchema = new mongoose.Schema({
    bank:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bank',
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    isPrimary:{
        type: Boolean,
        default: false,
    },
    cardNumber:{
        type: String,
        required: true,
        unique: true,
    },
    branch:{
        type: String,
    },
    loanRequestSent:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoanRequest',
        }
    ],
    loanRequestReceived:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoanRequest',
        }
    ],
    loanContractBorrower:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoanContract',
        }
    ],
    loanContractLender:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoanContract',
        }
    ],


},{
    timestamps: true,
});

module.exports = mongoose.model('BankCard', bankCardSchema);