const createSession = (user) => new Promise((resolve, reject) => global.database.models.Session.upsert({ user }).then(async session => {
    session = session[0].toJSON();

    // convert it to an iso string and also remove the miliseconds because whoever created timestamps is retarded
    session.createdAt = new Date(session.createdAt).toISOString();
    session.createdAt = session.createdAt.substring(0, session.createdAt.length - 5) + ".000Z";

    await global.redis.set(`blacket-session:${session.user}`, JSON.stringify(session));

    resolve(session);
}).catch(reject));

export default createSession;