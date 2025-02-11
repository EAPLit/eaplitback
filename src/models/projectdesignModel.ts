import { IText, ILesson, ILessons, ILessonType, ILessonTypes, ITaskType, ITaskTypes, IChosenTasks, IChosenTask } from '@interfaces/projectInterfaces';
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
                .select("lessonTypeID", "lessonTypeName")
            return { lessonTypes: lessonTypes };
        } catch (error) {
            console.error("projectdesignModel.ts, getLessonTypes, error getting the lessons types for your project: ", error);
            throw new Error("Failed to get the types of lessons available in this app.");
        }
    }

    public async getTaskTypes(lessonTypeID: string): Promise<ITaskTypes> {
        try {
            const taskTypes: ITaskType[] = await this.knexUser("taskTypes")
                .select("taskTypeID", "taskTypeName")
                .where("lessonTypeID", lessonTypeID)
            return { taskTypes: taskTypes };
        } catch (error) {
            console.error("projectdesignModel.ts, getTaskTypes, error getting the task types for the given lesson type: ", error);
            throw new Error("Failed to get the task types for the given lesson type in this app.");
        }
    }

    /**
     * LESSONS
     */
    public async addNewLesson(projectID: string, lessonTypeID: string): Promise<ILesson> {
        try {
            const newLesson: ILesson = await this.knexUser("lessons")
                .insert(
                    {
                        lessonID: uuidv4(),
                        lessonName: "New Lesson",
                        projectID: projectID,
                        lessonTypeID: lessonTypeID
                    }
                )
                .returning(["lessonID", "lessonName"])
                .then(rows => rows[0]);
            if (!newLesson) {
                return { lessonID: '', lessonName: '' }
            }
            return newLesson;
        } catch (error) {
            console.error("projectdesignModel.ts, addNewLesson, error adding a new lesson: ", error);
            throw new Error("Failed to add a new lesson.");
        }
    }

    public async updateLessonType(projectID: string, lessonTypeID: string): Promise<ILesson> {
        try {
            const updatedLesson: ILesson = await this.knexUser("lessons")
                .where({ projectID })
                .update({ lessonTypeID: lessonTypeID })
                .returning(["lessonID", "lessonName"])
                .then(rows => rows[0]);
            if (!updatedLesson) {
                return { lessonID: '', lessonName: '' };
            }
            return updatedLesson;
        } catch (error) {
            console.error("projectdesignModel.ts, updateLessonType, error updating the lesson type id");
            throw new Error("Failed to update the new lesson with a new lesson type.");
        }
    }

    public async updateLessonName(lessonID: string, lessonName: string): Promise<ILesson> {
        try {
            const updatedLesson: ILesson = await this.knexUser("lessons")
                .where({ lessonID })
                .update({ lessonName: lessonName })
                .returning(["lessonID", "lessonName"])
                .then(rows => rows[0]);
            if(!updatedLesson) {
                return { lessonID: '', lessonName: '' };
            }

            return updatedLesson;
        } catch (error) {
            console.error("projectdesignModel.ts, updateLessonName, error updating the lesson type id");
            throw new Error("Failed to update the lesson with a new name.");
        }
    }

    public async deleteLesson(lessonID: string): Promise<void> {
        try {
            await this.knexUser("lessons")
                .where({ lessonID })
                .del()
        } catch (error) {
            console.error("projectdesignModel.ts, deleteLesson, error deleting the lesson.");
            throw new Error("Failed to delete the lesson");
        }
    }

    public async deleteLessonAndTasks(lessonID: string): Promise<void> {
        try {
            await this.knexUser("lessons")
                .where({ lessonID })
                .del()
            
            await this.knexUser("chosenTasks")
                .where({ lessonID })
                .del()
        } catch (error) {
            console.error("projectdesignModel.ts, deleteLessonAndTasks, error deleting the lesson and tasks.");
            throw new Error("Failed to delete the lesson and tasks");
        }
    }

    /**
     * TASK FLOW
     */

    public async addNewTaskFlow(chosenTasks: IChosenTasks, lessonID: string): Promise<void> {
        try {
            await this.knexUser("chosenTasks")
                .insert(
                    chosenTasks.chosenTasks.map(task => ({
                        chosenTaskID: uuidv4(),
                        taskTypeID: task.taskTypeID,
                        lessonID: lessonID,
                        order: task.order
                    }))
                );
        } catch (error) {
            console.error("projectdesignModel.ts, addNewTaskFlow, error adding a new task flow: ", error);
            throw new Error("Failed to add a new task flow");
        }
    }

    public async updateTaskFlow(chosenTasks: IChosenTasks, lessonID: string): Promise<void> {
        // Because the user might add or remove tasks, the strategy here is to delete all the
        // tasks associated with the lessonID from the database
        // then add the new ones
        try {
            await this.knexUser("chosenTasks")
                .where({ lessonID })
                .del()

            await this.knexUser("chosenTasks")
                .insert(
                    chosenTasks.chosenTasks.map(task => ({
                        chosenTask: uuidv4(),
                        taskTypeID: task.taskTypeID,
                        lessonID: lessonID,
                        order: task.order
                    }))
                );
        } catch (error) {
            console.error("projectdesignModel.ts, updateTaskFlow, error updating a task flow: ", error);
            throw new Error("Failed to update a task flow");
        }
    }

    public async getTaskFlow(lessonID: string): Promise<IChosenTasks> {
        try {
            const taskFlow: IChosenTask[] = await this.knexUser("chosenTasks")
                .select("chosenTaskID", "taskTypeID", "order")
                .where("lessonID", lessonID);
            return { chosenTasks: taskFlow };
        } catch (error) {
            console.error("projectdesignModel.ts, getTaskFlow, error getting your task flow: ", error);
            throw new Error("Failed to get your task flow");
        }
    }
}