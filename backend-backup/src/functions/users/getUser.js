import { or, Op } from "sequelize";

const getUser = (user, also) => new Promise(async (resolve, reject) => {
    if (!also) also = [];

    const includes = [];

    if (also.includes("badges")) includes.push({ model: global.database.models.UserBadge, as: "badges", attributes: { exclude: ["user"] } });
    if (also.includes("settings")) includes.push({ model: global.database.models.UserSetting, as: "settings", attributes: { exclude: ["user"] } });
    if (also.includes("statistics")) includes.push({ model: global.database.models.UserStatistic, as: "statistics", attributes: { exclude: ["user"] } });

    const userData = await global.database.models.User.findOne({ where: or({ id: user }, { username: { [Op.like]: user } }), include: includes })
        .then(data => data.toJSON())
        .catch(() => null);
    if (!userData) return reject({ message: "user does not exist" });

    if (also.includes("blooksNoData")) userData.blooks = await global.database.models.UserBlook.findAll({ where: { user: userData.id }, attributes: ["blook"] });
    else if (also.includes("blooksNoSoldNoData")) userData.blooks = await global.database.models.UserBlook.findAll({ where: { user: userData.id, sold: false }, attributes: ["blook"] });
    else if (also.includes("blooksData")) userData.blooks = await global.database.models.UserBlook.findAll({ where: { user: userData.id }, attributes: { exclude: ["user"] } });
    else if (also.includes("blooksSoldData")) userData.blooks = await global.database.models.UserBlook.findAll({ where: { user: userData.id, sold: true }, attributes: { exclude: ["user"] } });

    resolve(userData);
});

export default getUser;