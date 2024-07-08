const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const { notificationService } = require('../services');

const getAllNotifications = catchAsync(async (req, res, next) => {
    try {
        const result = await notificationService.getNotifications(req.user);
        res.send(result);
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});


const updateNotifications = catchAsync(async (req, res, next) => {
    try {
        const result = await notificationService.updateNotification(req.user);
        res.send(result);
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

module.exports = {
    getAllNotifications,
    updateNotifications
};