import fs from "fs";

if (process.env.SETUP_COMPLETE != "true") console.error("Your Blacket server has not been configured yet. Please visit https://setup.blacket.org to generate a config file for your server."), process.exit(1);

export default () => global.config = JSON.parse(fs.readFileSync("./config.json", "utf8"));