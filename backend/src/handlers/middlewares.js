import walk from "#functions/internal/walk.js";
import console from "#functions/internal/console.js";

export default async (app) => {
    console.info("Loading middlewares...");

    let total = 0;

    for (const file of walk("./middlewares")) {
        if (!file.endsWith(".js")) continue;

        import(`../${file}`).then((module) => module.default).then((middleware) => app.use(middleware));

        total++;

        console.debug(`Registered middleware ./${file}`);
    }

    console.success(`Loaded ${total} middleware(s).`);
}