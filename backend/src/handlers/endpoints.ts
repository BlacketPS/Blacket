import { Application, Request, Response } from "express";
import walk from "@functions/internal/walk";
import console from "@functions/internal/console";

export default async (app: Application) => {
    console.info("Loading endpoints...");

    let total: number = 0;

    for (const file of walk("./src/endpoints")) {
        if (!file.endsWith(".ts")) continue;

        // slice 4 off the file because we cant have ./src in the import
        const endpoint = (await import(`../${file.slice(4)}`)).default;
        const path = `/${file.slice(4).replace("endpoints", "api").slice(0, -3)}`

        total++;

        // this line basically just checks if the method is valid its messy but it works
        if (typeof (app[endpoint.method as keyof typeof app]) === 'function') (app[endpoint.method as keyof typeof app] as any)(path, (req: Request, res: Response) => {
            console.log("test");

            endpoint.handler(req, res);
        });
        else return console.error(`Invalid method "${endpoint.method}" for endpoint ${file}`);

        console.debug(`Created endpoint ${endpoint.method.toUpperCase()} ${path} from ./src/${file.slice(4)}`);
    }

    app.get("/api", (_, res) => res.status(200).json("OK"));

    console.success(`Loaded ${total} endpoint(s).`);
}