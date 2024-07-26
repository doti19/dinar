const {User, Blog} = require('../models');

const {APIError} = require('../../errors/apiError');
const APIFeatures = require('../../utils/apiFeatures');

const logger = require('../../config/logger');

const {blogJoiValidator} = require('../../validators');

const getBlogs = async (query) => {
    const apiFeatures = new APIFeatures(Blog.find(), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const blogs = await apiFeatures.query;

    return blogs;
}

const getBlog = async (blogId) => {
    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new APIError(404, 'Blog not found');
    }

    return blog;
}

const createBlog = async (body, author) => {
    blogJoiValidator.createBlogSchema(body);

    const newBlog = new Blog({
        title: body.title,
        shortDescription: body.shortDescription,
        content: body.content,
        thumbnail: body.thumbnail,
        author: author,
    });

    await newBlog.save();

    return newBlog;
}

const updateBlog = async (blogId, body) => {
    blogJoiValidator.updateBlogSchema(body);

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new APIError(404, 'Blog not found');
    }

    blog.set(body);
    await blog.save();

    return blog;
}

const deleteBlog = async (blogId) => {
    const blog = await
    Blog.findById(blogId);
    if (!blog) {
        throw new APIError(404, 'Blog not found');
    }

    await blog.remove();

    return blog;
}

module.exports = {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
}