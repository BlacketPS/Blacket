import { Application } from "express";
import walk from "@functions/internal/walk";
import console from "@functions/internal/console";

export default async (app: Application) => {
    console.info("Loading middlewares...");

    let total: number = 0;

    for (const file of walk("./src/middlewares")) {
        if (!file.endsWith(".ts")) continue;

        // slice 4 because we cant have ./src in the import
        import(`../${file.slice(4)}`).then((module) => module.default).then((middleware) => app.use(middleware));

        total++;

        console.debug(`Loaded middleware ./src/${file.slice(4)}`);
    }

    console.success(`Loaded ${total} middleware(s).`);
}