import express, { Request, Response, Router } from 'express';
import { getCurrentText, updateCurrentText } from '@controllers/projectdesignController';

const projectdesignRouter: Router = express.Router();

/**
 * For <UploadText /> and <TextDisplay />
 */
projectdesignRouter.get('/text/:textID', getCurrentText, (req: Request, res: Response) => {
    res.status(201).json({ 
        success: true, 
        message: "Successfully retrieved the text for your project.", 
        data: res.locals.currentText
    });
});

projectdesignRouter.patch('/text/:textID', updateCurrentText, (req: Request, res: Response) => {

    res.status(201).json({
        success: true,
        message: "Successfully updated the text for your project.",
        data: res.locals.updatedText
    });
});

/**
 * For <ProjectLessonsDisplay />
 */
projectdesignRouter.get('/projectLessonsNames/:projectID', (req: Request, res: Response) => {

    res.json({
        success: true,
        message: "Successfully retrieved the names of the lessons",
        data: res.locals.lessonsNames
    });
});

/**
 * For <LessonTypes />
 */
projectdesignRouter.get('/lessonTypes', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

/**
 * For <TaskTypes />
 */
projectdesignRouter.get('/taskTypes/:lessonTypeID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

/**
 * For <TaskFlow />
 */
projectdesignRouter.post('/taskFlow/:lessonID/:order', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

projectdesignRouter.patch('/taskFlow/:lessonID/:order', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

projectdesignRouter.delete('/taskFlow/:lessonID/:order', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

/**
 * For <LessonManager />
 */
projectdesignRouter.post('/lesson/:projectID/:lessonTypeID', (req: Request, res: Response) => {

    res.json({ message: "success"});
});

projectdesignRouter.patch('/lessonName/:lessonsID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

projectdesignRouter.delete('/lesson/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

/**
 * For <ProjectManager />
 */
projectdesignRouter.delete('/lesson/:lessonID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

export default projectdesignRouter;