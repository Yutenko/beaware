<script>
    import { Modal } from "$components";
    import { t } from "$lib/translations";

    export let open = false;
    export let options = {};

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

    function setThreshold(e) {
        options.threshold = parseInt(e.target.value);
    }
</script>

<Modal bind:open>
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
                <div class="overflow-x-auto">
                    <table class="table">
                        <tbody>
                            <tr on:click={() => setCheckMode("free")}>
                                <td>{$t("quiz.settings.mode.free")}</td>
                                <td colspan="2"
                                    >{$t(
                                        "quiz.settings.mode.freeDescription",
                                    )}</td
                                >
                                <td
                                    ><input
                                        type="radio"
                                        name="radio-20"
                                        class="radio"
                                        on:change={() => setCheckMode("free")}
                                        checked={options.mode.free}
                                    /></td
                                >
                            </tr>
                            <tr on:click={() => setCheckMode("exam")}>
                                <td>{$t("quiz.settings.mode.exam")}</td>
                                <td colspan="2"
                                    >{$t(
                                        "quiz.settings.mode.examDescription",
                                    )}</td
                                >
                                <td
                                    ><input
                                        type="radio"
                                        name="radio-20"
                                        class="radio"
                                        on:change={() => setCheckMode("exam")}
                                        checked={options.mode.exam}
                                    /></td
                                >
                            </tr>
                            {#if options.mode.exam}
                                <tr>
                                    <td colspan="4">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span
                                                    class="label-text text-info"
                                                    >{$t(
                                                        "quiz.settings.threshold",
                                                    )}</span
                                                >
                                            </div>
                                            <input
                                                type="number"
                                                class="input w-full"
                                                placeholder="0%"
                                                value={options.threshold}
                                                on:change={setThreshold}
                                            />
                                        </label>
                                    </td>
                                </tr>
                            {/if}
                            <tr on:click={() => setCheckMode("instant")}>
                                <td>{$t("quiz.settings.mode.instant")}</td>
                                <td colspan="2"
                                    >{$t(
                                        "quiz.settings.mode.instantDescription",
                                    )}</td
                                >
                                <td
                                    ><input
                                        type="radio"
                                        name="radio-20"
                                        class="radio"
                                        on:change={() =>
                                            setCheckMode("instant")}
                                        checked={options.mode.instant}
                                    /></td
                                >
                            </tr>
                            {#if options.mode.instant}
                                <tr>
                                    <td colspan="4">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span
                                                    class="label-text text-info"
                                                    >{$t(
                                                        "quiz.settings.threshold",
                                                    )}</span
                                                >
                                            </div>
                                            <input
                                                type="number"
                                                class="input w-full"
                                                placeholder="0%"
                                                value={options.threshold}
                                                on:change={setThreshold}
                                            />
                                        </label>
                                    </td>
                                </tr>
                            {/if}
                            <tr on:click={() => setCheckMode("end")}>
                                <td>{$t("quiz.settings.mode.end")}</td>
                                <td colspan="2"
                                    >{$t(
                                        "quiz.settings.mode.endDescription",
                                    )}</td
                                >
                                <td
                                    ><input
                                        type="radio"
                                        name="radio-20"
                                        class="radio"
                                        on:change={() => setCheckMode("end")}
                                        checked={options.mode.end}
                                    /></td
                                >
                            </tr>
                            {#if options.mode.end}
                                <tr>
                                    <td colspan="4">
                                        <label class="form-control w-full">
                                            <div class="label">
                                                <span
                                                    class="label-text text-info"
                                                    >{$t(
                                                        "quiz.settings.threshold",
                                                    )}</span
                                                >
                                            </div>
                                            <input
                                                type="number"
                                                class="input w-full"
                                                placeholder="0%"
                                                value={options.threshold}
                                                on:change={setThreshold}
                                            />
                                        </label>
                                    </td>
                                </tr>
                            {/if}
                        </tbody>
                    </table>
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
                <div class="overflow-x-auto">
                    <table class="table">
                        <tbody>
                            <tr on:click={() => setHintMode("available")}>
                                <td>{$t("quiz.settings.hints.available")}</td>
                                <td colspan="2"></td>
                                <td
                                    ><input
                                        type="radio"
                                        name="radio-40"
                                        class="radio"
                                        on:change={() =>
                                            setHintMode("available")}
                                        checked={options.hints.available}
                                    /></td
                                >
                            </tr>
                            <tr on:click={() => setHintMode("always")}>
                                <td>{$t("quiz.settings.hints.always")}</td>
                                <td colspan="2"></td>
                                <td
                                    ><input
                                        type="radio"
                                        name="radio-40"
                                        class="radio"
                                        on:change={() => setHintMode("always")}
                                        checked={options.hints.always}
                                    /></td
                                >
                            </tr>
                            <tr on:click={() => setHintMode("smart")}>
                                <td>{$t("quiz.settings.hints.smart")}</td>
                                <td colspan="2"></td>
                                <td
                                    ><input
                                        type="radio"
                                        name="radio-40"
                                        class="radio"
                                        on:change={() => setHintMode("smart")}
                                        checked={options.hints.smart}
                                    /></td
                                >
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <button class="btn btn-primary" slot="footer">
        {$t("core.close")}
    </button>
</Modal>
