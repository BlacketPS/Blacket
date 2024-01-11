import hasBlook from "#functions/users/blooks/hasBlook";

export default {
    method: "patch",
    options: {
        authRequired: true
    },
    body: {
        avatar: {
            type: "string",
            required: true,
            match: /^[a-f\d]{8}(-[a-f\d]{4}){4}[a-f\d]{8}$/i
        }
    },
    endpoint: async (req, res) => {
        const blooks = JSON.parse(await global.redis.get("blacket-blooks"));
        const blook = blooks.find(blook => blook.id === req.body.avatar);

        if (!blook) return res.status(400).json({ error: "That blook doesn't exist." });

        if (!await hasBlook(req.session.user, req.body.avatar)) return res.status(400).json({ error: "You don't own this blook." });

        await global.database.models.User.update({ avatar: blook.image }, { where: { id: req.session.user } });

        res.status(204).json();
    }
}