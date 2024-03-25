const router = require('express').Router();
const RoleController = require('./role.controller');
const roleValidator = require('./role.validator');
const {
    makeValidatorCallback,
    makeExpressCallback,
} = require('../../../middlewares');

router.post(
    '/',
    makeValidatorCallback(roleValidator.validateCreate),
    makeExpressCallback(RoleController.CreateRole)
);

module.exports = router;
