import { createQuizFile, updateQuizFile, uploadFile } from '$lib/server/db';
import { GROUP_COLORS, OPTIONS } from '$components/quiz/groupassignment/constants'
import { default as QUIZ_TYPE } from '$components/quiz/types'

const LA_QUIZ_TYPES = {
    groupassignment: 86,
}

export async function convertLearningAppsDataToQuizData(id, learningappsurl, data) {
    let quiz = {
        title: data.title,
        task: data.task,
        convertedFrom: learningappsurl,
    }

    if (data.tool == LA_QUIZ_TYPES.groupassignment) {
        quiz.groups = []
        quiz.elements = []

        data.initparameters = decodeURIComponent(data.initparameters);
        var regexCluster = /cluster\d=/gm;
        var regexFeedback = /feedback=/gm;

        const feedback = data.initparameters.split(regexFeedback)[1];
        quiz.feedbacks = {
            "100": feedback,
        }
        let cluster = data.initparameters.split(regexCluster);
        cluster.shift()

        for (let i = 0; i < cluster.length; i++) {
            const all = cluster[i].split("||")
            const group = all[0].split("|")
            quiz.groups.push({
                src: group[1],
                type: group[0],
                id: i,
                backgroundColor: GROUP_COLORS[i]
            })
            all.shift()
            for (let j = 0; j < all.length; j++) {
                const element = all[j].split("|")
                let type = element[0]
                if (type.includes('text') || type.includes('image')) {
                    var el = {}
                    el.type = type.split("=")[1]
                    el.src = element[1]
                    if (element[2]) el.hint = element[2]
                    el.group = i

                    quiz.elements.push(el)
                }
            }
        }

        function blobToFile(blob) {
            return new File([blob], '', { lastModified: new Date().getTime(), type: blob.type })
        }

        async function uploadImage(arr, index) {
            const res = await fetch(arr[index].src)
            if (res.ok) {
                let blob = await res.blob();
                const data = blobToFile(blob)
                const up = await uploadFile(data)
                return up
            }
            return arr[index].src
        }

        const updatedGroups = await Promise.all(quiz.groups.map(async (group, index) => {
            if (group.type == 'image') {
                const img = await uploadImage(quiz.groups, index)
                group.src = img.url
            }
        }))

        const updatedElements = await Promise.all(quiz.elements.map(async (element, index) => {
            if (element.type == 'image') {
                const img = await uploadImage(quiz.elements, index)
                element.src = img.url
            }
        }))

        quiz.options = OPTIONS


        if (!id) {
            id = await createQuizFile()
        }
        const updatedQuiz = await updateQuizFile(id, QUIZ_TYPE.groupassignment, JSON.stringify(quiz))
        return updatedQuiz
    }

    return null
}



export function calcReadindAndViewingTime(data) {
    const wordsPerMinute = 238;
    const secondsPerImage = 10;
    let wordCount = 0;
    let imageViewingTime = 0;

    data.blocks.map(el => {
        if (el.type == 'paragraph' || el.type == 'header') {
            wordCount += el.data.text.length;
        } else if (el.type == 'checklist') {
            el.data.items.map(item => wordCount += item.text.length)
        } else if (el.type == 'table') {
            el.data.content.map(item => {
                item.map(text => wordCount += text.length)
            })
        } else if (el.type == 'quote') {
            wordCount += el.data.text.length;
            wordCount += el.data.caption.length;
        } else if (el.type == 'list') {
            el.data.items.map(item => wordCount += item.length)
        } else if (el.type == 'warning') {
            wordCount += el.data.title.length;
            wordCount += el.data.message.length;
        } else if (el.type == 'image') {
            imageViewingTime += secondsPerImage;
        }
    })

    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    
    return readingTime + imageViewingTime
}
