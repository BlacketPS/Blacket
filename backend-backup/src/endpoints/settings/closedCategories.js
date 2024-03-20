export default {
    method: "patch",
    options: {
        authRequired: true
    },
    body: {
        type: {
            type: "boolean",
            required: true
        },
        value: {
            type: "string",
            required: true
        }
    },
    middlewares: {
        user: ["settings"]
    },
    endpoint: async (req, res) => {
        const { type, value } = req.body;

        if (value.length > 128) return res.status(400).json({ message: "category is too long" });

        if (type) {
            if (req.user.settings.categoriesClosed.includes(value)) return res.status(400).json({ message: "category is already closed" });

            req.user.settings.categoriesClosed.push(value);
        } else if (!type) {
            if (!req.user.settings.categoriesClosed.includes(value)) return res.status(400).json({ message: "category is not closed" });

            req.user.settings.categoriesClosed.splice(req.user.settings.categoriesClosed.indexOf(value), 1);
        }

        await global.database.models.UserSetting.update({ categoriesClosed: req.user.settings.categoriesClosed }, { where: { user: req.session.user } })
            .then(() => res.status(204).json())
            .catch(() => res.status(500).json({ message: "Something went wrong." }));
    }
}