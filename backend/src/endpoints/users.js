import getUser from "#functions/users/getUser";

export default {
    path: "/users/:user",
    method: "get",
    options: {
        authRequired: true
    },
    endpoint: async (req, res) => {
        const { user } = req.params;

        const userData = await getUser(user.toLowerCase() === "me" ? req.session.user : user, ["badges", "settings", "statistics", "blooksNoSold"]).catch(() => null);
        if (!userData) return res.status(400).json({ message: "The username you entered doesn't belong to an account." });

        if (userData.blooks) {
            const userBlooks = {};

            for (const blook of userData.blooks) {
                if (!userBlooks[blook.blook]) userBlooks[blook.blook] = 1;
                else userBlooks[blook.blook]++;
            }

            userData.blooks = userBlooks;
        } else userData.blooks = {};
        userData.badges = userData.badges.map(badge => badge.badge);

        if (req.session.user !== userData.id) {
            delete userData.permissions;
            delete userData.settings;
        }

        delete userData.ipAddress;
        delete userData.password;
        if (userData.settings) userData.settings.otpSecret = userData.settings.otpSecret ? true : false;

        res.status(200).json({ user: userData });
    }
}
