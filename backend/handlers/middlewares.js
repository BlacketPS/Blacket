import fs from "fs";
import path from "path";

function* walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) file.isDirectory() ? yield* walk(path.join(dir, file.name)) : yield path.join(dir, file.name);
}

export default async (app) => {
    const middlewares = [];

    for (const file of walk("./middlewares")) {
        if (!file.endsWith(".js")) continue;

        const middleware = import(`../${file}`).then((module) => module.default).then((middleware) => app.use(middleware));

        middlewares.push(middleware);
    }

    await Promise.all(middlewares);
};