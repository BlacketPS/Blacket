await import("dotenv/config");
import { QueryTypes } from "sequelize";

export default async (req, _, next) => {
    req.session = {};

    if (!req.headers.authorization) return next();
    
    const session = await database.query(`SELECT * FROM sessions WHERE token = ?`, {
        replacements: [req.headers.authorization],
        type: QueryTypes.SELECT
    });

    if (session.length == 0) return next();

    req.session.user = session[0].user;
}