export default {
    method: "get",
    options: {
        authRequired: true
    },
    endpoint: async (req, res) => {
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

        res.status(200).send({ tokens, experience });
    }
}
