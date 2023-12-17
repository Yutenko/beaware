import { createQuizFile, updateQuizFile, isValidQuizId } from "$lib/server/db"
import { redirect } from '@sveltejs/kit';

export async function load({ url, params, fetch }) {
    let mode = url.searchParams.get("mode") !== 'null' ? url.searchParams.get("mode") : "";
    let id = url.searchParams.get("id") !== 'null' ? url.searchParams.get("id") : null;
    
    // if there is no valid id, create a new empty quiz
    if (mode === "edit" && !id) {
        const newId = await createQuizFile()
        throw redirect(302, `${url.pathname}?mode=${mode}&id=${newId}`)
    }
};

export const actions = {
    default: async ({ request, params }) => {
        const data = Object.fromEntries(await request.formData())
        return updateQuizFile(params.type, data.state)
    }
}
