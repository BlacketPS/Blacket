const getSession = (user) => new Promise((resolve, reject) => global.database.models.Session.findOne({ where: { user } }).then(async session => {
    if (!session) return reject();

    resolve(session);
}).catch(reject));

export default getSession;