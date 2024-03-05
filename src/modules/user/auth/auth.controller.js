const AuthService = require('./auth.service');
const helper = require('../../../utils/helper');

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

AuthController.Login = async (httpRequest)=>{
    const loggedInUser = await AuthService.Login(httpRequest.body)
    return helper.generateResponse(loggedInUser)
}

module.exports = AuthController;
