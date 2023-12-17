import { uploadFile } from '$lib/server/db'

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData())
        return uploadFile(data.file)
    }
}
