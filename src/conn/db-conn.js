import Sequelize from 'sequelize';
import dbConfig from '../config/db-config';
const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment.trim()];
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

export default sequelize;
