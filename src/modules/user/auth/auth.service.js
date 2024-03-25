const AuthService = {};
const { JWT_REFRESH_TOKEN_SECRET } = require('config');
const bcrypt = require('bcrypt');
const { User } = require('../../../db/models');
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
} = require('../../../utils/api.errors');
const JwtService = require('./jwt.service');
const generateOTP = require('../../../utils/otp.generator');
const { sendEmail } = require('../../../utils/nodemailer');
const logger = require('../../../support/logger');

AuthService.Register = async (requestBody) => {
    const otp = generateOTP();

    const newUser = await User.create({
        username: requestBody.username,
        email: requestBody.email,
        password: requestBody.password,
        otp_code: otp,
        otp_expiration: new Date(Date.now() + 10 * 60 * 1000), // otp code will be expired in 10 minutes
        is_verified: false,
        ...(requestBody.role && { role: requestBody.role }),
    });

    const subject = 'Email Verification';
    const message = `Your OTP code is: ${otp}`;

    sendEmail(newUser.email, subject, message, (error, info) => {
        if (error) {
            logger.error(error.message);
        } else {
            logger.info(`Email sent: ${info.response}`);
        }
    });

    return newUser;
};

AuthService.ResendOTP = async (email) => {
    const otp = generateOTP();
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (!user) throw new NotFoundError('User not found');

    user.otp_code = otp;
    user.otp_expiration = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const subject = 'Email Verification';
    const message = `Your new OTP code is: ${otp}`;

    if (user.is_verified) {
        throw new UnauthorizedError('Email has been verified');
    } else {
        sendEmail(user.email, subject, message, (error, info) => {
            if (error) {
                logger.error(error.message);
            } else {
                logger.info(`Email resent: ${info.response}`);
            }
        });
    }
};

AuthService.VerifyEmail = async (email, otp) => {
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (!user) throw new NotFoundError('User not found');

    const OTPValid = user.otp_code === otp;
    const OTPExpiration = user.otp_expiration > new Date();

    if (OTPValid && OTPExpiration) {
        if (user.is_verified)
            throw new UnauthorizedError('Email has been verified');

        user.is_verified = true;
        await user.save();
        return { is_verified: true };
    }

    if (!OTPValid) {
        throw new BadRequestError('OTP is invalid');
    } else if (!OTPExpiration) {
        throw new BadRequestError('OTP is expired');
    } else {
        return { is_verified: false };
    }
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

AuthService.RefreshToken = async (refreshToken) => {
    const decodedRefreshToken = await JwtService.verifyJWT({
        token: refreshToken,
    });

    const payload = {
        userId: decodedRefreshToken.userId,
        role: decodedRefreshToken.role,
    };

    const newAccessToken = await JwtService.generateJWT({
        payload,
    });

    return { accessToken: newAccessToken };
};

module.exports = AuthService;
