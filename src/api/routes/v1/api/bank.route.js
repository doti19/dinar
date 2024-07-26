const express = require('express');

const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {bankController} = require('../../../controllers');

const router = express.Router();
// router.use(requireJwtAuth);

router
    .route('/')
    .post(requireJwtAuth, bankController.createBank)
    .get(bankController.getBanks);

router
    .route('/:bankId')
    .get(bankController.getBank)
    .patch(requireJwtAuth, bankController.updateBank)
    .delete(requireJwtAuth, bankController.deleteBank);

module.exports = router;