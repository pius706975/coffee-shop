const AuthService = {};
const { JWT_REFRESH_TOKEN_SECRET } = require('config');
const bcrypt = require('bcrypt');
const { User } = require('../../../db/models');
const { NotFoundError, BadRequestError } = require('../../../utils/api.errors');
const JwtService = require('./jwt.service');

AuthService.Register = async (requestBody) => {
    const newUser = await User.create({
        username: requestBody.username,
        email: requestBody.email,
        password: requestBody.password,
    });

    return newUser;
};

AuthService.Login = async (requestBody) => {
    const { username, password } = requestBody;
    const user = await User.findOne({
        where: {
            username,
        },
    });

    if (!user) throw new NotFoundError('Username or password is incorrect');

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword)
        throw new BadRequestError('Username or password is incorrect');

    const payload = {
        userId: user.id,
        role: user.role,
    };

    const accessToken = await JwtService.generateJWT({ payload });

    const refreshToken = await JwtService.generateJWT({
        payload: {
            userId: user.id,
            role: user.role,
        },
        secretKey: JWT_REFRESH_TOKEN_SECRET,
        signOption: {
            issuer: 'coffee_shop',
            audience: 'https://example.in',
            expiresIn: '1m',
        },
    });

    return { accessToken, refreshToken, ...payload };
};

AuthService.RefreshToken = async (refreshToken)=>{
    const decodedRefreshToken = await JwtService.verifyJWT({
        token: refreshToken
    })

    const payload = {
        userId: decodedRefreshToken.userId,
        role: decodedRefreshToken.role
    }

    const newAccessToken = await JwtService.generateJWT({
        payload
    })

    return {accessToken: newAccessToken}
}

module.exports = AuthService;
