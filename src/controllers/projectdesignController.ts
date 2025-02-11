import { IText } from '@interfaces/projectInterfaces';
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

export {
    getCurrentText,
    updateCurrentText
}