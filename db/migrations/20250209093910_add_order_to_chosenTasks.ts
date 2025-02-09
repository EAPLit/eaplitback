import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable("chosenTasks", (table) => {
        table.integer("order").notNullable().defaultTo(1);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable("chosenTasks", (table) => {
        table.dropColumn("order");
    });
}

