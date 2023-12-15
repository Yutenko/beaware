<script>
    import { t } from "$lib/translations";

    export let mode = {};
    export let finished = false;
    export let assignedElementsCount = 0;

    let checkButton;

    // visibility
    $: visible = mode.free || (mode.exam && finished);

    // check all modes
    function onClick() {
        if (mode.exam) {
            visible = false;
        }
    }
    $: if (assignedElementsCount && mode.instant) {
        checkButton.click();
    } else if (finished && mode.end) {
        checkButton.click();
    }
</script>

<button
    class="btn btn-active btn-primary absolute bottom-4 right-0 left-0 ml-auto mr-auto w-fit rounded-full {visible
        ? 'block'
        : 'hidden'}"
    style="z-index: 9999999999999999"
    bind:this={checkButton}
    on:click
    on:click={onClick}
    >{$t("quiz.checkSolution")}
</button>
