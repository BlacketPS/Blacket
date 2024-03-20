import bcrypt from "bcrypt";
import blockedUsernames from "#constants/blockedUsernames";
import getUser from "#functions/users/getUser";

export default {
    method: "patch",
    options: {
        authRequired: true
    },
    body: {
        newUsername: {
            type: "string",
            required: true,
            match: /^[a-zA-Z0-9_]{3,16}$/
        },
        password: {
            type: "string",
            required: true
        }
    },
    middlewares: {
        user: []
    },
    endpoint: async (req, res) => {
        const { newUsername, password } = req.body;

        if (blockedUsernames.map(name => name.toLowerCase()).includes(newUsername.toLowerCase())) return res.status(400).json({ message: "That username is not allowed." });
        if (password === "") return res.status(400).json({ message: "You must enter a password." });

        if (newUsername.toLowerCase() === req.user.username.toLowerCase()) return res.status(400).json({ message: "You can't change your username to your current username." });

        if (!bcrypt.compareSync(password, req.user.password)) return res.status(400).json({ message: "Your password was incorrect. Please double-check your password." });

        if (await getUser(newUsername).catch(() => null)) return res.status(400).json({ message: "The username you entered is already in use. Please try another username." });

        await global.database.models.User.update({ username: newUsername }, { where: { id: req.session.user } })
            .then(() => res.status(204).json())
            .catch(() => res.status(500).json({ message: "Something went wrong." }));
    }
}