import { Sequelize } from "sequelize";

type Dialects = "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql";

export default async () => {
    if (!process.env.DATABASE_DIALECT) {
        console.error("No database dialect was specified in the environment file.")
        process.exit(1);
    }

    if (process.env.DATABASE_DIALECT === "sqlite") global.database = new Sequelize({
        dialect: "sqlite",
        storage: "./database.sqlite",
        logging: false
    });
    else global.database = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT === "null" ? null : process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT,
        logging: false
    });

    await database.authenticate().then(() => console.success("Successfully connected to database.")).catch((error) => console.error(`Failed to connect to database: ${error}`) & process.exit(1));
}