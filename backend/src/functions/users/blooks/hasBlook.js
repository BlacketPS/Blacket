const hasBlook = (user, blook) => new Promise(async (resolve, reject) => global.database.models.UserBlook.findOne({ where: { user, blook } })
    .then(blookData => resolve(blookData ? true : false))
    .catch(reject));

export default hasBlook;