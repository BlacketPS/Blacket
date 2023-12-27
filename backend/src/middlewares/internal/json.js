import { json } from "express";

export default [json(), (err, _, res, next) => {
    if (err instanceof SyntaxError) res.status(400).json({ message: err.message });
    else next();
}]