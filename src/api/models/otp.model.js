const mongoose = require('mongoose');
const sendEmail = require("../../config/email");

const otpSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    type: {
        type: String,
        required: true,
        default: 'phone',
        enum: ['email', 'phone'],
    },
purpose:{
    type: String,
    required: true,
    enum: ['twoFactorAuth', 'password-reset', 'email-verification', 'phone-verification'],
},
    token: {
        type: String,
        required: true,
    },
    verifiedAt:{
        type: Date,
    },
    expiresAt:{
        type: Date,
        expires: 300, //expires after 5 minutes
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 300, //expires after 5 minutes
    }
});

async function sendVerificationEmail (email, otp, name){
    const subject = "Email Verification";
    // const text = `Your OTP is ${otp}`;
    console.log('hellllll')
    await sendEmail({
        email: email,
        subject: subject,
        payload: {
            name: name,
            otp: otp,
        },
        template: "generateOtp.handlebars",
    });
}

otpSchema.pre('save', async function(next){
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
});

module.exports = mongoose.model('OTP', otpSchema);

