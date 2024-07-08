const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    receiver:{
        type: String,
        required: true
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    content:{
        type: String,
        trim: true,
    },
    isRead:{
        type: Boolean,
        default: false
    },
    readBy:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    
    }],
    chat:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
},{
    timestamps: true,
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

// messageSchema.pre('/^find/', function(next){
//     this.populate({
//         path: 'sender',
//         select: 'firstName lastName avatar'
//     });
    // .populate({
    //     path: 'receiver',
    //     select: 'firstName lastName avatar'
    // });
//     next();
// });

// messageSchema.pre('/^findOneAnd', async function(next){
//     this.r = await this.findOne();
//     console.log(this.r);
//     next();
// });

module.exports = mongoose.model('Message', messageSchema);