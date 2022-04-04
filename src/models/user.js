import { Model, DataTypes } from 'sequelize';
import sequelize from '../conn/db-conn';
class UserModel extends Model {}
UserModel.init(
    {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'student',
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        indexes: [{ unique: false, fields: ['email'] }],
        sequelize,
        modelName: 'UserModel',
        tableName: 'users',
        underscored: true,
    }
);

export default UserModel;
