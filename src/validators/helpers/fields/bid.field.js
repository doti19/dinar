const Joi = require('joi');
const {
    status,
    type,
    images,
    interestRate,
    amount,
    duration,
    unit
} = require('../messags/bid.messages');

const bidStatusField = Joi.string()
    .valid('pending', 'approved', 'rejected')
    .messages(status)
    .label("Bid Status");

const bidTypeField = Joi.string()
    .valid('inCash', 'inKind')
    .messages(type)
    .label("Bid Type");

const bidImagesField = Joi.array()
    .items(Joi.string())
    .messages(images)
    .label("Bid Images");

const bidInterestRateField = Joi.number()
    .messages(interestRate)
    .label("Bid Interest Rate");

const bidAmountField = Joi.number()
    .messages(amount)
    .label("Bid Amount");

const bidTenureField = Joi.number()
    .messages(duration)
    .label("Bid Tenure");

const bidUnitField = Joi.string()
    .valid('month', 'year')
    .messages(unit)
    .label("Bid Unit");

module.exports = {
    bidStatusField,
    bidTypeField,
    bidImagesField,
    bidInterestRateField,
    bidAmountField,
    bidTenureField,
    bidUnitField
}