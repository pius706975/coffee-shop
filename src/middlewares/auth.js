const jwtService = require('../modules/user/auth/jwt.service');
const { UnauthorizedError } = require('../utils/api.errors');

/**
 * @param header
 */

const decodeToken = async (header) => {
    if (!header) throw new UnauthorizedError('Missing authorization header');

    const token = header.replace('Bearer ', '');
    const payload = await jwtService.verifyJWT({ token });
    return payload;
};

/**
 * @param req
 * @param res
 * @param next
 */

module.exports = async (req, res, next) => {
    const { method, path } = req;
    if (method === 'OPTIONS' || ['/api/v1/auth/login'].includes(path)) {
        return next();
    }

    req.context = await decodeToken(
        req.header('Authorization') || req.header('authorization')
    );

    return next();
};
