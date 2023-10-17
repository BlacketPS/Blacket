import fs from "fs";

if (process.env.SETUP_COMPLETE != "true") console.error("Your Blacket server has not been configured yet. Please run \"npm run setup\" before starting the server.") & process.exit(1);

export default () => global.config = JSON.parse(fs.readFileSync("./config.json", "utf8"));