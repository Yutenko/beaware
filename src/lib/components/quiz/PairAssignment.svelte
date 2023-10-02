<script>
    import { draggable } from "@neodrag/svelte";
    import { FileUploader, FileTypeOptions } from "$components/index";
    import { t } from "$lib/translations";
    import { tick, onMount } from "svelte";
    import { resizeText } from "$lib/helper";

    let openFileuploader = false;
    let innerHeight = 0;
    let innerWidth = 0;
    let orientation;
    let oldOrientation;
    let groups = [];
    let elements = [];
    let draggableelement;
    let isDragOverMe = Array(groups.length).fill(false);
    let zIndex = 0;
    let latestGroup = -1;
    let currentelement;
    let startX;
    let startY;

    const draggableOptions = {
        bounds: "body",
        ignoreMultitouch: false,
        DragBoundsCoords: {
            top: 0,
            left: 0,
            right: innerWidth,
            bottom: innerHeight,
        },
    };

    const positions = {
        1: {
            landscape: { rows: 1, span: [6] },
            portrait: { rows: 1, span: [6] },
        },
        2: {
            landscape: { rows: 1, span: [3, 3] },
            portrait: { rows: 2, span: [6, 6] },
        },
        3: {
            landscape: { rows: 1, span: [2, 2, 2] },
            portrait: { rows: 3, span: [6, 6, 6] },
        },
        4: {
            landscape: { rows: 2, span: [3, 3, 3, 3] },
            portrait: { rows: 2, span: [3, 3, 3, 3] },
        },
        5: {
            landscape: { rows: 2, span: [2, 2, 2, 3, 3] },
            portrait: { rows: 3, span: [3, 3, 3, 3, 6] },
        },
        6: {
            landscape: { rows: 2, span: [2, 2, 2, 2, 2, 2] },
            portrait: { rows: 3, span: [3, 3, 3, 3, 3, 3] },
        },
    };

    $: {
        orientation = innerHeight > innerWidth ? "portrait" : "landscape";
        if (oldOrientation !== orientation) {
            tick().then(distributeCards);
        }
        oldOrientation = orientation;
    }

    function onOpen(e, el) {
        openFileuploader = true;
    }
    function onClose(data) {
        if (data) {
            const { url, type } = data;
            currentelement.src = url;
            currentelement.type = type;
            elements = elements;
        }

        openFileuploader = false;
    }

    function editText(e, el) {
        el.src = "";
        el.type = "text";
        elements = elements;
    }
    function focus(e) {
        e.focus();
    }
    function saveText(e, el) {
        el.src = e.target.innerText;
    }

    function addGroup(id) {
        groups = [
            ...groups,
            {
                id,
                type: "text",
                src: "Gewinn- und Verlustrechnung " + id,
                isEditing: false,
            },
        ];
    }
    function addelement(group) {
        const { x, y } = getPosition(group);
        zIndex++;
        elements = [...elements, { group, x, y, zIndex, type: null }];
    }
    function deleteelement(el) {
        elements.splice(elements.indexOf(el), 1);
        elements = elements;
    }

    function toggleEdit(group) {
        group.isEditing = !group.isEditing;
        groups = groups;
    }

    function handleCardDragStart(e, el) {
        el.zIndex = zIndex++;
        draggableelement = e.target;
        draggableelement.style.zIndex = el.zIndex;
    }
    function handleCardDragEnd(e, el) {
        draggableelement = null;
        if (latestGroup !== -1) {
            if (currentelement.group !== latestGroup) {
                currentelement.group = latestGroup;
            }
        }
        isDragOverMe = Array(groups.length).fill(false);
    }
    function handleCardMouseDown(e, el) {
        currentelement = el;
        startX = e.pageX;
        startY = e.pageY;
    }
    function handleCardMouseUp(e) {
        const delta = 6; // minimal distance between mousedown and mouseup, to confirm dragging
        const diffX = Math.abs(e.pageX - startX);
        const diffY = Math.abs(e.pageY - startY);

        if (diffX < delta && diffY < delta) {
            // counts as a click
            draggableelement = null;
        } else {
            // counts as a drag
            handleCardDragEnd(e);
        }
    }

    function handleMouseMove(e, el) {
        if (!draggableelement) return;

        const { clientX, clientY } = e;

        let temp = [];
        for (let index = 0; index < groups.length; index++) {
            const backgroundDiv = document.querySelector(`#group-${index}`);
            const backgroundRect = backgroundDiv.getBoundingClientRect();
            const isOverMe =
                clientX >= backgroundRect.left &&
                clientX <= backgroundRect.right &&
                clientY >= backgroundRect.top &&
                clientY <= backgroundRect.bottom;
            temp.push(isOverMe);
            if (isOverMe) {
                latestGroup = index;
            }
        }
        isDragOverMe = temp;
    }

    function getPosition(group) {
        const background = document.querySelector("#group-" + group);

        const w = 250;
        const h = 96;

        const maxX = background.clientWidth - w;
        const maxY = background.clientHeight - h;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        return {
            x: randomX,
            y: randomY,
        };
    }

    function distributeCards() {
        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            const { x, y } = getPosition(element.group);
            element.x = x;
            element.y = y;
        }
        elements = elements;
    }

    addGroup(0);
    addGroup(1);
    addGroup(2);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span class="hidden grid-rows-1 grid-rows-2 col-span-2 col-span-3 col-span-6" />

<FileUploader bind:openFileuploader handleClose={onClose} />

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:mousemove={handleMouseMove}
    class="grid grid-cols-6 grid-rows-{positions[groups.length][orientation]
        .rows} overflow-hidden h-screen"
>
    {#each groups as g, i}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="col-span-{positions[groups.length][orientation].span[
                i
            ]} relative {isDragOverMe[i] ? 'bg-red-600' : ''} border"
            id="group-{i}"
        >
            <div
                class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
                {#if g.type === "text"}
                    <div class="text-black text-center usergroup">{g.src}</div>
                {:else if g.type === "image"}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="w-full h-full object-contain" src={g.src} />
                {/if}
            </div>

            <button
                type="button"
                class="absolute right-2 bottom-2 btn btn-circle btn-primary"
                on:click={() => toggleEdit(g)}
            >
                <i class="fal fa-cog" />
            </button>
            <button
                on:click={() => addelement(g.id)}
                type="button"
                class="absolute right-2 bottom-16 btn btn-circle btn-primary"
            >
                <i class="fal fa-plus" />
            </button>

            {#each elements as el}
                {#if el.group == g.id && !g.isEditing}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="absolute card bg-white shadow border cursor-grab usercard display-inline-block"
                        use:draggable={draggableOptions}
                        on:neodrag:start={(e) => handleCardDragStart(e, el)}
                        on:mousedown={(e) => handleCardMouseDown(e, el)}
                        on:mouseup={(e) => handleCardMouseUp(e)}
                        style="top: {el.y}px; left: {el.x}px; z-index: {el.zIndex};"
                    >
                        {#if !el.type}
                            <FileTypeOptions
                                handleTextOption={(e) => {
                                    editText(e, el);
                                }}
                                handleMediaOption={(e) => {
                                    onOpen(e, el);
                                }}
                            />
                        {:else if el.type == "text"}
                            <div
                                contenteditable="true"
                                class="w-full usertext"
                                use:focus
                                use:resizeText
                                on:keyup={(e) => saveText(e, el)}
                            >
                                {el.src}
                            </div>
                        {:else if el.type == "image"}
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <img
                                src={el.src}
                                class="w-full h-full object-cover rounded-2xl"
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
                        <button
                            class="absolute btn btn-circle btn-secondary btn-sm deletecard"
                            on:click={(e) => deleteelement(el)}
                            ><i class="fal fa-skull-crossbones" /></button
                        >
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    .usercard {
        max-width: 30vmin;
        min-width: 200px;
        min-height: 50px;
        max-height: 30vmin;
        padding: 5%;
        touch-action: none;
        user-select: none;
    }
    .usertext {
        line-height: normal;
        font-size: 1.5em;
        text-align: center;
        width: 100%;
        height: 100%;
        padding: 10px;
        display: inline-block;
        word-break: break-word;
    }
    .usergroup {
        font-size: 5vmin;
        word-break: break-word;
    }
    .deletecard {
        position: absolute;
        top: 0px;
        right: 0px;
        transition: all 0.2s;
        display: none;
    }
    .usercard:hover .deletecard {
        display: block;
    }
</style>
