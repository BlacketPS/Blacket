const getMessage = (message) => new Promise(async (resolve, reject) => {
    if (!message) return reject({ message: "message missing" });
    if (typeof message !== "number") return reject({ message: "message must be typeof number" });

    const messageData = await global.database.models.Message.findOne({
        where: { id: message },
        include: [
            {
                model: global.database.models.User, as: "authorData", attributes: ["id", "username", "avatar", "title", "color", "font"],
                include: [{ model: global.database.models.UserBadge, as: "badges", attributes: { exclude: ["user"] } }]
            },
            { model: global.database.models.Message, as: "replyingToData" }
        ]
    })
        .then(message => {
            const messageData = message.toJSON();

            messageData.author = messageData.authorData;
            delete messageData.authorData;

            messageData.replyingTo = messageData.replyingToData;
            delete messageData.replyingToData;

            return messageData;
        })
        .catch(() => null);

    if (!messageData) return reject({ message: "failed to get message" });

    resolve(messageData);
});

export default getMessage;