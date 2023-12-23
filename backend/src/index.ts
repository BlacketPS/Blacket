const start = Date.now();
await import("dotenv").then(({ config }) => config({ path: "../.env" }));
import express from "express";
import console from "@functions/internal/console";

console.info("Starting Blacket server instance...");

const app = express();

await (await import("./handlers/database")).default();
await (await import("./handlers/middlewares")).default(app);
await (await import("./handlers/endpoints")).default(app);
await (await import("./handlers/frontend")).default(app);

app.listen(parseInt(process.env.SERVER_PORT as string), () => {
    console.success(`A Blacket server instance has been successfully started on port ${process.env.SERVER_PORT}.`);
    console.debug("Verbose mode is enabled.");
    console.debug(`Startup time: ${Date.now() - start}ms`);
    console.debug(`Process ID: ${process.pid}`);
});