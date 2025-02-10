import express, { Request, Response, Express } from 'express';

projectdesignRouter: Router = express.Router();

/**
 * For <ProjectTitle />
 */
projectdesignRouter.post('/projectTitle/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

projectdesignRouter.patch('/projectTitle/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

/**
 * For <UploadText />
 */
projectdesignRouter.post('/text/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

/**
 * For <TextDisplay />
 */
projectdesignRouter.get('/text/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

projectdesignRouter.patch('/text/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

projectdesignRouter.delete('/text/:projectID', (req: Request, res: Response) => {

    res.json({ message: "success" });
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