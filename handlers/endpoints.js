import fs from "fs";
import path from "path";

function* walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) file.isDirectory() ? yield* walk(path.join(dir, file.name)) : yield path.join(dir, file.name);
}

export default async (app) => {
    for (const file of walk("./endpoints")) {
        if (!file.endsWith(".ts")) continue;

        const endpoint = (await import(`../${file}`)).default;

        app[endpoint.method](`/${file.replace("endpoints", "api").slice(0, -3)}`, endpoint.handler);
    }
}