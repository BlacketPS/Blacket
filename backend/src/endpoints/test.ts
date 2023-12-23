import { Request, Response } from "express";

export default {
    method: "get",
    handler: (req: Request, res: Response) => {
        res.status(200).json("kit");
    }
}