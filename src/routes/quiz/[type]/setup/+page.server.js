import { uploadQuizFile } from "$lib/server/helper"

export const actions = {
    default: async ({ request, params }) => {
        const data = Object.fromEntries(await request.formData())
        return uploadQuizFile(params.type, data.state)
    }
}
