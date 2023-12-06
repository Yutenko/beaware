<script>
    import { t } from "$lib/translations";
    export let mode = {};
</script>

<button
    class="btn btn-active btn-primary absolute bottom-4 right-0 left-0 ml-auto mr-auto w-fit z-10 rounded-full
    {mode.manual ? 'block' : 'hidden'}
    {mode.auto ? 'hidden' : 'block'}"
    on:click
    >{$t("quiz.checkSolution")}
</button>
