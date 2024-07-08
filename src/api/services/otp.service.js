const {OTP, User: UserSchema} = require('../models');
const User = UserSchema.User;

const { bcrypt:bcryptConfig, links, server } = require("../../config/config");
const bcrypt = require("bcryptjs");

const {APIError} = require('../../errors/apiError');
const APIFeatures = require('../../utils/apiFeatures');

const generateOTP =  (body) => {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

const hashOTP =  async(otp) =>{
    const salts = bcrypt.genSaltSync(bcryptConfig.saltRounds);
    return await bcrypt.hash(otp, salts);
    // bcrypt.genSalt(bcryptConfig.saltRounds, (err, salt) => {
    //     if (err) {
    //         throw new Error("Failed to Authenticate", err);
    //     }

    //     bcrypt.hash(password, salt, async (err, hash) => {
    //         if (err) {
    //             throw new Error("Failed to Authenticate", err);
    //         }

    //        return hash;
    //     });
    // });

}

const createOTP = async (payload) => {
    const otp = generateOTP();
    console.log(otp);
    const hashedOtp =  await hashOTP(otp);
    console.log(hashedOtp);
    const userOtp = new OTP({
       user: payload.user,
         type: payload.type,
        purpose: payload.purpose,
        expiresAt: payload.expiresAt,
        token: hashedOtp,
    });
    await userOtp.save();
    return otp;
}

const verifyOTP = async (otp) => {
    const result = await OTP.findOne({token: otp.otp, user: otp.user.toString(), type: otp.type, purpose: otp.purpose});
    if(!result){
        throw new APIError({
            message: 'Invalid OTP',
            status: 400,
        });
    }
    if(result.expiresAt < new Date()){
        throw new APIError({
            message: 'OTP expired',
            status: 400,
        });
    }
    result.verifiedAt = new Date();
    await result.save();
    return true;
}

module.exports = {
    createOTP,
    verifyOTP
}