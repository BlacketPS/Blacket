export default {
    method: "patch",
    options: {
        authRequired: true
    },
    body: {
        value: {
            type: "boolean",
            required: true
        }
    },
    endpoint: async (req, res) => {
        const { value } = req.body;

        await global.database.models.UserSetting.update({ openPacksInstantly: value }, { where: { user: req.session.user } })
            .then(() => res.status(204).json())
            .catch(() => res.status(500).json({ message: "Something went wrong." }));
    }
}