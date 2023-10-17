import fs from "fs";
import path from "path";

export default global.walk = function* walk(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    for (const file of files) file.isDirectory() ? yield* walk(path.join(dir, file.name)) : yield path.join(dir, file.name);
}