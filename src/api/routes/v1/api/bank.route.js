const express = require('express');

const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {bankController} = require('../../../controllers');

const router = express.Router();
router.use(requireJwtAuth);

router
    .route('/')
    .post(bankController.createBank)
    .get(bankController.getBanks);

router
    .route('/:bankId')
    .get(bankController.getBank)
    .patch(bankController.updateBank)
    .delete(bankController.deleteBank);

module.exports = router;