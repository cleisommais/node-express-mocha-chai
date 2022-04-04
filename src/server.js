import colors from 'colors';
import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import sequelize from './conn/db-conn';
//Database models
import UserModel from '../src/models/user';
//Load env vars
dotenv.config();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
import dbConfig from './config/db-config';
const config = dbConfig[NODE_ENV.trim()];
//Route files
import userRouter from './routes/user';
//App setup
const app = express();
app.use(logger(process.env.ENVIRONMENT || 'tiny'));
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Handle the routers redirect
app.use('/api/v1/users', userRouter);
app.get('/', (req, res) => {
    res.send('Welcome friend');
});
//If the resource is not found send 404 error response
app.use((req, res, next) => {
    const message = 'Unable to find the requested resource!';
    res.status(404).json({
        success: false,
        msg: message,
    });
    next(message);
});
//Starting node server
const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log(
            colors.yellow(
                'Database connection has been established successfully'
            )
        );
        await UserModel.sync({
            alter: config.alter,
            force: config.force,
        });
    } catch (err) {
        process.emit('unhandledRejection', err);
    }
};

//Test connection db
initDB();
const server = app.listen(PORT, () => {
    console.log(colors.blue(`Server running in ${NODE_ENV} on port ${PORT}`));
});

//handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(colors.red(`Error: ${err.message}`));
    server.close(() => {
        console.log(colors.bgRed(`Closing WEB server on port ${PORT}`));
        process.exit(1);
    });
});
export { app, server };
