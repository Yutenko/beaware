import { createCasestudyFile, isValidCasestudyId, updateCasestudyFile, deleteCasestudyFile } from "$lib/server/db"
import { redirect } from '@sveltejs/kit';

export async function load({ url, params }) {
    let id = params.id;

    // if there is no valid id, create a new empty quiz
    if (!id || !isValidCasestudyId(id)) {
        const { newId } = await createCasestudyFile();
        throw redirect(302, `${url.pathname}/${newId}/edit`);
    }
};

export const actions = {
    update: async ({ request, params }) => {
        const formData = Object.fromEntries(await request.formData())
        await updateCasestudyFile(params.id, formData)
    },
    delete: async ({ params }) => {
        await deleteCasestudyFile(params.id)
        throw redirect(302, "/");
    },
}