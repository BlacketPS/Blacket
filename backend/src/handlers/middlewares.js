import walk from "../functions/internal/walk.js";
import console from "../functions/internal/console.js";

export default async (app) => {
    console.info("Loading middlewares...");

    let total = 0;

    for (const file of walk("./src/middlewares")) {
        if (!file.endsWith(".js")) continue;

        // slice off ./src from the file because for some reason it breaks everything
        import(`../${file.slice(4)}`).then((module) => module.default).then((middleware) => app.use(middleware));

        total++;

        console.debug(`Registered middleware ./${file.slice(4)}`);
    }

    console.success(`Loaded ${total} middleware(s).`);
}