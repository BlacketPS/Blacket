import session from "express-session";
import MySQLStore from "express-mysql-session";

const store = MySQLStore(session);

export default (app) => app.use(session({
    name: "token",
    secret: process.env.SESSION_SECRET,
    store: new store({
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME
    }),
    resave: true,
    saveUninitialized: true,
    httpOnly: true,
    cookie: { maxAge: 604800000 }
}));