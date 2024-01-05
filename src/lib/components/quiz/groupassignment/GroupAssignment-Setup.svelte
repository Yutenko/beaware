<script>
    import { GroupAssignmentEmbed, Modal } from "$components";
    import { t } from "$lib/translations";
    import Quiz from "../shared";
    import { enhance } from "$app/forms";
    import { OPTIONS } from "./constants";
    import { page } from "$app/stores";

    let learningappsurl = "";
    let importLAForm = null;

    let title = "";
    let task = "";
    let feedbacks = {};
    let currentFeedback;
    let iframeData = {};
    let openOptionsModal = false;
    let openImportLaModal = false;
    let openDeleteQuizModal = false;
    let options = OPTIONS;

    function setCheckMode(mode) {
        options.mode.exam = mode === "exam";
        options.mode.free = mode === "free";
        options.mode.instant = mode === "instant";
        options.mode.end = mode === "end";
    }

    function setHintMode(mode) {
        options.hints.smart = mode === "smart";
        options.hints.always = mode === "always";
        options.hints.available = mode === "available";
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

<div class="flex-none absolute right-0 top-0 group-actions">
    <div class="dropdown dropdown-end">
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label tabindex="0" class="btn btn-circle btn-ghost">
            <i class="far fa-ellipsis-v" />
        </label>
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <div
            tabindex="0"
            class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
        >
            <ul
                class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
            >
                <!-- svelte-ignore a11y-missing-attribute -->
                <li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <a
                        on:click={(e) => {
                            openImportLaModal = true;
                        }}>{$t("quiz.importLA")}</a
                    >
                </li>

                <li>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <a
                        class="text-error"
                        on:click={(e) => {
                            openDeleteQuizModal = true;
                        }}>{$t("quiz.delete")}</a
                    >
                </li>
            </ul>
        </div>
    </div>
</div>

<div class="container mx-auto max-w-6xl">
    <div class="mb-6" />

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
            <!-- svelte-ignore a11y-invalid-attribute -->
            <a
                class="btn btn-primary"
                href="/quiz/{$page.params
                    .type}/embed?id={$page.url.searchParams.get('id')}"
                target="_blank"
            >
                <i class="fas fa-gamepad" />{$t("quiz.play")}</a
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
        action="?/update&id={$page.url.searchParams.get('id')}"
        use:enhance
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
        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="mt-8 mb-4 collapse cursor-pointer bg-base-200">
            <input type="checkbox" />
            <div class="collapse-title text-base font-medium">
                {$t("quiz.settings.mode.title")}
            </div>
            <div class="collapse-content">
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text font-semibold"
                            >{$t("quiz.settings.mode.free")}</span
                        ><br />
                        <span>{$t("quiz.settings.mode.freeDescription")} </span>
                        <input
                            type="radio"
                            name="radio-20"
                            class="radio"
                            on:change={() => setCheckMode("free")}
                            checked={options.mode.free}
                        />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text font-semibold"
                            >{$t("quiz.settings.mode.exam")}</span
                        ><br />
                        <span>{$t("quiz.settings.mode.examDescription")} </span>
                        <input
                            type="radio"
                            name="radio-20"
                            class="radio"
                            on:change={() => setCheckMode("exam")}
                            checked={options.mode.exam}
                        />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text font-semibold"
                            >{$t("quiz.settings.mode.instant")}</span
                        ><br />
                        <span
                            >{$t("quiz.settings.mode.instantDescription")}
                        </span>
                        <input
                            type="radio"
                            name="radio-20"
                            class="radio"
                            on:change={() => setCheckMode("instant")}
                            checked={options.mode.instant}
                        />
                    </label>
                </div>
                <div class="form-control">
                    <label class="label cursor-pointer">
                        <span class="label-text font-semibold"
                            >{$t("quiz.settings.mode.end")}</span
                        ><br />
                        <span>{$t("quiz.settings.mode.endDescription")} </span>
                        <input
                            type="radio"
                            name="radio-20"
                            class="radio"
                            on:change={() => setCheckMode("end")}
                            checked={options.mode.end}
                        />
                    </label>
                </div>
            </div>
        </div>

        <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="mb-4 collapse cursor-pointer bg-base-200">
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

<Modal bind:open={openImportLaModal}>
    <h3 class="font-bold text-lg" slot="header">{$t("quiz.importLA")}</h3>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div slot="body">
        <div class="form-control w-full">
            <form
                bind:this={importLAForm}
                method="post"
                action="?/importla&id={$page.url.searchParams.get(
                    'id',
                )}&mode={$page.url.searchParams.get('mode')}"
            >
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <input
                    type="text"
                    class="input input-bordered w-full"
                    aria-label="Import"
                    name="learningappsurl"
                    on:paste={(e) => {
                        // timeout because paste is fired before input receives value
                        // timeout waits until value is set
                        setTimeout(() => {
                            importLAForm.submit();
                        }, 0);
                    }}
                    bind:value={learningappsurl}
                />
            </form>
        </div>
    </div>
    <button
        class="btn btn-primary"
        slot="footer"
        on:click={() => {
            importLAForm?.submit();
        }}
    >
        {$t("quiz.convert")}
    </button>
</Modal>

<Modal bind:open={openDeleteQuizModal}>
    <h3 class="font-bold text-lg" slot="header">{$t("quiz.delete")}</h3>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div slot="body">
        <p class="pt-4">{$t("quiz.deleteDescription")}</p>
    </div>
    <div slot="footer">
        <form
            method="post"
            action="?/delete&id={$page.url.searchParams.get(
                'id',
            )}&mode={$page.url.searchParams.get('mode')}"
            use:enhance
        >
            <button class="btn btn-secondary" type="submit">
                {$t("quiz.deletePermanent")}
            </button>
            <button class="btn btn-primary" on:click={() => {}}>
                {$t("core.close")}
            </button>
        </form>
    </div>
</Modal>

<div class="pb-96" />
