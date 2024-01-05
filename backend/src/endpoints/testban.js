export default {
    method: "get",
    endpoint: async (req, res) => {
        
        const punishment = await new global.database.models.UserPunishment({
            user: "17044206888600342",
            type: "ban",
            reason: "test",
            punishedBy: "17044206888600342",
            expiresAt: new Date(Date.now() + 1000 * 60 * 60)
        }).save();

        const ban = await global.database.models.UserBan.upsert({
            user: "17044206888600342",
            punishment: punishment.id
        });
        
        res.json({
            punishment,
            ban
        })
        
    }
}