const catchAsync = require('../../utils/catchAsync');
const { APIError } = require('../../errors/apiError');
const {postService} = require('../services');

const createPost = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.createPost(req.user, req.body);
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

const getPosts = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.getPosts(req.user, req.query);
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

const getPost = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.getPost(req.user, req.params.postId);
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

const myPosts = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.myPosts(req.user, req.query);
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

const updatePost = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.updatePost(req.user, req.params.postId, req.body);
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

const deletePost = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.deletePost(req.user, req.params.postId);
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


const approvePost = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.approvePost(req.user, req.params.postId);
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


const rejectPost = catchAsync(async (req, res, next) => {
    try {
        const result = await postService.rejectPost(req.user, req.params.postId);
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
    createPost,
    getPosts,
    getPost,
    myPosts,
    updatePost,
    deletePost,
    approvePost,
    rejectPost
}