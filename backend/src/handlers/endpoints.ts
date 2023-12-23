import { Application } from "express";
import walk from "@functions/internal/walk";
import console from "@functions/internal/console";

export default async (app: Application) => {
    console.info("Loading endpoints...");

    let total: number = 0;

    for (const file of walk("./src/endpoints")) {
        if (!file.endsWith(".ts")) continue;

        const endpoint = (await import(`../${file}`)).default;
        const path = `/${file.replace("endpoints", "api").slice(0, -3)}`;

        total++;

        /*app[endpoint.method](path, (req, res) => {
            if (endpoint.disabled) return res.status(501).json("This endpoint is currently disabled.");
            if (endpoint?.requirements?.authorization && !req.session.user) return res.status(401).json("Unauthorized.");

            if (endpoint.schema) for (const [key, value] of Object.entries(endpoint.schema)) {
                if (value.required && !req.body[key] && req.body[key] !== null) return res.status(400).json(`"${key}" missing in request body.`);
                if (value.type && typeof req.body[key] != value.type) return res.status(400).json(`"${key}" must be typeof ${value.type}.`);
                if (value.match && !value.match.test(req.body[key])) return res.status(400).json(`"${key}" must match ${value.match}.`);
            }

            endpoint.handler(req, res);

            console.info(`Loaded endpoint ${file}.`);
        });*/
    }

    app.get("/api", (_, res) => res.status(200).json({ message: "OK", statusCode: 200 }));

    console.success(`Loaded ${total} endpoints.`);
}