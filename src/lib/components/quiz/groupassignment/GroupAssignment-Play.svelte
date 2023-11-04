<script>
    import Task from "../Task.svelte";
    import { draggable } from "@neodrag/svelte";
    import { onMount } from "svelte";
    import Quiz from "../shared";
    import {
        MIN_GROUPS,
        MAX_GROUPS,
        MAX_ELEMENTS,
        POSITIONS,
    } from "./constants.json";

    import { resizetext, linkify, zoom, tooltip } from "$lib/actions";

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
    let orientation;
    let oldOrientation;

    let draggableelement;
    let isDragging = false;
    let zIndex = 100;
    let latestGroup = -1;
    let isDragOverMe = Array(groups.length).fill(false);
    let currentElementIndex = 0;

    $: {
        orientation = innerHeight > innerWidth ? "portrait" : "landscape";
        if (oldOrientation !== orientation) {
        }
        oldOrientation = orientation;

        if (innerHeight < 400 || innerHeight < 300) {
            //console.log("show fullscreen, you cannot play on this size");
        }
    }

    function handleCardDragStart(e, el) {
        el.zIndex = zIndex++;
        draggableelement = e.target;
        draggableelement.style.zIndex = el.zIndex;
    }
    function handleCardDragEnd(e, el) {
        draggableelement = null;
        currentElementIndex = currentElementIndex + 1;  
    }
    function handleMouseMove(e, el) {
        // prevents children from being triggered by clicking
        if (!draggableelement) {
            isDragging = false;
            return;
        } else {
            isDragging = true;
        }

        const { clientX, clientY } = e;

        let temp = [];
        for (let index = 0; index < groups.length; index++) {
            if (groups[index].id !== latestGroup) {
                const backgroundDiv = document.querySelector(
                    `#group-${groups[index].id}`
                );
                const backgroundRect = backgroundDiv.getBoundingClientRect();
                const isOverMe =
                    clientX >= backgroundRect.left &&
                    clientX <= backgroundRect.right &&
                    clientY >= backgroundRect.top &&
                    clientY <= backgroundRect.bottom;
                temp.push(isOverMe);
                if (isOverMe) {
                    latestGroup = groups[index].id;
                    console.log(latestGroup);
                }
            }
        }
        isDragOverMe = temp;
    }

    onMount(() => {
        Quiz.shuffle(elements);
    });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span class="hidden grid-rows-1 grid-rows-2 col-span-2 col-span-3 col-span-6" />
<Task bind:open={openTask} {title} {task} />

{#if validGamestate}
    <!-- svelte-ignore missing-declaration -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        on:mousemove={handleMouseMove}
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
                    class="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0"
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

                {#each elements as el, j}
                    {#if el.group == g.id}
                        <!-- svelte-ignore a11y-click-events-have-key-events -->
                        <div
                            id="user-card-{j}"
                            class="absolute card bg-white shadow border cursor-grab user-card"
                            style="z-index:{el.zIndex}; display: {currentElementIndex >=
                            j
                                ? 'inline-block'
                                : 'none'};"
                            use:draggable={{
                                bounds: "body",
                                ignoreMultitouch: false,
                                DragBoundsCoords: {
                                    top: 0,
                                    left: 0,
                                    right: innerWidth,
                                    bottom: innerHeight,
                                },
                            }}
                            on:neodrag:start={(e) => {
                                handleCardDragStart(e, el);
                            }}
                            on:neodrag:end={(e) => handleCardDragEnd(e, el)}
                        >
                            <div class="w-full h-full relative inline-block">
                                {#if el.type == "text"}
                                    <div
                                        class="w-full user-text"
                                        use:resizetext={{
                                            parentId: "user-card-" + j,
                                        }}
                                        use:linkify
                                    >
                                        {el.src}
                                    </div>
                                {:else if el.type == "image"}
                                    <!-- svelte-ignore a11y-missing-attribute -->
                                    <img
                                        src={el.src}
                                        use:zoom
                                        class="w-full h-full object-cover rounded-2xl"
                                        style={isDragging
                                            ? "pointer-events: none;"
                                            : ""}
                                    />
                                {:else if el.type == "video"}
                                    <!-- svelte-ignore a11y-media-has-caption -->
                                    <video
                                        controls
                                        class="w-full h-full object-cover rounded-2xl"
                                    >
                                        <source src={el.src} />
                                    </video>
                                {:else if el.type == "audio"}
                                    <audio
                                        controls
                                        class="w-full h-full object-cover rounded-2xl"
                                    >
                                        <source src={el.src} type={el.type} />
                                    </audio>
                                {/if}
                            </div>
                            {#if el.hint && el.hint.trim().length > 0}
                                <button
                                    class="btn btn-circle btn-xs btn-outline btn-info absolute top-2 left-2"
                                    use:tooltip={{ content: el.hint }}
                                    ><i class="far fa-info" />
                                </button>
                            {/if}
                            {#if el.tts?.enabled}
                                <button
                                    class="btn btn-circle btn-info btn-xs btn-outline text-info absolute bottom-2 right-2"
                                    on:click={(e) => {}}
                                >
                                    <i class="far fa-ear" />
                                </button>
                            {/if}
                        </div>
                    {/if}
                {/each}
            </div>
        {/each}
    </div>
{:else}
    <p>no gamestate found</p>
{/if}
