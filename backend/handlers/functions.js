import fs from "fs";
import path from "path";

function* walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) file.isDirectory() ? yield* walk(path.join(dir, file.name)) : yield path.join(dir, file.name);
}

export default async (app) => {
    const functions = [];

    for (const file of walk("./functions")) {
        if (!file.endsWith(".js")) continue;

        const module = import(`../${file}`).then((module) => module.default);

        functions.push(module);
    }

    await Promise.all(functions);
}