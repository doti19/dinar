const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {loanRequestService} = require('../services');

const createLoanRequest = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.createLoanRequest(req.user, req.body);
        res.send(result);
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

const getSentLoanRequests = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.getSentLoanRequests(req.user, req.query);
        res.send(result);
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});


const getReceivedLoanRequests = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.getReceivedLoanRequests(req.user, req.query);
        res.send(result);
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

const approveLoanRequest = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.approveLoanRequest(req.user, req.params.loanRequestId);
        res.send(result
        );
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

const rejectLoanRequest = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.rejectLoanRequest(req.user, req.params.loanRequestId);
        res.send(result
        );
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

const cancelLoanRequest = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.cancelLoanRequest(req.user, req.params.loanRequestId);
        res.send(result
        );
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

const payLoanRequest = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.payLoanRequest(req.user, req.params.loanRequestId);
        res.send(result
        );
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

const markLoanRequestAsPaid = catchAsync(async (req, res, next) => {
    try {
        const result = await loanRequestService.markLoanRequestAsPaid(req.user, req.params.loanRequestId);
        res.send(result
        );
    } catch (error) {
        return next(
            new APIError({
                message: error.message,
                status: error.status,
                stack: error.stack,
            })
        );
    }
});

module.exports = {
    createLoanRequest,
    getSentLoanRequests,
    getReceivedLoanRequests,
    approveLoanRequest,
    rejectLoanRequest,
    cancelLoanRequest,
    payLoanRequest,
    markLoanRequestAsPaid
};