!blacket.users && (blacket.users = {});

export default blacket.users.create = user => new Promise(async (resolve, reject) => {
    await database.query(`INSERT INTO users (
        ${Object.keys(user).join(", ")}
    ) VALUES (
        ${Object.keys(user).map(() => "?").join(", ")}
    )`, {
        replacements: Object.values(user),
        type: database.QueryTypes.INSERT
    }).then(() => resolve()).catch(error => reject(error));
});