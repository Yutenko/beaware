<script>
    import { default as PlainEditor } from "./PlainEditor.svelte";
    import { QuizFinder } from "$components/index";
    

    export let state;
    const { editor, quiz } = state || {};

    onMount(() => {
        return () => {
            console.log("destroying editor");
        }
    });
</script>

<PlainEditor data={editor} />

<div class="ce-block__content">
    <QuizFinder />
</div>
