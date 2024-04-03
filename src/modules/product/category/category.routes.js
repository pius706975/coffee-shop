const router = require('express').Router();
const {
    makeExpressCallback,
    makeValidatorCallback,
} = require('../../../middlewares');
const categoryValidator = require('./category.validator');
const controller = require('./category.controller');
const { Admin } = require('../../../middlewares/authorize');
const authentication = require('../../../middlewares/auth');

router.post(
    '/',
    authentication,
    Admin,
    makeValidatorCallback(categoryValidator.ValidateAddCategory),
    makeExpressCallback(controller.AddCategory)
);

router.put(
    '/:id',
    authentication,
    Admin,
    makeValidatorCallback(categoryValidator.ValidateUpdateCategory),
    makeExpressCallback(controller.UpdateCategory)
);

router.delete(
    '/:id',
    authentication,
    Admin,
    makeExpressCallback(controller.DeleteCategory)
);

router.get('/', makeExpressCallback(controller.GetAllCategories));

router.get('/:id', makeExpressCallback(controller.GetByID));

module.exports = router;
