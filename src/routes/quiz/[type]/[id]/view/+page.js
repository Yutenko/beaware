export async function load({ url, params }) {
    let mode = url.searchParams.get("mode");
    return { mode, params };
}