import { g as getAllQuizFiles, a as getAllCasestudyFiles } from "../../../chunks/db.js";
async function load() {
  const quizzes = await getAllQuizFiles();
  const casestudies = await getAllCasestudyFiles();
  return { quizzes, casestudies };
}
export {
  load
};
