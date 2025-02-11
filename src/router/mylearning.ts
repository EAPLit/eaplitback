import express, { Request, Response, Router } from 'express';
import { startNewProject } from '@controllers/mylearningController';

const mylearningRouter: Router = express.Router();


mylearningRouter.get('/projectList/:userID', (req: Request, res: Response) => {
    
    res.json({ message: "success" });
});

mylearningRouter.post('/project/:userID', startNewProject, (req: Request, res: Response) => {
    res.status(201).json({ message: "success", project: res.locals.projectDetails });
});

export default mylearningRouter;