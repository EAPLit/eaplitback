import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("taskTypes", (table) => {
        table.uuid("lessonTypeID")
            .notNullable()
            .references("lessonTypeID")
            .inTable("lessonTypes")
            .onDelete("CASCADE")
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("taskTypes", (table) => {
        table.dropColumn("lessonTypeID");
    });
}

