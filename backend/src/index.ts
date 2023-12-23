const start = Date.now();
await import("dotenv").then(({ config }) => config({ path: "../.env" }));
import express from "express";
import console from "@functions/internal/console";

console.info("Starting Blacket server instance...");

const app = express();

await (await import("./handlers/database.js")).default();
await (await import("./handlers/middlewares.js")).default(app);
await (await import("./handlers/endpoints.js")).default(app);
await (await import("./handlers/frontend.js")).default(app);

app.listen(parseInt(process.env.SERVER_PORT as string), () => {
    console.success(`A Blacket server instance has been successfully started on port ${process.env.SERVER_PORT}.`);
    if (process.env.SERVER_VERBOSE_LOGGING === "true") {
        console.debug("Verbose mode is enabled.");
        console.debug(`Startup time: ${Date.now() - start}ms`);
        console.debug(`Process ID: ${process.pid}`);
    }
});