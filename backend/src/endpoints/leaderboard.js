export default {
    method: "get",
    options: {
        authRequired: true
    },
    endpoint: async (req, res) => {
        const leaderboard = JSON.parse(await global.redis.GET("blacket-leaderboard"));
        if (leaderboard) return res.status(200).send({ leaderboard });
        else {
            const tokens = await global.database.models.User.findAll({
                order: [["tokens", "DESC"]],
                attributes: ["id", "username", "title", "avatar", "color", "tokens"],
                limit: 10
            });

            const experience = await global.database.models.User.findAll({
                order: [["experience", "DESC"]],
                attributes: ["id", "username", "title", "avatar", "color", "experience"],
                limit: 10
            });

            await global.redis.SETEX("blacket-leaderboard", 300, JSON.stringify({ tokens, experience }));
            res.status(200).send({ leaderboard: { tokens, experience } });
        }
    }
}
