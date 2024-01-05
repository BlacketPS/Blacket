export default {
    priority: 98,
    middleware: async (req, _, next) => {
        if (!req.headers.authorization) return next();

        let token = Buffer.from(req.headers.authorization, "base64").toString("utf8");
        if (typeof token !== "string") return next();

        try {
            token = JSON.parse(token);
        } catch {
            return next();
        }
        if (typeof token.id !== "string" || typeof token.user !== "string" || typeof token.createdAt !== "string") return next();

        if (!isNaN(new Date(token.createdAt))) token.createdAt = new Date(token.createdAt);
        else return next();

        const session = await global.database.models.Session.findOne({
            where: {
                id: token.id,
                user: token.user,
                createdAt: token.createdAt
            },
            include: [{ model: global.database.models.User, as: "userData" }]
        });
        if (!session) return next();

        req.session = {
            id: session.id,
            user: session.userData.id,
            createdAt: session.createdAt
        }

        req.user = session.userData.dataValues;

        next();
    }
}