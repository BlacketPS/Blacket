import { connect } from "mongoose";
import console from "#functions/internal/console.js";

export default async () => await connect(`mongodb://localhost:27017/${process.env.SERVER_DATABASE}`).then(() => {
    console.success("Connected to MongoDB database.");
}).catch((error) => {
    console.error(`Failed to connect to MongoDB database. ${error}`);
    process.exit(1);
});