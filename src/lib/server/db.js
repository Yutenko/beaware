import path from 'path'
import { mkdirp } from 'mkdirp'
import fs from 'fs'
import { OPTIONS, MIN_GROUPS, GROUP_COLORS } from '$components/quiz/groupassignment/constants'
import { default as QUIZ_TYPE } from '$components/quiz/quiztypes'


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

export async function createQuizFile(type) {
    let data = {}

    if (type == QUIZ_TYPE.groupassignment) {
        data = {
            groups: [],
            elements: [],
            title: '',
            task: '',
            feedbacks: {},
            options: OPTIONS,
            created: new Date().getTime(),
            modified: new Date().getTime()
        }
        for (let i = 0; i < MIN_GROUPS; i++) {
            data.groups.push({
                id: i,
                color: GROUP_COLORS[i % GROUP_COLORS.length]
            })
        }
    }

    data = JSON.stringify(data)
    const newId = crypto.randomUUID()

    const filepath = path.join(
        process.cwd(),
        'static',
        'quiz',
        `${type}`,
        `${newId}.json`
    )

    const made = mkdirp.sync(path.dirname(filepath))
    fs.writeFileSync(filepath, data)

    return { id: newId, url: '/quiz/' + path.basename(filepath) }
}

export async function isValidQuizId(id, type) {
    const filepath = path.join(
        process.cwd(),
        'static',
        'quiz',
        `${type}`,
        `${id}.json`
    )

    return await fs.promises.access(filepath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

export async function updateQuizFile(id, type, data) {
    const isValidId = await isValidQuizId(id, type)

    if (isValidId) {
        data = JSON.parse(data)
        if (!data.created) data.created = new Date().getTime()
        data.modified = new Date().getTime()
        data = JSON.stringify(data)

        const filepath = path.join(
            process.cwd(),
            'static',
            'quiz',
            `${type}`,
            `${id}.json`
        )

        const made = mkdirp.sync(path.dirname(filepath))
        fs.writeFileSync(filepath, data)

        return { url: '/quiz/' + path.basename(filepath) }
    }

    return null
}
