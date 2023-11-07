!blacket.users && (blacket.users = {});

export default blacket.users.get = id => new Promise(async (resolve, reject) => {
    await database.query("SELECT * FROM users WHERE id = ?", {
        replacements: [id],
        type: database.QueryTypes.SELECT
    }).then(result => {
        if (result.length === 0) reject("User does not exist.");
        else return resolve(result[0]);
    }).catch(error => reject(error));
});