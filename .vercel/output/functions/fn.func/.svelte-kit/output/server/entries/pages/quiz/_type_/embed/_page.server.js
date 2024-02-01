import { u as uploadFile } from "../../../../../chunks/db.js";
const actions = {
  default: async ({ request }) => {
    const data = Object.fromEntries(await request.formData());
    return uploadFile(data.file);
  }
};
export {
  actions
};
