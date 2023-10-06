export default async (app) => {
    const endpoints = {};

    for (const file of walk("./endpoints")) {
        if (!file.endsWith(".js")) continue;

        const endpoint = (await import(`../${file}`)).default;
        const path = `/${file.replace("endpoints", "api").slice(0, -3)}`;

        endpoints[path] = {
            ...endpoint,
            schema: endpoint.schema && Object.fromEntries(Object.entries(endpoint.schema).map(([key, value]) => [key, { ...value, match: value.match?.toString() }]))
        }

        app[endpoint.method.toLowerCase()](path, async (req, res) => {
            if (endpoint.disabled) return res.status(501).json("This endpoint is currently disabled.");
            if (endpoint?.requirements?.authorization && !req.session.user) return res.status(401).json("Unauthorized.");

            if (endpoint.schema) for (const [key, value] of Object.entries(endpoint.schema)) {
                if (value.required && !req.body[key] && req.body[key] !== null) return res.status(400).json(`"${key}" missing in request body.`);
                if (value.type && typeof req.body[key] != value.type) return res.status(400).json(`"${key}" must be typeof ${value.type}.`);
                if (value.match && !value.match.test(req.body[key])) return res.status(400).json(`"${key}" must match ${value.match}.`);
            }

            endpoint.handler(req, res);
        });
    }

    app.get("/api", async (_, res) => res.json({ endpoints }));
}