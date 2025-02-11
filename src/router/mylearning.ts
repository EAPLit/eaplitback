import express, { Request, Response, Router } from 'express';

const mylearningRouter: Router = express.Router();


mylearningRouter.get('/projectList', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

mylearningRouter.post('/project', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

export default mylearningRouter;