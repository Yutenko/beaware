export async function load({ url }) {
    let mode = url.searchParams.get("mode");

    return { mode };
}