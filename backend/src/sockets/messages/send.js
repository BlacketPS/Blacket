import getUser from "#functions/users/getUser";
import createMessage from "#functions/messages/createMessage";

const profanity = [
    "anal",
    "anus",
    "arse",
    "dick",
    "pussy",
    "fuck",
    "bitch",
    "nigger",
    "nigga",
    "tranny",
    "trannie",
    "fag",
    "slut"
];

const replacements = ".-~, +";

export default {
    event: async (ws, message) => {
        if (!message.content) return ws.respond(true, { message: "content missing" });
        if (typeof message.content !== "string") return ws.respond(true, { message: "content must be typeof string" });
        if (message.content.replace(/\s/g, "").length === 0) return ws.respond(true, { message: "content cannot be empty" });

        if (message.content.length > 2000) return ws.respond(true, { message: "content too long" });

        if (!message.nonce) return ws.respond(true, { message: "nonce missing" });
        if (typeof message.nonce !== "string") return ws.respond(true, { message: "nonce must be typeof string" });
        if (message.nonce.length > 32) return ws.respond(true, { message: "nonce too long" });

        const user = await getUser(ws.user.id, ["badges"]).catch(() => null);
        if (!user) return ws.respond(true, { message: "user does not exist", nonce: message.nonce });

        const messageID = await createMessage(user.id, 0, message.content).catch(() => null);
        if (!messageID) return ws.respond(true, { message: "failed to create message", nonce: message.nonce });

        if (message.content.toLowerCase().includes("discord.gg/")) return ws.respond(true, { message: "discord invite links are not allowed", nonce: message.nonce });

        if (profanity.some(word => message.content.toLowerCase().includes(word))) return ws.respond(true, { message: "profanity is not allowed", nonce: message.nonce });
        else if (profanity.some(word => message.content.replace(new RegExp(replacements.split("").join("|"), "g"), "").toLowerCase().includes(word))) return ws.respond(true, { message: "profanity is not allowed", nonce: message.nonce });

        await global.database.models.UserStatistic.increment("messagesSent", { where: { user: user.id } });

        await ws.sendToAll("messages-create", false, {
            message: {
                id: messageID,
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

        await ws.respond(false, { messageID, nonce: message.nonce });
    }
}