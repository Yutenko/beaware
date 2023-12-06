<script>
    import { GroupAssignmentEmbed, Modal } from "$components";
    import { t } from "$lib/translations";
    import Quiz from "../shared";
    import { enhance } from "$app/forms";

    let title = "";
    let task = "";
    let feedbacks = {};
    let currentFeedback;
    let iframeData = {};
    let openOptionsModal = false;

    let options = {
        check: {
            manual: true,
            auto: false,
            instant: true,
            end: false,
        },
        frequency: {
            once: true,
            infinite: false,
        },
        hints: {
            available: true,
            always: false,
            smart: false,
        },
    };

    function setHintMode(mode) {
        options.hints.smart = mode === "smart";
        options.hints.always = mode === "always";
        options.hints.available = mode === "available";
    }
    function setCheckFrequency(frequency) {
        options.frequency.once = frequency === "once";
        options.frequency.infinite = frequency === "infinite";
    }
    function setManualCheckMode() {
        options.check.manual = true;
        options.check.auto = false;
    }
    function setAutoCheckMode() {
        options.check.auto = true;
        options.check.manual = false;
    }
    function toggleCheckResponse() {
        options.check.instant = !options.check.instant;
        options.check.end = !options.check.end;
    }

    $: state = JSON.stringify(
        Object.assign(iframeData, { title, task, feedbacks, options }),
    );

    $: feedbacksPercentage =
        Object.keys(feedbacks).length === 0 ? 100 : feedbacksPercentage;

    function selectFeedback(perc) {
        clearFeedbackMarkers(perc);
        currentFeedback = feedbacks[perc];
        feedbacksPercentage = perc;
    }

    function clearFeedbackMarkers(perc) {
        Object.keys(feedbacks).forEach((key) => {
            if (feedbacks[key] === -1 && key !== perc) {
                delete feedbacks[key];
            }
        });
        feedbacks = feedbacks;
    }

    function handleFeedbacksPercentage(perc) {
        currentFeedback = feedbacks[feedbacksPercentage];
        clearFeedbackMarkers(perc);
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
            if (data.options) options = { ...options, ...data.options };

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
                "quiz.groupassignment.addGroup",
            )}</button
        >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="self-end">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="btn btn-circle btn-ghost"
                on:click={(e) => {
                    openOptionsModal = true;
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
                : "quiz.feedback.startFrom",
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

<Modal bind:open={openOptionsModal}>
    <h3 class="font-bold text-lg" slot="header">{$t("quiz.settings.title")}</h3>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div slot="body">
        <h4 class="mt-8 mb-4 text-neutral-content">
            {$t("quiz.settings.check.title")}
        </h4>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="mb-4 collapse cursor-pointer {options.check.manual
                ? 'bg-success'
                : 'bg-base-200'} {options.check.auto
                ? 'collapse-close'
                : 'collapse-open'}"
            on:click={setManualCheckMode}
        >
            <div class="collapse-title text-base font-medium">
                {$t("quiz.settings.check.manual")}
            </div>
        </div>

        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            class="collapse cursor-pointer {options.check.auto
                ? 'bg-success'
                : 'bg-base-200'} {options.check.manual
                ? 'collapse-close'
                : 'collapse-open'}"
            on:click={setAutoCheckMode}
        >
            <div class="collapse-title text-base font-medium">
                {$t("quiz.settings.check.auto")}
            </div>
            <div class="collapse-content">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"
                            >{$t("quiz.settings.check.instant")} <br />
                            <span class="font-light"
                                >{$t(
                                    "quiz.settings.check.instantDescription",
                                )}</span
                            ></span
                        >
                        <input
                            type="radio"
                            name="radio-20"
                            class="radio"
                            on:change={toggleCheckResponse}
                            checked={options.check.instant}
                        />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"
                            >{$t("quiz.settings.check.end")} <br />
                            <span class="font-light"
                                >{$t(
                                    "quiz.settings.check.endDescription",
                                )}</span
                            ></span
                        >
                        <input
                            type="radio"
                            name="radio-20"
                            class="radio"
                            on:change={toggleCheckResponse}
                            checked={options.check.end}
                        />
                    </label>
                </div>
            </div>
        </div>

        <h4 class="mt-8 mb-4 text-neutral-content">
            {$t("quiz.settings.frequency.title")}
        </h4>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="collapse cursor-pointer bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-base font-medium">
                {$t("quiz.settings.frequency.title")}
            </div>
            <div class="collapse-content">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"
                            >{$t("quiz.settings.frequency.once")}
                        </span>
                        <input
                            type="radio"
                            name="radio-30"
                            class="radio"
                            on:change={() => setCheckFrequency("once")}
                            checked={options.frequency.once}
                        />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"
                            >{$t("quiz.settings.frequency.infinite")}</span
                        >
                        <input
                            type="radio"
                            name="radio-30"
                            class="radio"
                            on:change={() => setCheckFrequency("infinite")}
                            checked={options.frequency.infinite}
                        />
                    </label>
                </div>
            </div>
        </div>

        <h4 class="mt-8 mb-4 text-neutral-content">
            {$t("quiz.settings.hints.title")}
        </h4>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="collapse cursor-pointer bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-base font-medium">
                {$t("quiz.settings.hints.title")}
            </div>
            <div class="collapse-content">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"
                            >{$t("quiz.settings.hints.available")}
                        </span>
                        <input
                            type="radio"
                            name="radio-40"
                            class="radio"
                            on:change={() => setHintMode("available")}
                            checked={options.hints.available}
                        />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"
                            >{$t("quiz.settings.hints.always")}</span
                        >
                        <input
                            type="radio"
                            name="radio-40"
                            class="radio"
                            on:change={() => setHintMode("always")}
                            checked={options.hints.always}
                        />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text"
                            >{$t("quiz.settings.hints.smart")}</span
                        >
                        <input
                            type="radio"
                            name="radio-40"
                            class="radio"
                            on:change={() => setHintMode("smart")}
                            checked={options.hints.smart}
                        />
                    </label>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary" slot="footer">
        {$t("core.close")}
    </button>
</Modal>

<div class="pb-96" />
