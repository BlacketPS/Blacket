export default {
    priority: 98,
    middleware: async (req, _, next) => {
        /*if (!req.headers.authorization) return next();

        let token = Buffer.from(req.headers.authorization, "base64").toString("utf8");
        if (typeof token !== "string") return next();
        
        try {
            token = JSON.parse(token);
        } catch {
            return next();
        }

        if (typeof token.id !== "string" || typeof token.user !== "string" || typeof token.date !== "string") return next();

        if (!Types.ObjectId.isValid(token.id)) return next();
        if (!Types.ObjectId.isValid(token.user)) return next();
        if (!isNaN(new Date(token.date))) token.date = new Date(token.date);
        else return next();
        
        const session = await Session.findOne({ _id: token.id, user: token.user, date: token.date });
        if (!session) return next();

        req.session = {
            id: session._id,
            user: session.user,
            date: session.date
        }
*/
        next();
    }
}