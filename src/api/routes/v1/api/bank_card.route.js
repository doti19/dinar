const express = require('express');
const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');

const {bankCardController} = require('../../../controllers');

const router = express.Router();
router.use(requireJwtAuth);

router
    .route('/')
    .post(bankCardController.createBankCard)
    .get(bankCardController.getBankCards);

router
    .route('/:cardNumber')
    .get(bankCardController.getBankCard);
    // .patch(bankCardController.makePrimaryBankCard)
    // .delete(bankCardController.deleteBankCard);

router
    .route('/myBankCards')
    .get(bankCardController.getBankCardByUserId);

router
    .route('/:cardNumber/primary')
    .patch(bankCardController.makePrimaryBankCard);

router
    .route('/primary')
    .get(bankCardController.getPrimaryBankCard);


module.exports = router;
