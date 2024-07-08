const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {bankCardService} = require('../services');

const getBankCards = catchAsync(async (req, res, next) => {

    try {
        const result = await bankCardService.getBankCards(req.user, req.query);
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

const getBankCard = catchAsync(async (req, res, next) => {
    try {
        const result = await bankCardService.getBankCard(req.user, req.params.cardNumber);
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

const createBankCard = catchAsync(async (req, res, next) => {
    try {
        const result = await bankCardService.createBankCard(req.user, req.body);
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

const getBankCardByUserId = catchAsync(async (req, res, next) => {
    try {
        const result = await bankCardService.getBankCardByUserId(req.params.userId);
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

const makePrimaryBankCard = catchAsync(async (req, res, next) => {
    try {
        const result = await bankCardService.makePrimaryBankCard(req.user, req.params.cardNumber);
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

const getPrimaryBankCard = catchAsync(async (req, res, next) => {
    try {
        const result = await bankCardService.getPrimaryBankCard(req.user);
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
    getBankCards,
    getBankCard,
    createBankCard,
    getBankCardByUserId,
    makePrimaryBankCard,
    getPrimaryBankCard,
};