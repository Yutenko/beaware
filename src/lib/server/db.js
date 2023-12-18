import path from 'path'
import { mkdirp } from 'mkdirp'
import fs from 'fs'
import { OPTIONS, MIN_GROUPS, GROUP_COLORS } from '$components/quiz/groupassignment/constants'
import { default as QUIZ_TYPE } from '$components/quiz/quiztypes'
import { readFile } from 'fs/promises'
import { log } from 'console'


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

export async function deleteQuizFile(id, type) {
    const filepath = path.join(
        process.cwd(),
        'static',
        'quiz',
        `${type}`,
        `${id}.json`
    )

    return await fs.promises.unlink(filepath)
}

export async function getQuizFile(id, type) {
    const filepath = path.join(
        process.cwd(),
        'static',
        'quiz',
        `${type}`,
        `${id}.json`
    )
    const quiz = await readFile(filepath, { encoding: 'utf8' })
    return JSON.parse(quiz)
}

export async function getAllQuizFiles(type) {
    const filepath = path.join(
        process.cwd(),
        'static',
        'quiz',
        `${type}`
    )

    return await fs.promises.access(filepath, fs.constants.F_OK)
        .then(async () => {
            let files = await fs.promises.readdir(filepath)

            files = await Promise.all(files.map(async file => {
                const quizId = path.parse(file).name
                const quiz = await getQuizFile(quizId, type)

                return {
                    id: quizId,
                    title: quiz.title,
                    play: `/quiz/${type}/embed?id=${quizId}`,
                    edit: `/quiz/${type}/setup?mode=edit&id=${quizId}`
                }
            }))

            return files
        })
        .catch(() => {
            return []
        })

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
