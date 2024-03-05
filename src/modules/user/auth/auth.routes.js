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

router.post(
    '/login',
    makeValidatorCallback(authValidator.validateLogin),
    makeExpressCallback(AuthController.Login)
);

module.exports = router;
