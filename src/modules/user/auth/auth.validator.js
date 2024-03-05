const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const authValidator = {};

const options = {
    errors: {
        wrap: {
            label: '',
        },
    },
};

/**
 * Validate a login request
 * @param {object} httpRequest - The HTTP request object
 * @param {object} httpRequest.body - The request body
 * @param {string} httpRequest.body.phone - The phone number to validate
 * @param {string} httpRequest.body.password - The password to validate
 * @param {object} - The validation result
 */

authValidator.validateLogin = (httpRequest) => {
    const schema = Joi.object({
        username: Joi.string().required().messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'any.required': 'Username is required',
        }),

        password: Joi.string().required(),
    });

    return schema.validate(httpRequest.body, options);
};

authValidator.validateRegister = (httpRequest) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const schema = Joi.object({
        username: Joi.string().required().messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
            'any.required': 'Username is required',
        }),

        email: Joi.string().email().required().messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Email format is invalid',
            'any.required': 'Email is required',
        }),

        password: Joi.string()
            .pattern(new RegExp(passwordRegex))
            .required()
            .messages({
                'string.pattern.base':
                    'Password must at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                'any.required': 'Password is required'
            }),

        role: Joi.number(),
    });

    return schema.validate(httpRequest.body, options);
};

module.exports = authValidator;
