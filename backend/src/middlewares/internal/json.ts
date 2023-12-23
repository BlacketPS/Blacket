import express, { ErrorRequestHandler, Response, NextFunction } from "express";

export default [express.json(), (err: ErrorRequestHandler, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) res.json({ message: err.message, statusCode: 400 });
    else next();
}]