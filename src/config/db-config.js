import dotenv from 'dotenv';
dotenv.config();
const dbConfig = {
    development: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_DATABASE || 'node-express-mocha-chai-dev',
        dialect: process.env.DB_DIALECT || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432',
        logging: false,
        pool: {
            max: 10,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        force: false,
        alter: true,
    },
    test: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_DATABASE || 'node-express-mocha-chai-test',
        dialect: process.env.DB_DIALECT || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432',
        logging: (...msg) => console.log(msg),
        pool: {
            max: 10,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        force: false,
        alter: true,
    },
    production: {
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        force: false,
        alter: true,
    },
};
export default dbConfig;
