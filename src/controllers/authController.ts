import { Request, Response, NextFunction } from "express";

export const getPublicKey = (req: Request, res: Response, next: NextFunction) => {
    console.log("Lovely day today!");
    next();
}