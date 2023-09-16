import("dotenv/config");
global.config = (await import("./config.json")).default;
import express from "express";
import { Sequelize } from "sequelize";
import fs from "fs";

global.database = await new Sequelize(process.env.DATABASE_NAME ? process.env.DATABASE_NAME : "blacket", process.env.DATABASE_USER ? process.env.DATABASE_USER : "root", process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "", {
    host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : "localhost",
    dialect: "mysql",
    logging: global.config.verbose ? console.log : false
});

const app = express();

await Promise.all([
    (await import(`./handlers/middlewares.ts`)).default(app),
    (await import(`./handlers/endpoints.ts`)).default(app)
]);

app.get("/*", (req, res, next) => req.path.startsWith("/api") ? next() : res.sendFile(__dirname + "/public/index.html"));

app.listen(global.config.port, () => console.log(`Listening on port ${global.config.port}`));