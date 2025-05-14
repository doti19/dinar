const {User, Bid, Post} = require("../models");
const {APIError} = require("../../errors/apiError");
const APIFeatures = require("../../utils/apiFeatures");

const logger = require("../../config/logger");
const {bidJoiValidator} = require("../../validators");

const createBid = async (postId, body, user) => {
    bidJoiValidator.createBidSchema(body);
    try{
        console.log(postId);
        const post = await Post.findById(postId);
        if (!post) {
            throw new APIError(404, "Post not found");
        }
        if(post.status !=='pending'){
            throw new APIError(400, "You can only bid on pending posts");
        }
        const newBid =  new Bid({
            post: postId,
            bidder: user._id,
            ...body,
        });
        // const bid = await Bid.create(newBid);
        // create a new bid
        post.bids.push(newBid._id);
        // post.bids = [...post.bids, newBid._id];

        await newBid.save();
        await post.save();
        console.log(newBid);
        return newBid;
    }catch(error){
        logger.error(error.message);
    }
}

const getBids = async ( query,postId) => {
    const apiFeatures = new APIFeatures(Bid.find(
        {post: postId}
    ), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const bids = await apiFeatures.query
        .populate("post")
        .populate({
            path: 'post',
            populate: {
                path: 'user',
            },
        })
        .populate("bidder");
    limit = query.limit? query.limit : 10;
    console.log(bids);
    return {
        result: bids,
        num_of_pages: Math.ceil(bids.length / limit)};
};

const getBid = async (bidId, user) => {
    const bid = await Bid.findById(bidId)
        .populate("post")
        .populate("bidder");
    if (!bid) {
        throw new APIError(404, "Bid not found");
    }

    return bid;
};

const myBids = async ( query, user) => {
    const apiFeatures = new APIFeatures(Bid.find({bidder: user._id}), query)
        .filter()
        .sort()
        .limitFields()
        .paginate();

    const bids = await apiFeatures.query
        .populate("post")
        .populate("bidder");
    limit = query.limit? query.limit : 10;
    console.log(bids);
    return {
        result: bids,
        num_of_pages: Math.ceil(bids.length / limit)};
};

const updateBid = async (bidId, body, user) => {
    bidJoiValidator.updateBidSchema(body);
    try{
        const bid = await Bid.findById(bidId);
        if (!bid) {
            throw new APIError(404, "Bid not found");
        }
        if (bid.bidder.toString() !== user._id.toString()) {
            throw new APIError(403, "You are not authorized to perform this action");
        }
        Object.keys(body).forEach(key => {
            bid[key] = body[key];
        });
        await bid.save();
        return bid;
    }catch(error){
        logger.error(error.message);
    }
}

const deleteBid = async (bidId, user) => {
    try{
        const bid = await Bid.findById(bidId);
        
        if (!bid) {
            throw new APIError(404, "Bid not found");
        }
        if(bid.status == 'approved'){
            throw new APIError(400, "You cannot delete an approved bid");
        }
        if (bid.bidder.toString() !== user._id.toString()) {
            throw new APIError(403, "You are not authorized to delete this bid");
        }
        await bid.remove();
        return bid;
    }catch(error){
        logger.error(error.message);
    }
}

const approveBid = async (bidId, user) => {
    try{
        const bid = await Bid.findById(bidId);
        const post = await Post.findById(bid.post);
        if (!post) {
            throw new APIError(404, "Post not found");
        }
        if(post.status != 'pending' ){
            throw new APIError(400, "You can only approve bids on pending posts");
        }
        if (!bid) {
            throw new APIError(404, "Bid not found");
        }
        if(bid.status != 'pending'){
            throw new APIError(400, "You can only approve pending bids");
        }
        if(user._id.toString() != post.user.toString()){
            throw new APIError(403, "You are not authorized to approve this bid");
        }
        
        bid.status = 'approved';
        await bid.save();
        return bid;
    }catch(error){
        logger.error(error.message);
    }
}

const rejectBid = async (bidId, user) => {
    try{
        const bid = await Bid.findById(bidId);
        const post = await Post.findById(bid.post);
        if (!post) {
            throw new APIError(404, "Post not found");
        }
        if(post.status != 'pending' ){
            throw new APIError(400, "You can only reject bids on pending posts");
        }
        if (!bid) {
            throw new APIError(404, "Bid not found");
        }
        if(bid.status != 'pending'){
            throw new APIError(400, "You can only reject pending bids");
        }
        if(user._id.toString() != post.user.toString()){
            throw new APIError(403, "You are not authorized to reject this bid");
        }

        bid.status = 'rejected';
        await bid.save();
        return bid;
    }
    catch(error){
        logger.error(error.message);
    }

}

const acceptBid = async (bidId, user) => {
    try{
        const bid = await Bid.findById(bidId);
        const post = await Post.findById(bid.post);
        if (!post) {
            throw new APIError(404, "Post not found");
        }
        if(post.status != 'approved' ){
            throw new APIError(400, "You can only accept bids on approved posts");
        }

        if (!bid) {
            throw new APIError(404, "Bid not found");
        }
        if(bid.status != 'approved'){
            throw new APIError(400, "You can only accept approved bids");
        }
        if(user._id.toString() != bid.bidder.toString()){
            throw new APIError(403, "You are not authorized to accept this bid");
        }
        post.status = 'approved';
        await post.save();
        return post;
    }
    catch(error){
        logger.error(error.message);
    }
}

const declineBid = async (bidId, user) => {
    try{
        const bid = await Bid.findById(bidId);
        const post = await Post.findById(bid.post);
        if (!post) {
            throw new APIError(404, "Post not found");
        }
        if(post.status != 'approved' ){
            throw new APIError(400, "You can only reject bids on approved posts");
        }

        if (!bid) {
            throw new APIError(404, "Bid not found");
        }
        if(bid.status != 'approved'){
            throw new APIError(400, "You can only reject approved bids");
        }
        if(user._id.toString() != bid.bidder.toString()){
            throw new APIError(403, "You are not authorized to reject this bid");
        }
        post.status = 'rejected';
        await post.save();
        return post;
    }
    catch(error){
        logger.error(error.message);
    }
}

module.exports = {
    createBid,
    getBids,
    getBid,
    myBids,
    updateBid,
    deleteBid,
    approveBid,
    rejectBid,
    acceptBid,
    declineBid
};