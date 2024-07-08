const mongoose = require('mongoose');

const bankSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    code:{
        type: String,
        unique: true,
        required: true,
    },
    bin:{
        type: String,
        // required: true,
    },
    shortName:{
        type: String,
        required: true,
    },
    logo:{
        type: String,
        required: true,
    },
    accounts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BankCard',
    }]
},{
    timestamps: true,

});

module.exports = mongoose.model('Bank', bankSchema);