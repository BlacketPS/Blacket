import("dotenv/config");
import config from "./config.json";
import { Elysia } from "elysia";
import { Sequelize } from "sequelize";
import walker from "folder-walker";

global.config = config;
global.database = await new Sequelize(process.env.DATABASE_NAME ? process.env.DATABASE_NAME : "blacket", process.env.DATABASE_USER ? process.env.DATABASE_USER : "root", process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "", {
    host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : "localhost",
    dialect: "mysql",
    logging: config.verbose ? console.log : false
});

const endpoints = await walker("./endpoints");
endpoints.on("data", (data) => data.basename.endsWith(".ts") && import(`./${data.filepath}`).then((endpoint) => typeof endpoint.default === "function" && endpoint.default()));