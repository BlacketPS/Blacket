export default async (req, _, next) => {
    if (!req.session.user) return next();

    const user = await database.query(`SELECT * FROM users WHERE id = ?`, {
        replacements: [req.session.user],
        type: database.QueryTypes.SELECT
    });

    if (user.length == 0) return next();

    req.user = user[0];
}