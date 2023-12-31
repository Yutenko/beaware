import { json } from '@sveltejs/kit';
import { uploadFile, getAllQuizFiles } from '$lib/server/db';


export async function POST({ cookies, fetch, params, request, url }) {
    const { slug } = params
    let o = { success: 0 }


    if (slug === "uploadimage") {
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


    return json(o);
}