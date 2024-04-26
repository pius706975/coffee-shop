module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class Product extends Model {
        static associate(models) {
            Product.belongsTo(models.Category, {
                foreignKey: 'category_id',
                as: 'categoryData',
            });
        }
    }
    Product.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.TEXT,
            },
            price: {
                type: DataTypes.DECIMAL,
            },
            category_id: {
                type: DataTypes.UUID,
                references: {
                    model: 'Categories',
                    key: 'id',
                },
            },
            image: {
                type: DataTypes.STRING,
            },
            sold: {
                type: DataTypes.BIGINT,
            },
            is_deleted: {
                type: DataTypes.BOOLEAN,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },

        {
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamps: true,
        }
    );

    return Product;
};
