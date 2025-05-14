const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {bidService} = require('../services');

const createBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.createBid(req.params.postId, req.body, req.user);
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

const getBids = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.getBids( req.query, req.params.postId);
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

const getBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.getBid(req.params.bidId, req.user);
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

const myBids = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.myBids( req.query, req.user);
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

const updateBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.updateBid(req.params.bidId, req.body, req.user);
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
}
);

const deleteBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.deleteBid(req.params.bidId, req.user);
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

const approveBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.approveBid(req.params.bidId, req.user);
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

const rejectBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.rejectBid(req.params.bidId, req.user);
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

const acceptBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.acceptBid(req.params.bidId, req.user);
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
}

);

const declineBid = catchAsync(async (req, res, next) => {
    try {
        const result = await bidService.declineBid(req.params.bidId, req.user);
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
}

);

module.exports = {
    createBid,
    getBids,
    getBid,
    myBids,
    updateBid,
    deleteBid,
    approveBid,
    rejectBid,
    acceptBid,
    declineBid
};