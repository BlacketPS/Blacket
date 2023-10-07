process.start = Date.now();
await import("dotenv/config");
import express from "express";

const app = express();

await Promise.all([
    (await import("./handlers/configuration.js")).default(),
    (await import("./handlers/functions.js")).default(),
    (await import("./handlers/database.js")).default(),
    (await import("./handlers/middlewares.js")).default(app),
    (await import("./handlers/endpoints.js")).default(app),
    (await import("./handlers/frontend.js")).default(app)
]);

app.listen(config.port, () => {
    console.success(`A Blacket server instance has been successfully started on port ${config.port}.`);
    if (config.verbose) {
        console.debug("Verbose mode is enabled.");
        console.debug(`Startup time: ${Date.now() - process.start}ms`);
        console.debug(`Process ID: ${process.pid}`);
    }
});