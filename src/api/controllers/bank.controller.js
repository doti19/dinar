const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {bankService} = require('../services');

const getBanks = catchAsync(async (req, res, next) => {
    try {
        const result = await bankService.getBanks(req.query);
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

const getBank = catchAsync(async (req, res, next) => {
    try {
        const result = await bankService.getBank(req.params.bankCode);
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

const createBank = catchAsync(async (req, res, next) => {
    try {
        const result = await bankService.createBank(req.body);
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

const updateBank = catchAsync(async (req, res, next) => {
    try {
        const result = await bankService.updateBank(req.params.bankCode, req.body);
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


const deleteBank = catchAsync(async (req, res, next) => {
    try {
        const result = await bankService.deleteBank(req.params.bankCode);
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
    getBanks,
    getBank,
    createBank,
    updateBank,
    deleteBank
};