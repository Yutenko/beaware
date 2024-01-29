export async function load({ params, fetch }) {
    let state

    if (params.id) {
        const response = await fetch(`/casestudies/${params.id}.json`)
        state = response.status === 200 ? await response.json() : {}

        return { state };

    }

    return { state };
}