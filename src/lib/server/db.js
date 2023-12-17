import path from 'path'
import { mkdirp } from 'mkdirp'
import fs from 'fs'

export async function uploadFile(data) {
    const filepath = path.join(
        process.cwd(),
        'static',
        'uploads',
        `${crypto.randomUUID()}.${data.type.split('/')[1]}`
    )
    const made = mkdirp.sync(path.dirname(filepath))
    fs.writeFileSync(filepath, Buffer.from(await data.arrayBuffer()))

    return { url: '/uploads/' + path.basename(filepath), type: data.type.split("/")[0] }
}

export async function createQuizFile(type, data) {
    return "1234"
}

export async function isValidQuizId(id) {
    const res = id ? true : false
    return res
}

export async function updateQuizFile(type, data) {
    data = JSON.parse(data)
    if (!data.created) data.created = new Date().getTime()
    data.modified = new Date().getTime()
    data = JSON.stringify(data)

    const filepath = path.join(
        process.cwd(),
        'static',
        'quiz',
        `${type}`,
        `${crypto.randomUUID()}.json`
    )

    const made = mkdirp.sync(path.dirname(filepath))
    fs.writeFileSync(filepath, data)

    return { url: '/quiz/' + path.basename(filepath) }
}
