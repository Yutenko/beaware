import fs from 'fs/promises'
import path from 'path'
import { fail } from '@sveltejs/kit'

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData())
        const filePath = path.join(
            process.cwd(),
            'static',
            `${crypto.randomUUID()}.${(data.file).type.split('/')[1]}`
        )
        await fs.writeFile(filePath, Buffer.from(await (data.file).arrayBuffer()))

        return { url: path.basename(filePath), type: data.file.type.split("/")[0] }
    }
}
