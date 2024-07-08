const express = require('express');
const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {loanRequestController} = require('../../../controllers');

const router = express.Router();

router.use(requireJwtAuth);

router
    .route('/')
    .post(loanRequestController.createLoanRequest)
    // .get(loanRequestController.getSentLoanRequests);

    router
    .route('/sent')
    .get(loanRequestController.getSentLoanRequests);

router
    .route('/received')
    .get(loanRequestController.getReceivedLoanRequests);

router
    .route('/:loanRequestId/approve')
    .patch(loanRequestController.approveLoanRequest);

router
    .route('/:loanRequestId/reject')
    .patch(loanRequestController.rejectLoanRequest);

// router
//     .route('/:loanRequestId')
//     .get(loanRequestController.getLoanRequest);

router
    .route('/:loanRequestId/cancel')
    .patch(loanRequestController.cancelLoanRequest);

router
    .route('/:loanRequestId/pay')
    .patch(loanRequestController.payLoanRequest);

router
    .route('/:loanRequestId/mark-as-paid')
    .patch(loanRequestController.markLoanRequestAsPaid);

module.exports = router;
