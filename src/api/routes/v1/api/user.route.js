const express = require("express");
const { requireJwtAuth, restrictTo } = require("../../../../middlewares/auth");
const { userController } = require("../../../controllers");
const  upload = require('../../../../config/multer');

const router = express.Router();

router
    .route("/profile")
    .get(requireJwtAuth, userController.viewProfile)
    .patch(requireJwtAuth, upload.single('avatar'),userController.updateProfile)
    .delete(requireJwtAuth, userController.deleteProfile);


router.route('/profile/dashboard')
    .get(requireJwtAuth, restrictTo(['player', 'coach', 'parent']), userController.viewProfileDashboard);

router.get("/search", requireJwtAuth, userController.searchUsers);
router.post("/invite", requireJwtAuth, userController.inviteUser);
router.get('/add', requireJwtAuth, userController.addUser);

router.get('/upload/', upload.single('userProfile'), userController.uploadProfile);

// router.get('/:userId', requireJwtAuth, userController.getUser);
// router.patch('/deactivate', requireJwtAuth, userController.deactivateMe);

module.exports = router;
