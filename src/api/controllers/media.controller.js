const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {mediaService} = require('../services');

const getMedias = catchAsync(async (req, res, next) => {
    try {
        const result = await mediaService.getMedias(req.query);
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

const getMedia = catchAsync(async (req, res, next) => {
    try {
        const result = await mediaService.getMedia(req.params.mediaId);
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

const uploadMedias = catchAsync(async (req, res, next) => {
    try {
        const result = await mediaService.uploadMedias(req.files);
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


const deleteMedia = catchAsync(async (req, res, next) => {
    try {
        const result = await mediaService.deleteMedia(req.params.mediaId);
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


module.exports = {
    getMedias,
    getMedia,
    uploadMedias,
    deleteMedia,
};