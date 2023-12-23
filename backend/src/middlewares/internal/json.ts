import express, { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export default [express.json(), (err: ErrorRequestHandler, _: Request, res: Response, next: NextFunction) => {
    if (err instanceof SyntaxError) res.status(400).json({ message: err.message, statusCode: 400 });
    else next();
}]