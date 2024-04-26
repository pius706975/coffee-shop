const { UnauthorizedError } = require('../utils/api.errors');

/**
 * @param roles
 */

module.exports = (roles) => (req, res, next) => {
    if (!req.user.role || !roles.includes(req.user.role))
        throw new UnauthorizedError();

    return next();
};

module.exports.Admin = async (req, res, next) => {
    if (!req.context.role || req.context.role !== 'bf42fc5a-f1a4-416c-be45-17ca937d98db')
        throw new UnauthorizedError('Only admin is allowed');
    return next();
};
