import path from 'path'
import { mkdirp } from 'mkdirp'
import fs from 'fs'

export const actions = {
    default: async ({ request }) => {
        const data = Object.fromEntries(await request.formData())
        const filepath = path.join(
            process.cwd(),
            'static',
            'uploads',
            `${crypto.randomUUID()}.${(data.file).type.split('/')[1]}`
        )
        const made = mkdirp.sync(path.dirname(filepath))
        fs.writeFileSync(filepath, Buffer.from(await data.file.arrayBuffer()))

        return { url: '/uploads/' + path.basename(filepath), type: data.file.type.split("/")[0] }
    }
}
