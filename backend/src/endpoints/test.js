export default {
    method: "get",
    endpoint: async (req, res) => {
        const username = Math.random().toString(36).substring(7);

        const user = await new global.database.models.User({
            username: username,
            password: "test",
            ipAddress: req.ip
        }).save();

        const session = await new global.database.models.Session({
            user: user.id
        }).save();

        res.send({
            user: user,
            session: session
        });
    }
}