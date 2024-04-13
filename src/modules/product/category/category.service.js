const { User, Category } = require('../../../db/models');
const { NotFoundError } = require('../../../utils/api.errors');
const { verifyJWT } = require('../../user/auth/jwt.service');

const CategoryService = {};

CategoryService.AddCategory = async (accessToken, requestBody) => {
    const decodedToken = await verifyJWT({ token: accessToken });
    const payload = { userId: decodedToken.userId };
    const user = await await User.findByPk(payload.userId);
    if (!user) throw new NotFoundError('User not found');

    const { name } = requestBody;
    const newData = await Category.create({
        name,
    });

    return newData;
};

CategoryService.UpdateCategory = async (accessToken, categoryID, newData) => {
    const decodedToken = await verifyJWT({ token: accessToken });
    const payload = { userId: decodedToken.userId };
    const user = await await User.findByPk(payload.userId);

    if (!user) throw new NotFoundError('User not found');
    
    const data = await CategoryService.GetByID(categoryID);
    const updatedData = await data.update(newData);

    return updatedData;
};

CategoryService.DeleteCategory = async (accessToken, categoryID) => {
    const decodedToken = await verifyJWT({ token: accessToken });
    const payload = { userId: decodedToken.userId };
    const user = await await User.findByPk(payload.userId);

    if (!user) throw new NotFoundError('User not found');
    
    const data = await CategoryService.GetByID(categoryID);
    const deletedData = await data.destroy(categoryID);

    return deletedData;
};

CategoryService.GetAllCategories = async () => {
    const result = await Category.findAll();
    return result;
};

CategoryService.GetByID = async (categoryID) => {
    const result = await Category.findOne({
        where: {
            id: categoryID,
        },
    });

    if (result <= 0) throw new NotFoundError('Category not found');

    return result;
};

module.exports = CategoryService;
