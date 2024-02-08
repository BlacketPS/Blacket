const removeTokens = (user, amount) => new Promise(async (resolve, reject) => {
    if (isNaN(amount)) return reject({ message: "amount must be typeof number" });

    await global.database.models.User.decrement("tokens", { by: amount, where: { id: user } })
        .then(() => resolve())
        .catch(reject);
});

export default removeTokens;