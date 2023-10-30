<script>
    import Task from "../Task.svelte";
    import {
        MIN_GROUPS,
        MAX_GROUPS,
        MAX_ELEMENTS,
        POSITIONS,
    } from "./constants.json";

    import {
        resizetext,
        linkify,
        focus,
        zoom,
        tooltip,
        clicksound,
    } from "$lib/actions";

    export let gamestate;
    $: validGamestate =
        gamestate?.groups?.length >= MIN_GROUPS &&
        gamestate?.groups?.length <= MAX_GROUPS &&
        gamestate?.elements?.length < MAX_ELEMENTS;

    let task = gamestate.task;
    let title = gamestate.title;
    let groups = gamestate.groups;
    let elements = gamestate.elements;
    let feedbacks = gamestate.feedbacks;

    let openTask = true;

    let innerHeight = 0;
    let innerWidth = 0;
    let orientation = "landscape";
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span class="hidden grid-rows-1 grid-rows-2 col-span-2 col-span-3 col-span-6" />
<Task bind:open={openTask} {title} {task} />

{#if validGamestate}
    <!-- svelte-ignore missing-declaration -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="grid grid-cols-6 grid-rows-{POSITIONS[groups.length][orientation]
            .rows} overflow-hidden h-screen"
    >
        {#each groups as g, i}
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="col-span-{POSITIONS[groups.length][orientation].span[
                    i
                ]} relative group"
                style="background-color:{g.backgroundColor};"
                id="group-{g.id}"
            >
                <div
                    class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                >
                    {#if g.type === "text"}
                        <div
                            class="text-black text-center edit-group mt-20 mb-20"
                            use:linkify
                            use:resizetext
                        >
                            {g.src}
                        </div>
                    {:else if g.type === "image"}
                        <!-- svelte-ignore a11y-missing-attribute -->
                        <img class="w-full h-full object-contain" src={g.src} />
                    {/if}
                </div>
            </div>
        {/each}
    </div>
{:else}
    <p>no gamestate found</p>
{/if}


