const addTokens = (user, amount) => new Promise(async (resolve, reject) => {
    if (isNaN(amount)) return reject({ message: "amount must be typeof number" });

    await global.database.models.User.increment("tokens", { by: amount, where: { id: user } })
        .then(() => resolve())
        .catch(reject);
});

export default addTokens;