
const mongoose = require('mongoose');
// const Double = require('@mongoosejs/double');

const setter = (value) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
        return null;
    }
    const result = mongoose.Types.Decimal128.fromString(parsedValue.toFixed(2));
    result._bsontype = 'Double'; // solution
    return result;
};
const postSchema = mongoose.Schema({
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
    loanReasonType:{
        type: String,
        required: function(){
            return this.type === 'inCash';
        },
        enum: ['business', 'education', 'travel', 'medical','wedding', 'shopping', 'houseBuying', 'carBuying', 'other',],
    },
    loanReasonDescription:{
        type: String,
    },
    type: {
        type: String,
        required: true,
        enum: ['inCash', 'inKind'],
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
        required: function(){
            return this.type === 'inKind';
        },
    },
    interestRate: {
        type: mongoose.SchemaTypes.Mixed,
            set: setter,
            // get: (value) => {
            //     return parseFloat(+value);
            // },
        required: function(){
            return this.type ==='inCash';
        },
    },
    amount:{
        type: mongoose.SchemaTypes.Mixed,
            set: setter,
        required: function(){
            return this.type ==='inCash';
        },
    },
    tenureMonths:{
        type: Number,
        required: true,
    },
    overdueInterestRate:{
        type: mongoose.SchemaTypes.Mixed,
        set: setter,
        required: function(){
            return this.type ==='inCash';
        },
    },
    maxInterestRate:{
        type: mongoose.SchemaTypes.Mixed,
            set: setter,

    },
    maxAmount:{
        type: mongoose.SchemaTypes.Mixed,
        set: setter,
    },
    maxTenureMonths:{
        type: Number,
    },
    maxOverdueInterestRate:{
        type: mongoose.SchemaTypes.Mixed,
            set: setter,
    },
    rejectionReason:{
        type: String,
    },

    deletedAt:{
        type: Date,
    },

    postExpiresAfter:{
        type: Number,
        // required: true,
        default: 3,
        
    },
    postExpiresAt:{
        type: Date,
       
    },
    
    

},{
    timestamps: true,

});
postSchema.pre('save', function(next){
    if(this.isNew || this.isModified('postExpiresAfter')){
        this.postExpiresAt = new Date(Date.now() + this.postExpiresAfter*24*60*60*1000);
    }
    next();
})
postSchema.index({
    postExpiresAt: 1,
},{expireAfterSeconds: 0});

module.exports = mongoose.model('Post', postSchema);