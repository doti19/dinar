const mongoose = require('mongoose');
const chatSchema = new mongoose.Schema({
    chatName : {
        type: String,
        trim: true,
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    isGroupChat:{ 
        type: Boolean,
        default: false
    },
    latestMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
    },
    groupAdmin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

module.exports = mongoose.model('Chat', chatSchema);