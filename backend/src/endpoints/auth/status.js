export default {
    method: "get",
    endpoint: async (req, res) => {
        if (!req.session) return res.status(200).json(0);
        else return res.status(200).json(1);
    }
}