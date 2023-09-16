export default {
    method: "post",
    handler: (req, res) => {
        if (req.session.user) return;
    }
}