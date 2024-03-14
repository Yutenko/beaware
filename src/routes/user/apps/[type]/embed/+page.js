export async function load({ params, url }) {
    const id = url.searchParams.get('id');
    return { params, id };
}