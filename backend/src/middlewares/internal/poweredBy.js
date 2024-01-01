export default {
    priority: 997,
    middleware: (_, res, next) => {
        res.setHeader("X-Powered-By", "Blacket");
        next();
    }
}