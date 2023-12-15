<script>
    import { t } from "$lib/translations";
    import { confetti } from "@neoconfetti/svelte";
    import { tweened } from "svelte/motion";
    import { cubicOut } from "svelte/easing";

    export let solved;
    export let feedbacks;
    export let result;

    let dialog;
    let feedback;

    const progress = tweened(0, {
        duration: 800,
        easing: cubicOut,
    });
    $: progressPercent = parseInt($progress * 100);

    $: if (dialog && solved) {
        feedback = getFeedback();
        progress.set(result / 100);
        dialog.showModal();
    }

    function getFeedback() {
        result = parseInt(result);

        let keys = Object.keys(feedbacks)
            .map(Number)
            .sort((a, b) => a - b);
        let resultKey = keys[0];

        for (let key of keys) {
            if (key >= result) {
                resultKey = key;
                break;
            }
        }

        return feedbacks[resultKey];
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
{#if solved && result > 49}
    <div class="center" use:confetti={{ particleCount: result, force: 0.9, }} />
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="modal"
    bind:this={dialog}
    on:close={() => (solved = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="modal-box" on:click|stopPropagation>
        <!-- svelte-ignore missing-declaration -->
        <article class="prose">
            <!-- svelte-ignore missing-declaration -->
            <h3 class="relative">
                {feedback}
            </h3>
            <div
                class="radial-progress progress"
                style="--value:{progressPercent};--thickness: 2px;--size: 3.5rem"
                role="progressbar"
            >
                {progressPercent}%
            </div>
        </article>

        <div class="modal-action">
            <form method="dialog">
                <button class="btn btn-primary" on:click>
                    {$t("core.close")}
                </button>
            </form>
        </div>
    </div>
</dialog>

<style>
    .progress {
        position: absolute !important;
    }
    .center {
        position: absolute;
        top:20%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 10px;

    }
</style>
