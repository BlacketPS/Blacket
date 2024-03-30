import { Op } from "sequelize";

export default {
    method: "post",
    options: {
        authRequired: true
    },
    body: {
        query: {
            type: "string",
            required: true
        }
    },
    endpoint: async (req, res) => {
        const { query } = req.body;
        if (query.length < 3) return res.status(400).json({ message: "Query must be at least 3 characters long." });

        const users = await global.database.models.User.findAll({ where: { username: { [Op.iLike]: `${query}%` } }, limit: 5, attributes: ["id", "username", "color", "avatar"] });
        res.json({ users }).status(200);
    }
}
