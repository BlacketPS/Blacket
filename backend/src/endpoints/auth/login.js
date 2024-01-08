import bcrypt from "bcrypt";
import createSession from "#functions/sessions/createSession";
import speakEasy from "speakeasy";

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
        if (username.toLowerCase() === "me") return res.status(400).json({ message: "That username is not allowed." });

        const user = await global.database.models.User.findOne({
            where: { username },
            attributes: ["id", "password"],
            include: [{
                model: global.database.models.UserBan, as: "ban", attributes: ["punishment"], required: false,
                include: [{ model: global.database.models.UserPunishment, as: "punishmentData", attributes: ["reason", "expiresAt"], required: false }]
            }]
        });
        if (!user) return res.status(400).json({
            message: "The username you entered doesn't belong to an account. Please check your username and try again."
        });

        if (user.password && !await bcrypt.compare(password, user.password)) return res.status(400).json({
            message: "Your password was incorrect. Please double-check your password."
        });

        if (user.ban && user.ban.punishmentData.expiresAt > new Date()) return res.status(403).json({
            message: `You are currently banned for ${user.ban.punishmentData.reason}. Your ban will expire <t:${Math.floor(user.ban.punishmentData.expiresAt.getTime() / 1000)}:R>. If you believe this is a mistake, please contact a staff member.`
        });
        else if (user.ban && user.ban.punishmentData.expiresAt < new Date()) await user.ban.destroy();

        createSession(user.id).then(session => res.status(200).json({
            token: Buffer.from(JSON.stringify(session)).toString("base64")
        })).catch(() => res.status(500).json({
            message: "Something went wrong."
        }));
    }
}