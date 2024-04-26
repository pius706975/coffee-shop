const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const productValidator = {};

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

productValidator.ValidateAddProduct = (httpRequest) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Product name must be a string',
            'string.empty': 'Product name is required',
            'any.required': 'Product name is required',
        }),
        description: Joi.string().required().messages({
            'string.base': 'Description must be a string',
            'string.empty': 'Description is required',
            'any.required': 'Description is required',
        }),
        price: Joi.number().required().messages({
            'number.base': 'Price must be a decimal',
            'any.required': 'Price is required',
        }),
        category_id: Joi.string().required().messages({
            'number.base': 'Category id must be a string',
            'any.required': 'Category id is required',
        }),
        image: Joi.string().messages({
            'string.base': 'Image must be a string',
        }),
    });

    return schema.validate(httpRequest.body, options);
};

productValidator.ValidateUpdateProduct = (httpRequest) => {
    const schema = Joi.object({
        name: Joi.string().allow('').optional().messages({
            'string.base': 'Product name must be a string',
            'string.empty': 'Product name is required',
        }),
        description: Joi.string().allow('').optional().messages({
            'string.base': 'Description must be a string',
            'string.empty': 'Description is required',
        }),
        price: Joi.number().allow('').optional().messages({
            'number.base': 'Price must be a decimal',
            'number.empty': 'Price is required',
        }),
        category_id: Joi.string().allow('').optional().messages({
            'number.base': 'Category id must be a string',
            'number.empty': 'Category id is required',
        }),
        image: Joi.string().allow('').optional().messages({
            'string.base': 'Image must be a string',
            'string.empty': 'Image is required',
        }),
    });

    return schema.validate(httpRequest.body, options);
};

module.exports = productValidator;
