import express from "express";
import { spawn } from "child_process";
import axios from "axios";
import path from "path";
import { fileURLToPath } from "url";

export default async (app) => {
    if (!["static", "proxy", "development"].includes(config.frontend)) return console.error(`Frontend configuration must be type of "static", "proxy" or "development".`) & process.exit(1);

    if (config.frontend == "static") {
        console.notice("You are using the static frontend configuration. This configuration is not recommended for production use in large scales. You should be using the \"proxy\" configuration instead for production use. Check the Blacket documentation if you need help.");

        app.use(express.static(path.dirname(fileURLToPath(import.meta.url)) + "/../public"));

        app.get("/*", (req, res, next) => {
            if (req.path.startsWith("/api")) return next();
            if (/\.[^/]+$/.test(req.path)) return next();
            res.sendFile(path.resolve("public/index.html"))
        });
    } else if (config.frontend == "development") {
        console.info("Spawning frontend development server...");

        const process = spawn("npm", ["run", "dev"], { cwd: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../frontend") });

        process.stdout.on("data", (data) => {
            console.log(data.toString());

            if (!data.toString().match(/Local:   http:\/\/localhost:\d+/)) return;

            const port = data.toString().match(/Local:   http:\/\/localhost:(\d+)/)[1];

            console.success(`Frontend development server has been successfully spawned on port ${port}.`);

            app.use((req, res, next) => {
                if (req.path.startsWith("/api")) return next();
                axios.get(`http://localhost:${port}`).then((r) => {
                    res.send(r.data);
                }).catch((err) => {
                    console.error(`Failed to proxy request to frontend development server: ${err.message}`);
                    res.sendStatus(500);
                });
            });
        });
    }
}