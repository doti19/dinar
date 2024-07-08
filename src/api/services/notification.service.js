const {Notification, User: UserSchema} = require('../models');
const User = UserSchema.User;

const {APIError} = require('../../errors/apiError');
const APIFeatures = require('../../utils/apiFeatures');

const createNotification = async (userId, message) => {
    const notification = new Notification({
        userId,
        message,
    });

    await notification.save();
    return notification;
}

const getNotifications = async (user) => {
    const notifications = await Notification.find({userId: user._id});
    return notifications;
}

const updateNotification = async (user) => {
    await Notification.updateMany({userId: user._id}, {isRead: true});
    return 'All notifications are updated';
}

module.exports = {
    createNotification,
    getNotifications,
    updateNotification
};