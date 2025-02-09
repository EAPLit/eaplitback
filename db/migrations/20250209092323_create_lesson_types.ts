import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("lessonTypes", (table) => {
        table.uuid("lessonTypeID").primary();
        table.string("typeName", 100).notNullable();
        table.timestamps(true, true);
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("lessonTypes");
}

