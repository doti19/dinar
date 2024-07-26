const Joi = require("joi");
const {
    postTitle,
    postDescription,
    status,
    amount,
    duration,
    overdueInterestRate,
    maxInterestRate,
    maxAmount,
    maxDuration,
    maxOverdueInterestRate,
    rejectionReason,
    interestRate,
    images,
    type,
    loanReason,
    loanReasonDescription,
    postExpiresAfter,

    
    
}= require("../messags/post.messages");

const postStatusField = Joi.string()
    .valid('pending', 'approved', 'rejected', 'hidden')
    .messages(status)
    .label("Post Status");
const postLoanReasonField = Joi.string()
    .valid('business', 'education', 'travel', 'medical', 'shopping', 'wedding', 'houseBuying', 'carBuying', 'other')
    .messages(loanReason)
    .label("Post Loan Reason");
const postLoanReasonDescriptionField = Joi.string()
    .messages(loanReasonDescription)
    .label("Post Loan Reason Description");
const postTypeField = Joi.string()
    .valid('inCash', 'inKind')
    .messages(type)
    .label("Post Type");

    const postImagesField = Joi.array()
    .items(Joi.string())
    .messages(images)
    .label("Post Images");
const postInterestRateField = Joi.number()
    .messages(interestRate)
    .label("Post Interest Rate");
const postAmountField = Joi.number()
    .messages(amount)
    .label("Post Amount");
const postTenureField = Joi.number()
    .messages(duration)
    .label("Post Tenure");
const postOverdueInterestRateField = Joi.number()
    .messages(overdueInterestRate)
    .label("Post Overdue Interest Rate");
const postMaxInterestRateField = Joi.number()
    .messages(maxInterestRate)
    .label("Post Max Interest Rate")
    .allow(null);
const postMaxAmountField = Joi.number()
    .messages(maxAmount)
    .label("Post Max Amount")
    .allow(null);

const postMaxTenureField = Joi.number()
    .messages(maxDuration)
    .label("Post Max Tenure")
    .allow(null);

const postMaxOverdueInterestRateField = Joi.number()
    .messages(maxOverdueInterestRate)
    .label("Post Max Overdue Interest Rate")
    .allow(null);

const postRejectionReasonField = Joi.string()
    .messages(rejectionReason)
    .label("Post Rejection Reason")
    .allow(null);



const postTitleField = Joi.string()
    
    .messages(postTitle)
    .label("Post Title");
const postDescriptionField = Joi.string()
    
    .messages(postDescription)
    .label("Post Description");

    const postExpiresAfterField = Joi.number()
    .max(14)
    .min(1)
    .messages(postExpiresAfter)
    .label("Post Expires After");


module.exports = {
    postStatusField,
    postLoanReasonField,
    postLoanReasonDescriptionField,
    postTypeField,
    postImagesField,
    postInterestRateField,
    postAmountField,
    postDurationField: postTenureField,
    postOverdueInterestRateField,
    postMaxInterestRateField,
    postMaxAmountField,
    postMaxDurationField: postMaxTenureField,
    postMaxOverdueInterestRateField,
    postRejectionReasonField,
    postTitleField,
    postDescriptionField,
    postExpiresAfterField,

}
