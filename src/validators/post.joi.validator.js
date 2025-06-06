const Joi = require("joi");
const { validate } = require("../helpers/schema.validation.helper");

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
  postExpiresAfterField,
  unitField,
} = require("./helpers/fields/post.fields");

const createPostSchema = (body) => {
  const schema = Joi.object().keys({
    type: postTypeField.required(),
    title: postTitleField.required(),
    images: postImagesField.when("type", {
      is: "inKind",
      then: Joi.required(),
    }),
    loanReasonType: postLoanReasonField.when("type", {
      is: "inCash",
      then: Joi.required(),
      otherwise: Joi.any().valid(null),
    }),
    loanReasonDescription: postLoanReasonDescriptionField.when("type", {
      is: "inCash",
      then: Joi.required(),
      otherwise: Joi.any().valid(null),
    }),
    description: postDescriptionField.required(),
    interestRate: Joi.object().keys({
      interest: postInterestRateField,
      unit: unitField,
    }).when('type', {is: 'inCash', then: Joi.required(),otherwise: Joi.any().valid(null)}),
    amount: postAmountField.when("type", {
      is: "inCash",
      then: Joi.required(),
      otherwise: Joi.any().valid(null),
    }),
    tenureMonths: postDurationField.required(),
    overdueInterestRate: Joi.object().keys({
        interest: postOverdueInterestRateField,
        unit: unitField,
    }).when('type', {is: 'inCash', then: Joi.required(),otherwise: Joi.any().valid(null)}),
    maxInterestRate:{
        interest: postMaxInterestRateField,
        unit: unitField,

    },
    maxAmount: postMaxAmountField,
    maxTenureMonths: postMaxDurationField,
    maxOverdueInterestRate: Joi.object().keys({
        interest: postMaxOverdueInterestRateField,
        unit: unitField,
    }),
    postExpiresAfter: postExpiresAfterField.required(),
    // status: postStatusField,
    // rejectionReason: postRejectionReasonField,
  });

  validate(schema, body);
  // return true;
};

const updatePostSchema = (body) => {
  const schema = Joi.object().keys({
    type: postTypeField,
    title: postTitleField,
    images: postImagesField.when("type", {
      is: "inKind",
      then: Joi.required(),
    }),
    loanReasonType: postLoanReasonField,
    loanReasonDescription: postLoanReasonDescriptionField,
    description: postDescriptionField,
    interestRate: Joi.object().keys({
        interest: postInterestRateField,
        unit: unitField,
      }).when('type', {is: 'inCash', then: Joi.required(),otherwise: Joi.any().valid(null)}),
    amount: postAmountField.when("type", {
      is: "inCash",
      then: Joi.required(),
    }),
    tenureMonths: postDurationField,
    overdueInterestRate:Joi.object().keys( {
        interest: postOverdueInterestRateField,
        unit: unitField,
    }),
    maxInterestRate: Joi.object().keys({
        interest: postMaxInterestRateField,
        unit: unitField,
    }),
    maxAmount: postMaxAmountField,
    maxTenureMonths: postMaxDurationField,
    maxOverdueInterestRate: Joi.object().keys({
        interest: postMaxOverdueInterestRateField,
        unit: unitField,
    }),

    // status: postStatusField,
    // rejectionReason: postRejectionReasonField,
  });

  validate(schema, body);
  // return true;
};

const approvePostSchema = (body) => {
  // const schema = Joi.object().keys({
  //     status: postStatusField.required().valid('approved'),
  // });
  // validate(schema, body);
};

const rejectPostSchema = (body) => {
  // const schema = Joi.object().keys({
  //     status: postStatusField.required().valid('rejected'),
  //     rejectionReason: postRejectionReasonField.required(),
  // });
  // validate(schema, body);
};

module.exports = {
  createPostSchema,
  updatePostSchema,
  approvePostSchema,
  rejectPostSchema,
};
