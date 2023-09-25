export default {
    method: "get",
    requirements: {
        authorization: false
    },
    handler: async (req, res) => {
        console.log(req.session);
        res.json({
            Nigga: "True"
        })
    }
}