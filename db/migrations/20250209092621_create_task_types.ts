import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("taskTypes", (table) => {
        table.uuid("taskTypeID").primary();
        table.string("taskTypeName", 100).notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("taskTypes");
}

