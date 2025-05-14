const mongoose = require('mongoose');

const setter = (value) => {
    const parsedValue = parseFloat(value);
    if (isNaN(parsedValue)) {
      return null;
    }
    const result = mongoose.Types.Decimal128.fromString(parsedValue.toFixed(2));
    result._bsontype = "Double"; // solution
    return result;
  };
const bidSchema = mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    bidder:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['inCash', 'inKind']
    },
    amount: {
        type: mongoose.SchemaTypes.Mixed,
        set: setter,
        required: function () {
          return this.type === "inCash";
        },
    },
    images: {
        type: [String],
        required: function () {
          return this.type === "inKind";
        },
      },
    interestRate: {
        type: {
          interest: {
          type: mongoose.SchemaTypes.Mixed,
          require: true,
          set: setter,
          // get: (value) => {
          //     return parseFloat(+value);
          // },
        },
        unit: {
          type: String,
          default: 'month',
          enum: ["month", "year"],
        },
      },
        required: function () {
          return this.type === "inCash";
        },
      },
    tenure: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'approved', 'rejected']
    },


},{
    timestamps: true
});

module.exports=  mongoose.model('Bid', bidSchema);
