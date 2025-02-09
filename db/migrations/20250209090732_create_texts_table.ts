import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("texts", (table) => {
        table.uuid("textID").primary();
        table
            .uuid("userID")
            .notNullable()
            .references("id")
            .inTable("users")
            .onDelete("CASCADE");
        table.text("text").notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("texts");
}

