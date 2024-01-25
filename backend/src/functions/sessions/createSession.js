const createSession = (user) => new Promise((resolve, reject) => new global.database.models.Session({ user }).save().then(async session => {
    await global.redis.SET(`blacket-session:${session.user}`, JSON.stringify(session));

    resolve(session);
}).catch(reject));

export default createSession;