const express = require('express');

const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {blogController} = require('../../../controllers');

const router = express.Router();
// router.use(requireJwtAuth);

router
    .route('/')
    .post(requireJwtAuth, blogController.createBlog)
    .get(blogController.getBlogs);

router
    .route('/:blogId')
    .get(blogController.getBlog)
    .patch(requireJwtAuth, blogController.updateBlog)
    .delete(requireJwtAuth, blogController.deleteBlog);

module.exports = router;