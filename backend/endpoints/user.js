export default {
    method: "get",
    requirements: {
        authorization: true
    },
    handler: async (req, res) => {
        res.json({ error: "Bean broke through your window and took all your money. You're fucking poor now." });
    }
}