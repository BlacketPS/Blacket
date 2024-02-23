const getMessages = (room, options) => new Promise(async (resolve, reject) => {
    if (!room && room !== 0) return reject({ message: "room missing" });
    if (typeof room !== "number") return reject({ message: "room must be typeof number" });

    if (!options) options = {};

    if (options.limit && (typeof options.limit !== "number" || options.limit < 1)) return reject({ message: "limit must be typeof number and greater than 0" });
    if (options.offset && (typeof options.offset !== "number" || options.offset < 0)) return reject({ message: "offset must be typeof number and greater than or equal to 0" });
    if (options.author && typeof options.author !== "string") return reject({ message: "author must be typeof string" });
    if (options.includeDeleted && typeof options.includeDeleted !== "boolean") return reject({ message: "includeDeleted must be typeof boolean" });

    const messages = await global.database.models.Message.findAll({
        where: {
            room,
            deleted: options.includeDeleted ? null : false,
            ...(options.author ? { author: options.author } : {})
        },
        order: [["createdAt", "DESC"]],
        limit: options.limit || 100,
        offset: options.offset || 0,
        attributes: { exclude: ["room"] },
        include: [
            {
                model: global.database.models.User, as: "authorData", attributes: ["id", "username", "avatar", "title", "color", "font"],
                include: [{ model: global.database.models.UserBadge, as: "badges", attributes: { exclude: ["user"] } }]
            },
            {
                model: global.database.models.Message, as: "replyingToData", attributes: { exclude: ["room"] }
            }
        ]
    })
        .then(data => data.map(message => {
            const messageData = message.toJSON();

            messageData.author = messageData.authorData;
            delete messageData.authorData;

            messageData.replyingTo = messageData.replyingToData;
            delete messageData.replyingToData;

            return messageData;
        }))
        .catch(() => null);

    if (!messages) return reject({ message: "failed to get messages" });

    resolve(messages);
});

export default getMessages;