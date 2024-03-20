const decodeSession = (token) => new Promise((resolve, reject) => {
    if (typeof token !== "string") return resolve({ message: "token must be typeof string" });

    token = Buffer.from(token, "base64").toString("utf8");

    try {
        token = JSON.parse(token);
    } catch {
        return resolve({ message: "token must be a valid JSON string" });
    }
    if (typeof token.id !== "string" || typeof token.user !== "string" || typeof token.createdAt !== "number") return resolve({ message: "token must contain id, user, and createdAt" });

    resolve(token);
});

export default decodeSession;