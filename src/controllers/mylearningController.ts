import { IProject, IProjects, IText } from '@interfaces/projectInterfaces';
import { MyLearning } from '@models/mylearningModel';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from "uuid";

const myLearning = new MyLearning();

const startNewProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectDetails: IProject = await myLearning.startProject(req.params.userID);
        res.locals.projectDetails = projectDetails;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getCurrentProjects = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const projectsList: IProjects = await myLearning.getProjectList(req.params.userID);
        res.locals.projectsList = projectsList;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export {
    startNewProject,
    getCurrentProjects
};