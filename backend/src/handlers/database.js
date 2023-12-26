import { Sequelize } from "sequelize";
import walk from "../functions/internal/walk.js";
import console from "../functions/internal/console.js";

const env = {
    dialect: process.env.SERVER_DATABASE_DIALECT,
    host: process.env.SERVER_DATABASE_HOST,
    port: process.env.SERVER_DATABASE_PORT === "null" ? undefined : parseInt(process.env.SERVER_DATABASE_PORT),
    username: process.env.SERVER_DATABASE_USERNAME,
    password: process.env.SERVER_DATABASE_PASSWORD,
    database: process.env.SERVER_DATABASE_NAME
}

export default async () => {
    if (env.dialect !== "sqlite") console.info(`Authenticating to database ${env.database}...`);
    else console.info("Authenticating to SQLite database...");

    global.database = env.dialect === "sqlite" ? new Sequelize({
        dialect: "sqlite",
        storage: "./database.sql",
        logging: false
    }) : new Sequelize(env.database, env.username, env.password, {
        host: env.host,
        port: env.port,
        dialect: env.dialect,
        logging: false
    });

    await global.database.authenticate().then(() => {
        if (env.dialect !== "sqlite") console.success(`Authenticated with database ${env.database}.`);
        else console.success("Authenticated with SQLite database.");
    });

    console.info("Loading database models...");

    let total = 0;

    for (const file of walk("./src/models")) {
        if (!file.endsWith(".js")) continue;

        // slice off ./src from the file because for some reason it breaks everything
        const model = (await import(`../${file.slice(4)}`)).default;

        global.database.define(model.name, model.attributes, {
            ...model.options,
            timestamps: false
        });

        total++;

        console.debug(`Registered database model ${model.name} from ./${file.slice(4)}`);
    }

    await global.database.sync({ alter: true });

    console.success(`Loaded ${total} database model(s).`);
}