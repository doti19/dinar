const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {blogService} = require('../services');

const getBlogs = catchAsync(async (req, res, next) => {
    try {
        const result = await blogService.getBlogs(req.query);
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

const getBlog = catchAsync(async (req, res, next) => {
    try {
        const result = await blogService.getBlog(req.params.blogId);
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


const createBlog = catchAsync(async (req, res, next) => {
    try {
        const result = await blogService.createBlog(req.body, req.user._id);
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


const updateBlog = catchAsync(async (req, res, next) => {
    try {
        const result = await blogService.updateBlog(req.params.blogId, req.body);
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


const deleteBlog = catchAsync(async (req, res, next) => {
    try {
        const result = await blogService.deleteBlog(req.params.blogId);
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

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
}