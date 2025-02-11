import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("lessonTypes").del();

    // Inserts seed entries
    await knex("lessonTypes").insert([
        { lessonTypeID: uuidv4(), typeName: "Summary Writing" },
        { lessonTypeID: uuidv4(), typeName: "Paragraph Writing" },
        { lessonTypeID: uuidv4(), typeName: "Essay Writing" },
        { lessonTypeID: uuidv4(), typeName: "Sentence Structures" },
    ]);
};
