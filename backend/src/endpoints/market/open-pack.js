import removeTokens from "#functions/users/tokens/removeTokens";
import createBlook from "#functions/users/blooks/createBlook";

export default {
    method: "post",
    options: {
        authRequired: true
    },
    body: {
        pack: {
            type: "string",
            required: true
        }
    },
    middlewares: {
        user: []
    },
    endpoint: async (req, res) => {
        const { pack } = req.body;

        const packs = JSON.parse(await global.redis.GET("blacket-packs"));
        if (!packs.find(p => p.id === pack)) return res.status(400).json({ message: "The pack you are trying to open does not exist." });

        const packData = packs.find(p => p.id === pack);

        if (req.user.tokens < packData.price) return res.status(400).json({ message: "You do not have enough tokens to purchase this pack." });

        const blooks = JSON.parse(await global.redis.GET("blacket-blooks")).filter(b => packData.blooks.includes(b.id));

        const blooksChance = blooks.map(blook => blook.chance);
        const totalChance = blooksChance.reduce((acc, chance) => acc + chance, 0);

        let randomNumber = Math.random() * totalChance;

        const unlockedBlook = blooks[blooksChance.findIndex(chance => randomNumber -= chance < 0)].id;

        await removeTokens(req.user.id, packData.price);
        await global.database.models.UserStatistic.increment("packsOpened", { where: { user: req.user.id } });
        await createBlook(req.user.id, unlockedBlook, req.user.id, "pack open");

        res.status(200).json({ unlockedBlook });
    }
}