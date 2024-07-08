const express = require('express');
const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {notificationController} = require('../../../controllers');


const router = express.Router();

router.get('/', requireJwtAuth, restrictTo(['player']), notificationController.getAllNotifications);
router.patch('/read', requireJwtAuth, restrictTo(['player']), notificationController.updateNotifications);

module.exports = router;
