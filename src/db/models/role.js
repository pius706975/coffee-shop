module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class Role extends Model {
        static associate(models) {
            Role.hasMany(models.User, {
                foreignKey: 'role',
                as: 'users',
            });
        }
    }
    Role.init(
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
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
    return Role;
};
