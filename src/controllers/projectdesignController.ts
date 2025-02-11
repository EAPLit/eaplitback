import { IText, ILessons, ILessonTypes, ITaskTypes, } from '@interfaces/projectInterfaces';
import { ProjectDesign } from '@models/projectdesignModel';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from "uuid";

const projectDesign = new ProjectDesign();

const getCurrentText = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const currentText: IText = await projectDesign.getCurrentText(req.params.textID)
        res.locals.currentText = currentText;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateCurrentText = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedText: IText = await projectDesign.updateCurrentText(req.params.textID, req.body.text);
        res.locals.updatedText = updatedText;
        next();
    } catch(error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getLessonsNames = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessonsNames: ILessons = await projectDesign.getLessonsNames(req.params.projectID);
        res.locals.lessonsNames = lessonsNames;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const getLessonTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const lessonTypes: ILessonTypes = await projectDesign.getLessonTypes();
        res.locals.lessonTypes = lessonTypes;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    } 
}

const getTaskTypes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskTypes: ITaskTypes = await projectDesign.getTaskTypes(req.params.lessonTypeID);
        res.locals.taskTypes = taskTypes;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const addNewLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newLesson = await projectDesign.addNewLesson(req.params.projectID, req.params.lessonTypeID);
        res.locals.newLesson = newLesson;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateLessonType = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedLesson = await projectDesign.updateLessonType(req.params.projectID, req.params.lessonTypeID);
        res.locals.updatedLesson = updatedLesson;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const updateLessonName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newLessonName = await projectDesign.updateLessonName(req.params.lessonID, req.body.lessonName);
        res.locals.newLessonName = newLessonName;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await projectDesign.deleteLesson(req.params.lessonID)
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

const addNewTaskFlow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await projectDesign.addNewTaskFlow(req.body.chosenTasks, req.params.lessonID);
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export {
    getCurrentText,
    updateCurrentText,
    getLessonsNames,
    getLessonTypes,
    getTaskTypes,
    addNewLesson,
    updateLessonType,
    updateLessonName,
    deleteLesson,
    addNewTaskFlow
}