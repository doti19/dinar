const express = require('express');
const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');

const {postController} = require('../../../controllers');

const router = express.Router();
router.use(requireJwtAuth);

router
    .route('/')
    .post(postController.createPost)
    .get(postController.getPosts);

router
    .route('/:postId')
    .get(postController.getPost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

router
    .route('/my')
    .get(postController.myPosts);

router
    .route('/:postId/approve')
    .patch(restrictTo('admin'), postController.approvePost);

router
    .route('/:postId/reject')
    .patch(restrictTo('admin'), postController.rejectPost);


module.exports = router;