export default {
    method: "post",
    schema: {
        test: {
            required: true,
            type: "string",
            match: /[a-z]/
        }
    },
    handler: (req, res) => res.status(200).json(req.body.test)
}