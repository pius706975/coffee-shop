const bcrypt = require('bcrypt');
const { User, Role } = require('../../db/models');
const { verifyJWT } = require('./auth/jwt.service');
const { NotFoundError } = require('../../utils/api.errors');

const UserService = {};

UserService.GetProfile = async (accessToken) => {
    const decodedToken = await verifyJWT({
        token: accessToken,
    });

    const payload = {
        userId: decodedToken.userId,
    };

    const profile = await User.findByPk(payload.userId, {
        include: [
            {
                model: Role,
                as: 'roleData',
            },
        ],
    });

    return profile;
};

UserService.UpdateProfile = async (accessToken, newData) => {
    const decodedToken = await verifyJWT({
        token: accessToken,
    });

    const payload = {
        userId: decodedToken.userId,
    };

    const user = await User.findByPk(payload.userId);
    if (!user) throw new NotFoundError('User not found');

    const updatedUser = await user.update(newData);

    return updatedUser;
};

UserService.UpdatePassword = async (accessToken, newPassword) => {
    const decodedToken = await verifyJWT({
        token: accessToken,
    });

    const payload = {
        userId: decodedToken.userId,
    };

    const user = await User.findByPk(payload.userId);
    if (!user) throw new NotFoundError('User not found');

    const hashedPassword = await bcrypt.hash(newPassword.password, 10);
    if (newPassword.password) user.password = hashedPassword;

    await user.save();

    return user;
};

module.exports = UserService;
