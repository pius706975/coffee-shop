const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
    const { Model } = sequelize.Sequelize;
    class User extends Model {
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: 'role',
                as: 'roleData',
            });
        }
    }
    User.init(
        {
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            role: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                references: {
                    model: 'Role',
                    key: 'id',
                },
            },
            otp_code: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            otp_expiration: {
                type: DataTypes.DATE,
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        },
        {
            hooks: {
                beforeCreate: (user) => {
                    user.password = bcrypt.hashSync(user.password, 10);
                },
                // beforeUpdate: (user) => {
                //     user.password = bcrypt.hashSync(user.password, 10);
                // },
            },
            sequelize,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            timestamp: true,
        }
    );
    return User;
};
