import express, { Application } from "express";
import path from "path";
import { fileURLToPath } from "url";
import console from "@functions/internal/console";

export default (app: Application) => {
    if (!["static", "proxy", "development"].includes(process.env.SERVER_FRONTEND_TYPE as string)) {
        console.error(`Frontend configuration must be type of "static", "proxy" or "development".`);
        process.exit(1);
    }

    if (process.env.SERVER_FRONTEND_TYPE === "static") {
        console.notice("You are using the static frontend configuration. This configuration is not recommended for production use in large scale. You should be using the \"proxy\" configuration instead for production use. Check the Blacket documentation if you need help.");

        app.use(express.static(path.dirname(fileURLToPath(import.meta.url)) + "/../../public"));

        app.get("/*", (req, res, next) => {
            if (req.path.startsWith("/api")) return next();
            if (/\.[^/]+$/.test(req.path)) return next();
            res.sendFile(path.resolve("./public/index.html"));
        });
    } else if (process.env.SERVER_FRONTEND_TYPE === "development") {
        console.notice("You are using the development frontend configuration. This configuration should not be used for production use. You should be using the \"proxy\" configuration instead for production use. Check the Blacket documentation if you need help.");
        console.notice("Please start your frontend development server and proxy it to this server.");
    }
}