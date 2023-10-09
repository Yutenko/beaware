<script>
    import { t } from "$lib/translations";
    import ColorPicker from "svelte-awesome-color-picker";
    export let groups;
    import Quiz from "../shared";
    import { onMount } from "svelte";

    function handleTextChange(e, group) {
        group.src = e.target.value;
        Quiz.sender.api.updateChild(group);
    }

    let rgb;

    // dirty hack to fix colorpicker popupposition without rewriting the library (updatesafe)
    onMount(() => {
        setTimeout(() => {
            document.querySelectorAll(".wrapper").forEach((el) => {
                el.style.right = "0px";
            });
        }, 100);
    });
</script>

<ul role="list" class="divide-y divide-gray-100 w-full">
    {#each groups as group, i}
        <li class="flex items-center justify-between gap-x-6 py-5">
            <div class=" min-w-[5rem]">
                <div class="flex items-start gap-x-3">
                    <p class="text-sm font-semibold leading-6 text-gray-900">
                        {$t("quiz.pairassignment.category")}
                        {group.id + 1}
                    </p>
                </div>
            </div>
            {#if group.type === "text"}
                <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full"
                    value={group.src}
                    on:input={(e) => handleTextChange(e, group)}
                />
            {:else if group.type === "image"}
                <div>image</div>
            {:else}
                <div />
            {/if}
            <div class="flex flex-none items-center gap-x-4">
                <ColorPicker bind:rgb label="" isTextInput={false} />
                <div class="relative flex-none">
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
                                        on:click={() => {
                                            Quiz.sender.api.resetContainer(
                                                group
                                            );
                                        }}>{$t("core.reset")}</a
                                    >
                                </li>
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <li>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <a
                                        class="text-error"
                                        on:click={() => {
                                            Quiz.sender.api.removeContainer(
                                                group
                                            );
                                        }}>{$t("core.delete")}</a
                                    >
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    {/each}
</ul>
