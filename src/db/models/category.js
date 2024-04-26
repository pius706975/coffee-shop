module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Product, {
                foreignKey: 'category_id',
                as: 'products',
            });
        }
    }
    Category.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            // Timestamps
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        }
    );
    return Category;
};
