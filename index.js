await import("dotenv/config");
import { fileURLToPath } from "url";
import path from "path";
import express from "express";

const app = express();

await Promise.all([
    (await import("./handlers/configuration.js")).default(),
    (await import("./handlers/sessions.js")).default(app),
    (await import("./handlers/database.js")).default(),
    (await import("./handlers/middlewares.js")).default(app),
    (await import("./handlers/endpoints.js")).default(app)
]);

app.get("/*", (req, res, next) => req.path.startsWith("/api") ? next() : res.sendFile(path.dirname(fileURLToPath(import.meta.url)) + "/public/index.html"));

app.listen(global.config.port, () => console.log(`Listening on port ${global.config.port}`));