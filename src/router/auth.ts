import express, { Request, Response, Router } from 'express';
import { getPublicKey, insertNewUser } from "@controllers/authController";

const authRouter: Router = express.Router();

authRouter.get('/public-key', getPublicKey, (req: Request, res: Response) => {

    res.json({ message: "success", /** Add public key here to send back */});
});

authRouter.post('/register', insertNewUser, (req: Request, res: Response) => {

    res.json({ message: "success" });
});

authRouter.post('/login', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

authRouter.post('/logout', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

export default authRouter;