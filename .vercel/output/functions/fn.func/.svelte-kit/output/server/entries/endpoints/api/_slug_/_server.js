import { j as json } from "../../../../chunks/index.js";
import { u as uploadFile, g as getAllQuizFiles, a as getAllCasestudyFiles } from "../../../../chunks/db.js";
async function POST({ params, request }) {
  const { slug } = params;
  let o = { success: 0 };
  if (slug === "upload") {
    const data = Object.fromEntries(await request.formData());
    const res = await uploadFile(data.image);
    o = {
      success: 1,
      file: {
        url: res.url
      }
    };
    return json(o);
  }
  return json(o);
}
async function GET({ cookies, fetch, params, request, url }) {
  const { slug } = params;
  let o = { success: 0 };
  if (slug === "getallquizzes") {
    const quizzes = await getAllQuizFiles();
    o = {
      success: 1,
      quizzes
    };
    return json(o);
  }
  if (slug === "getallcasestudies") {
    const casestudies = await getAllCasestudyFiles();
    o = {
      success: 1,
      casestudies
    };
    return json(o);
  }
  return json(o);
}
export {
  GET,
  POST
};
