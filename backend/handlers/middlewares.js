export default async (app) => {
    const middlewares = [];

    for (const file of walk("./middlewares")) {
        if (!file.endsWith(".js")) continue;

        const middleware = import(`../${file}`).then((module) => module.default).then((middleware) => app.use(middleware));

        middlewares.push(middleware);
    }

    await Promise.all(middlewares);
}