const {User, Bank} = require('../models');
const {APIError} = require('../../errors/apiError');
const {APIFeatures} = require('../../utils/apiFeatures');

const logger = require('../../config/logger');

const {bankJoiValidator} = require('../../validators');

const getBanks = async (query) => {
    const apiFeatures = new APIFeatures(Bank.find(), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const banks = await apiFeatures.query;

    return banks;
}

const getBank = async (bankCode) => {
    const bank = await Bank.findOne({id: bankCode});
    if (!bank) {
        throw new APIError(404, 'Bank not found');
    }

    return bank;
}

const createBank = async (body) => {
    bankJoiValidator.createBankSchema(body);

    const bank = await Bank.findOne({code: body.code});
    if (bank) {
        throw new APIError(400, 'Bank already exists');
    }

    const newBank = new Bank({
        code: body.code,
        name: body.name,
        shortName: body.shortName,
        logo: body.logo,

    });

    await newBank.save();

    return newBank;
}

const updateBank = async (bankCode, body) => {
    bankJoiValidator.updateBankSchema(body);

    const bank = await Bank.findOne({id: bankCode});
    if (!bank) {
        throw new APIError(404, 'Bank not found');
    }

    bank.set(body);
    await bank.save();

    return bank;
}

const deleteBank = async (bankCode) => {
    const bank = await Bank
        .findOneAndDelete({id: bankCode
        });

    if (!bank) {
        throw new APIError(404, 'Bank not found');
    }

    return bank;
}

module.exports = {
    getBanks,
    getBank,
    createBank,
    updateBank,
    deleteBank
}
