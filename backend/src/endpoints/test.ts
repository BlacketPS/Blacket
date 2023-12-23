import { Request, Response } from "express";

export default {
    method: "post",
    handler: (req: Request, res: Response) => {
        res.json(req.body);
    }
}