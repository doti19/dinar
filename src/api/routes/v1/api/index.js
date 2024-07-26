const express = require('express');
const userRoutes = require('./user.route');
const messageRoutes = require('./message.route');
const groupChatRoutes = require('./group.chat.route');
const groupRoutes = require('./group.route');
const chatRoutes = require('./chat.route');
const notificationRoutes = require('./notification.route');
const postRoutes = require('./post.route');
const loanRequestRoutes = require('./loan_request.route');
const loanContractRoutes = require('./loan_contract.route');
const bankCardRoutes = require('./bank_card.route');
const bankRoutes = require('./bank.route');
const blogRoutes = require('./blog.route');
const mediaRoutes = require('./media.route');
const ransomRoutes = require('./ransom.route');


const router = express.Router();

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/group-chats', groupChatRoutes);
router.use('/groups', groupRoutes);
router.use('/chats', chatRoutes);
router.use('/notifications', notificationRoutes);
router.use('/posts', postRoutes);
router.use('/loan-requests', loanRequestRoutes);
router.use('/loan-contracts', loanContractRoutes);
router.use('/bank-cards', bankCardRoutes);
router.use('/banks', bankRoutes);
router.use('/blogs', blogRoutes);
router.use('/media', mediaRoutes);//require('./media.route
router.use('/ransoms', ransomRoutes);




module.exports = router;