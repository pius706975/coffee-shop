const router = require('express').Router();
const AuthController = require('./auth.controller');
const authValidator = require('./auth.validator');

const {
    makeValidatorCallback,
    makeExpressCallback,
} = require('../../../middlewares/index');

router.post(
    '/register',
    makeValidatorCallback(authValidator.validateRegister),
    makeExpressCallback(AuthController.Register)
);

router.post('/resend_otp', makeExpressCallback(AuthController.ResendOTP));

router.post(
    '/verify',
    makeValidatorCallback(authValidator.ValidateVerifyAcc),
    makeExpressCallback(AuthController.VerifyEmail)
);

router.post(
    '/login',
    makeValidatorCallback(authValidator.validateLogin),
    makeExpressCallback(AuthController.Login)
);

router.post('/refresh_token', makeExpressCallback(AuthController.RefreshToken));

module.exports = router;
