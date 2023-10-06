export default {
    method: "POST",
    schema: {
        test: {
            required: true,
            type: "string",
            match: /[a-z]/
        }
    },
    handler: (req, res) => res.status(200).json(req.body.test)
}