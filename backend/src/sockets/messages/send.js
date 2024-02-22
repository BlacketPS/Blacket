import getUser from "#functions/users/getUser";

export default {
    event: async (ws, message) => {
        if (!message.content) return ws.respond(true, { message: "content missing" });
        if (typeof message.content !== "string") return ws.respond(true, { message: "content must be typeof string" });

        if (message.content.length > 2000) return ws.respond(true, { message: "content too long" });

        if (!message.nonce) return ws.respond(true, { message: "nonce missing" });
        if (typeof message.nonce !== "string") return ws.respond(true, { message: "nonce must be typeof string" });
        if (message.nonce.length !== 11) return ws.respond(true, { message: "nonce must be 11 characters long" });

        const user = await getUser(ws.user.id, ["badges"]).catch(() => null);
        if (!user) return ws.respond(true, { message: "user does not exist", nonce: message.nonce });

        await ws.respond(false, { nonce: message.nonce });

        await ws.sendToAll("messages-create", false, {
            message: {
                id: "blooket",
                author: {
                    id: user.id,
                    username: user.username,
                    avatar: user.avatar,
                    title: user.title,
                    color: user.color,
                    font: user.font,
                    badges: user.badges
                },
                content: message.content,
                mentions: [],
                replyingTo: null,
                edited: false,
                deleted: false,
                createdAt: new Date()
            }
        });
    }
}