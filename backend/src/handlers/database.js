/*import { Sequelize } from "sequelize";
import console from "#functions/internal/console";
import walk from "#functions/internal/walk";

export default async () => {
    console.info("Attempting to connect to MySQL database...");

    global.database = new Sequelize(process.env.SERVER_DATABASE_NAME, process.env.SERVER_DATABASE_USERNAME, process.env.SERVER_DATABASE_PASSWORD, {
        host: process.env.SERVER_DATABASE_HOST,
        port: process.env.SERVER_DATABASE_PORT,
        dialect: "mysql",
        logging: false
    });

    await global.database.authenticate().then(() => console.success("Connected to MySQL database.")).catch((error) => {
        console.error(`Failed to connect to MySQL database. ${error}`);
        process.exit(1);
    });

    let total = 0;

    for (const file of walk("./models")) {
        if (!file.endsWith(".js")) continue;

        global.database.define(model.name, model.attributes, {
            ...model.options,
            timestamps: false
        });

        total++;

        console.debug(`Registered model ./${file}`);
    }

    await global.database.sync({ alter: true });

    console.success(`Loaded ${total} model(s).`);
}*/

import { Sequelize } from "sequelize";
import walk from "#functions/internal/walk";
import console from "#functions/internal/console";

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
        dialect: "mysql",
        host: env.host,
        port: env.port,
        logging: true
    });

    await global.database.authenticate().then(() => {
        if (env.dialect !== "sqlite") console.success(`Authenticated with database ${env.database}.`);
        else console.success("Authenticated with SQLite database.");
    }).catch((error) => {
        if (env.dialect !== "sqlite") console.error(`Failed to authenticate with database ${env.database}. ${error}`);
        else console.error(`Failed to authenticate with SQLite database. ${error}`);
        process.exit(1);
    });

    console.info("Loading database models...");

    let total = 0;

    const models = [];

    for (const file of walk("./models")) {
        if (!file.endsWith(".js")) continue;

        const model = (await import(`../${file}`)).default;

        global.database.define(model.name, model.attributes, { ...model.options, modelName: model.name, timestamps: false });

        models.push(model);

        total++;

        console.debug(`Registered database model ${model.name} from ./${file}`);
    }

    for (const model of models) {
        if (model.relations) for (const relation of model.relations) global.database.models[model.name][relation.type](global.database.models[relation.model], relation.options);
    }

    await global.database.sync({ alter: true });

    console.success(`Loaded ${total} database model(s).`);
}