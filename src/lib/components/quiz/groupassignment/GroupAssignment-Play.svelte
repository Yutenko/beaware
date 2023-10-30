<script>
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

    let innerHeight = 0;
    let innerWidth = 0;

    
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span class="hidden grid-rows-1 grid-rows-2 col-span-2 col-span-3 col-span-6" />

{#if validGamestate}
    {JSON.stringify(gamestate)}
{:else}
    no gamestate found
{/if}
