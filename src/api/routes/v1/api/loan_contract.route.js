const express = require('express');
const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {loanContractController} = require('../../../controllers');

const router = express.Router();
router.use(requireJwtAuth);

router
    .route('/borrower')
    .get(loanContractController.getBorrowerLoanContracts);

router
    .route('/lender')
    .get(loanContractController.getLenderLoanContracts);

module.exports = router;