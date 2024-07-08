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

    
    
}= require("../messags/post.messages");

const postStatusField = Joi.string()
    .valid('pending', 'approved', 'rejected', 'hidden')
    .messages(status)
    .label("Post Status");
const postLoanReasonField = Joi.string()
    .valid('business', 'education', 'travel', 'medical', 'shopping', 'houseBuying', 'carBuying', 'other')
    .messages(loanReason)
    .label("Post Loan Reason");
const postLoanReasonDescriptionField = Joi.string()
    .messages(loanReasonDescription)
    .label("Post Loan Reason Description");
const postTypeField = Joi.string()
    .valid('lending', 'borrowing')
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
const postDurationField = Joi.number()
    .messages(duration)
    .label("Post Duration");
const postOverdueInterestRateField = Joi.number()
    .messages(overdueInterestRate)
    .label("Post Overdue Interest Rate");
const postMaxInterestRateField = Joi.number()
    .messages(maxInterestRate)
    .label("Post Max Interest Rate");
const postMaxAmountField = Joi.number()
    .messages(maxAmount)
    .label("Post Max Amount");
const postMaxDurationField = Joi.number()
    .messages(maxDuration)
    .label("Post Max Duration");
const postMaxOverdueInterestRateField = Joi.number()
    .messages(maxOverdueInterestRate)
    .label("Post Max Overdue Interest Rate");
const postRejectionReasonField = Joi.string()
    .messages(rejectionReason)
    .label("Post Rejection Reason");



const postTitleField = Joi.string()
    
    .messages(postTitle)
    .label("Post Title");
const postDescriptionField = Joi.string()
    
    .messages(postDescription)
    .label("Post Description");

module.exports = {
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

}
