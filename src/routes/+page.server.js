import { getAllQuizFiles,getAllCasestudyFiles } from "$lib/server/db"
import { default as QUIZ_TYPE } from '$components/quiz/quiztypes'


export async function load() {
    const quizzes = await getAllQuizFiles(QUIZ_TYPE.groupassignment)
    const casestudies = await getAllCasestudyFiles()
    return { quizzes, casestudies };
};