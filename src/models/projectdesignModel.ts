import { IText, ILesson, ILessons, ILessonType, ILessonTypes } from '@interfaces/projectInterfaces';
import Knex from 'knex';
import { Knex as KnexType } from "knex";
import config from "../../knexfile";
import { v4 as uuidv4 } from "uuid";

export class ProjectDesign {
    private knexUser: KnexType;

    constructor(knexInstance?: KnexType) {
        this.knexUser = knexInstance ?? Knex(config[process.env.NODE_ENV || "development"]);
    }

    /**
     * TEXT
     */

    public async getCurrentText(textID: string): Promise<IText> {
        try {
            const textRow: IText[] = await this.knexUser("texts")
                .select("textID", "text")
                .where("textID", textID)
            const text: IText = textRow[0];
            return text;
        } catch (error) {
            console.error("projectdesignModel.ts, getCurrentText, error getting the text for the project: ", error);
            throw new Error("Failed to get the text for your project.");
        }
        
    }

    public async updateCurrentText(textID: string, text: string): Promise<IText> {
        try {
            const updatedText: IText = await this.knexUser("texts")
                .where({ textID })
                .update({ text: text })
                .returning(["textID", "text"])
                .then(rows => rows[0]);

            if (!updatedText) {
                return { textID: '', text: '' };
            }
            return updatedText;
        } catch (error) {
            console.error("projectdesignModel.ts, updateCurrentText, error updating the text for your project: ", error);
            throw new Error("Failed to update the text for your project.");
        }
    }

    /**
     * GET LESSONS NAMES
     */
    public async getLessonsNames(projectID: string): Promise<ILessons> {
        try {
            const lessonsNames: ILesson[] = await this.knexUser("lessons")
                .select("lessonID", "lessonName")
                .where("projecID", projectID)
            if(lessonsNames.length === 0) {
                return { "lessons": [] };
            }
            return { lessons: lessonsNames };
        } catch (error) {
            console.error("projectdesignModel.ts, getLessonsNames, error getting the lessons names for your project: ", error);
            throw new Error("Failed to get the names of your lessons in this project.");
        }
    }

    /**
     * GET LESSON TYPES AND TASK TYPES
     */

    public async getLessonTypes(): Promise<ILessonTypes> {
        try {
            const lessonTypes: ILessonType[] = await this.knexUser("lessonTypes")
                .select("lessonTypeID", "typeName")
            return { lessonTypes: lessonTypes };
        } catch (error) {
            console.error("projectdesignModel.ts, getLessonsTypes, error getting the lessons types for your project: ", error);
            throw new Error("Failed to get the types of lessons available in this app.");
        }
    }
}