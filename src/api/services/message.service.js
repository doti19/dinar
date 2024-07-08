const {User: UserSchema, Message, Chat} = require('../models');
const User = UserSchema.User;

const {APIError} = require("../../errors/apiError");
const { messageJoiValidator } = require("../../validators");
const APIFeatures = require("../../utils/apiFeatures");
// const { path } = require('../../config/express');
const { sendPushNotificationMessage } = require('./push_notification');

const logger = require("../../config/logger");

//createMessage,
// getAllMessages,
// getMessage,
// updateMessage,
// deleteMessage,

const createMessage = async(body, user)=>{
    
    messageJoiValidator.createMessageSchema(body);
    console.log('hey')

    if(body.receiver === user.id){
        throw new APIError({
            message: "You can't send message to yourself",
            status: 400,
        });
    }
    if(!body.receiver){
        throw new APIError({
            message: "Receiver is required",
            status: 400,
        });
    }
    const newMessage = new Message({
       sender: user.id,
       content: body.content,
         receiver: body.receiver,
            chat: body.chatId,

    });

    let message = await Message.create(newMessage);
    message = await message.populate({
        path: 'sender',
        select: 'firstName lastName avatar'
    });
    message = await message.populate("chat");
    message = await User.populate(message,{
        path: "chat.users",
        select: "firstName lastName avatar"
    });

    await Chat.findByIdAndUpdate(body.chatId, {
        latestMessage: message
    })

    // const message = new Message({
    //     ...body,
        
    // });

    // await message.save();
    try{

        await sendPushNotificationMessage('New Message', body.content.toString(), body.receiver.toString(), null, message._id.toString());
    }catch(e){
        console.log('----->', e );
        console.log('Error sending push notification');
    }

    return message;
}

const getAllMessages = async(query,body, user)=>{
    //TODO add pagination, also the body needs to be validated
    const features = new APIFeatures(
        Message.find({ $or: [{ sender: user.id, receiver: body.user2 }, { receiver: user.id, sender: body.user2 }] })
//         .populate("sender", "firstName lastName avatar")
//     // .populate("chat")
//     .populate({
//         path: "chat",
//         populate:{
//             path: 'latestMessage',
//            populate: {
//                 path: 'sender',
//                 select: 'firstName lastName avatar'
//               }
//         },

// })
//     .populate({
//         path: "chat",
//         populate:{
//             path: 'users',
//             select: 'firstName lastName avatar'
//         }
//     })
,
    query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const messages = await features.query;
    if(messages.length === 0){
        return {messages: []};
    }
    populatedMessages = await Message.populate(messages, [
        { path: 'sender', select: 'firstName lastName avatar' },
        {
          path: 'chat',
          populate: [
            {
              path: 'latestMessage',
              populate: {
                path: 'sender',
                select: 'firstName lastName avatar'
              }
            },
            {
              path: 'users',
              select: 'firstName lastName avatar'
            }
          ]
        }
      ]);
    // console.log(messages[0].chat.latestMessage);

    return {messages: populatedMessages};
}

const getMessage = async(chatId, user, query)=>{
    // const message = await Message.findOne({ _id: id, $or: [{ sender: user.id }, { receiver: user.id }] });
    // if (!message) {
    //     throw new APIError({
    //         message: "Message not found",
    //         status: 404,
    //     });
    // }

    const pageSize = 12; // Number of messages per page
    const page = query.page || 1; // Current page number

    // Calculate the number of messages to skip
    const skipMessages = (page - 1) * pageSize;

    // Find messages with pagination
    let messages = await Message.find({ chat: chatId })
        .populate("sender", "firstName lastName avatar")
        .populate("chat")
        .sort({ createdAt: -1 }) // Sort messages by descending createdAt
        .skip(skipMessages) // Skip the messages based on pagination
        .limit(pageSize); // Limit the number of messages per page
    
    messages = await User.populate(messages, {
        path: "chat.users",
        select: "firstName lastName avatar",
    });

    return {messages: messages};
}

const updateMessage = async(id, body, user)=>{
    messageJoiValidator.updateMessageSchema(body);
    const message = await Message.findOne({ _id: id,  sender: user.id });
    if (!message) {
        throw new APIError({
            message: "Message not found",
            status: 404,
        });
    }
    if(body.isRead){
        delete body.isRead;
    }
    Object.assign(message, body);
    await message.save();
    return message;
}

const isReadMessage = async(id, user)=>{
    const message = await Message.findOne({_id: id, receiver: user.id});
    if (!message) {
        throw new APIError({
            message: "Message not found",
            status: 404,
        });
    }
    message.isRead = true;
    await message.save();
    return message;
}

const deleteMessage = async(id, user)=>{
    const message = await Message.findOne({ _id: id,  sender: user.id  });
    if (!message) {
        throw new APIError({
            message: "Message not found",
            status: 404,
        });
    }
    await message.deleteOne();
    return { message: "Message deleted successfully" };
}
module.exports = {
    createMessage,
    getAllMessages,
    getMessage,
    updateMessage,
    isReadMessage,
    deleteMessage,
}


