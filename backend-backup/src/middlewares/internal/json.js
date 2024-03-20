import { json } from "express";

export default {
    priority: 100,
    middleware: [json(), (err, _, res, next) => err instanceof SyntaxError ? res.status(400).json({ message: err.message }) : next()]
}