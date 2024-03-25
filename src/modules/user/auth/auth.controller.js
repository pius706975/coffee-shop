const AuthService = require('./auth.service');
const helper = require('../../../utils/helper');
const { BadRequestError } = require('../../../utils/api.errors');

const AuthController = {};

/**
 * Handle logging in user
 * @async
 * @function
 * @param {ExpressRequest} httpRequest incoming http request
 * @returns {Promise<ControllerResponse>}
 */

AuthController.Register = async (httpRequest) => {
    const registeredUser = await AuthService.Register(httpRequest.body);
    return helper.generateResponse(registeredUser);
};

AuthController.ResendOTP = async (httpRequest) => {
    const { email } = httpRequest.body;

    if (!email) throw new BadRequestError('Email is missing');

    await AuthService.ResendOTP(email);

    return {
        statusCode: 200,
        data: { message: 'OTP resent successfully' },
    };
};

AuthController.VerifyEmail = async (httpRequest) => {
    const { email, otp } = httpRequest.body;
    if (!email || !otp) throw new BadRequestError('Email or OTP are missing');

    const result = await AuthService.VerifyEmail(email, otp);

    if (result.is_verified) {
        return {
            statusCode: 200,
            data: { message: 'Email is verified' },
        };
    }

    return null;
};

AuthController.Login = async (httpRequest) => {
    const loggedInUser = await AuthService.Login(httpRequest.body);
    return helper.generateResponse(loggedInUser);
};

AuthController.RefreshToken = async (httpRequest) => {
    const { refreshToken } = httpRequest.body;
    if (!refreshToken) throw new BadRequestError('Refresh token is missing');

    const newAccessToken = await AuthService.RefreshToken(refreshToken);

    return helper.generateResponse(newAccessToken);
};

module.exports = AuthController;
