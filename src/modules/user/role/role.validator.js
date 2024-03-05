const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));

const roleValidator = {};

const options = {
    error: {
        wrap: {
            label: '',
        },
    },
};

roleValidator.validateCreate = (httpRequest) => {
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Role name must be a string',
            'string.empty': 'Role name is required',
            'any.required': 'Role name is required'
        })
    })
    return schema.validate(httpRequest.body, options)
};

roleValidator.validateUpdate = (httpRequest)=>{
    const schema = Joi.object({
        name: Joi.string().required().messages({
            'string.base': 'Role name must be a string',
            'string.empty': 'Role name is required',
            'any.required': 'Role name is required'
        })
    })
}

module.exports = roleValidator;
