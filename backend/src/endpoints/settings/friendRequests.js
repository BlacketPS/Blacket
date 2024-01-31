export default {
    method: "patch",
    options: {
        authRequired: true
    },
    body: {
        value: {
            type: "string",
            required: true,
            match: /^(on|mutual|off)$/
        }
    },
    endpoint: async (req, res) => {
        const { value } = req.body;

        await global.database.models.UserSetting.update({ friendRequests: value }, { where: { user: req.session.user } })
            .then(() => res.status(204).json())
            .catch(() => res.status(500).json({ message: "Something went wrong." }));
    }
}