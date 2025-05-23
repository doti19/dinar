const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");

const redisClient = require("../../config/redis");
const { jwt_token, token: tokenConfig } = require("../../config/config");
const logger = require("../../config/logger");
const twilio = require("../../config/twilio");

const {User, Token, UserToken,  OTP } = require("../models");

// const User = UserSchema.User;

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { bcrypt: bcryptConfig, links, server } = require("../../config/config");
const sendEmail = require("../../config/email");
const httpStatus = require("http-status");
const { APIError } = require("../../errors/apiError");
const { authJoiValidator } = require("../../validators");
const { authTransformer, modelTransformer } = require("../../transformers");
const { verifyRefreshToken } = require("../../helpers/jwt.helper");

const { checkError } = require("../../utils/checkError");
const mongoose = require("mongoose");
const {createOTP, verifyOTP:dinarVerifyOTP} = require('./otp.service');



const register = async (body, query) => {
    try {
        authJoiValidator.registerBodyValidator(body);
    } catch (err) {
        throw new Error(err);
    }


    
    const {rel, token} = query;
    console.log("inside the register service");
    console.log("rel", rel);
    // when i say role, i mean the user to be created
    //if rel is child, then role should player
    //if rel is player, then role should be coach
    //if rel is coach, then role should be player
    //if rel is parent, then role should be parent
    const exsitingUser = await User.findOne({ "emailAddress.email": body.email });
    if(exsitingUser){
        throw new APIError({message: "Email is in Use", status: 422});
    }

    // const response = await OTP.findOne({email: body.email}).sort({createdAt: -1}).limit(1);
    // // console.log('response', response);
    // if(!response|| body.otp !== response.otp){
    //     throw new APIError({message: "Invalid OTP", status: 422});
    // }
    const transformedBody = authTransformer.registerBodyTransformer(body);
    const result = await registerUser(transformedBody, User);
const otp = await createOTP({
    user: result.user._id,
    expiresAt: Date.now() + 300000,
    type: "email",
    purpose: "email-verification", 
}
);

checkError(
sendEmail({
    email: result.user.emailAddress.email,
    subject: "Email verification",
    payload: {
        name: result.firstName,
        otp: otp,
    },
    template: "generateOtp.handlebars",
})


);

        result.otp = otp;
   
        return result;
    
};

const generateOTP = async (body) => {
    try {
        authJoiValidator.generateOTPValidator(body);
    } catch (err) {
        throw new Error(err);
    }
    try{

    
    const user = await User.findOne({ "emailAddress.email": body.email });
    if (user) {
        throw new Error("User is already registered with this email");
    }
    let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
    });
    let result = await OTP.findOne({otp: otp});
    while(result){
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
            
        });
        result = await OTP.findOne({otp: otp});
    }

    const otpPayload = {email: body.email, otp: otp};
    const otpBody = await OTP.create(otpPayload);

    return { message: "OTP sent successfully", otp: otpBody.otp, status: 201 };
}catch(error){
    throw new Error(error);

}
};

const verifyOTP = async (body) => {
    try {
        authJoiValidator.verifyOTPValidator(body);
    } catch (err) {
        throw new Error(err);
    }
    const response = await OTP.findOne({email: body.email}).sort({createdAt: -1}).limit(1);
    console.log('response', response);
    if(!response|| body.otp !== response.otp){
        console.log(body.otp);
        console.log(response);
        throw new APIError({message: "Invalid OTP", status: 422});
    }
    const user = await User.findOne({ "emailAddress.email": body.email });
    if(user){
        throw new APIError({message: "User is already registered with this email", status: 422});
    }
    return {message: "OTP verified successfully", status: 200};
};


async function registerUser (transformedBody, Model){
    try {
        const existingUser = await User.findOne({
            "emailAddress.email": transformedBody.emailAddress.email,
        });

        if (existingUser) {
            return { message: "Email is in Use", status: 422 };
        }

        const newUser = User(transformedBody);
        // const session = await mongoose.startSession();
        // session.startTransaction();
        const res = await newUser.registerUser(newUser);
       
       
        return { message: "Registered Successfully", status: 201, user: res };
    } catch (err) {
        throw new APIError({
            message: "Error registering User",
            status: 501,
            stack: err.stack,
        });
    }
}



const completeRegistration = async(body, user)=>{
    try {
        authJoiValidator.completeRegistrationValidator(body);
    } catch (err) {
        throw new Error(err);
    }
    
    const transformedBody = authTransformer.completeRegisterBodyTransformer(body);
    console.log(transformedBody);
    const Model = modelTransformer.convertModel(transformedBody.role);
    const exsitingUser = await User.findById(user.id);
    if(!exsitingUser){
        throw new APIError({message: "User not found", status: 404});
    }
    if(exsitingUser.isRegistrationComplete){
        throw new APIError({message: "User already completed registration", status: 409});
    }
    let updatedUser;
    try{
//TODO i am deleting a user, u need to carefully analyze this later, when you have time
        transformedBody.isRegistrationComplete = true;
        const res = new Model({...exsitingUser.toObject(), ...transformedBody});
        console.log('res', res);
        const hashed = await User.hashPassword(transformedBody.password);
        transformedBody.password = hashed;
        // transformedBody._id = user.id;
        await User.deleteOne({_id: user.id})
        console.log('deleted');
        const  updatedUser =await res.registerUser(res);
         return {status: 201, message: 'Registered Successfully' ,user:updatedUser};
    }catch(err){
        console.log(err);
        throw new APIError({message: "Error completing registration", status: 501});
    }
    
    
};


const login = async (req) => {
    try {
        console.log("inside the login service");
        const token = checkError(await req.user.generateJWT());
        const user = checkError(req.user.toJSON());

        return { user, tokens: token };
    } catch (err) {
        throw new Error("Error logging in", err);
    }
};

const sendVerificationSMS = async(body)=>{
    await twilio.verification(body.phoneNumber, 'sms');
    return {message: "Verification code sent successfully"};

}

const verifyPhoneOTP = async(body)=>{
    const result = await twilio.verificationCheck(body.phoneNumber, body.otp);
    if(result.status === "approved"){
        phoneNumber = result.to;
        const user = await User.findOne({ "phoneNumber.number": phoneNumber });
        if(!user){
            throw new APIError({message: "Phone number doesnt exist", status: 422});
        }

        const token = checkError(await user.generateJWT());
        const jsonUsuer = checkError(user.toJSON());
        return { user: jsonUsuer, tokens: token };

        // return {message: "Phone number verified successfully"};
    }else{
        throw new APIError({message: "Invalid OTP", status: 422});
    }
}
const changePassword = async (body, id) => {
    try {
        authJoiValidator.changePasswordValidator(body);
    } catch (err) {
        throw new Error(err);
    }
    const user = await User.findOne({ _id: id });
    const { oldPassword, newPassword } = body;
    const isMatch = await user.comparePassword(oldPassword);
    if (!isMatch) {
        throw new Error("Current password is incorrect");
    }

    const hashed = await User.hashPassword(newPassword);
    user.password = hashed;
    user.passwordChangedAt = Date.now();
    await user.save();
    return { message: "password changed successfully" };
};
const requestPasswordReset = async (body) => {
    try {
        authJoiValidator.requestPasswordResetValidator(body);
    } catch (err) {
        //TODO for all errors related to validation, please have them in one place
        throw new APIError(err);
    }

    const user = await User.findOne({ "emailAddress.email": body.email });

    if (!user)
        throw new APIError({
            status: httpStatus.NOT_FOUND,
            message: "No user found with this email",
        });

    const token = await Token.findOne({ userId: user._id });

    if (token) await Token.deleteOne();

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, bcryptConfig.saltRounds);

    await new Token({
        userId: user._id,
        userEmail: user.emailAddress.email,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `${links.baseUrl}${links.resetPassword}/${resetToken}?email=${user.emailAddress.email}`;
    checkError(
        sendEmail({
            email: user.emailAddress.email,
            subject: "Password Reset Request",
            payload: {
                name: user.firstName,
                link: link,
            },
            template: "requestResetPassword.handlebars",
        })
    );
    //TODO: use this for development only
    if (server.env !== "production") {
        return { link: link, token: resetToken, email: user.emailAddress.email };
    } else {
        return { message: "Password reset link sent to your email" };
    }
};

const resetPassword = async (body, params, query) => {
    const data = {
        ...body,
        ...params,
        ...query,
    };
    try {
        authJoiValidator.resetPasswordValidator(data);
    } catch (err) {
        throw new Error(err);
    }
    const { token, email, password } = data;
    let passwordResetToken = await Token.findOne({
        userEmail: email,
        createdAt: { $gt: Date.now() - tokenConfig.expiresIn * 1000 },
    });

    if (!passwordResetToken) {
        throw new Error("Invalid or expired reset token");
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
        throw new Error("Invalid or expired password reset token");
    }

    bcrypt.genSalt(bcryptConfig.saltRounds, (err, salt) => {
        if (err) {
            throw new Error("Failed to Authenticate", err);
        }

        bcrypt.hash(password, salt, async (err, hash) => {
            if (err) {
                throw new Error("Failed to Authenticate", err);
            }

            await User.updateOne(
                { _id: passwordResetToken.userId },
                {
                    password: hash,
                    paswordChangedAt: Date.now(),
                }
            );
        });
    });
    const user = await User.findOne({ _id: passwordResetToken.userId });
    sendEmail({
        email: user.emailAddress.email,
        subject: "Password Reset Successfully",
        payload: {
            name: user.firstName,
        },
        template: "resetPassword.handlebars",
    });
    await passwordResetToken.deleteOne();
    return { message: "password reset was successful" };
};

const logout = async (req) => {
    try {
        authJoiValidator.refreshTokenBodyValidator(req.body);
    } catch (err) {
        throw new Error(err);
    }
try{
    const user = await User.findById(req.user._id);
user.deviceToken = null;
await user.save();

    const userToken = await UserToken.findOne({ token: req.body.refreshToken });
    if (userToken) {
        await userToken.deleteOne();
    }
    const accessToken = req.headers.authorization.split(" ").pop();
    const accessTokenPayload = jwt.verify(accessToken, jwt_token.access.secret);
    
    const currentTime = Math.floor(Date.now() / 1000);
    const accessTokenLife = currentTime - accessTokenPayload.iat;
    const userId = req.user._id;
    await redisClient.set(`${userId}`, `${accessToken}`, {
        EX: accessTokenLife,
    });

}

catch(err){
    if(err instanceof ReferenceError){
        logger.error(`Error setting token in redis: ${err}`);
    }else{

        throw new Error(err);
    }
}

   

    // try {
       
    //     //TODO think about when the redis client is down, you need to handle such kinds of scenarios, how do you handle jwt????
    // } catch (err) {
       
    // }
    return { message: "user logged out succesfully" };
};

const refresh = async (body) => {
    try {
        authJoiValidator.refreshTokenBodyValidator(body);
    } catch (err) {
        throw new Error(err);
    }
    const result = await verifyRefreshToken(body.refreshToken);
    if (result.error == true) {
        throw new Error(result.message);
    }
    const user = await User.findOne({ _id: result.token.userId });
    const tokens = await user.generateJWT();
    console.log(tokens);
    return { tokens: tokens };
};

module.exports = {
    requestPasswordReset,
    resetPassword,

    generateOTP,
    verifyOTP,
    login,
    register,
    completeRegistration,
    changePassword,
    logout,
    refresh,
    sendVerificationSMS,
    verifyPhoneOTP,
};
