import { Application } from "express";
import walk from "@functions/internal/walk";
import console from "@functions/internal/console";

export default async (app: Application) => {
    console.info("Loading middlewares...");

    let total: number = 0;    

    for (const file of walk("./src/middlewares")) {
        if (!file.endsWith(".ts")) continue;

        import(`../${file}`).then((module) => module.default).then((middleware) => app.use(middleware));

        total++;
    }

    console.success(`Loaded ${total} middlewares.`);
}