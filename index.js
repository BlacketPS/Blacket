import("dotenv/config");
global.config = (await import("./config.js")).default;  
import { Elysia } from "elysia";
import sequelize from "sequelize";
import walker from "folder-walker";

global.database = await new sequelize(process.env.DATABASE_NAME ? process.env.DATABASE_NAME : "blacket", process.env.DATABASE_USER ? process.env.DATABASE_USER : "root", process.env.DATABASE_PASSWORD ? process.env.DATABASE_PASSWORD : "", {
    host: process.env.DATABASE_HOST ? process.env.DATABASE_HOST : "localhost",
    dialect: "mysql",
    logging: config.verbose ? console.log : false
});

const endpoints = await walker("./endpoints");
endpoints.on("data", (data) => data.basename.endsWith(".js") && import(data.path)());