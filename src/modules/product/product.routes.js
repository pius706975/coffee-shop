const router = require('express').Router();
const multer = require('multer');
const {
    makeValidatorCallback,
    makeExpressCallback,
} = require('../../middlewares');
const authentication = require('../../middlewares/auth')
const {Admin} = require('../../middlewares/authorize')
const productValidator = require('./product.validator');
const controller = require('./product.controller');

const upload = multer({ storage: multer.memoryStorage() });

router.post(
    '/',
    makeValidatorCallback(productValidator.ValidateAddProduct),
    makeExpressCallback(controller.AddProduct)
);

router.get('/', makeExpressCallback(controller.GetAllProducts));

router.get('/:id', makeExpressCallback(controller.GetProductByID));

router.put('/:id', authentication, Admin, makeExpressCallback(controller.UpdateProduct));

// TODO: fix the upload image function
router.put(
    '/image/:id',
    upload.single('image'),
    makeExpressCallback(controller.UpdateProductPicture)
);

router.put('/delete/:id', makeExpressCallback(controller.DeleteProduct));

module.exports = router;
