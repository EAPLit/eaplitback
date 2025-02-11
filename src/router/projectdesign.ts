import express, { Request, Response, Router } from 'express';
import { getCurrentText, 
        updateCurrentText, 
        getLessonsNames,
        getLessonTypes,
        getTaskTypes,
        addNewLesson,
        updateLessonType,
        updateLessonName,
        deleteLesson,
        addNewTaskFlow,
        updateTaskFlow,
        getTaskFlow
    } from '@controllers/projectdesignController';

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
projectdesignRouter.get('/projectLessonsNames/:projectID', getLessonsNames, (req: Request, res: Response) => {

    res.status(201).json({
        success: true,
        message: "Successfully retrieved the names of the lessons",
        data: res.locals.lessonsNames
    });
});

/**
 * For <LessonTypes />
 */
projectdesignRouter.get('/lessonTypes', getLessonTypes, (req: Request, res: Response) => {

    res.status(201).json({
        success: true,
        message: "Successfully retrieved the types of lessons available in this app.",
        data: res.locals.lessonTypes
    });
});

/**
 * For <TaskTypes />
 */
projectdesignRouter.get('/taskTypes/:lessonTypeID', getTaskTypes, (req: Request, res: Response) => {

    res.status(201).json({
        success: true,
        message: "Successfully retrieved the task types for this lesson type.",
        data: res.locals.taskTypes
    });
});

/**
 * For <LessonDesignHead />
 */
projectdesignRouter.post('/lesson/:projectID/:lessonTypeID', addNewLesson, (req: Request, res: Response) => {

    res.status(201).json({
        success: true,
        message: "Successfully added a new lesson for the project of a specific lesson type.",
        data: res.locals.newLesson
    });
});

// For when the user changes their mind about which lesson type they want to do
projectdesignRouter.patch('/lesson/:projectID/:lessonTypeID', updateLessonType, (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: "Successfully updated the lesson type for a lesson of this project",
        data: res.locals.updatedLesson
    });
});

// For when the user wants to change the name of the lesson
projectdesignRouter.patch('/lesson/:lessonID', updateLessonName, (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: "Successfully updated the name of the lesson.",
        data: res.locals.newLessonName
    })
});

// For whent he user wants to cancel creating a lesson midway through the lesson
projectdesignRouter.delete('/lesson/:lessonID', deleteLesson, (req: Request, res: Response) => {
    res.status(201).json({
        success: true,
        message: "Successfully deleted the lesson"
    });
});

/**
 * For <TaskFlow />
 */
projectdesignRouter.post('/taskFlow/:lessonID', addNewTaskFlow, (req: Request, res: Response) => {
    // The req.body should contain an object of type IChosenTasks
    res.status(201).json({
        success: true,
        message: "Successfully added your task flow"
    });
});

projectdesignRouter.patch('/taskFlow/:lessonID', (req: Request, res: Response) => {
    // The req.body should contain an object of type IChosenTasks
    res.status(201).json({
        success: true,
        message: "Successfully updated your task flow"
    });
});

projectdesignRouter.get('/taskFlow/:lessonID', (req: Request, res: Response) => {

    res.status(201).json({
        success: true,
        message: "Successfully retrieved the task flow for this lesson",
        data: res.locals.taskFlow
    });
})

projectdesignRouter.delete('/taskFlow', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

/**
 * For <ProjectManager />
 */
projectdesignRouter.delete('/lesson/:lessonID', (req: Request, res: Response) => {

    res.json({ message: "success" });
});

export default projectdesignRouter;