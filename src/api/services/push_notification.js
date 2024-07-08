const admin = require('firebase-admin');
const { User: UserSchema, Invitation, UsersCourse,Friendship, Course } = require("../models");
const User = UserSchema.User;
const Parent = UserSchema.Parent;
const Player = UserSchema.Player;
const Coach = UserSchema.Coach;
const { APIError } = require("../../errors/apiError");
const APIFeatures = require("../../utils/apiFeatures");
const logger  = require('../../config/logger');

sendPushNotificationMessage =async (title, body, userId, imageUrl, resourceId)=>{
    try{
        const user = await User.findById(userId);

        const token = user.deviceToken;

        let badge = user.badge ??0;

        if(token ===null || token === undefined){
            throw new APIError({
                message: "This is an invalid token",
                status: 400,
            });
        }

        badge++;

        const message = {
            notification: {
                title,
                body
            },
            android:{
                notification:{
                    sound: 'default',//*
                    tag: resourceId,
                    color: '#f45342',//*
                    clickAction: 'FLUTTER_NOTIFICATION_CLICK',//*
                    channel_id: 'MESSAGE_CHANNEL',//*
                    icon: 'message_icon',//*
                    tag: 'message',//*
                    image: imageUrl,
                }
            },
            apns:{
                payload:{
                    aps:{
                        badge,
                        sound: 'default',//*
                    }
                }
            },
            data:{
                click_action: 'FLUTTER_NOTIFICATION_CLICK',//*
                type: 'MESSAGE',//*
                resourceId,
            },
            token,
        }

        admin.messaging().send(message).then((response)=>{

            logger.info(`Notification sent to ${user.emailAddress.email}`);
        }).catch((error)=>{
            logger.error(`Error sending notification to ${user.emailAddress.email}`);
           
        });
        user.badge = badge;
        await user.save();
    }catch(e){
        console.log('yoho ', e);
        throw new APIError({
            message: "Error Sending Notification",
            status: 500,
            stack: e.stack,
        });
    }
}

resetBadgeCount = async (userId)=>{
    try{
        const user = await User.findById(userId);
        user.badge = 0;
        await user.save();
    }catch(e){
        throw new APIError({
            message: "Error Resetting Badge Count",
            status: 500,
            stack: err.stack,
        });
    }
}

module.exports = {
    sendPushNotificationMessage,
    resetBadgeCount,
}