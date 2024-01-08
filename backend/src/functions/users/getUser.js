import { or } from "sequelize";

const getUser = (user, also) => new Promise(async (resolve, reject) => {
    const includes = [];

    if (also.includes("badges")) includes.push({ model: global.database.models.UserBadge, as: "badges", attributes: { exclude: ["user"] } });
    if (also.includes("settings")) includes.push({ model: global.database.models.UserSetting, as: "settings", attributes: { exclude: ["user"] } });
    if (also.includes("statistics")) includes.push({ model: global.database.models.UserStatistic, as: "statistics", attributes: { exclude: ["user"] } });

    const userData = await global.database.models.User.findOne({ where: or({ id: user }, { username: user }), include: includes }).then(user => user.toJSON()).catch(undefined);
    if (!userData) return reject();

    if (also.includes("blooks")) userData.blooks = await global.database.models.UserBlook.findAll({ where: { user: userData.id } })
    else if (also.includes("blooksNoSold")) userData.blooks = await global.database.models.UserBlook.findAll({ where: { user: userData.id, sold: false } });

    resolve(userData);
});

export default getUser;