const { Category } = require('../../../db/models');
const { NotFoundError } = require('../../../utils/api.errors');

const CategoryService = {};

CategoryService.AddCategory = async (requestBody) => {
    const { name } = requestBody;
    const newData = await Category.create({
        name,
    });

    return newData;
};

CategoryService.UpdateCategory = async (categoryID, newData) => {
    const data = await CategoryService.GetByID(categoryID);
    const updatedData = await data.update(newData);

    return updatedData;
};

CategoryService.DeleteCategory = async (categoryID) => {
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
