import { createCasestudyFile, isValidCasestudyId, updateCasestudyFile } from "$lib/server/db"
import { redirect } from '@sveltejs/kit';

export async function load({ url, params }) {
    let id = params.id;

    // if there is no valid id, create a new empty quiz
    if (!id || !isValidCasestudyId(id)) {
        const { newId } = await createCasestudyFile();
        throw redirect(302, `${url.pathname}/${newId}`);
    }
};

export const actions = {
    default: async ({ request, params }) => {
        const formData = Object.fromEntries(await request.formData())
        await updateCasestudyFile(params.id, formData)
    },
}