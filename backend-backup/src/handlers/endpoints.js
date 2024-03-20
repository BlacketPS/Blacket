import walk from "#functions/internal/walk";
import console from "#functions/internal/console";
import getUser from "#functions/users/getUser";

export default async (app) => {
    console.info("Loading endpoints...");

    let total = 0;

    for (const file of walk("./endpoints")) {
        if (!file.endsWith(".js")) continue;

        const endpoint = (await import(`../${file}`)).default;
        const path = endpoint.path ? `/api${endpoint.path}` : `/api${file.replace("endpoints", "").slice(0, -3)}`;

        total++;

        if (app[endpoint.method]) app[endpoint.method](path, async (req, res) => {
            if (!endpoint.endpoint) return res.status(501).json({ message: "This endpoint has not been implemented yet." });

            if (endpoint.options) {
                if (endpoint.options.disabled) return res.status(501).json({ message: "This endpoint has been disabled." });
                if (endpoint.options.authRequired && !req.session) return res.status(401).json({ message: "unauthorized" });
                // TODO: permissions
            }

            // TODO: ratelimits / cooldowns

            if (endpoint.middlewares) {
                if (endpoint.middlewares.user && !Array.isArray(endpoint.middlewares.user)) return res.status(500).json({ message: "user middleware must be an array" });

                req.user = await getUser(req.session.user, endpoint.middlewares.user);
            }

            for (const key in endpoint.body) {
                if (endpoint.body[key].required && !req.body[key] && ![false, 0].includes(req.body[key])) return res.status(400).json({ message: `${key} missing in body` });

                if (!endpoint.body[key].required && typeof req.body[key] !== endpoint.body[key].type) continue;
                if (!endpoint.body[key].required && endpoint.body[key].match && !endpoint.body[key].match.test(req.body[key])) continue;

                if (endpoint.body[key].type && typeof req.body[key] !== endpoint.body[key].type) return res.status(400).json({ message: `${key} must be of typeof ${endpoint.body[key].type}` });
                if (endpoint.body[key].match && !endpoint.body[key].match.test(req.body[key])) return res.status(400).json({ message: `${key} must match ${endpoint.body[key].match}` });
            }

            endpoint.endpoint(req, res);
        });
        else return console.error(`Invalid method "${endpoint.method}" for endpoint ${file}`);

        console.debug(`Registered endpoint ${endpoint.method.toUpperCase()} ${path} from ./${file}`);
    }

    app.get("/api", (_, res) => res.sendStatus(204));

    console.success(`Loaded ${total} endpoint(s).`);
}
