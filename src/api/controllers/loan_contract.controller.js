const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {loanContractService} = require('../services');

const getBorrowerLoanContracts = catchAsync(async (req, res, next) => {
    try {
        const result = await loanContractService.getBorrowerLoanContracts(req.user, req.query);
        res.send(result
        );
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

const getLenderLoanContracts = catchAsync(async (req, res, next) => {
    try {
        const result = await loanContractService.getLenderLoanContracts(req.user, req.query);
        res.send(result
        );
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
    getBorrowerLoanContracts,
    getLenderLoanContracts
}