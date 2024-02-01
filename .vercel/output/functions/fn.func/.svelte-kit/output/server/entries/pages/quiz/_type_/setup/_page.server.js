import { e as isValidQuizId, f as createQuizFile, h as updateQuizFile, j as deleteQuizFile, k as convertLearningAppsDataToQuizData } from "../../../../../chunks/db.js";
import { r as redirect } from "../../../../../chunks/index.js";
async function load({ url, params }) {
  let mode = url.searchParams.get("mode") !== "null" ? url.searchParams.get("mode") : "";
  let id = url.searchParams.get("id") !== "null" ? url.searchParams.get("id") : null;
  let type = params.type;
  if (mode === "edit" && (!id || !isValidQuizId(id, type))) {
    const { id: id2 } = await createQuizFile(type);
    throw redirect(302, `${url.pathname}?mode=${mode}&id=${id2}`);
  }
}
const actions = {
  update: async ({ url, request, params }) => {
    let id = url.searchParams.get("id") !== "null" ? url.searchParams.get("id") : null;
    const data = Object.fromEntries(await request.formData());
    await updateQuizFile(id, params.type, data.state);
  },
  delete: async ({ url, request, params }) => {
    let id = url.searchParams.get("id") !== "null" ? url.searchParams.get("id") : null;
    await deleteQuizFile(id, params.type);
    throw redirect(302, "/");
  },
  importla: async ({ url, request, fetch, params }) => {
    let id = url.searchParams.get("id") !== "null" ? url.searchParams.get("id") : null;
    let mode = url.searchParams.get("mode") !== "null" ? url.searchParams.get("mode") : "";
    const data = Object.fromEntries(await request.formData());
    if (data.learningappsurl && data.learningappsurl.includes("learningapps.org") && isValidQuizId(id, params.type)) {
      let response = await fetch(data.learningappsurl);
      const html = await response.text();
      var regex = /\?id=\w+/gi;
      var mat = html.match(regex);
      if (mat && mat.length > 0) {
        response = await fetch("https://learningapps.org/data" + mat[0]);
        const json = await response.json();
        const o = {
          title: json.title,
          task: json.tasktext,
          tool: json.tool,
          initparameters: json.initparameters
        };
        await convertLearningAppsDataToQuizData(id, data.learningappsurl, o);
        throw redirect(302, `${url.pathname}?mode=${mode}&id=${id}`);
      }
    }
  }
};
export {
  actions,
  load
};
