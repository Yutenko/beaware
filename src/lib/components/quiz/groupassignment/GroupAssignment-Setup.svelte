<script>
    import { GroupAssignmentEmbed } from "$components";
    import { t } from "$lib/translations";
    import Quiz from "../shared";
    import { enhance } from "$app/forms";

    let title = "";
    let task = "";
    let feedbacks = {};
    let currentFeedback;
    let iframeData = {};

    $: state = JSON.stringify(
        Object.assign(iframeData, { title, task, feedbacks })
    );

    $: feedbacksPercentage =
        Object.keys(feedbacks).length === 0 ? 100 : feedbacksPercentage;

    function selectFeedback(perc) {
        clearFeedbackMarkers(perc)
        currentFeedback = feedbacks[perc];
        feedbacksPercentage = perc;
    }

    function clearFeedbackMarkers(perc) {
        Object.keys(feedbacks).forEach((key) => {
            if (feedbacks[key] === -1 && key !== perc) {
                delete feedbacks[key];
            }
        })
        feedbacks = feedbacks
    }

    function handleFeedbacksPercentage(perc) {
        currentFeedback = feedbacks[feedbacksPercentage];
        clearFeedbackMarkers(perc)
    }

    function markFeedbackPercentage() {
        if (!feedbacks[feedbacksPercentage]) {
            feedbacks[feedbacksPercentage] = -1;
        }
    }

    function handleSolutionBasedFeedback(e) {
        const trimmed = e.target.value.trim();
        feedbacks[feedbacksPercentage] = trimmed;
        if (trimmed.length === 0) delete feedbacks[feedbacksPercentage];
    }

    Quiz.sender.init({
        onInitalData: (data) => {
            if (data.title) title = data.title;
            if (data.task) task = data.task;
            if (data.feedbacks) feedbacks = data.feedbacks;
            selectFeedback(100);
        },
        onUpdate: (data) => {
            iframeData = data;
        },
    });
</script>

<div class="pt-24" />

<div class="container mx-auto max-w-6xl">
    <h4 class="text-xl">{$t("quiz.title")}</h4>
    <div class="form-control w-full">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <input
            type="text"
            class="input input-bordered w-full"
            bind:value={title}
        />
    </div>

    <div class="mb-6" />

    <h4 class="text-xl">{$t("quiz.task")}</h4>
    <div class="form-control w-full">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">
            <span class="label-text">{$t("quiz.taskDescription")}</span>
        </label>
        <textarea class="textarea textarea-bordered" bind:value={task} />
    </div>
</div>

<div class="mb-6" />

<div
    class="container mx-auto flex flex-col items-center setup-container max-w-6xl"
>
    <GroupAssignmentEmbed />

    <div class="flex w-full justify-between mt-5 mb-5">
        <button
            class="btn btn-primary self-start"
            on:click={Quiz.sender.api.addContainer}
            ><i class="fas fa-plus" />{$t(
                "quiz.groupassignment.addGroup"
            )}</button
        >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="self-end">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="btn btn-circle btn-ghost"
                on:click={(e) => {
                    alert("restliche Einstellungen");
                }}
            >
                <i class="fal fa-wrench" />
            </div>
            <button class="btn btn-primary"
                ><i class="fas fa-gamepad" />{$t("quiz.play")}</button
            >
        </div>
    </div>
</div>

<div class="container mx-auto max-w-6xl">
    <h4 class="text-xl">{$t("quiz.feedback.title")}</h4>
    <p class="label-text">{$t("quiz.feedback.basedOnSolutionDescription")}</p>

    <div class="mb-6" />

    {#if Object.keys(feedbacks).length > 0}
        <input
            type="range"
            min="0"
            max="100"
            bind:value={feedbacksPercentage}
            class="range range-primary mt-4 mb-4"
            on:input={handleFeedbacksPercentage}
            on:change={markFeedbackPercentage}
        />
        <div
            class="w-full flex justify-between text-xs px-2 relative h-16"
            style="margin-left:-25px"
        >
            {#each Object.keys(feedbacks) as key}
                <!-- svelte-ignore missing-declaration -->
                <!-- svelte-ignore missing-declaration -->
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="btn btn-circle btn-outline absolute"
                    style="left:{key}%;opacity:{feedbacks[key] === -1
                        ? 0.2
                        : 1};"
                    on:click={(e) => {
                        selectFeedback(key);
                    }}
                >
                    {key}%
                </div>
            {/each}
        </div>
    {/if}
    <textarea
        class="textarea textarea-bordered w-full textarea-lg"
        placeholder={`${$t(
            feedbacksPercentage === 100
                ? "quiz.feedback.solved100"
                : "quiz.feedback.startFrom"
        )} ${feedbacksPercentage !== 100 ? feedbacksPercentage + "%" : ""}`}
        on:input={handleSolutionBasedFeedback}
        bind:value={currentFeedback}
    />

    <form
        method="post"
        use:enhance={() => {
            return async ({ result, update }) => {
                if (result.data?.url) {
                    console.log(result.data.url);
                }
                update();
            };
        }}
    >
        <input class="hidden" name="state" value={state} />
        <div class="flex w-full flex-row-reverse mt-5 mb-5">
            <button type="submit" class="btn btn-primary"
                ><i class="fas fa-save" />{$t("quiz.save")}</button
            >
        </div>
    </form>
</div>

<div class="pb-96" />
