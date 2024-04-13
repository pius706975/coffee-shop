const UploadFile = require('../../middlewares/upload/cloudinary');
const { NotFoundError, BadRequestError, InternalServerError } = require('../../utils/api.errors');
const UserService = require('./user.service');

const UserController = {};

UserController.GetProfile = async (httpRequest) => {
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) throw new NotFoundError('User not found');

    const accessToken = authorization.split(' ')[1];
    const profile = await UserService.GetProfile(accessToken);
    const result = {
        id: profile.id,
        name: profile.name,
        username: profile.username,
        email: profile.email,
        role_data: {
            id: profile.roleData.id,
            name: profile.roleData.name,
        },
        image: profile.image,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
    };

    return {
        statusCode: 200,
        data: result,
    };
};

UserController.UpdateProfile = async (httpRequest) => {
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) throw new NotFoundError('User not found');

    const accessToken = authorization.split(' ')[1];
    const newData = httpRequest.body;

    const updatedUser = await UserService.UpdateProfile(accessToken, newData);

    return {
        statusCode: 200,
        data: updatedUser,
    };
};

UserController.UpdatePicture = async (httpRequest) => {
    try {
        const authorization = httpRequest.headers.Authorization;
        if (!authorization) throw new NotFoundError('User not found');
    
        const accessToken = authorization.split(' ')[1];
        const file = httpRequest.file
        console.log(file)
        // if (!file) throw new BadRequestError('No image uploaded')
        
        const upload = await UploadFile(file.path, 'coffeemood/user')
        const {secure_url: image_url} = upload
        const result = await UserService.UpdatePicture({accessToken: accessToken, image_url})

        return {
            statusCode: 200,
            data: {
                message: 'Image is updated successfully',
                result
            }
        }
    } catch (error) {
        console.log(error.message);
        throw new InternalServerError(error.message)
    }
};

UserController.UpdatePassword = async (httpRequest) => {
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) throw new NotFoundError('User not found');

    const accessToken = authorization.split(' ')[1];
    const newPassword = httpRequest.body;

    await UserService.UpdatePassword(accessToken, newPassword);

    return {
        statusCode: 200,
        data: { message: 'Password is updated' },
    };
};

module.exports = UserController;
