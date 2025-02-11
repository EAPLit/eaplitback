import express, { Request, Response, Router } from 'express';
import { startNewProject, getCurrentProjects, updateProjectName } from '@controllers/mylearningController';

const mylearningRouter: Router = express.Router();


mylearningRouter.get('/projectList/:userID', getCurrentProjects, (req: Request, res: Response) => {
    if (res.locals.projectsList.length === 0) {
        res.status(404).json({ success: false, message: "You have no projects made yet.", data: res.locals.projectsList });
    } else {
        res.status(201).json({ success: true, message: "Successfully retrieved your projects.", data: res.locals.projectsList });
    }
});

mylearningRouter.post('/project/:userID', startNewProject, (req: Request, res: Response) => {
    res.status(201).json({ success: true, message: "Successfully started new project.", data: res.locals.projectDetails });
});

/**
 * TODO
 * Add validation to ensure the req.body.newProjectName is not empty
 */
mylearningRouter.patch('/project/:projectID', updateProjectName, (req: Request, res: Response) => {
    if (res.locals.updatedProject.length === 0) {
        res.status(404).json({ success: false, message: "Project not found.", data: res.locals.updatedProject });
    } else {
        res.status(201).json({ success: true, message: "Project name successfully updated.", data: res.locals.updatedProject });
    }
});

export default mylearningRouter;