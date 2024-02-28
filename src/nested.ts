import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((q: Question): boolean => q.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter(
        (q: Question): boolean =>
            q.body != "" || q.expected != "" || q.options.length != 0
    );
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    const f = questions.find((q: Question) => q.id == id);
    return f === undefined ? null : f;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((q: Question): boolean => q.id != id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((q: Question) => q.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    return questions.reduce(
        (total: number, q: Question) => total + q.points,
        0
    );
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions.reduce(
        (total: number, q: Question) => total + (q.published ? q.points : 0),
        0
    );
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    let csvStr: string = questions.reduce(
        (str: string, q: Question) =>
            str +
            `${q.id},${q.name},${q.options.length},${q.points},${q.published}\n`,
        ""
    );
    csvStr = "id,name,options,points,published\n" + csvStr;
    return csvStr.slice(0, csvStr.length - 1);
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    return questions.map(
        (q: Question): Answer => ({
            questionId: q.id,
            text: "",
            submitted: false,
            correct: false
        })
    );
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    return questions.map(
        (q: Question): Question => ({
            ...q,
            options: [...q.options],
            published: true
        })
    );
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
// prettier-ignore
export function sameType(questions: Question[]): boolean {
    let sameType = true;
    if (questions.length === 0) return true;
    questions.reduce(
        (type: QuestionType, q: Question) => {
            if(type === q.type) {
                sameType = sameType && true;
            } else {
                sameType = false;
            }
            return q.type;
        }, questions[0].type
    );
    return sameType;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    const newQuestions: Question[] = questions.map(
        (q: Question): Question => ({ ...q, options: [...q.options] })
    );
    newQuestions.push(makeBlankQuestion(id, name, type));
    return newQuestions;
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    return questions.map(
        (q: Question): Question => ({
            ...q,
            name: q.id === targetId ? newName : q.name,
            options: [...q.options]
        })
    );
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    return questions.map(
        (q: Question): Question => ({
            ...q,
            type: q.id === targetId ? newQuestionType : q.type,
            options:
                q.id === targetId &&
                newQuestionType != "multiple_choice_question"
                    ? []
                    : [...q.options]
        })
    );
}

function editOptionHelper(
    targetOptionIndex: number,
    originalOptions: string[],
    newOption: string
): string[] {
    let newOptions = [...originalOptions];
    if (targetOptionIndex === -1) {
        newOptions = [...originalOptions, newOption];
    } else {
        newOptions.splice(targetOptionIndex, 1, newOption);
    }
    return newOptions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
// prettier-ignore
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    return questions.map(
        (q: Question): Question => ({
            ...q,
            options: q.id === targetId ? editOptionHelper(targetOptionIndex, q.options, newOption) : [...q.options]
        })
    );
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    // find quesyion
    // duplicate question
    // duplicate question array
    // splice in question
    // return
    const idQuestion = questions.find((q: Question) => q.id === targetId);
    const newQuestions = questions.map(
        (q: Question): Question => ({ ...q, options: [...q.options] })
    );
    // if the quetion with the id is not found
    if (idQuestion === undefined) return newQuestions;
    const idIndex = questions.indexOf(idQuestion);
    const newQuestion = duplicateQuestion(newId, idQuestion);
    newQuestions.splice(idIndex + 1, 0, newQuestion);
    return newQuestions;
}
