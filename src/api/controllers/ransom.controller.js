const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const { ransomService } = require('../services');

const addRansom = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.addRansom(req.user, req.body);
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

const getRansoms = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.getRansoms(req.user, req.query);
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

const getRansom = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.getRansom(req.user, req.params.ransomId);
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

const updateRansom = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.updateRansom(req.user, req.params.ransomId, req.body);
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


const deleteRansom = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.deleteRansom(req.user, req.params.ransomId);
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



const approveRansom = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.approveRansom(req.user, req.params.ransomId);
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

const rejectRansom = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.rejectRansom(req.user, req.params.ransomId);
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


const getUserRansoms = catchAsync(async (req, res, next) => {
    try {
        const result = await ransomService.getUserRansoms(req.user, req.params.userId);
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

module.exports = {
    addRansom,
    getRansoms,
    getRansom,
    updateRansom,
    deleteRansom,
    approveRansom,
    rejectRansom,
    getUserRansoms,
};