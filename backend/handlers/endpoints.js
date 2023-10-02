export default async (app) => {
    for (const file of walk("./endpoints")) {
        if (!file.endsWith(".js")) continue;

        const endpoint = (await import(`../${file}`)).default;

        app[endpoint.method](`/${file.replace("endpoints", "api").slice(0, -3)}`, async (req, res) => {
            if (endpoint.disabled) return res.status(501).json({ error: "This endpoint is currently disabled." });
            // if (endpoint.requirements && endpoint.requirements.authorization && !req.session.user) return res.status(401).json({ error: "Unauthorized." });
            
            endpoint.handler(req, res);
        });
    }

    app.get("/api", async (_, res) => res.json({ endpoints: app._router.stack.filter(r => r.route && !["/*", "/api"].includes(r.route.path)).map(r => r.route.path) }));
}