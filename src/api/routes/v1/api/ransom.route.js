const express = require('express');
const { requireJwtAuth, restrictTo } = require('../../../../middlewares/auth');

const { ransomController } = require('../../../controllers');

const router = express.Router();

router.use(requireJwtAuth);

router
    .route('/')
    .post(ransomController.addRansom)
    .get(ransomController.getRansoms);

router
    .route('/:ransomId')
    .get(ransomController.getRansom)
    .patch(ransomController.updateRansom)
    .delete(ransomController.deleteRansom);


router
    .route('/:ransomId/approve')
    .patch(restrictTo('admin'), ransomController.approveRansom);

router
    .route('/:ransomId/reject')
    .patch(restrictTo('admin'), ransomController.rejectRansom);

router
    .route('/:userId')
    .get(ransomController.getUserRansoms);

module.exports = router;