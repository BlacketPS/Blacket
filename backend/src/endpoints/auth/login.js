import bcrypt from "bcrypt";

export default {
    method: "post",
    body: {
        username: {
            type: "string",
            required: true,
            match: /^[a-zA-Z0-9_-]+$/
        },
        password: {
            type: "string",
            required: true,
            match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
        }
    },
    endpoint: async (req, res) => {
        if (req.session) return res.status(403).json({ message: "You are already logged in." });

        const { username, password } = req.body;

        if (username.toLowerCase() === process.env.VITE_INFORMATION_NAME.toLowerCase()) return res.status(400).json({ message: "That username is not allowed." });

        const user = await global.database.models.User.findOne({ where: { username }, attributes: ["id", "password"] });
        if (!user) return res.status(400).json({
            message: "The username you entered doesn't belong to an account. Please check your username and try again."
        });

        if (!await bcrypt.compare(password, user.password)) return res.status(400).json({
            message: "Your password was incorrect. Please double-check your password."
        });

        const ban = await global.database.models.UserBan.findOne({
            where: { user: user.id }, include: [{ model: global.database.models.UserPunishment, as: "punishmentData", }]
        });
        if (ban && ban.punishmentData.expiresAt > new Date()) return res.status(403).json({
            message: `You are currently banned for ${ban.punishmentData.reason}. Your ban will expire <t:${Math.floor(ban.punishmentData.expiresAt.getTime() / 1000)}:R>. If you believe this is a mistake, please contact a staff member.`
        });
        else if (ban && ban.punishmentData.expiresAt < new Date()) await ban.destroy();

        const session = await global.database.models.Session.upsert({ user: user.id }).then(session => session[0]);
        if (!session) return res.status(500).json({ message: "Something went wrong." });

        res.status(200).json({ token: Buffer.from(JSON.stringify(session)).toString("base64") });
    }
}