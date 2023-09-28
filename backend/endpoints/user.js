export default {
    method: "get",
    requirements: {
        authorization: true
    },
    handler: async (req, res) => {
        res.status(200).json({ error: "Bean broke through your window and took all your money. You're fucking poor now." });
    }
}