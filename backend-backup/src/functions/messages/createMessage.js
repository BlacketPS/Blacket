const createMessage = (author, room, content, replyingTo) => new Promise(async (resolve, reject) => {
    if (!author) return reject({ message: "author missing" });
    if (typeof author !== "string") return reject({ message: "author must be typeof string" });

    if (!room && room !== 0) return reject({ message: "room missing" });
    if (typeof room !== "number") return reject({ message: "room must be typeof number" });

    if (!content) return reject({ message: "content missing" });
    if (typeof content !== "string") return reject({ message: "content must be typeof string" });

    const mentions = Array.from(new Set(content.match(/<@(\d+)>/g))).map(mention => mention.replace(/<|@|>/g, ""));

    if (mentions && mentions.length > 4) return reject({ message: "too many mentions" });

    await new global.database.models.Message({ author, room, content, mentions: mentions || [], replyingTo }).save()
        .then(data => resolve(data))
        .catch(reject);
});

export default createMessage;