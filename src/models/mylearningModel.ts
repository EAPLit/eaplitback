import { IProjects, IProject } from '@interfaces/projectInterfaces';
import Knex from "knex";
import { Knex as KnexType } from "knex";
import config from "../../knexfile";

export class MyLearning {
    private knexUser: KnexType;

    constructor(knexInstance?: KnexType) {
        this.knexUser = knexInstance ?? Knex(config[process.env.NODE_ENV || "development"]);
    }

    public async getProjectList(userID: string): Promise<IProjects> {
        try {
            const response: IProject[] = await this.knexUser("projects")
                .select("projectID", "projectName", "textID")
                .where("userID", userID)

            return { projects: response };
        } catch (error) {
            console.error("mylearningModel.ts, getProjectList, error getting the list of projects for the user: ", error);
            throw new Error("Failed to get projects");
        }
    }
}