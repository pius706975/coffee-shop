const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const userValidator = {};

const options = {
    error: {
        wrap: {
            label: '',
        },
    },
};

userValidator.ValidateUserUpdate = (httpRequest) => {
    const schema = Joi.object({
        username: Joi.string().allow('').optional().messages({
            'string.base': 'Username must be a string',
            'string.empty': 'Username is required',
        }),
        email: Joi.string().email().allow('').optional().messages({
            'string.base': 'Email must be a string',
            'string.empty': 'Email is required',
            'string.email': 'Email format is invalid',
        }),
    });

    return schema.validate(httpRequest.body, options);
};

userValidator.ValidatePasswordUpdate = (httpRequest) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const schema = Joi.object({
        password: Joi.string()
            .pattern(new RegExp(passwordRegex))
            .required()
            .messages({
                'string.pattern.base':
                    'Password must at least 8 characters long, include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
                'any.required': 'Password is required',
            }),
    });
    return schema.validate(httpRequest.body, options);
};

module.exports = userValidator;
