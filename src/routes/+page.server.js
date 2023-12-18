import { getAllQuizFiles } from "$lib/server/db"
import { default as QUIZ_TYPE } from '$components/quiz/quiztypes'


export async function load() {
    const files = await getAllQuizFiles(QUIZ_TYPE.groupassignment)
    return { quizzes: files };
};