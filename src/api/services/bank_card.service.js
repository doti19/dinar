const {User, BankCard} = require('../models');
const {APIError} = require('../../errors/apiError');
const {APIFeatures} = require('../../utils/apiFeatures');

const logger = require('../../config/logger');

const {bankCardJoiValidator} = require('../../validators');

const getBankCards = async (user, query) => {
    const apiFeatures = new APIFeatures(BankCard.find({user: user._id}), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const bankCards = await apiFeatures.query
        .populate('bank', 'name');

    return bankCards;
}

const getBankCard = async (user, cardNumber) => {
    const bankCard = await BankCard.findOne({user: user._id, cardNumber: cardNumber})
        .populate('bank', 'name');
    if (!bankCard) {
        throw new APIError(404, 'Bank card not found');
    }

    return bankCard;
}


const getBankCardByUserId = async (userId) => {
    const bankCard = await BankCard.findOne({user: userId})
        .populate('bank', 'name');
        if (!bankCard) {
            throw new APIError(404, 'Bank card not found');
        }
    return bankCard;
}

const createBankCard = async (user, body) => {
    bankCardJoiValidator.createBankCardSchema(body);

    const bankCard = await BankCard.findOne({cardNumber: body.cardNumber});
    if (bankCard) {
        throw new APIError(400, 'Bank card already exists');
    }

    const bank = await Bank.findOne({
        code: body.bankCode,
    });

    const isPrimary = await BankCard.countDocuments({user: user._id, isPrimary: true});

    const newBankCard = new BankCard({
        bank: bank._id,
        cardNumber: body.cardNumber,
        isPrimary: isPrimary === 0,
        user: user._id,
    });

    const result = await BankCard.create(newBankCard);
    return result;
}

const makePrimaryBankCard = async (user, cardNumber) => {
    const bankCard = await BankCard.findOne({user: user._id, cardNumber: cardNumber});
    if (!bankCard) {
        throw new APIError(404, 'Bank card not found');
    }

    await BankCard.updateMany({user: user._id}, {isPrimary: false});
    bankCard.isPrimary = true;
    await bankCard.save();

    return bankCard;
}


const getPrimaryBankCard = async (user) => {
    const bankCard = await BankCard.findOne({user: user._id, isPrimary: true})
    .populate('bank', 'name');
    return bankCard;
}

module.exports = {
    getPrimaryBankCard,
    makePrimaryBankCard,
    createBankCard,
    getBankCardByUserId,
    getBankCard,
    getBankCards,
    
};