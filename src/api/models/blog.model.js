const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    shortDescription:{
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content:{
        type: String,
        required: true,
    },
    thumbnail:{
        type: String,
    },

},{
    timestamps: true,
});

module.exports = mongoose.model('Blog', blogSchema);