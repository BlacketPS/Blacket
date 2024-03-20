import getMessages from "#functions/messages/getMessages";

export default {
    path: "/messages/:room",
    method: "get",
    options: {
        authRequired: true
    },
    endpoint: async (req, res) => {
        const { room } = req.params;

        const messages = await getMessages(parseInt(room)).catch(() => null);
        if (!messages) return res.status(400).json({ message: "That room does not exist." });

        res.status(200).json({ messages });
    }
}