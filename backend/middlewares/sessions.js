await import("dotenv/config");

export default async (req, _, next) => {
    req.session = {};

    if (!req.headers.authorization) return next();

    const token = req.headers.authorization.split(".");
    if (token.length != 3) return next();

    let [user, created, secret] = token;
    for (const part of [user, created, secret]) if (!part) return next();
    user = Buffer.from(user, "base64").toString("utf8");
    created = new Date(Buffer.from(created, "base64").toString("utf8"))
    secret = Buffer.from(secret, "base64").toString("utf8");

    if (typeof user != "string") return next();
    if (created.toString() == "Invalid Date") return next();
    if (typeof secret != "string") return next();

    const session = await database.query(`SELECT * FROM sessions WHERE user = ? AND created = ? AND secret = ?`, {
        replacements: [user, created, secret],
        type: database.QueryTypes.SELECT
    });

    if (session.length == 0) return next();

    req.session = session[0];
}