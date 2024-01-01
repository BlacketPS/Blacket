import { connect } from "mongoose";
import console from "#functions/internal/console.js";
import walk from "#functions/internal/walk.js";

export default async () => await connect(`mongodb://localhost:27017/${process.env.SERVER_DATABASE}`).then(() => {
    console.success("Connected to MongoDB database.");

    let total = 0;

    for (const file of walk("./models")) {
        if (!file.endsWith(".js")) continue;

        import(`../${file}`).then((module) => module.default);

        total++;

        console.debug(`Registered model ./${file}`);
    }

    console.success(`Loaded ${total} model(s).`);
}).catch((error) => {
    console.error(`Failed to connect to MongoDB database. ${error}`);
    process.exit(1);
});