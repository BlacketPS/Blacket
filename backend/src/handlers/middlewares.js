import walk from "#functions/internal/walk.js";
import console from "#functions/internal/console.js";

export default async (app) => {
    console.info("Loading middlewares...");

    const middlewares = [];

    let total = 0;

    for (const file of walk("./middlewares")) {
        if (!file.endsWith(".js")) continue;

        middlewares.push((await import(`../${file}`)).default);
        middlewares[total].priority = middlewares[total].priority || 0;
        middlewares[total].path = file;

        total++;
    }

    middlewares.sort((a, b) => b.priority - a.priority);
    
    for (const middleware of middlewares) {
        app.use(middleware.middleware);
        
        if (middleware.priority > 0) console.debug(`Registered middleware ./${middleware.path} with priority ${middleware.priority}`);
        else console.debug(`Registered middleware ./${middleware.path} with no priority`);
    }

    console.success(`Loaded ${total} middleware(s).`);
}