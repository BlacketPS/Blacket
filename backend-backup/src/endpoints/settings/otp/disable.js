import speakEasy from "speakeasy";

export default {
    method: "patch",
    options: {
        authRequired: true
    },
    middlewares: {
        user: ["settings"]
    },
    body: {
        code: {
            type: "string",
            required: true,
            match: /^\d{6}$/
        }
    },
    endpoint: async (req, res) => {
        let { code } = req.body;

        code = code.replace(/\s/g, "");

        if (!req.user.settings.otpEnabled) return res.status(400).json({ message: "You don't have OTP enabled." });
        if (!req.user.settings.otpSecret) return res.status(400).json({ message: "You have not generated an OTP secret yet." });

        if (!speakEasy.totp.verify({ secret: req.user.settings.otpSecret, encoding: "base32", token: code })) return res.status(400).json({ message: "The code you entered is invalid." });

        await global.database.models.UserSetting.update({ otpEnabled: false, otpSecret: null }, { where: { user: req.session.user } })
            .then(() => res.status(204).json())
            .catch(() => res.status(500).json({ message: "Something went wrong." }));
    }
}