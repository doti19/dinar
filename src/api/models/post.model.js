
const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
   user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: 'User',
       required: true,
   },
   status:{
         type: String,
         required: true,
         default: 'pending',
         enum: ['pending', 'approved', 'rejected', 'hidden'],
    },
    loanReason:{
        type: String,
        required: true,
        enum: ['business', 'education', 'travel', 'medical', 'shopping', 'houseBuying', 'carBuying', 'other',],
    },
    loanReasonDescription:{
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ['lending', 'borrowing'],
    },
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },

    images:{
        type: [String],
    },
    interestRate: {
        type: Number,
        required: true,
    },
    amount:{
        type: Number,
        required: true,
    },
    duration:{
        type: Number,
        required: true,
    },
    overdueInterestRate:{
        type: Number,
        required: true,
    },
    maxInterestRate:{
        type: Number,
    },
    maxAmount:{
        type: Number,
    },
    maxDuration:{
        type: Number,
    },
    maxOverdueInterestRate:{
        type: Number,
    },
    rejectionReason:{
        type: String,
    },

   
},{
    timestamps: true,

});


module.exports = mongoose.model('Post', postSchema);