const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const categoryValidator = {};

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

categoryValidator.ValidateAddCategory = (httpRequest) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Category name must be a string',
            'string.empty': 'Category name is required',
            'any.required': 'Category name is required',
        }),
    });

    return schema.validate(httpRequest.body, options);
};

categoryValidator.ValidateUpdateCategory = (httpRequest) => {
    const schema = Joi.object({
        name: Joi.string().allow('').optional().messages({
            'string.base': 'Category name must be a string',
            'string.empty': 'Category name is required',
        }),
    });

    return schema.validate(httpRequest.body, options);
};

module.exports = categoryValidator;
