<script>
    import "../quiz.css";
    import { page } from "$app/stores";

    const type = $page.params.type;
    
    const mode = $page.url.searchParams.get("mode");
    const id = $page.url.searchParams.get("id");

    const src = `/quiz/${type}/embed/?mode=${mode}&id=${id}`;
</script>

<iframe
    {src}
    title="framed"
    data-is-receiver="true"
    on:load={(e) => {
        console.log("finished loading iframe");
    }}
/>
