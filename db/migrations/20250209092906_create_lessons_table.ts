import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("lessons", (table) => {
        table.uuid("lessonID").primary();
        table.string("lessonName", 100);
        table.uuid("projectID")
            .notNullable()
            .references("projectID")
            .inTable("projects")
            .onDelete("CASCADE");
        table.uuid("lessonTypeID")
            .notNullable()
            .references("lessonTypeID")
            .inTable("lessonTypes")
            .onDelete("CASCADE");
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("lessons");
}

