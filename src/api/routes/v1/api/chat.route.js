const express = require('express');
const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {chatController} = require('../../../controllers');

const router = express.Router();

router.use(requireJwtAuth);

router
    .route('/')
    .post( chatController.createChat)
    .get( chatController.getChats);

module.exports = router;