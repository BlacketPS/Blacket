export default {
    middleware: (_, res, next) => res.setHeader("X-Powered-By", "Blacket") && next()
}