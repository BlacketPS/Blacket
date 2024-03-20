import decodeSession from "#functions/sessions/decodeSession";

export default {
    priority: 98,
    middleware: async (req, _, next) => {
        if (!req.headers.authorization) return next();

        const token = await decodeSession(req.headers.authorization).catch(() => null);
        if (!token) return next();

        const session = await global.redis.GET(`blacket-session:${token.user}`).then(session => JSON.parse(session)).catch(() => null);
        if (!session) return next();

        if (session.id !== token.id || session.user !== token.user || session.createdAt !== token.createdAt) return next();

        req.session = session;

        next();
    }
}
