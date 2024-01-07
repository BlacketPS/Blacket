export default {
    method: "get",
    endpoint: async (req, res) => {
        
        const punishment = await new global.database.models.UserPunishment({
            user: "17046152096679800",
            type: "ban",
            reason: "test",
            punishedBy: "17046152096679800",
            expiresAt: new Date(Date.now() + 1000 * 60 * 60)
        }).save();

        const ban = await global.database.models.UserBan.upsert({
            user: "17046152096679800",
            punishment: punishment.id
        });
        
        res.json({
            punishment,
            ban
        })
        
    }
}