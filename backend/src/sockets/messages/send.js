import getUser from "#functions/users/getUser";
import getMessage from "#functions/messages/getMessage";
import createMessage from "#functions/messages/createMessage";
import profanities from "#constants/profanities";

export default {
    event: async (ws, message) => {
        if (!message.content) return ws.respond(true, { message: "content missing" });
        if (typeof message.content !== "string") return ws.respond(true, { message: "content must be typeof string" });
        if (message.content.replace(/\s/g, "").length === 0) return ws.respond(true, { message: "content cannot be empty" });

        message.content = message.content.trim();

        if (message.content.length > 2000) return ws.respond(true, { message: "content too long" });

        if (message.replyingTo && (typeof message.replyingTo !== "number")) return ws.respond(true, { message: "replyingTo must be typeof number" });

        if (!message.nonce) return ws.respond(true, { message: "nonce missing" });
        if (typeof message.nonce !== "string") return ws.respond(true, { message: "nonce must be typeof string" });
        if (message.nonce.length > 32) return ws.respond(true, { message: "nonce too long" });

        if (profanities.some(word => message.content.toLowerCase().includes(word))) return ws.respond(true, { message: "profanity is not allowed", nonce: message.nonce });

        const user = await getUser(ws.user.id, ["badges"]).catch(() => null);
        if (!user) return ws.respond(true, { message: "user does not exist", nonce: message.nonce });

        if (message.replyingTo) {
            message.replyingTo = await getMessage(message.replyingTo).catch(() => null);

            if (!message.replyingTo || message.replyingTo.deleted) return ws.respond(true, { message: "replyingTo message does not exist", nonce: message.nonce });
        }

        const newMessageData = await createMessage(user.id, 0, message.content, message.replyingTo?.id).catch(() => null);
        if (!newMessageData) return ws.respond(true, { message: "failed to create message", nonce: message.nonce });

        await global.database.models.UserStatistic.increment("messagesSent", { where: { user: user.id } });

        await ws.sendToAll("messages-create", false, {
            message: {
                id: newMessageData.id,
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
                mentions: newMessageData.mentions,
                replyingTo: message.replyingTo ? { ...message.replyingTo, replyingTo: undefined } : null,
                edited: false,
                deleted: false,
                createdAt: new Date()
            }
        });

        await ws.respond(false, { id: newMessageData.id, mentions: newMessageData.mentions, nonce: message.nonce });
    }
}