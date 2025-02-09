import { TableBuilder } from './../../node_modules/knex/types/index.d';
import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("projects", (table) => {
        table.uuid("projectID").primary();
        table
            .uuid("textID")
            .notNullable()
            .references("textID")
            .inTable("texts")
            .onDelete("CASCADE");
        table
            .uuid("userID")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.string("projectName", 100).notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("projects");
}

