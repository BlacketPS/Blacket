import walk from "../functions/internal/walk.js";
import console from "../functions/internal/console.js";

export default async (app) => {
    console.info("Loading endpoints...");

    let total = 0;

    for (const file of walk("./src/endpoints")) {
        if (!file.endsWith(".js")) continue;

        // slice off ./src from the file because for some reason it breaks everything
        const endpoint = (await import(`../${file.slice(4)}`)).default;
        const path = `/${file.slice(4).replace("endpoints", "api").slice(0, -3)}`

        total++;

        if (app[endpoint.method]) app[endpoint.method](path, (req, res) => {
            if (!endpoint.handler) return res.status(501).json({ message: "This endpoint has not been implemented yet." });
            if (endpoint.disabled) return res.status(501).json({ message: "This endpoint has been disabled." });

            endpoint.handler(req, res);
        });
        else return console.error(`Invalid method "${endpoint.method}" for endpoint ${file}`);

        console.debug(`Registered endpoint ${endpoint.method.toUpperCase()} ${path} from ./${file.slice(4)}`);
    }

    app.get("/api", (_, res) => res.status(200).json({ message: "OK" }));

    console.success(`Loaded ${total} endpoint(s).`);
}