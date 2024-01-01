import User from "#models/User";
import UserSetting from "#models/UserSetting";
import UserStatistic from "#models/UserStatistic";
import Session from "#models/Session";

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
        },
        acceptedTerms: {
            type: "boolean",
            required: true
        }
    },
    endpoint: async (req, res) => {
        if (req.session) return res.status(403).json({ message: "You are already logged in." });

        const { username, password, acceptedTerms } = req.body;

        if (!acceptedTerms) return res.status(400).json({ message: "You must accept the terms of service." });

        if (await User.exists({ username })) return res.status(400).json({ message: "This username is already taken." });

        const user = await new User({ username, password: await bcrypt.hash(password, 10), ipAddress: req.ip }).save();
        await new UserSetting({ user: user._id }).save();
        await new UserStatistic({ user: user._id }).save();

        const session = await new Session({ user: user._id }).save();

        res.status(200).json({ token: Buffer.from(JSON.stringify(session)).toString("base64") });
    }
}