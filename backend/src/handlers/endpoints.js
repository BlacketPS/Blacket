import User from "#models/User";
import walk from "#functions/internal/walk";
import console from "#functions/internal/console";

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
                if (endpoint.options.authentication && !req.session) return res.status(401).json({ message: "Unauthorized." });
                // TODO: permissions
            }

            // TODO: ratelimits / cooldowns

            for (const key in endpoint.query) {
                if (endpoint.query[key].required && !req.query[key]) return res.status(400).json({ message: `${key} missing in query parameters.` });
                if (endpoint.query[key].type && typeof req.query[key] !== endpoint.query[key].type) return res.status(400).json({ message: `${key} must be of typeof ${endpoint.query[key].type}.` });
                if (endpoint.query[key].match && !endpoint.query[key].match.test(req.query[key])) return res.status(400).json({ message: `${key} must match ${endpoint.query[key].match}.` });
            }

            for (const key in endpoint.body) {
                if (endpoint.body[key].required && !req.body[key]) return res.status(400).json({ message: `${key} missing in body.` });
                if (endpoint.body[key].type && typeof req.body[key] !== endpoint.body[key].type) return res.status(400).json({ message: `${key} must be of typeof ${endpoint.body[key].type}.` });
                if (endpoint.body[key].match && !endpoint.body[key].match.test(req.body[key])) return res.status(400).json({ message: `${key} must match ${endpoint.body[key].match}.` });
            }

            endpoint.endpoint(req, res);
        });
        else return console.error(`Invalid method "${endpoint.method}" for endpoint ${file}`);

        console.debug(`Registered endpoint ${endpoint.method.toUpperCase()} ${path} from ./${file}`);
    }

    app.get("/api", (_, res) => res.status(204).json());

    console.success(`Loaded ${total} endpoint(s).`);
}