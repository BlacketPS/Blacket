import { fileURLToPath } from "url";
import path from "path";

export default (app) => app.get("/*", (req, res, next) => req.path.startsWith("/api") ? next() : res.sendFile(path.dirname(fileURLToPath(import.meta.url)) + "/../public/index.html"));