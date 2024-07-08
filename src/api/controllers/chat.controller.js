const catchAsync = require("../../utils/catchAsync");
const { APIError } = require("../../errors/apiError");
const { chatService } = require("../services");

const createChat = catchAsync(async (req, res, next)=>{
    try{
        const result = await chatService.createChat(req.body, req.user);
        // console.log(result);
        res.send(result);
    }catch(error){
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});


const getChats = catchAsync(async (req, res, next)=>{
    try{
        const result = await chatService.getChats(req.user);
        console.log('helllll: ' + result);
        res.send(result);
    }catch(error){
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
}
);

module.exports = {
    createChat,
    getChats
}