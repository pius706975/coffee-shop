const router = require('express').Router();
const {
    makeExpressCallback,
    makeValidatorCallback,
} = require('../../../middlewares');
const categoryValidator = require('./category.validator');
const controller = require('./category.controller');

router.post(
    '/',
    makeValidatorCallback(categoryValidator.ValidateAddCategory),
    makeExpressCallback(controller.AddCategory)
);

router.put(
    '/:id',
    makeValidatorCallback(categoryValidator.ValidateUpdateCategory),
    makeExpressCallback(controller.UpdateCategory)
);

router.delete('/:id', makeExpressCallback(controller.DeleteCategory));

router.get('/', makeExpressCallback(controller.GetAllCategories));

router.get('/:id', makeExpressCallback(controller.GetByID));

module.exports = router;
