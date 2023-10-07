import fs from "fs";

export default () => global.config = JSON.parse(fs.readFileSync("./config.json", "utf8"));
