import { convertLearningAppsDataToQuizData } from '$lib/server/helper';

export const actions = {
    default: async ({ request, fetch }) => {
        const formData = await request.formData()
        const url = String(formData.get('url'))

        let response = await fetch(url);
        const html = await response.text();

        var regex = /\?id=\w+/gi;
        var mat = html.match(regex)
        if (mat && mat.length > 0) {
            response = await fetch("https://learningapps.org/data" + mat[0])

            const json = await response.json()
            const o = {
                title: json.title,
                task: json.tasktext,
                tool: json.tool,
                initparameters: json.initparameters
            }
            const quizData = await convertLearningAppsDataToQuizData(o)
            return quizData
        }
        return null
    }
};