export default {
    method: "POST",
    schema: {
        username: {
            required: true,
            type: "string",
            match: /^[a-z0-9_-]+$/
        },
        password: {
            required: true,
            type: "string",
            match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        },
        accepted: {
            required: true,
            type: "boolean"
        }
    },
    handler: (req, res) => {
        const { username, password, accepted } = req.body;

        if (req.session.user) return res.status(400).json("Unable to register an account while authorized.");
    }
}