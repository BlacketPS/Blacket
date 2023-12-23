import { Sequelize } from "sequelize";
import console from "@functions/internal/console";

const env = {
    dialect: process.env.SERVER_DATABASE_DIALECT as "mysql" | "postgres" | "sqlite" | "mariadb" | "mssql" | "oracle",
    host: process.env.SERVER_DATABASE_HOST,
    port: process.env.SERVER_DATABASE_PORT === "null" ? undefined : parseInt(process.env.SERVER_DATABASE_PORT as string),
    username: process.env.SERVER_DATABASE_USERNAME,
    password: process.env.SERVER_DATABASE_PASSWORD,
    database: process.env.SERVER_DATABASE_NAME
}

export default async () => {
    if (env.dialect !== "sqlite") console.info(`Authenticating to database ${env.database}...`);
    else console.info("Authenticating to SQLite database...");

    const database = env.dialect === "sqlite" ? new Sequelize({
        dialect: "sqlite",
        storage: "./database.sql",
        logging: false
    }) : new Sequelize(env.database as string, env.username as string, env.password, {
        host: env.host,
        port: env.port,
        dialect: env.dialect,
        logging: false
    });

    await database.authenticate().then(() => {
        if (env.dialect !== "sqlite") console.success(`Authenticated with database ${env.database}.`);
        else console.success("Authenticated with SQLite database.");
    });
}