<script>
    import { draggable } from "@neodrag/svelte";
    import { FileUploader, FileTypeOptions, Modal } from "$components/index";
    import { tick } from "svelte";
    import { t } from "$lib/translations";
    import Quiz from "../shared";
    import { onMount } from "svelte";

    import {
        resizetext,
        linkify,
        focus,
        zoom,
        tooltip,
        clicksound,
    } from "$lib/actions";

    let openFileuploader = false;
    let openHintModal = false;
    let openFeedbackModal = false;
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

    const MIN_GROUPS = 2;
    const MAX_GROUPS = 6;
    const MAX_ELEMENTS = 20;

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
    function editCardFeedback(el) {
        el.feedback = el.feedback && el.feedback !== "" ? el.feedback : "";
        openFeedbackModal = true;
    }
    function editCardText(e, el) {
        el.src = el.src ? el.src : "";
        el.type = "text";
        el.isEditing = true;
        elements = elements;
    }
    function stopCardTextEditing(e, el) {
        el.isEditing = false;
        // if element is empty, we set back to an empty element with options
        if (el.src?.trim().length === 0) {
            el.src = null;
            el.type = null;
        }
        elements = elements;
    }
    function handleCardMouseLeave(e, el) {
        var editableDiv = e.target.querySelector("[contenteditable]");
        if (editableDiv) {
            editableDiv.blur();
        }
        stopCardTextEditing(e, el);
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
        g.src = g.src ? g.src : "";
        g.type = "text";
        groups = groups;
        Quiz.receiver.updateParent();
    }
    function setBackgroundColor(e, g) {
        g.backgroundColor = e.target.value;
        groups = groups;
    }
    function saveCardText(e, el) {
        el.src = e.target.innerText;
    }
    function saveGroupText(e, g) {
        g.src = e.target.innerText;
        groups = groups;
        Quiz.receiver.updateParent();
    }

    function addGroup() {
        if (groups.length + 1 > MAX_GROUPS) return;

        groups = [
            ...groups,
            {
                id: groups.length,
                type: null,
                src: null,
                isEditing: true,
                backgroundColor: null,
            },
        ];

        distributeCards();
    }
    function resetGroup(g) {
        let index = groups.findIndex((group) => group.id == g.id);
        groups[index].type = null;
        groups[index].src = null;
        groups[index].backgroundColor = null;
        groups[index].isEditing = true;
    }
    function deleteGroup(g) {
        if (groups.length - 1 < MIN_GROUPS) return;

        groups = groups.filter((group) => group.id !== g.id);
        distributeCards();
    }
    function addElement(group) {
        if (elements.length + 1 > MAX_ELEMENTS) return;

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
                src: null,
                isEditing: false,
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
        const child = e.target.closest(".card");

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

        // make this dynamic
        const w = 200;
        const h = 100;

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

    function getQuizData() {
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
                temp.push({
                    src: g.src,
                    type: g.type,
                    id: g.id,
                });
            }
            return temp;
        }
        const data = {
            elements: sanatizeElements(),
            groups: sanatizeGroups(),
        };

        return JSON.stringify(data);
    }

    function updateChild(data) {
        let index = groups.findIndex((group) => group.id == data.id);
        var o = new Object();
        o.src = data.src;
        o.type = data.type;
        groups[index] = o;
    }

    Quiz.receiver.init({
        addContainer: addGroup,
        removeContainer: deleteGroup,
        resetContainer: resetGroup,
        addElement,
        removeElement: deleteElement,
        updateParent: getQuizData,
        updateChild,
    });

    let parent;

    // we start with 2 groups always and inform the parent about it
    // consequent adds are updated by the parent automatically
    addGroup();
    addGroup();
    onMount(Quiz.receiver.updateParent);
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span class="hidden grid-rows-1 grid-rows-2 col-span-2 col-span-3 col-span-6" />

<FileUploader bind:openFileuploader handleClose={onCloseFileuploader} />
<Modal bind:open={openHintModal}>
    <h3 class="font-bold text-lg" slot="header">{$t("quiz.hint")}</h3>
    <div slot="body">
        <p class="py-4">{$t("quiz.addHintDescription")}</p>
        <div class="relative">
            <input
                type="text"
                class="input input-bordered w-full pr-10"
                bind:value={currentElement.hint}
                on:input={(e) => (elements = elements)}
            />
            {#if currentElement.hint?.trim().length > 0}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="absolute right-2 btn btn-xs btn-circle btn-ghost mt-3"
                    on:click={(e) => {
                        currentElement.hint = null;
                        elements = elements;
                    }}
                >
                    <i class="fal fa-times" />
                </div>
            {/if}
        </div>
    </div>
    <button class="btn btn-primary" slot="footer">
        {$t("core.close")}
    </button>
</Modal>
<Modal bind:open={openFeedbackModal}>
    <h3 class="font-bold text-lg" slot="header">{$t("quiz.feedback")}</h3>
    <div slot="body">
        <p class="py-4">{$t("quiz.addFeedbackDescription")}</p>
        <div class="relative">
            <input
                type="text"
                class="input input-bordered w-full pr-10"
                bind:value={currentElement.feedback}
                on:input={(e) => (elements = elements)}
            />

            {#if currentElement.feedback?.trim().length > 0}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="absolute right-2 btn btn-xs btn-circle btn-ghost mt-3"
                    on:click={(e) => {
                        currentElement.feedback = null;
                        elements = elements;
                    }}
                >
                    <i class="fal fa-times" />
                </div>
            {/if}
        </div>
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
            style="background-color:{g.backgroundColor}"
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
                        description={$t("quiz.groupassignment.chooseFileType")}
                    />
                {:else if g.type === "text" && g.isEditing}
                    <div
                        class="text-black text-center edit-group mt-20 mb-20"
                        contenteditable={true}
                        use:linkify
                        use:focus
                        use:resizetext
                        on:blur={() => toggleGroupEdit(g)}
                        on:keyup={(e) => saveGroupText(e, g)}
                    >
                        {g.src}
                    </div>
                {:else if g.type === "text" && !g.isEditing}
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

            <div
                class=" flex-none absolute right-0 top-0"
                style="z-index:{zIndex + 1}"
            >
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
                                        editGroupText(e, g);
                                    }}
                                    >{$t(
                                        "quiz.groupassignment.changeBackgroundText"
                                    )}</a
                                >
                            </li>
                            <li>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <a
                                    on:click={(e) => {
                                        onOpenFileUploader(e);
                                    }}
                                    >{$t(
                                        "quiz.groupassignment.changeBackgroundImage"
                                    )}</a
                                >
                            </li>
                            <li>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <a on:click={(e) => {}}
                                    >{$t(
                                        "quiz.groupassignment.changeBackgroundColor"
                                    )}<label
                                        class="btn btn-circle btn-sm btn-ghost"
                                        style="background-color: {g.backgroundColor};"
                                    >
                                        <input
                                            type="color"
                                            class="invisible"
                                            value={g.backgroundColor}
                                            on:input={(e) => {
                                                setBackgroundColor(e, g);
                                            }}
                                        /></label
                                    ></a
                                >
                            </li>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <li>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <a
                                    on:click={(e) => {
                                        resetGroup(g);
                                    }}
                                    >{$t(
                                        "quiz.groupassignment.resetBackground"
                                    )}</a
                                >
                            </li>
                            <!-- svelte-ignore a11y-missing-attribute -->
                            {#if groups.length > 2}
                                <li>
                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                                    <a
                                        class="text-error"
                                        on:click={(e) => {
                                            deleteGroup(g);
                                        }}
                                        >{$t(
                                            "quiz.groupassignment.deleteGroup"
                                        )}</a
                                    >
                                </li>
                            {/if}
                        </ul>
                    </div>
                </div>
            </div>

            <button
                on:click={() => {
                    g.isEditing = false;
                    addElement(g.id);
                }}
                use:clicksound={{ sound: "/media/pop-sound.wav" }}
                type="button"
                class="absolute right-2 bottom-2 btn btn-circle btn-primary"
                style="z-index: {zIndex + 1}"
            >
                <i class="fal fa-plus" />
            </button>

            {#each elements as el}
                {#if el.group == g.id}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        id="user-card-{i}"
                        class="absolute card bg-white shadow border cursor-grab user-card display-inline-block {el.feedback
                            ? 'shadow-warning'
                            : ''}"
                        style="left:{el.x}; top:{el.y};z-index: {el.zIndex};opacity: {g.isEditing
                            ? 0.3
                            : 1};"
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
                        on:mouseleave={(e) => handleCardMouseLeave(e, el)}
                    >
                        <div class="w-full h-full relative inline-block">
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
                                    use:resizetext={{
                                        parentId: "user-card-" + i,
                                    }}
                                    use:linkify
                                    on:mousedown={(e) => editCardText(e, el)}
                                    on:keyup={(e) => saveCardText(e, el)}
                                >
                                    {el.src}
                                </div>
                                <div
                                    class="form-control"
                                    style="visibility:{el.isEditing
                                        ? 'visible'
                                        : 'hidden'}"
                                    on:click={(e) => toggleTTS(e, el)}
                                >
                                    <label class="label cursor-pointer">
                                        <span class="label-text"
                                            >{$t("quiz.tts")}</span
                                        >
                                        <input
                                            type="checkbox"
                                            class="toggle"
                                            checked={el.tts?.enabled}
                                        />
                                    </label>
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
                                class="btn btn-circle btn-xs btn-outline btn-info absolute top-1 left-1"
                                use:tooltip={{ content: el.hint }}
                                on:click={(e) => {
                                    editCardHint(e, el);
                                }}
                                ><i class="far fa-info" />
                            </button>
                        {/if}
                        {#if !el.isEditing && el.tts?.enabled}
                            <button
                                class="btn btn-circle btn-info btn-xs btn-outline text-info absolute bottom-1 right-1"
                                on:click={(e) =>
                                    alert("text to speech mal irgendwann")}
                            >
                                <i class="far fa-ear" />
                            </button>
                        {/if}

                        <div
                            class="absolute right-0 top-0 user-card-actions"
                            style="z-index:{zIndex + 1}}; {el.isEditing
                                ? 'display: none;'
                                : ''}"
                        >
                            <div class="dropdown dropdown-end">
                                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                                <!-- svelte-ignore a11y-label-has-associated-control -->
                                <label
                                    tabindex="0"
                                    class="btn btn-xs btn-circle btn-ghost"
                                >
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
                                                class="text-info"
                                                on:click={(e) => {
                                                    editCardHint(e, el);
                                                }}
                                                >{$t("quiz.hint")}
                                                {$t(
                                                    !el.hint
                                                        ? "core.add"
                                                        : "core.change"
                                                )}</a
                                            >
                                        </li>
                                        <li>
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <!-- svelte-ignore a11y-missing-attribute -->
                                            <a
                                                class="text-warning"
                                                on:click={(e) => {
                                                    editCardFeedback(e, el);
                                                }}
                                                >{$t("quiz.feedback")}
                                                {$t(
                                                    !el.feedback
                                                        ? "core.add"
                                                        : "core.change"
                                                )}</a
                                            >
                                        </li>
                                        <li>
                                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                                            <!-- svelte-ignore a11y-missing-attribute -->
                                            <a
                                                class="text-error"
                                                use:clicksound={{
                                                    sound: "/media/delete-sound.wav",
                                                }}
                                                on:click={(e) => {
                                                    deleteElement(el);
                                                }}
                                                >{$t(
                                                    "quiz.groupassignment.deleteCard"
                                                )}</a
                                            >
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
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
    .user-card-actions {
        display: none;
    }
    .user-card:hover .user-card-actions {
        display: block;
    }
    .edit-group {
        font-size: 5vmin;
        word-break: break-word;
    }
</style>
