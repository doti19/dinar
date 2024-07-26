const express = require('express');

const {requireJwtAuth, restrictTo} = require('../../../../middlewares/auth');
const {mediaController} = require('../../../controllers');
const upload = require('../../../../config/multer');
const router = express.Router();

router
    .route('/upload')
    .post(requireJwtAuth, upload.array('medias', 12), async (req, res, next)=>{
        try {
            console.log('sele: ', req.files );
            console.log();
           res.json({
            result: {
                images:req.files
            }
        });
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
    // .get(mediaController.getMedias);

// router
//     .route('/:mediaId')
//     .get(mediaController.getMedia)
//     .delete(requireJwtAuth, mediaController.deleteMedia);

module.exports = router;    