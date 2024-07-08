const Joi = require('joi');
const {validate} = require('../helpers/schema.validation.helper');

const {
    postStatusField,
    postLoanReasonField,
    postLoanReasonDescriptionField,
    postTypeField,
    postImagesField,
    postInterestRateField,
    postAmountField,
    postDurationField,
    postOverdueInterestRateField,
    postMaxInterestRateField,
    postMaxAmountField,
    postMaxDurationField,
    postMaxOverdueInterestRateField,
    postRejectionReasonField,
    postTitleField,
    postDescriptionField,
} = require('./helpers/fields/post.fields');

const createPostSchema = (body)=>{
    const schema = Joi.object().keys({
        type: postTypeField.required(),
        title: postTitleField.required(),
        images: postImagesField.required(),
        loanReason: postLoanReasonField.required(),
        loanReasonDescription: postLoanReasonDescriptionField.required(),
        description: postDescriptionField.required(),
        interestRate: postInterestRateField.required(),
        amount: postAmountField.required(),
        duration: postDurationField.required(),
        overdueInterestRate: postOverdueInterestRateField.required(),
        maxInterestRate: postMaxInterestRateField,
        maxAmount: postMaxAmountField,
        maxDuration: postMaxDurationField,
        maxOverdueInterestRate: postMaxOverdueInterestRateField,

        // status: postStatusField,
        // rejectionReason: postRejectionReasonField,
    });

    validate(schema, body);
    // return true;
}

const updatePostSchema = (body)=>{
}

const approvePostSchema = (body)=>{
}

const rejectPostSchema = (body)=>{
}

module.exports = {
    createPostSchema,
    updatePostSchema,
    approvePostSchema,
    rejectPostSchema
}
