import Sequelize from 'sequelize';
import colors from 'colors';
import dbConfig from '../config/db';
import { database } from 'pg/lib/defaults';
const environment = process.env.NODE_ENV || 'development';
const config = dbConfig[environment];
export default class ConnDB {
    async connect() {
        try {
            const sequelize = new Sequelize(
                config.database,
                config.username,
                config.password,
                config
            );
            await sequelize.authenticate();
            console.log(
                colors.green(
                    'Database connection has been established successfully'
                )
            );
            return sequelize;
        } catch (err) {
            console.log(colors.red(`Unable to connect to the database ${err}`));
            process.exit(1);
        }
    }
    async close(sequelize) {
        await sequelize.close();
    }
}
