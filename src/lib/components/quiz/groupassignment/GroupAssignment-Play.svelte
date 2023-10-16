<script>
    import { draggable } from "@neodrag/svelte";
    import { tick } from "svelte";
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

    let innerHeight = 0;
    let innerWidth = 0;
    let card = { width: 0, padding: 0 };
    let orientation;
    let oldOrientation;
    let groups = [];
    let elements = [];
    let draggableelement;
    let isDragOverMe = Array(groups.length).fill(false);
    let zIndex = 0;
    let latestGroup = -1;
    let currentElement;
    let currentGroup;
    let startX;
    let startY;
    let isDragging = false;
    let groupCounter = 0;
    let elementCounter = 0;

    $: {
        orientation = innerHeight > innerWidth ? "portrait" : "landscape";
        if (oldOrientation !== orientation) {
            
        }
        oldOrientation = orientation;

        if (innerHeight < 400 || innerHeight < 300) {
            //console.log("show fullscreen, you cannot play on this size");
        }
    }
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span class="hidden grid-rows-1 grid-rows-2 col-span-2 col-span-3 col-span-6" />

<!-- svelte-ignore a11y-no-static-element-interactions -->

