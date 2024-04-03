const { NotFoundError } = require('../../../utils/api.errors');
const helper = require('../../../utils/helper');
const CategoryService = require('./category.service');

const CategoryController = {};

// TODO: Create authentication and authorization for product category services
CategoryController.AddCategory = async (httpRequest) => {
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) throw new NotFoundError('User not found');

    const accessToken = authorization.split(' ')[1];
    const newData = httpRequest.body;
    const result = await CategoryService.AddCategory(accessToken, newData);

    return helper.generateResponse(result);
};

CategoryController.UpdateCategory = async (httpRequest) => {
    const { id } = httpRequest.params;
    const newData = httpRequest.body;
    const result = await CategoryService.UpdateCategory(id, newData);

    return {
        statusCode: 200,
        data: {
            message: 'Category is updated',
            result,
        },
    };
};

CategoryController.DeleteCategory = async (httpRequest) => {
    const { id } = httpRequest.params;
    await CategoryService.DeleteCategory(id);

    return {
        statusCode: 200,
        data: { message: 'Category is deleted successfully' },
    };
};

CategoryController.GetAllCategories = async () => {
    const result = await CategoryService.GetAllCategories();
    return {
        statusCode: 200,
        data: result,
    };
};

CategoryController.GetByID = async (httpRequest) => {
    const { id } = httpRequest.params;
    const result = await CategoryService.GetByID(id);
    return {
        statusCode: 200,
        data: result,
    };
};

module.exports = CategoryController;
