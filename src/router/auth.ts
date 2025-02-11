import express, { Request, Response, Router } from 'express';
import { getPublicKey, insertNewUser } from "@controllers/authController";

const authRouter: Router = express.Router();

authRouter.get('/public-key', getPublicKey, (req: Request, res: Response) => {

    res.json({ success: true, message: "Successfully got public key.", /** Add public key here to send back */});
});

authRouter.post('/register', insertNewUser, (req: Request, res: Response) => {

    res.json({ success: true, message: "Successfully registered." });
});

authRouter.post('/login', (req: Request, res: Response) => {

    res.json({ success: true, message: "Successfully logged in." });
});

authRouter.post('/logout', (req: Request, res: Response) => {

    res.json({ success: true, message: "Successfully logged out." });
});

export default authRouter;