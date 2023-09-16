import { Sequelize } from "sequelize";

export default async () => global.database = await new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    logging: global.config.verbose ? console.log : false,
    dialect: "mysql"
});