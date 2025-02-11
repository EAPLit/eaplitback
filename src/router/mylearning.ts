import express, { Request, Response, Router } from 'express';
import { startNewProject, getCurrentProjects } from '@controllers/mylearningController';

const mylearningRouter: Router = express.Router();


mylearningRouter.get('/projectList/:userID', getCurrentProjects, (req: Request, res: Response) => {
    res.status(201).json({ message: "success", projects: res.locals.projectsList.projects });
});

mylearningRouter.post('/project/:userID', startNewProject, (req: Request, res: Response) => {
    res.status(201).json({ message: "success", project: res.locals.projectDetails });
});

export default mylearningRouter;