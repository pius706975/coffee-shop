const { promisify } = require('util');
const { User, Category, Product } = require('../../db/models');
const { NotFoundError, BadRequestError } = require('../../utils/api.errors');
const cloudinary = require('../../middlewares/upload/cloudinary');
const { Op} = require('sequelize');
const { verifyJWT } = require('../user/auth/jwt.service');


const ProductService = {};

ProductService.AddProduct = async (accessToken, requestBody) => {
    const decodedToken = await verifyJWT({ token: accessToken });
    const payload = { userId: decodedToken.userId };
    const user = await await User.findByPk(payload.userId);
    
    if (!user) throw new NotFoundError('User not found');

    const { name, description, price, category_id } = requestBody;
    const newProduct = await Product.create({
        name,
        description,
        price,
        category_id,
        image: process.env.DEFAULT_PRODUCT_PICTURE,
    }); /* .catch(error => {
        throw new Error(error.message); 
    }); */
    return newProduct;
};

ProductService.UpdateProduct = async (accessToken, productID, newData) => {
    const decodedToken = await verifyJWT({ token: accessToken });
    const payload = { userId: decodedToken.userId };
    const user = await await User.findByPk(payload.userId);
    
    if (!user) throw new NotFoundError('User not found');

    const data = await ProductService.GetProductByID(productID);
    const updatedData = await data.update(newData);

    return updatedData;
};

// TODO: fix the upload image function
ProductService.UpdateProductPicture = async (productID, file) => {
    const data = await ProductService.GetProductByID(productID);
    const uploadAsync = promisify(cloudinary.uploader.upload);

    try {
        const uploadedImage = await uploadAsync(file.path, {
            folder: 'coffeemood/product',
            width: 700,
            height: 700,
            crop: 'limit',
        });

        data.image = uploadedImage.secure_url;

        await data.save();

        return data;
    } catch (error) {
        throw new BadRequestError('Failed to upload image', error.message);
    }
};

ProductService.DeleteProduct = async (accessToken, productID) => {
    const decodedToken = await verifyJWT({ token: accessToken });
    const payload = { userId: decodedToken.userId };
    const user = await await User.findByPk(payload.userId);
    
    if (!user) throw new NotFoundError('User not found');
    
    const data = await ProductService.GetProductByID(productID);
    data.is_deleted = true;
    await data.save();

    return data;
};

ProductService.GetAllProducts = async () => {
    const product = await Product.findAll({
        where: {
            is_deleted: false,
        },
        include: [
            {
                model: Category,
                as: 'categoryData',
            },
        ],
    });
    if (product <= 0 || product.is_deleted === true)
        throw new NotFoundError(`Product doesn't exist`);

    return product;
};

ProductService.GetProductByID = async (productID) => {
    const result = await Product.findOne({
        where: {
            id: productID,
            is_deleted: false,
        },
        include: [
            {
                model: Category,
                as: 'categoryData',
            },
        ],
    });

    if (result <= 0 || result.is_deleted === true)
        throw new NotFoundError('No product found');

    return result;
};

ProductService.SearchProductByCategory = async (cateegoryName) => {
    const result = await Product.findAll({
        where: {
            is_deleted: false,
        },
        include: [{
                model: Category,
                as: 'categoryData',
                where: {
                    name: {
                        [Op.iLike]: `%${cateegoryName}%`
                    }
                },
                required: true
            }],
    });

    if (!result || result <= 0 || result.is_deleted === true)
        throw new NotFoundError('No product found');

    return result;
};

module.exports = ProductService;
