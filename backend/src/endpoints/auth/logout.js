export default {
    method: "delete",
    options: {
        authentication: true
    },
    endpoint: async (req, res) => {
        const status = await global.database.models.Session.destroy({ where: { id: req.session.id } }).catch(undefined);

        if (!status) return res.status(500).json({ message: "Something went wrong." });
        else res.status(204).json();
    }
}