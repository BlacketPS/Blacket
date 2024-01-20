export default {
    method: "get",
    options: {
        authRequired: true
    },
    endpoint: async (req, res) => {
        const users = await global.database.models.User.findAll({
            order: [["tokens", "DESC"]],
            attributes: ["id", "username", "title", "avatar", "color", "tokens"],
            limit: 10
        });

        res.status(200).send({ users });
    }
}
