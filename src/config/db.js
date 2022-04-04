import dotenv from 'dotenv';
dotenv.config();
const dbConfig = {
    development: {
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_DATABASE || 'node-express-mocha-chai-dev',
        dialect: process.env.DB_DIALECT || 'postgres',
        host: process.env.DB_HOST || '127.0.0.1',
        port: process.env.DB_PORT || '5432',
        logging: (...msg) => console.log(msg),
    },
    test: {
        dialect: process.env.DB_DIALECT || 'postgres',
        username: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_DATABASE || 'node-express-mocha-chai-test',
        host: process.env.DB_HOST || 'postgres',
        port: process.env.DB_PORT || '5432',
        logging: (...msg) => console.log(msg),
    },
    production: {
        dialect: process.env.DB_DIALECT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        logging: false,
    },
};
export default dbConfig;
