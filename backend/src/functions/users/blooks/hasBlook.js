const hasBlook = (user, blook) => new Promise(async (resolve, reject) => global.database.models.UserBlook.findOne({ where: { user, blook } }).then(blookData => {
    if (!blookData) resolve(false);
    else resolve(true);
}).catch(reject));

export default hasBlook;