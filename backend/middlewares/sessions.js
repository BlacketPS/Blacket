await import("dotenv/config");

export default async (req, _, next) => {
    req.session = {};

    if (!req.headers.authorization) return next();

    const session = await database.query(`SELECT * FROM sessions WHERE token = ?`, {
        replacements: [req.headers.authorization],
        type: database.QueryTypes.SELECT
    });

    if (session.length == 0) return next();

    req.session = session[0];
}