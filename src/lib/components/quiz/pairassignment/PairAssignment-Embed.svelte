<script>
    import "../quiz.css";
    export let mode = "";
    import { page } from "$app/stores";

    const src = `/quiz/${$page.params.type}/${$page.params.id}/embed/${
        mode === "edit" ? "?mode=edit" : ""
    }`;
</script>

<iframe {src} title="framed"/>
