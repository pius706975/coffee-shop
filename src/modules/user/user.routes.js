const router = require('express').Router();
const {
    makeExpressCallback,
    makeValidatorCallback,
} = require('../../middlewares');
const authentication = require('../../middlewares/auth');
const UserController = require('./user.controller');
const userValidator = require('./user.validator');

router.get(
    '/profile',
    authentication,
    makeExpressCallback(UserController.GetProfile)
);

router.put(
    '/edit_profile',
    authentication,
    makeValidatorCallback(userValidator.ValidateUserUpdate),
    makeExpressCallback(UserController.UpdateProfile)
);

router.put(
    '/edit_password',
    authentication,
    makeValidatorCallback(userValidator.ValidatePasswordUpdate),
    makeExpressCallback(UserController.UpdatePassword)
);

module.exports = router;
