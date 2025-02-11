import { } from '@interfaces/projectInterfaces';
import Knex from 'knex';
import { Knex as KnexType } from "knex";
import config from "../../knexfile";
import { v4 as uuidv4 } from "uuid";

export class ProjectDesign {
    private knexUser: KnexType;

    constructor(knexInstance?: KnexType) {
        this.knexUser = knexInstance ?? Knex(config[process.env.NODE_ENV || "development"]);
    }

    public async getCurrentText(textId: string): Promise<IText> {

    }

    public async updateCurrentText(textID: string): Promise<void> {

    }

    public async deleteCurrentText(textID: string): Promise<void> {

    }
}