process.start = Date.now();
await import("dotenv").then(({ config }) => config({ path: "../.env" }));
import express from "express";

const app = express();

await (await import("./handlers/functions.js")).default();
await (await import("./handlers/database.js")).default();
await (await import("./handlers/configuration.js")).default();
await (await import("./handlers/middlewares.js")).default(app);
await (await import("./handlers/endpoints.js")).default(app);
await (await import("./handlers/frontend.js")).default(app);

app.listen(process.env.SERVER_PORT, () => {
    console.success(`A Blacket server instance has been successfully started on port ${process.env.SERVER_PORT}.`);
    if (config.verbose) {
        console.debug("Verbose mode is enabled.");
        console.debug(`Startup time: ${Date.now() - process.start}ms`);
        console.debug(`Process ID: ${process.pid}`);
    }
});