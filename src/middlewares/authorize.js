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
    if (!req.context.role || req.context.role !== 2)
        throw new UnauthorizedError('Only admin is allowed');
    return next();
};
