export async function load({ url, params, fetch }) {
    let mode = url.searchParams.get("mode") !== 'null' ? url.searchParams.get("mode") : "";
    let id = url.searchParams.get("id") !== 'null' ? url.searchParams.get("id") : null;
    let gamestate

    if (id) {
        const response = await fetch(`/quizzes/${params.type}/${id}.json`)
        gamestate = response.status === 200 ? await response.json() : {}
        return { mode, gamestate };

    }

    return { mode, gamestate };
}