import { IText } from '@interfaces/projectInterfaces';
import Knex from 'knex';
import { Knex as KnexType } from "knex";
import config from "../../knexfile";
import { v4 as uuidv4 } from "uuid";

export class ProjectDesign {
    private knexUser: KnexType;

    constructor(knexInstance?: KnexType) {
        this.knexUser = knexInstance ?? Knex(config[process.env.NODE_ENV || "development"]);
    }

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

    public async deleteCurrentText(textID: string): Promise<boolean> {
        try {
            const deletedRows: number = await this.knexUser("texts")
                .where("textID", textID)
                .del();
            return deletedRows > 0; // Returns true if at least 1 row was deleted.
        } catch (error) {
            console.error("projectdesignModel.ts, deleteCurrentText, error deleting the text for your project:", error);
            throw new Error("Failed to delete the text for your project.");
        }
    }
}