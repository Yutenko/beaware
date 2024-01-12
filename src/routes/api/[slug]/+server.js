import { json } from '@sveltejs/kit';
import { uploadFile, getAllQuizFiles, getAllCasestudyFiles } from '$lib/server/db';


export async function POST({ params, request }) {
    const { slug } = params
    let o = { success: 0 }


    if (slug === "upload") {
        const data = Object.fromEntries(await request.formData())
        const res = await uploadFile(data.image)

        o = {
            success: 1,
            file: {
                url: res.url
            }
        }
        return json(o)
    }

    return json(o);
};


export async function GET({ cookies, fetch, params, request, url }) {
    const { slug } = params
    let o = { success: 0 }

    if (slug === "getallquizzes") {
        const quizzes = await getAllQuizFiles()

        o = {
            success: 1,
            quizzes
        }
        return json(o)
    }

    if (slug === "getallcasestudies") {
        const casestudies = await getAllCasestudyFiles()

        o = {
            success: 1,
            casestudies
        }
        return json(o)
    }


    return json(o);
}