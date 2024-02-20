import getUser from "#functions/users/getUser";

export default {
    path: "/users/:user",
    method: "get",
    options: {
        authRequired: true
    },
    endpoint: async (req, res) => {
        const { user } = req.params;

        const userData = await getUser(user.toLowerCase() === "me" ? req.session.user : user, ["badges", "settings", "statistics", "blooksNoSoldNoData"]).catch(() => null);
        if (!userData) return res.status(400).json({ message: "The username you entered doesn't belong to an account." });

        userData.blooks = userData.blooks.flatMap(blook => blook.blook).reduce((acc, curr) => { return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc }, {});
        userData.badges = userData.badges.map(badge => badge.badge);

        if (req.session.user !== userData.id) {
            delete userData.permissions;
            delete userData.settings;
        }

        delete userData.ipAddress;
        delete userData.password;
        if (userData.settings) delete userData.settings.otpSecret;

        res.status(200).json({ user: userData });
    }
}