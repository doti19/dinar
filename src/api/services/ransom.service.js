const {User, Post} = require("../models");
const {APIError} = require("../../errors/apiError");
const APIFeatures = require("../../utils/apiFeatures");

const logger = require("../../config/logger");

const {ransomJoiValidator} = require("../../validators");

const addRansom = async (user, body) => {
    ransomJoiValidator.createRansomSchema(body);
    user.ransoms.push(body);
    user.save();
    
    return body;
};

const getRansoms = async (user, query) => {
    // const apiFeatures = new APIFeatures(user.ransoms, query)
    //     .filter()
    //     .sort()
    //     .limitFields()
    //     .paginate();

    // const ransoms = await apiFeatures.query;
    const ransoms = user.ransoms;
    return ransoms;
};

const getRansom = async (user, ransomId) => {
    const ransom = user.ransoms.find(ransom=> ransom._id.toString() === ransomId);
    if (!ransom) {
        throw new APIError(404, "Ransom not found");
    }

    return ransom;
};


const updateRansom = async (user, ransomId, body) => {
    ransomJoiValidator.updateRansomSchema(body);
    // const ransomIndex = user.ransoms.findIndex(ransom => ransom._id.toString() === ransomId);
    // if (ransomIndex === -1) {
    //     throw new APIError(404, "Ransom not found");
    // }

    // user.ransoms[ransomIndex] = { ...user.ransoms[ransomIndex], ...body };
    const updateFields = {};
    Object.keys(body).forEach(key => {
        updateFields[`ransoms.$.${key}`] = body[key];
    });
    const ransoms = User.findOneAndUpdate({
        _id: user._id,
        "ransoms._id": ransomId
    },{
        $set:updateFields
    }, {new: true});

    // user.save();
    return user.ransoms;
};

const deleteRansom = async (user, ransomId) => {
    const ransomIndex = user.ransoms.findIndex(ransom => ransom._id.toString() === ransomId);
    if (ransomIndex === -1) {
        throw new APIError(404, "Ransom not found");
    }
    const ransom = user.ransoms.pull(ransomId);
    user.save();
    return user.ransoms;
};


const approveRansom = async (user, ransomId) => {
    const ransomIndex = user.ransoms.findIndex(ransom => ransom._id.toString() === ransomId);
    if (ransomIndex === -1) {
        throw new APIError(404, "Ransom not found");
    }
   const ransoms = User.findOneAndUpdate({
        _id: user._id,
        "ransoms._id": ransomId
    },{
        $set:{"ransoms.$.status": "approved"}
    }, {new: true});

    return user.ransoms;
};

const rejectRansom = async (user, ransomId) => {
    const ransomIndex = user.ransoms.findIndex(ransom => ransom._id.toString() === ransomId);
    if (ransomIndex === -1) {
        throw new APIError(404, "Ransom not found");
    }
   const ransoms = User.findOneAndUpdate({
        _id: user._id,
        "ransoms._id": ransomId
    },{
        $set:{"ransoms.$.status": "rejected"}
    }, {new: true});

    return user.ransoms;
};

const getUserRansoms = async (user, userId) => {
    const _user = await User.findById(userId);
    if (!_user) {
        throw new APIError(404, "User not found");
    }

    return _user.ransoms;
}

module.exports = {
    addRansom,
    getRansoms,
    getRansom,
    updateRansom,
    deleteRansom,
    approveRansom,
    rejectRansom,
    getUserRansoms
};

