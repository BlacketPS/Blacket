const deleteSession = (user) => new Promise((resolve, reject) => global.database.models.Session.destroy({ where: { user } }).then(async () => {
    await global.redis.del(`blacket-session:${user}`);

    resolve();
}).catch(reject));

export default deleteSession;