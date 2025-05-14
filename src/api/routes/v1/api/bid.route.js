const express = require('express');
const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');

const {bidController} = require('../../../controllers');

const router = express.Router();

router.use(requireJwtAuth);

//TODO change the route name... or move it into the post route
router
    .route('/:postId/bid')
    .post(bidController.createBid)
    .get(bidController.getBids);

    router
        .route('/my')
        .get(bidController.myBids);
    
    router
        .route('/:bidId/approve')
        .patch( bidController.approveBid);
        router
            .route('/:bidId/reject')
            .patch(bidController.rejectBid);
router
    .route('/:bidId/accept')
    .patch(bidController.acceptBid);

router
    .route('/:bidId/decline')
    .patch(bidController.declineBid);
router
    .route('/:bidId')
    .get(bidController.getBid)
    .patch(bidController.updateBid)
    .delete(bidController.deleteBid);



module.exports = router;
