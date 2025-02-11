import { IProjects, IProject, IText } from '@interfaces/projectInterfaces';
import Knex from "knex";
import { Knex as KnexType } from "knex";
import config from "../../knexfile";
import { v4 as uuidv4 } from "uuid";

export class MyLearning {
    private knexUser: KnexType;

    constructor(knexInstance?: KnexType) {
        this.knexUser = knexInstance ?? Knex(config[process.env.NODE_ENV || "development"]);
    }

    public async startProject(userID: string): Promise<IProject> {
        try {
            // Insert a new empty text for the project
            const textResponse: IText[] = await this.knexUser("texts")
                .insert({
                    textID: uuidv4(),
                    userID: userID,
                    text: ""
                })
                .returning("*");
            const textID = textResponse[0].textID;
            
            // Using the textID, insert a new project into the database
            const projectResponse: IProject[] = await this.knexUser("projects")
                .insert({
                    projectID: uuidv4(),
                    projectName: "New Project",
                    textID: textID,
                    userID: userID
                })
                .returning("*");

            return projectResponse[0];

        } catch (error) {
            console.error("mylearningModel.ts, startProject, error starting a new project: ", error);
            throw new Error("Failed to start a new project");
        } 
    }

    public async getProjectList(userID: string): Promise<IProjects> {
        try {
            const response: IProject[] = await this.knexUser("projects")
                .select("projectID", "projectName", "textID")
                .where("userID", userID)

            if (response.length === 0) {
                return { projects: [] };
            }

            return { projects: response };
        } catch (error) {
            console.error("mylearningModel.ts, getProjectList, error getting the list of projects for the user: ", error);
            throw new Error("Failed to get projects");
        }
    }

    public async updateProjectName(projectID: string, newProjectName: string): Promise<IProject | undefined> {
        try {
            const updatedProject: IProject | undefined = await this.knexUser("projects")
                .where({ projectID })
                .update({ projectName: newProjectName })
                .returning(["projectID", "projectName", "textID"])
                .then(rows => rows[0]);

            if (!updatedProject) {
                return { projectID: '', projectName: '', textID: '' };
            }

            return updatedProject;
        } catch (error) {
            console.error("mylearningModel.ts, updateProjectName, error updating the project name: ", error);
            throw new Error("Failed to update the project name.");
        }
    }
}