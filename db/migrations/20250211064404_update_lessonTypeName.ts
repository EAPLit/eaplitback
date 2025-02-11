import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.alterTable("lessonTypes", (table) => {
        table.renameColumn("typeName", "lessonTypeName");
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.alterTable("lessonTypes", (table) => {
        table.renameColumn("lessonTypeName", "typeName");
    })
}

