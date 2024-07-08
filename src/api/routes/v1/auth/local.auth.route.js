const express = require('express');

const {requireLocalAuth, requireJwtAuth} = require('../../../../middlewares/auth');

const {authController} = require('../../../controllers');
const router = express.Router();
router.post("/requestResetPassword", authController.requestPasswordReset);
router.post("/resetpassword/:token", authController.resetPassword);
router.patch("/changePassword", requireJwtAuth, authController.changePassword);

router.post('/login', requireLocalAuth, authController.login);

router.post('/sendverificationSMS', authController.sendVerificationSMS);
router.post('/verifyphoneOTP', authController.verifyPhoneOTP);

router.post('/register', authController.register);
router.post('/generateOTP', authController.generateOTP);
router.post('/verifyOTP', authController.verifyOTP);
router.post('/completeRegistration',requireJwtAuth, authController.completeRegistration);


router.post('/refresh', authController.refresh);

router.post("/logout", requireJwtAuth, authController.logout);



module.exports = router;
