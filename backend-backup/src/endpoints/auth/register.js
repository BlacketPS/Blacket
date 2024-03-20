import bcrypt from "bcrypt";
import blockedUsernames from "#constants/blockedUsernames";
import createSession from "#functions/sessions/createSession";

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
            required: true
        },
        accessCode: {
            type: "string",
            required: true
        },
        acceptedTerms: {
            type: "boolean",
            required: true
        }
    },
    endpoint: async (req, res) => {
        if (req.session) return res.status(403).json({ message: "You are already logged in." });

        const { username, password, acceptedTerms } = req.body;

        if (blockedUsernames.map(name => name.toLowerCase()).includes(username.toLowerCase())) return res.status(400).json({ message: "That username is not allowed." });
        if (password === "") return res.status(400).json({ message: "You must enter a password." });

        if (!acceptedTerms) return res.status(400).json({ message: "You must accept the terms of service." });

        if (req.body.accessCode !== process.env.SERVER_ACCESS_CODE) return res.status(400).json({ message: "The access code you entered is incorrect." });

        if (await global.database.models.User.findOne({
            where: { username }
        })) return res.status(400).json({ message: "The username you entered is already in use. Please try another username." });

        const user = await new global.database.models.User({ username, password: await bcrypt.hash(password, 10), ipAddress: req.ip }).save();
        await new global.database.models.UserSetting({ user: user.id }).save();
        await new global.database.models.UserStatistic({ user: user.id }).save();

        await createSession(user.id).then(session => res.status(201).json({
            token: Buffer.from(JSON.stringify(session)).toString("base64")
        })).catch(() => res.status(500).json({
            message: "Something went wrong."
        }));
    }
}
