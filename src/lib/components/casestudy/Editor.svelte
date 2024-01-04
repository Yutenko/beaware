<script>
    import { onMount } from "svelte";
    import { default as PlainEditor } from "./PlainEditor.svelte";
    import { default as ChooseQuiz } from "./ChooseQuiz.svelte";
    import { store } from "./store.js";

    export let state = {};
    $: is404 = Object.keys(state).length === 0;

    const { quiz, editor } = state;
    if (quiz) store.setQuiz(quiz);
    if (editor) store.setEditor(editor);

    function save() {
        let formData = new FormData();
        formData.append("quiz", JSON.stringify($store.quiz));
        formData.append("editor", JSON.stringify($store.editor));

        fetch(window.location.href, {
            body: formData,
            method: "post",
        });
    }

    onMount(() => {
        return () => {
            save();
        };
    });
</script>

<button on:click={save}>Save</button>

{#if is404}
    <p>404</p>
{:else}
    <PlainEditor />
    <ChooseQuiz />
{/if}
