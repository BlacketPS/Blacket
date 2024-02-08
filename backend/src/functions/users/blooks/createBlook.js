const obtainables = [
    "unknown",
    "pack open",
    "granted by staff"
]

const createBlook = (user, blook, ownedBy, obtainedBy) => new Promise(async (resolve, reject) => {
    if (!obtainedBy) obtainedBy = "unknown";
    if (!obtainables.includes(obtainedBy)) return reject({ message: `obtainedBy must be one of the following: ${obtainables.join(", ")}` });

    await new global.database.models.UserBlook({ user, blook, ownedBy, obtainedBy }).save()
        .then(() => resolve())
        .catch(reject);
});

export default createBlook;