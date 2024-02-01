import { i as isValidCasestudyId, c as createCasestudyFile, b as updateCasestudyFile, d as deleteCasestudyFile } from "../../../../../chunks/db.js";
import { r as redirect } from "../../../../../chunks/index.js";
async function load({ url, params }) {
  let id = params.id;
  if (!id || !isValidCasestudyId(id)) {
    const { newId } = await createCasestudyFile();
    throw redirect(302, `${url.pathname}/${newId}/edit`);
  }
}
const actions = {
  update: async ({ request, params }) => {
    const formData = Object.fromEntries(await request.formData());
    await updateCasestudyFile(params.id, formData);
  },
  delete: async ({ params }) => {
    await deleteCasestudyFile(params.id);
    throw redirect(302, "/");
  }
};
export {
  actions,
  load
};
