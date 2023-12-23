import { Request, Response, NextFunction } from "express";

export default (_: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Powered-By", "Blacket");
    next();
}