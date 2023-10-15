import path from 'path'
import { mkdirp } from 'mkdirp'
import fs from 'fs'

export const actions = {
    default: async ({ request, params }) => {
        const data = Object.fromEntries(await request.formData())
        const filepath = path.join(
            process.cwd(),
            'static',
            'quiz',
            `${params.type}`,
            `${crypto.randomUUID()}.json`
        )

        const made = mkdirp.sync(path.dirname(filepath))
        fs.writeFileSync(filepath, data.state)

        return { url: '/quiz/' + path.basename(filepath) }
    }
}
