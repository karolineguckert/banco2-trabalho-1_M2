import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const MYSQL_IP= process.env.MYSQL_DATABASE_IP;
const MYSQL_LOGIN = process.env.MYSQL_DATABASE_USER;
const MYSQL_PASSWORD= process.env.MYSQL_DATABASE_PASSWORD;
const MYSQL_DATABASE = process.env.MYSQL_DATABASE_NAME;

const sequelize = new Sequelize(MYSQL_DATABASE, MYSQL_LOGIN, MYSQL_PASSWORD, {
    host: MYSQL_IP,
    dialect: 'mysql'
});

export default sequelize;