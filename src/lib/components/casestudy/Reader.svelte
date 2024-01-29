<script>
    import { default as PlainEditor } from "./PlainEditor.svelte";
    import { store } from "./store.js";

    export let state = {};
    $: is404 = Object.keys(state).length === 0;

    const { readingtime, editor } = state;

    if (editor) store.setEditor(editor);
    if (readingtime) store.setReadingtime(readingtime);
</script>

{#if is404}
    <p>404</p>
{:else}
    <PlainEditor readOnly={true} />
{/if}
