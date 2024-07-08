const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    refreshAt:{
        type: Date,
        default: Date.now(),
    },
    
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;