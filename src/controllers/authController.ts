import { IUser } from '@interfaces/authInterfaces';
import { AuthorizeUsers } from '@models/authModel';
import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const authorizeUsers = new AuthorizeUsers();

const getPublicKey = (req: Request, res: Response, next: NextFunction) => {
    console.log("Lovely day today!");
    next();
}

const insertNewUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newUser: IUser = {
            uid: req.body.uid,
            name: req.body.name,
            username: req.body.username,
            email: req.body.email
        }
        await authorizeUsers.addUser(newUser);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const removeNewUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("The new user should be removed from the database if there was an error with inserting");
    next();
}

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    console.log("Delete a user from the database given the user's UUID");
    next();
}

export {
    getPublicKey,
    insertNewUser,
    removeNewUser,
    deleteUser
};