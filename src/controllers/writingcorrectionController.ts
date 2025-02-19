import { Request, Response, NextFunction } from 'express';
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const correctonotbot = async (req: Request, res: Response, next: NextFunction) => {
    const paragraph = req.body.prompt;
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "system",
                content: `You are an academic English writing assistant for Japanese students who are learning to write academic English at the CEFR B1 level.
                You receive short paragraphs from students and offer advice.
                **INSTRUCTIONS**
                - Identify three errors.
                - Give each error one of these categories: grammar error, linking word suggestion, academic style improvement, compare-contrast language, unnatural phrase
                - Provide the sentence from the paragraph that contains the error.
                - Offer advice to fix it, but don't give the answer.
                - Give examples that are similar but different to the answer.
                - Give a specific correction that is the answer
                - Give an explanation of the correction.
                - Keep all the above short.
                - Return an array of JSON objects, formatted as:
                {output: [
                        {
                            "category": "...",
                            "student_text"; "...",
                            "advice": "...",
                            "examples": "...",
                            "specific_correction": "...",
                            "explanation": "..."
                        },
                    ...
                    ]
                }
                - **Example output**
                { output: [
                    {
                        "category": "giving opinions",
                        "student_text": "I agree this statement that it is important...",
                        "advice": "Great work with this sentence, but do you remember when you learned different phrases for giving opinions in an academic style. We try to avoid using first person I.",
                        "examples": "Here are some examples of how you can give an opinion in an academic style: 'There is no doubt that...', 'Students should...', 'Most people would agree that'.",
                        "specific_correction": "There is no doubt that students should have a part time job.",
                        "explanation": "'There is no doubt that' will give your opinion emphasis."
                    },
                    {
                        "category": "basic grammar",
                        "student_text": "If college students don't a part-time job",
                        "advice": "This is a great phrase, but there is an error in the sentence. The error is with a missing verb. What verb could you use before 'a part time job'?",
                        "examples": "Here are some examples of verbs related to working: 'have a job', 'do some work', 'go into the office'.",
                        "specific_correction": "If students don't have a part-time job",
                        "explanation": "Here I have chosen the verb 'have', but you could also choose 'do'"
                    },
                    {
                        "category", "unnatural phrase",
                        "student_text": "But in company, manager claim them heavily.",
                        "advice": "This is a great point. However, using the word 'claim' is unnatural in English. Can you think of a different way to say this?",
                        "examples": "Here are some examples of a more natural expression: 'the boss chastised the workers', 'his mother told him off for causing trouble', 'he was reprimanded for making a mistake'.",
                        "specific_correction": "But in a company, the manager might reprimand them strongly.",
                        "explanation": "Reprimand means to tell someone that they did the wrong thing and warn them not to do it again. Notice the other changes I made. Use strongly instead of heavily because it goes well with reprimand. Use might to show that it probably doesn't happen all the time."
                    }
                    ]
                }

                `
            },
            {
                role: "user",
                content: paragraph
            },
        ],
        response_format: { type: "json_object" }
        
    });
    console.log(response);
    console.log(response.choices[0].message);
    console.log(response.choices[0].message.content);

    res.locals.responseData = response.choices[0].message.content;
    next();
}

const correctobot = async (req: Request, res: Response, next: NextFunction) => {
    const paragraph = req.body.prompt;
    const response = await openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
            {
                role: "system",
                content: `You are an academic English writing assistant for Japanese students who
                            are learning to write academic English at the CEFR B1 level. You receive
                            short paragraphs from students and offer advice, examples, specific corrections
                            and explanation of the corrections to the students. Your corrections should not change the student's original text too much because of their low level.
                            
                            **Instructions**
                            - Identify 3 to 4 mistakes in a paragraph.
                            - Classify mistakes into:
                             1. giving opinions: this means, for example, suggesting maximizing language to strengthen an argument or minimizing lagnuage to weaken as argument.
                                It also means suggesting to avoid using 'I' because this is not common in academic style, or any other academic writing convention.
                             2. basic grammar: this means any small grammar error that the student made. Examples include missing articles, wrong verb tense, missing verbs, plural and singular errors, or anything that is simple to suggest and explain to a CEFR B1 level student.
                             3. unnatural phrase: this mean finding in the paragraph a collocation or expression that is not common in English and suggesting a better replacement
                             4. linking words: this means suggesting ways to connect sentences or phrases. These include cause effect language such as 'due to' and 'Therefore,' or language for giving examples such as 'For example' or 'such as', or language for building arguments such as 'In addition' or 'Furthermore'. Any linking language used in academic English is okay.
                             5. writing conclusions: this means suggesting common language for introducing a conclusion such as 'In sum' or 'To sum up', or any other similar conclusion phrases.
                             6. compare-contrast: this means suggesting language that shows similaries and differences, such as 'Similarly' or 'bigger than' or 'While ...' or 'In contrast', or any other language that shows difference or similarity in an academic context.
                             - Provide the sentence from the paragraph that contains the error.
                             - Offer advice to fix it, but don't give the answer.
                             - Give examples that are similar but different to the answer.
                             - Give a specific correction that is the answer
                             - Give an explanation of the correction.
                            - Return an array of JSON objects, formatted as:
                                {output: [
                                    {
                                    "category": "...",
                                    "student_text": "...",
                                    "advice": "...",
                                    "examples": "...",
                                    "specific_correction": "...",
                                    "explanation": "..."
                                    },
                                    ...
                                    ]
                                }
                            - **DO NOT add extra text outside the JSON array.**
                            - Keep corrections at CEFR B1 level.

                            **Example prompt and output:**

                            **Example Student's input:**
                            I agree this statement that it is important for college students to have a part time job. I think the best way to learn the money and the society is to do a part-time job. In doing a part-time job, college students learn the money and the society and understand how difficult to earn money is. And college students learn the society which is not in the school. More and more college students are doing a part-time job, they are able to prepare the future life when they work for their families. If college students don't a part-time job and don't know what a life is, they have great difficulty in working. In college year, manager don't claim college students heavily if they make a mistake. But in company, manager claim them heavily. To get used to work and earn money, college students need to do a part-time job. College students need to do a part-time job to know what a life is. So I agree this statement that it is important for college students to have a part time job.
                            
                            **Example JSON response:**
                            { output: 
                             [
                                {
                                    "category": "giving opinions",
                                    "student_text": "I agree this statement that it is important...",
                                    "advice": "Great work with this sentence, but do you remember when you learned different phrases for giving opinions in an academic style. We try to avoid using first person I.",
                                    "examples": "Here are some examples of how you can give an opinion in an academic style: 'There is no doubt that...', 'Students should...', 'Most people would agree that'.",
                                    "specific_correction": "There is no doubt that students should have a part time job.",
                                    "explanation": "'There is no doubt that' will give your opinion emphasis."
                                },
                                {
                                    "category": "basic grammar",
                                    "student_text": "If college students don't a part-time job",
                                    "advice": "This is a great phrase, but there is an error in the sentence. The error is with a missing verb. What verb could you use before 'a part time job'?",
                                    "examples": "Here are some examples of verbs related to working: 'have a job', 'do some work', 'go into the office'.",
                                    "specific_correction": "If students don't have a part-time job",
                                    "explanation": "Here I have chosen the verb 'have', but you could also choose 'do'"
                                },
                                {
                                    "category", "unnatural phrase",
                                    "student_text": "But in company, manager claim them heavily.",
                                    "advice": "This is a great point. However, using the word 'claim' is unnatural in English. Can you think of a different way to say this?",
                                    "examples": "Here are some examples of a more natural expression: 'the boss chastised the workers', 'his mother told him off for causing trouble', 'he was reprimanded for making a mistake'.",
                                    "specific_correction": "But in a company, the manager might reprimand them strongly.",
                                    "explanation": "Reprimand means to tell someone that they did the wrong thing and warn them not to do it again. Notice the other changes I made. Use strongly instead of heavily because it goes well with reprimand. Use might to show that it probably doesn't happen all the time."
                                }
                             ]
                            }
                            **Another example JSON response:**
                            {
                                output: 
                                [
                                    {
                                        "category": "linking words",
                                        "student_text": "If college students don't a part-time job and don't know what a life is, they have great difficulty in working. In college year, manager don't claim college students heavily if they make a mistake.",
                                        "advice": "You have a nice example in these sentences. Can you think of a linking word that can connect these two sentences better?",
                                        "examples": "Here are some example of linking words that work between your two sentences: 'For example,', 'For instance', 'In one situation',",
                                        "specific_correction": "If college students don't have a part-time job and don't know what a life is, they will have great difficulty in working. For example, in college years, managers don't reprimand college students strongly if they make a mistake.",
                                        "explanation": "The second sentence is an example, so using 'For example' between the sentences makes your argument stronger. Notice the other changes I made. I added a verb before 'a part time job', I added 'will', I made 'managers' plural and I changed 'claim' to 'reprimand' to make your writing more natural."
                                    },
                                    {
                                        "category": "writing conclusions",
                                        "student_text": "So I agree this statement that it is important for college students to have a part time job.",
                                        "advice": "This is a great conclusion sentence. However, I think you can use more formal academic style. What phrases do you know in academic style to start a conclusion?",
                                        "examples": "Here are some examples of phrases for starting a conclusion: 'In sum,', 'Overall,', 'To sum up,'",
                                        "specific_correction": "In sum, it is important for college students to have a part time job.",
                                        "explanation": "'In sum' is a nice academic expression. It gives your writing a nice academic feel. You can also use it when giving academic presentations."
                                    },
                                    {
                                        "category": "compare-contrast",
                                        "student_text": "In doing a part-time job, college students learn the money and the society and understand how difficult to earn money is. And college students learn the society which is not in the school.",
                                        "advice": "These are great points, but your arguments could be connected better because 'And' is too informal. Think about words for showing similarity because these two sentences have similar points.",
                                        "examples": "Here are some examples of phrases to show similarity: 'Similarly,', 'On a similar note,', 'In the same way,'.",
                                        "specific_correction": "In doing a part-time job, college students learn about money and society and understand how difficult it is to earn money. In the same way, college students learn about society which is not in the school.",
                                        "explanation": "I used the phrase 'In the same way,' to show that the first sentence and the second sentence make similar points. This makes your argument stronger. Notice the other changes I made, adding 'about' and 'how difficult it is to...' and removing 'the' from in front of 'society'",
                                    }
                                ]
                            }
                             
                            `
            },
            {role: "user", content: paragraph}
        ],
        response_format: { type: "json_object" }
    });

    res.locals.responseData = response.choices[0].message.content;
    next();
}

export {
    correctobot,
    correctonotbot
}