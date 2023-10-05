export default {
    method: "get",
    disabled: true,
    requirements: {
        authorization: true
    },
    schema: {
        test: {
            required: true,
            type: "string"
        }
    },
    handler: (req, res) => {
        res.status(200).json({ test: req.body.test });
    }
}