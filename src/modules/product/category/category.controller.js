const helper = require('../../../utils/helper');
const CategoryService = require('./category.service');

const CategoryController = {};

CategoryController.AddCategory = async (httpRequest) => {
    const newData = httpRequest.body;
    const result = await CategoryService.AddCategory(newData);
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
        data: { message: 'Category has been deleted' },
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
