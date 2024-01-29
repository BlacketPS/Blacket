import speakEasy from "speakeasy";
import qrcode from "qrcode";

export default {
    method: "patch",
    options: {
        authRequired: true
    },
    middlewares: {
        user: ["settings"]
    },
    endpoint: async (req, res) => {
        if (req.user.settings.otpEnabled) return res.status(400).json({ message: "You already have OTP enabled." });
        if (req.user.settings.otpSecret) return res.status(200).json({
            image: await qrcode.toDataURL(speakEasy.otpauthURL({ secret: req.user.settings.otpSecret, label: req.user.username, issuer: process.env.VITE_INFORMATION_NAME }))
        });

        const secret = speakEasy.generateSecret({ name: process.env.VITE_INFORMATION_NAME });

        await global.database.models.UserSetting.update({ otpSecret: secret.base32 }, { where: { user: req.session.user } })
            .then(async () => res.status(200).json({
                image: await qrcode.toDataURL(speakEasy.otpauthURL({ secret: secret.base32, label: req.user.username, issuer: process.env.VITE_INFORMATION_NAME }))
            }))
            .catch(() => res.status(500).json({ message: "Something went wrong." }));
    }
}