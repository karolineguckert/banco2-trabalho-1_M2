import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const MYSQL_IP= process.env.DATABASE_IP;
const MYSQL_LOGIN = process.env.DATABASE_USER;
const MYSQL_PASSWORD= process.env.DATABASE_PASSWORD;
const DATABASE = process.env.DATABASE_NAME;

const sequelize = new Sequelize(DATABASE, MYSQL_LOGIN, MYSQL_PASSWORD, {
    host: MYSQL_IP,
    dialect: 'mysql'
});

export default sequelize;