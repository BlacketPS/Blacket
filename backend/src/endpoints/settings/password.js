import bcrypt from "bcrypt";
import deleteSession from "#functions/sessions/deleteSession";
import createSession from "#functions/sessions/createSession";

export default {
    method: "patch",
    options: {
        authRequired: true
    },
    body: {
        oldPassword: {
            type: "string",
            required: true
        },
        newPassword: {
            type: "string",
            required: true
        }
    },
    middlewares: {
        user: []
    },
    endpoint: async (req, res) => {
        const { oldPassword, newPassword } = req.body;

        if (oldPassword === "" || newPassword === "") return res.status(400).json({ message: "You must enter a password." });

        if (!bcrypt.compareSync(oldPassword, req.user.password)) return res.status(400).json({ message: "Your password was incorrect. Please double-check your password." });

        await deleteSession(req.session.user);

        await global.database.models.User.update({ password: await bcrypt.hash(newPassword, 10) }, { where: { id: req.session.user } })
            .then(async () => res.status(200).json({ token: Buffer.from(JSON.stringify(await createSession(req.session.user))).toString("base64")}))
            .catch(() => res.status(500).json({ message: "Something went wrong." }));
    }
}