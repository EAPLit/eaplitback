import express, { Request, Response, Router } from 'express';

const projectdesignRouter: Router = express.Router();

/**
 * For <UploadText />
 */
projectdesignRouter.post('/text/:projectID', (req: Request, res: Response) => {

    res.status(201).json({ success: true, message: "Successfully added a new text to your project." });
});

/**
 * For <TextDisplay />
 */
projectdesignRouter.get('/text/:projectID', (req: Request, res: Response) => {

    res.status(201.json({ success: true, message: "Successfully retrieved the text for your project." });
});

projectdesignRouter.patch('/text/:projectID', (req: Request, res: Response) => {

    res.status(201).json({ success: true, message: "Successfully updated the text for your project." });
});

projectdesignRouter.delete('/text/:projectID', (req: Request, res: Response) => {

    res.status(201).json({ success: true, message: "Successfully deleted the text in your project." });
});

/**
 * For <ProjectLessonsDisplay />
 */
projectdesignRouter.get('/projectLessonsNames/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
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