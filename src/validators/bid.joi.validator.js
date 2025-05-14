const Joi = require('joi');
const { validate } = require('../helpers/schema.validation.helper');

const{
    bidStatusField,
    bidTypeField,
    bidImagesField,
    bidInterestRateField,
    bidAmountField,
    bidTenureField,
    bidUnitField
} = require('./helpers/fields/bid.field');

const createBidSchema = (body) => {
    const schema = Joi.object().keys({
        type: bidTypeField.required(),
        
        images: bidImagesField.when('type', {
            is: 'inKind',
            then: Joi.required(),
        }),
        interestRate: Joi.object().keys({
            interest: bidInterestRateField,
            unit: bidUnitField,
          }).when('type', {is: 'inCash', then: Joi.required(),otherwise: Joi.any().valid(null)}),
          
        amount: bidAmountField.when('type', {
            is: 'inCash',
            then: Joi.required(),
            otherwise: Joi.any().valid(null),
        }),
        tenure: bidTenureField.required(),
       
    });
    return validate(schema, body);
}


const updateBidSchema = (body) => {
    const schema = Joi.object().keys({
        type: bidTypeField,
       
        images: bidImagesField.when('type', {
            is: 'inKind',
            then: Joi.required(),
        }),
        interestRate: Joi.object().keys({
            interest: bidInterestRateField,
            unit: bidUnitField,
          }).when('type', {is: 'inCash', then: Joi.required(),otherwise: Joi.any().valid(null)}),
          
        amount: bidAmountField.when('type', {
            is: 'inCash',
            then: Joi.required(),
            otherwise: Joi.any().valid(null),
        }),
        tenureMonths: bidTenureField,
    });
    return validate(schema, body);
}

const approveBidSchema = (body) => {
    // const schema = Joi.object().keys({
    //     status: bidStatusField.required(),
    // });
    // return validate(schema, body);
}

const rejectBidSchema = (body) => {
    // const schema = Joi.object().keys({
    //     status: bidStatusField.required(),
    // });
    // return validate(schema, body);
}

module.exports = {
    createBidSchema,
    updateBidSchema,
    approveBidSchema,
    rejectBidSchema
}