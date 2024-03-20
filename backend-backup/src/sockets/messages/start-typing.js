import getUser from "#functions/users/getUser";

export default {
    event: async (ws) => {
        const user = await getUser(ws.user.id, []).catch(() => null);
        if (!user) return ws.respond(true, { message: "user does not exist" });

        await global.ws.sendToAll("messages-typing-started", false, {
            user: {
                id: user.id,
                username: user.username,
                avatar: user.avatar,
                color: user.color,
                font: user.font
            }
        });
    }
}