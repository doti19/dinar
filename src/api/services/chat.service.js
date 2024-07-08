const {User: UserSchema, Chat} = require('../models');
const User = UserSchema.User;

const {APIError} = require("../../errors/apiError");
const { chatJoiValidator } = require("../../validators");
const APIFeatures = require("../../utils/apiFeatures");




const createChat = async (body, user) => {
    chatJoiValidator.createChatSchema(body);
    const {userId} = body;
    let isChat = await Chat.find({
        isGroupChat: false,
        $and:[
            {users: {$elemMatch: {$eq: user.id}}},
            { users: { $elemMatch: { $eq: userId } } },
        ]
    })
        //-__v
        .populate("users", "-isRegistrationComplete -parents -coaches -tennisRanking -__t -hasOtp -emailAddress.verified -dateOfBirth -notificationPreference -googleId -passwordChangedAt -address -createdAt -updatedAt ")

        .populate("latestMessage");

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "firstName lastName avatar _id"
        });

        if(isChat.length> 0){
            return isChat[0];
        }else{
            // const latestMessage = new Message({
            //     sender: user.id,
            //     content: null,
            //     receiver: userId,
            // });
            
            const newChat = new Chat({
                users: [user.id, userId],
                chatName: user.id,
                isGroupChat: false,
                // latestMessage: latestMessage._id,

            });
            const chat = await Chat.create(newChat);

            const fullChat  = await Chat.findOne({
                _id: chat._id
                //-__v
            }).populate(
                "users",
                "-isRegistrationComplete -parents -coaches -tennisRanking -__t -hasOtp -emailAddress.verified -dateOfBirth -notificationPreference -googleId -passwordChangedAt -address -createdAt -updatedAt "
            )
            console.log(fullChat);
            return fullChat;
        }
}

const getChats = async(user)=>{
 const result =    await Chat.find({
        users: {
            $elemMatch: {
                $eq: user.id
            }
        }
        //-__v
    }).populate('users', '-isRegistrationComplete -parents -coaches -tennisRanking -__t -hasOtp -emailAddress.verified -dateOfBirth -notificationPreference -googleId -passwordChangedAt -address -createdAt -updatedAt ')
    .populate('groupAdmin', ' -isRegistrationComplete -parents -coaches -tennisRanking -__t -hasOtp -emailAddress.verified -dateOfBirth -notificationPreference -googleId -passwordChangedAt -address -createdAt -updatedAt ')
    .populate('latestMessage')
    .sort({updatedAt: -1});

   const chats= await User.populate(result,{
            path: 'latestMessage.sender',
            select: 'firstName lastName avatar _id',
        });
        // console.log("resuls: "+ chats);
        return {chats: chats, length: chats.length};
   
    

}

module.exports = {
    createChat,
    getChats
}