const {
    BadRequestError,
    InternalServerError,
    NotFoundError,
} = require('../../utils/api.errors');
const helper = require('../../utils/helper');
const ProductService = require('./product.service');
const uploadFile = require('../../middlewares/upload/cloudinary');

const ProductController = {};

ProductController.AddProduct = async (httpRequest) => {
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) throw new NotFoundError('User not found');

    const accessToken = authorization.split(' ')[1];
    const newProduct = httpRequest.body;
    const result = await ProductService.AddProduct(accessToken, newProduct);
    return helper.generateResponse(result);
};

ProductController.UpdateProduct = async (httpRequest) => {
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) throw new NotFoundError('User not found');

    const accessToken = authorization.split(' ')[1];
    const { id } = httpRequest.params;
    const newData = httpRequest.body;
    const result = await ProductService.UpdateProduct(accessToken, id, newData);
    return {
        statusCode: 200,
        data: {
            message: 'Product is updated successfully',
            result,
        },
    };
};

// TODO: fix the upload image function
ProductController.UpdateProductPicture = async (httpRequest) => {
    const { id } = httpRequest.params;
    const { file } = httpRequest;

    // if (!file) throw new BadRequestError('No image uploaded')

    try {
        const result = await ProductService.UpdateProductPicture(id, file);
        return {
            statusCode: 200,
            data: {
                message: 'Image is uploaded successfully',
                result,
            },
        };
    } catch (error) {
        throw new InternalServerError(
            'Failed to update picture',
            error.message
        );
    }
};

ProductController.DeleteProduct = async (httpRequest) => {
    const authorization = httpRequest.headers.Authorization;
    if (!authorization) throw new NotFoundError('User not found');

    const accessToken = authorization.split(' ')[1];
    const { id } = httpRequest.params;
    const deletedProduct = await ProductService.DeleteProduct(accessToken, id);
    return {
        statusCode: 200,
        data: {
            message: `${deletedProduct.name} data is deleted successfully`,
        },
    };
};

ProductController.GetAllProducts = async () => {
    const result = await ProductService.GetAllProducts();
    return {
        statusCode: 200,
        data: result,
    };
};

ProductController.GetProductByID = async (httpRequest) => {
    const { id } = httpRequest.params;
    const result = await ProductService.GetProductByID(id);
    return {
        statusCode: 200,
        data: result,
    };
};

ProductController.SearchProductByCategory = async (httpRequest)=>{
    const {category} = httpRequest.query
    if (!category) throw new BadRequestError('Category name is required')

    const result = await ProductService.SearchProductByCategory(category)
    return {
        statusCode: 200,
        data: result
    }
}

module.exports = ProductController;
