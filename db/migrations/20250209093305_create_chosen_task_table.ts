import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("chosenTasks", (table) => {
        table.uuid("chosenTaskID").primary();
        table.uuid("taskTypeID")
            .notNullable()
            .references("taskTypeID")
            .inTable("taskTypes")
            .onDelete("CASCADE");
        table.uuid("lessonID")
            .notNullable()
            .references("lessonID")
            .inTable("lessons")
            .onDelete("CASCADE")
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("chosenTasks");
}

