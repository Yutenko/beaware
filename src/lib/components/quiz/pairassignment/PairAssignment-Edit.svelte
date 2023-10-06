<script>
    import { draggable } from "@neodrag/svelte";
    import { FileUploader, FileTypeOptions, Modal } from "$components/index";
    import { tick } from "svelte";
    import { t } from "$lib/translations";
    import {
        resizeText,
        linkify,
        focus,
        zoom,
        tooltip,
        playSound,
    } from "$lib/actions";

    let openFileuploader = false;
    let openHintModal = false;
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
    let currentElement;
    let currentGroup;
    let startX;
    let startY;
    let isDragging = false;

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

    function onOpenFileUploader(e, el) {
        openFileuploader = true;
    }
    function onCloseFileuploader(data) {
        if (data) {
            const { url, type } = data;
            if (currentGroup) {
                currentGroup.src = url;
                currentGroup.type = type;
                currentGroup.isEditing = false;
                groups = groups;
            } else if (currentElement) {
                currentElement.src = url;
                currentElement.type = type;
                elements = elements;
            }
        }
        openFileuploader = false;
    }

    function editCardHint(el) {
        el.hint = el.hint && el.hint !== "" ? el.hint : "";
        openHintModal = true;
    }
    function editCardText(e, el) {
        el.src = "";
        el.type = "text";
        el.showTTSOption = true;
        elements = elements;
    }
    function showTTS(e, el) {
        el.showTTSOption = true;
        elements = elements;
    }
    function hideTTS(e, el) {
        el.showTTSOption = false;
        elements = elements;
    }
    function toggleTTS(e, el) {
        if (!el.tts) {
            el.tts = { enabled: false };
        }
        el.tts.enabled = !el.tts.enabled;
        elements = elements;
    }
    function editGroupText(e, g) {
        g.isEditing = true;
        g.src = "";
        g.type = "text";
        groups = groups;
    }
    function saveCardText(e, el) {
        el.src = e.target.innerText;
    }
    function saveGroupText(e, g) {
        g.src = e.target.innerText;
        groups = groups;
    }

    function addGroup(id) {
        groups = [
            ...groups,
            {
                id,
                type: null,
                src: null,
                isEditing: false,
            },
        ];
    }
    function resetGroup(g) {
        g.type = null;
        g.src = null;
        g.isEditing = true;
        groups = groups;
    }
    function deleteGroup(g) {
        if (groups.length - 1 >= 2) {
            groups = groups.filter((group) => group.id !== g.id);
        }
    }
    function addElement(group) {
        const { x, y } = getCardPosition(group);
        zIndex++;
        elements = [
            ...elements,
            {
                group,
                x,
                y,
                zIndex,
                type: null,
            },
        ];
    }
    function deleteElement(el) {
        elements.splice(elements.indexOf(el), 1);
        elements = elements;
    }

    function toggleGroupEdit(group) {
        group.isEditing = !group.isEditing;
        currentGroup = group.isEditing ? group : null;

        groups = groups;
    }
    function handleCardDragStart(e, el) {
        el.zIndex = zIndex++;
        draggableelement = e.target;
        draggableelement.style.zIndex = el.zIndex;
    }
    function handleCardDragEnd(e, el) {
        if (latestGroup !== -1) {
            if (currentElement.group !== latestGroup) {
                currentElement.group = latestGroup;
            }
        }
        const parent = document.getElementById("group-" + latestGroup);
        const child = e.target;

        const childRect = child.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        const relativeLeft = childRect.left - parentRect.left;
        const relativeTop = childRect.top - parentRect.top;

        el.x = relativeLeft;
        el.y = relativeTop;
        elements = elements;

        draggableelement = null;
        isDragOverMe = Array(groups.length).fill(false);
    }
    function handleCardMouseDown(e, el) {
        currentElement = el;
        startX = e.pageX;
        startY = e.pageY;
    }
    function handleCardMouseUp(e, el) {
        const delta = 6; // minimal distance between mousedown and mouseup, to confirm dragging
        const diffX = Math.abs(e.pageX - startX);
        const diffY = Math.abs(e.pageY - startY);

        if (diffX < delta && diffY < delta) {
            // counts as a click
            draggableelement = null;
        } else {
            // counts as a drag
            handleCardDragEnd(e, el);
        }
        isDragging = false;
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

    function getCardPosition(group) {
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
            const { x, y } = getCardPosition(element.group);
            element.x = x;
            element.y = y;
        }
        elements = elements;
    }

    function saveQuiz() {
        function sanatizeElements() {
            let temp = [];
            for (let i = 0; i < elements.length; i++) {
                let el = elements[i];
                if (el.src && el.src != "") {
                    temp.push({
                        src: el.src,
                        type: el.type,
                        group: el.group.id,
                        hint: el.hint,
                    });
                }
            }
            return temp;
        }
        function sanatizeGroups() {
            let temp = [];
            for (let i = 0; i < groups.length; i++) {
                let g = groups[i];
                if (g.src && g.src != "") {
                    temp.push({
                        src: g.src,
                        type: g.type,
                        id: g.id,
                    });
                }
            }
            return temp;
        }
        const data = {
            elements: sanatizeElements(),
            groups: sanatizeGroups(),
        };

        const json = JSON.stringify(data);
        const blob = new Blob([json], { type: "application/json" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "quiz.json";
        a.click();
        window.URL.revokeObjectURL(url);
    }

    addGroup(0);
    addGroup(1);
    addGroup(2);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span class="hidden grid-rows-1 grid-rows-2 col-span-2 col-span-3 col-span-6" />

<FileUploader bind:openFileuploader handleClose={onCloseFileuploader} />
<Modal bind:open={openHintModal}>
    <h3 class="font-bold text-lg" slot="header">{$t("quiz.addHint")}</h3>
    <div slot="body">
        <p class="py-4">{$t("quiz.addHintDescription")}</p>
        <input
            type="text"
            class="input input-bordered w-full"
            bind:value={currentElement.hint}
            on:input={(e) => (elements = elements)}
        />
    </div>
    <button class="btn btn-primary" slot="footer">
        {$t("core.close")}
    </button>
</Modal>

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
            ]} relative {isDragOverMe[i] ? 'bg-red-600' : ''} border group"
            id="group-{i}"
        >
            <div
                class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
            >
                {#if !g.type && g.isEditing}
                    <FileTypeOptions
                        handleTextOption={(e) => {
                            editGroupText(e, g);
                        }}
                        handleMediaOption={(e) => {
                            onOpenFileUploader(e);
                        }}
                    />
                {:else if g.type === "text"}
                    <div
                        class="text-black text-center edit-group"
                        contenteditable={g.isEditing}
                        use:linkify
                        use:focus
                        on:blur={() => toggleGroupEdit(g)}
                        on:keyup={(e) => saveGroupText(e, g)}
                    >
                        {g.src}
                    </div>
                {:else if g.type === "image"}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="w-full h-full object-contain" src={g.src} />
                {/if}
                {#if g.type}
                    <button
                        class="btn btn-circle btn-error btn-sm reset-group"
                        on:click={(e) => resetGroup(g)}
                        ><i class="fal fa-skull-crossbones" /></button
                    >
                {/if}
            </div>

            <button
                type="button"
                class="absolute right-2 bottom-2 btn btn-circle btn-primary"
                style="z-index: {zIndex + 1}"
                on:click={() => toggleGroupEdit(g)}
            >
                <i class="fal fa-cog" />
            </button>
            <button
                on:click={() => {
                    g.isEditing = false;
                    addElement(g.id);
                }}
                use:playSound={{ sound: "/media/pop-sound.wav" }}
                type="button"
                class="absolute right-2 bottom-16 btn btn-circle btn-primary"
                style="z-index: {zIndex + 1}"
            >
                <i class="fal fa-plus" />
            </button>

            {#each elements as el}
                {#if el.group == g.id}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        class="absolute card bg-white shadow border cursor-grab user-card display-inline-block"
                        use:draggable={{
                            bounds: "body",
                            ignoreMultitouch: false,
                            DragBoundsCoords: {
                                top: 0,
                                left: 0,
                                right: innerWidth,
                                bottom: innerHeight,
                            },
                            position: { x: el.x, y: el.y },
                        }}
                        on:neodrag:start={(e) => {
                            handleCardDragStart(e, el);
                        }}
                        on:mousedown={(e) => handleCardMouseDown(e, el)}
                        on:mouseup={(e) => handleCardMouseUp(e, el)}
                        on:mouseleave={(e) => hideTTS(e, el)}
                        style="left:{el.x}; top:{el.y};z-index: {el.zIndex};opacity: {g.isEditing
                            ? 0.3
                            : 1};"
                    >
                        {#if !el.type}
                            <FileTypeOptions
                                handleTextOption={(e) => {
                                    editCardText(e, el);
                                }}
                                handleMediaOption={(e) => {
                                    onOpenFileUploader(e, el);
                                }}
                            />
                        {:else if el.type == "text"}
                            <div
                                contenteditable="true"
                                class="w-full user-text"
                                use:focus
                                use:resizeText
                                use:linkify
                                on:focus={(e) => showTTS(e, el)}
                                on:keyup={(e) => saveCardText(e, el)}
                            >
                                {el.src}
                            </div>
                            <div
                                class="form-control"
                                style="visibility:{el.showTTSOption
                                    ? 'visible'
                                    : 'hidden'}"
                                on:click={(e) => toggleTTS(e, el)}
                            >
                                <label class="label cursor-pointer">
                                    <span class="label-text">vorlesen</span>
                                    <input
                                        type="checkbox"
                                        class="toggle"
                                        checked={el.tts?.enabled}
                                    />
                                </label>
                            </div>
                            {#if !el.showTTSOption && el.tts?.enabled}
                                <button
                                    class="absolute btn btn-circle btn-info btn-xs btn-outline right-3.5 bottom-3.5 text-info"
                                    on:click={(e) =>
                                        alert("text to speech mal irgendwann")}
                                >
                                    <i class="far fa-ear" />
                                </button>
                            {/if}
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
                        <button
                            class="absolute btn btn-circle btn-error btn-sm delete-card"
                            use:playSound={{ sound: "/media/delete-sound.wav" }}
                            on:click={(e) => deleteElement(el)}
                            ><i class="fal fa-skull-crossbones" /></button
                        >
                        {#if el.hint && el.hint.trim().length > 0}
                            <button
                                class="absolute btn btn-circle btn-xs btn-outline btn-info hint-btn"
                                use:tooltip={{ content: el.hint }}
                                on:click={(e) => {
                                    editCardHint(el);
                                }}
                                ><i class="far fa-info" />
                            </button>
                        {:else}
                            <button
                                class="absolute btn btn-circle btn-xs btn-outline hint-btn hidden text-base-content"
                                on:click={(e) => {
                                    editCardHint(el);
                                }}
                                ><i class="far fa-info" />
                            </button>
                        {/if}
                    </div>
                {/if}
            {/each}
        </div>
    {/each}
</div>

<style>
    .user-card {
        max-width: 30vmin;
        min-width: 200px;
        min-height: 50px;
        max-height: 30vmin;
        padding: 1.7em;
        touch-action: none;
        user-select: none;
    }
    .user-text {
        line-height: normal;
        font-size: 1.5em;
        text-align: center;
        width: 100%;
        height: 100%;
        padding: 10px;
        display: inline-block;
        word-break: break-word;
    }
    .hint-btn {
        position: absolute;
        left: 0.5rem;
        top: 0.5rem;
    }
    .delete-card,
    .reset-group {
        position: absolute;
        top: 0px;
        right: 0px;
        transition: all 0.2s;
        display: none;
    }
    .user-card:hover .delete-card,
    .user-card:hover .hint-btn,
    .group:hover .reset-group {
        display: block;
    }
    .edit-group {
        font-size: 5vmin;
        word-break: break-word;
    }
</style>
