import { QueryTypes } from "sequelize";
import fs from "fs";
import path from "path";

function* walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) file.isDirectory() ? yield* walk(path.join(dir, file.name)) : yield path.join(dir, file.name);
}

export default async (app) => {
    for (const file of walk("./endpoints")) {
        if (!file.endsWith(".js")) continue;

        const endpoint = (await import(`../${file}`)).default;

        app[endpoint.method](`/${file.replace("endpoints", "api").slice(0, -3)}`, async (req, res) => {
            if (endpoint.disabled) return res.status(501).json({ error: "This endpoint is currently disabled." });
            // if (endpoint.requirements && endpoint.requirements.authorization && !req.session.user) return res.status(401).json({ error: "Unauthorized." });
            if (endpoint.fetch && endpoint.fetch.user && (req.session && req.session.user)) {
                const user = await global.database.query("SELECT * FROM users WHERE id = ?", { replacements: [req.session.user], type: QueryTypes.SELECT });
                if (user.length) req.user = user[0];
            }

            endpoint.handler(req, res);
        });
    }
}