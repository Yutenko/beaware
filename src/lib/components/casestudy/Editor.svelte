<script>
    import { onMount } from "svelte";
    import { default as PlainEditor } from "./PlainEditor.svelte";
    import { default as ChooseQuiz } from "./ChooseQuiz.svelte";
    import { default as Navbar } from "./Navbar.svelte";
    import { store } from "./store.js";

    export let state = {};
    $: is404 = Object.keys(state).length === 0;

    const { title, quiz, editor } = state;
    
    if (title) store.setTitle(title);
    if (quiz) store.setQuiz(quiz);
    if (editor) store.setEditor(editor);

</script>

{#if is404}
    <p>404</p>
{:else}
    <Navbar />
    <PlainEditor />
    <ChooseQuiz />
{/if}
