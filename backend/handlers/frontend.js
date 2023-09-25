import path from "path";

export default (app) => app.get("/*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    if (/\.[^/]+$/.test(req.path)) return next();
    res.sendFile(path.resolve("public/index.html"))
});