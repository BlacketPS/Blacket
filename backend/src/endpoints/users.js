import getUser from "#functions/users/getUser";

export default {
    path: "/users/:user",
    method: "get",
    params: {
        user: {
            required: true,
            type: "string",
            match: /^[a-zA-Z0-9_-]+$/
        }
    },
    options: {
        authRequired: true
    },
    endpoint: async (req, res) => {
        const user = await getUser(req.params.user.toLowerCase() === "me" ? req.session.user : req.params.user, ["badges", "settings", "statistics", "blooksNoSold"]).catch(() => res.status(400).json({
            message: "The username you entered doesn't belong to an account."
        }));

        if (user.blooks) {
            const userBlooks = {};

            for (const blook of user.blooks) {
                if (!userBlooks[blook.blook]) userBlooks[blook.blook] = 1;
                else userBlooks[blook.blook]++;
            }

            user.blooks = userBlooks;
        } else user.blooks = {};
        user.badges = user.badges.map(badge => badge.badge);

        if (req.session.user !== user.id) {
            delete user.permissions;
            delete user.settings;
        }

        delete user.ipAddress;
        delete user.password;

        res.status(200).json({ user });
    }
}