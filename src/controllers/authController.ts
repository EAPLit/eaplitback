import { Request, Response, NextFunction } from "express";

export const getPublicKey = (req: Request, res: Response, next: NextFunction) => {
    console.log("Lovely day today!");
    next();
}

export const insertNewUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("The new user should be inserted into the database");
    next();
}

export const removeNewUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("The new user should be removed from the database if there was an error with inserting");
    next();
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Delete a user from the database given the user's UUID");
    next();
}