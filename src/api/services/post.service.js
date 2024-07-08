const {User, Post} = require("../models");
const {APIError} = require("../../errors/apiError");
const {APIFeatures} = require("../../utils/apiFeatures");

const logger = require("../../config/logger");
const {postJoiValidator} = require("../../validators");

const createPost = async (user, body) => {
    postJoiValidator.createPostSchema(body);
    const newPost = new Post({
        ...body,
        user: user._id,
    });

    const post = await Post.create(newPost);
    return post;
};


const getPosts = async (user, query) => {
    const apiFeatures = new APIFeatures(Post.find(), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const posts = await apiFeatures.query
        .populate("user", "firstName lastName email")
        

    return posts;
};

const getPost = async (user, postId) => {
    const post = await Post.findById(postId)
        .populate("user", "firstName lastName email");
    if (!post) {
        throw new APIError(404, "Post not found");
    }

    return post;
};

const myPosts = async (user, query) => {
    const apiFeatures = new APIFeatures(Post.find({user: user._id}), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const posts = await apiFeatures.query
        .populate("user", "firstName lastName email");

    return posts;
};

const updatePost = async (user, postId, body) => {
    // postJoiValidator.updatePostSchema(body);
    const post = await Post.findById(postId);
    if (!post) {
        throw new APIError(404, "Post not found");
    }

    if (post.user.toString() !== user._id.toString()) {
        throw new APIError(403, "You are not authorized to update this post");
    }

    post.set(body);
    await post.save();
    return post;
};


const deletePost = async (user, postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new APIError(404, "Post not found");
    }

    if (post.user.toString() !== user._id.toString()) {
        throw new APIError(403, "You are not authorized to delete this post");
    }

    await post.remove();
    return post;
};

const approvePost = async (user, postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new APIError(404, "Post not found");
    }
    post.status = "approved";
};

const rejectPost = async (user, postId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new APIError(404, "Post not found");
    }
    post.status = "rejected";
};

module.exports = {
    createPost,
    getPosts,
    getPost,
    myPosts,
    updatePost,
    deletePost,
    approvePost,
    rejectPost
};