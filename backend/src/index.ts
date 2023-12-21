const start = Date.now();
await import("dotenv").then(({ config }) => config({ path: "../.env" }));
await import("@handlers/functions.js");
import { Elysia } from "elysia";

const app = new Elysia();

await (await import("@handlers/database.js")).default();
await (await import("@handlers/configuration.js")).default();
await (await import("@handlers/middlewares.js")).default(app);
await (await import("@handlers/endpoints.js")).default(app);
await (await import("@handlers/frontend.js")).default(app);

app.listen(process.env.SERVER_PORT || 3000, () => {
    console.log(`A Blacket server instance has been successfully started on port ${process.env.SERVER_PORT}.`);
    if (process.env.SERVER_VERBOSE_LOGGING === "true") {
        console.debug("Verbose mode is enabled.");
        console.debug(`Startup time: ${Date.now() - start}ms`);
        console.debug(`Process ID: ${process.pid}`);
    }
});