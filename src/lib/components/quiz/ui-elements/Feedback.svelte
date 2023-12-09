<script>
    import { t } from "$lib/translations";
    import { confetti } from "@neoconfetti/svelte";

    let dialog;
    let feedback;

    $: if (dialog && open) {
        feedback = getFeedback();
        dialog.showModal();
    }

    export let open;
    export let feedbacks;
    export let result;
    export let elements;

    $: hasIndividualFeedbacks = elements.filter(
        (el) => typeof el.feedback !== "undefined",
    );

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
{#if open && result > 50}
    <div
        use:confetti={{
            stageHeight: window.innerHeight,
            stageWidth: window.innerWidth,
            particleCount: 140,
        }}
    />
{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="modal"
    bind:this={dialog}
    on:close={() => (open = false)}
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
            {#if hasIndividualFeedbacks}
                <h4 class="py-4">{$t("quiz.feedback.moreDescription")}</h4>
            {/if}
        </article>

        <div class="modal-action">
            <form method="dialog">
                {#if hasIndividualFeedbacks}
                    <button class="btn btn-primary">
                        {$t("quiz.feedback.more")}
                    </button>
                {/if}
                <button class="btn btn-primary">
                    {$t("core.close")}
                </button>
            </form>
        </div>
    </div>
</dialog>
