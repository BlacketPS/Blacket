import { QueryTypes } from "sequelize";
import speakEasy from "speakeasy";
import bcrypt from "bcrypt";

export default {
    method: "post",
    handler: async (req, res) => {
        if (req.session.user) return res.status(400).json({ error: "You are already logged in." });
        if (!(req.body.username && req.body.password)) return res.status(400).json({ error: "You must provide a username and password." });
        if (typeof req.body.username !== 'string' || typeof req.body.password !== 'string') return res.status(400).json({ error: "Invalid username or password." });
        if (req.body.username.toLowerCase() == global.config.game.name.toLowerCase()) return res.status(400).json({ error: "This name has been reserved for the system." });
        if (req.body.username.length > 16) return res.status(400).json({ error: "Your username must be less than or 16 characters long." });
        if (req.body.username.match(/[^a-zA-Z0-9_-]/g)) return res.status(400).json({ error: "Your username must only contain letters, numbers, underscores, and dashes." });
        if (req.body.username == 0) return res.status(400).json({ error: "That username is not allowed." });

        const forms = await global.database.query(`SELECT * FROM forms WHERE username = ?`, {
            replacements: [req.body.username],
            type: QueryTypes.SELECT
        });
        const user = await global.database.query(`SELECT * FROM users WHERE username = ? OR id = ? AND id != 0`, {
            replacements: [req.body.username, req.body.username, req.body.username],
            type: QueryTypes.SELECT
        });

        if (forms.length > 0) return res.status(400).json({
            error: `Your account has not been verified yet. Please wait for a ${global.config.game.name} staff member to verify your account. This may take up to 24 hours.`
        });
        if (user.length == 0) return res.status(400).json({ error: "We couldn't find an account under that username" });

        const ban = user[0].ban;

        if (!bcrypt.compareSync(req.body.password, user[0].password)) return res.status(400).json({ error: "Username and password don't match." });
        if (ban.banned)
            if (Date.now() >= ban.time) await global.database.query(`UPDATE users SET ban = ? WHERE id = ?`, {
                replacements: [JSON.stringify({ "time": 0, "staff": "", "banned": false, "reason": "" }), user[0].id],
                type: QueryTypes.UPDATE
            });
            else return res.status(403).json({
                error: `You are currently banned for ${ban.reason}. Your ban will expire <t:${ban.time}:R>. If you believe this is a mistake, please contact a staff member.`
            });

        if (JSON.parse(user[0].otp).enabled) {
            if (!req.body.code) return res.status(202).json({ error: "You must provide a code." });
            if (isNaN(req.body.code)) return res.status(400).json({ error: "Invalid code." });
            if (req.body.code.length !== 6) return res.status(400).json({ error: "Invalid code." });
            if (!speakEasy.totp.verify({
                secret: JSON.parse(user[0].otp).secret,
                encoding: "base32",
                token: req.body.code
            })) return res.status(400).json({ error: "Invalid code." });
        }

        await global.database.query(`UPDATE users SET ip = ? WHERE id = ?`, {
            replacements: [req.ip, user[0].id],
            type: QueryTypes.UPDATE
        });

        req.session.user = user[0].id;
        req.session.password = user[0].password;
        req.session.save();

        res.status(200).json();
    }
}