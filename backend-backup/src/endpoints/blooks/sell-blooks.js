import { Op } from "sequelize";
import hasBlook from "#functions/users/blooks/hasBlook";
import addTokens from "#functions/users/tokens/addTokens";

export default {
    method: "put",
    options: {
        authRequired: true
    },
    body: {
        blook: {
            type: "string",
            required: true
        },
        quantity: {
            type: "number",
            required: true,
        }
    },
    endpoint: async (req, res) => {
        const { blook, quantity } = req.body;

        if (quantity < 1) return res.status(400).json({ message: "You must sell at least one blook." });

        const blooks = JSON.parse(await global.redis.GET("blacket-blooks"));
        if (!blooks.find(b => b.id === blook)) return res.status(400).json({ message: "That blook does not exist." });

        if (!await hasBlook(req.session.user, blook)) return res.status(400).json({ message: "You do not own this blook." });

        const blookData = blooks.find(b => b.id === blook);

        const userBlooks = await global.database.models.UserBlook.findAll({ where: { user: req.session.user, blook, sold: false }, limit: quantity, order: [["createdAt", "DESC"]], attributes: ["id"] });

        const [affectedRows] = await global.database.models.UserBlook.update({ sold: true }, { where: { user: req.session.user, id: { [Op.in]: userBlooks.map(blook => blook.id) } } });
        await addTokens(req.session.user, blookData.price * affectedRows);

        res.sendStatus(204);
    }
}