import("dotenv/config");
import config from "./config.json";
import { Elysia } from "elysia";
import { Sequelize } from "sequelize";
import { cors } from "@elysiajs/cors";

global.config = config;
global.database = await new Sequelize(process.env.DATABASE_NAME ? process.env.DATABASE_NAME : "blacket", process.env.DATABASE_USER ? process.env.DATABASE_USER : "root", process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "", {
    host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : "localhost",
    dialect: "mysql",
    logging: config.verbose ? console.log : false
});

const app = new Elysia();
app.use(cors({ origin: "*" }));

await Promise.all(["endpoints"].map(async (handler) => (await import(`./handlers/${handler}.ts`)).default(app)));

app.listen(config.port, () => console.log(`Listening on port ${config.port}`));