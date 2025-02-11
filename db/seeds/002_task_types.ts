import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    // Fetch the lessonTypeIDs for the lesson types
    const lessonTypes = await knex("lessonTypes")
        .select("lessonTypeID", "typeName")
        .whereIn("typeName", ["Summary Writing", "Paragraph Writing", "Essay Writing", "Sentence Structures"]);

    /**
     * lessonTypes will look like this
     * [
     *      {
     *          "lessonTypeID": "550e8400-e29-41d4-a716-44665544000",
     *          "typeName": "Summary Writing"
     *      },
     *      {
     *          "lessonTypeID": "550e8400-e29-41d4-a716-44665544001",
     *          "typeName": "Paragraph Writing"
     *      },
     * ]
     */

    // Map lesson types to their corresponding IDs
    const lessonTypeMap = lessonTypes.reduce<Record<string, string>>((acc, lesson) => {
        acc[lesson.typeName] = lesson.lessonTypeID;
        return acc;
    }, {});

    /**
     * lessonTypeMap looks like this
     * {
     *      "Summary Writing": "550e8400-e29-41d4-a716-44665544000",
     *      "Paragraph Writing": "550e8400-e29-41d4-a716-44665544001",
     * }
     */

    // Ensure we have valud lessonTypeIDs
    if (!lessonTypeMap["Summary Writing"] || !lessonTypeMap["Paragraph Writing"] || !lessonTypeMap["Essay Writing"] || !lessonTypeMap["Sentence Structures"]) {
        throw new Error("Requires lesson types not found in the database");
    }

    // Delete all existing entries
    await knex("taskTypes").del();

    // Inserts seed entries
    await knex("taskTypes").insert([
        // Summary Writing Tasks
        { taskTypeID: uuidv4(), taskTypeName: "Basic Skills", lessonTypeID: lessonTypeMap["Summary Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Vocabulary and Synonyms", lessonTypeID: lessonTypeMap["Summary Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Citation", lessonTypeID: lessonTypeMap["Summary Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Paraphrasing", lessonTypeID: lessonTypeMap["Summary Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Integrating", lessonTypeID: lessonTypeMap["Summary Writing"] },

        // Paragraph Writing Tasks
        { taskTypeID: uuidv4(), taskTypeName: "Topic Sentences", lessonTypeID: lessonTypeMap["Paragraph Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Supporting Sentences", lessonTypeID: lessonTypeMap["Paragraph Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Conclusion Sentences", lessonTypeID: lessonTypeMap["Paragraph Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Sentence Connectors", lessonTypeID: lessonTypeMap["Paragraph Writing"] },

        // Essay Writing
        { taskTypeID: uuidv4(), taskTypeName: "Thesis Statements", lessonTypeID: lessonTypeMap["Essay Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Essay Organization", lessonTypeID: lessonTypeMap["Essay Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Transition Sentences", lessonTypeID: lessonTypeMap["Essay Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Introduction Paragraphs", lessonTypeID: lessonTypeMap["Essay Writing"] },
        { taskTypeID: uuidv4(), taskTypeName: "Conclusion Paragraphs", lessonTypeID: lessonTypeMap["Essay Writing"] },

        // Sentence Structures
        { taskTypeID: uuidv4(), taskTypeName: "Subject Verb Object", lessonTypeID: lessonTypeMap["Sentence Structures"] },
        { taskTypeID: uuidv4(), taskTypeName: "Compound Sentences", lessonTypeID: lessonTypeMap["Sentence Structures"] },
        { taskTypeID: uuidv4(), taskTypeName: "Complex Sentences", lessonTypeID: lessonTypeMap["Sentence Structures"] },
    ]);
};
