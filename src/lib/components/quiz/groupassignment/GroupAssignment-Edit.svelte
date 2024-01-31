<script>
    import { Hint } from "$components/quiz/ui-elements";
    import { draggable } from "@neodrag/svelte";
    import { FileUploader, FileTypeOptions, Modal } from "$components/index";
    import { tick } from "svelte";
    import { t } from "$lib/translations";
    import Quiz from "../shared";
    import { onMount } from "svelte";
    import {
        MIN_GROUPS,
        MAX_GROUPS,
        MAX_ELEMENTS,
        POSITIONS,
        GROUP_COLORS,
    } from "./constants.json";

    import { resizetext, linkify, focus, zoom, clicksound } from "$lib/actions";

    export let gamestate;
    export let id;

    let openFileuploader = false;
    let openHintModal = false;
    let openFeedbackModal = false;
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
    let currentElement = {};
    let currentGroup;
    let currentActive; // currentElement or currentGroup
    let startX;
    let startY;
    let isDragging = false;
    let groupCounter = 0;
    let elementCounter = 0;

    $: {
        orientation = innerHeight > innerWidth ? "portrait" : "landscape";
        if (oldOrientation !== orientation) {
            tick().then(distributeCards);
        }
        oldOrientation = orientation;

        if (innerHeight < 400 || innerHeight < 300) {
            //console.log("show fullscreen, you cannot play on this size");
        }
    }

    function updateGroups(g) {
        groups = groups;
        currentActive = g ? g : currentGroup;
        Quiz.receiver.updateParent();
    }
    function updateElements(el) {
        elements = elements;
        currentActive = el ? el : currentElement;
        Quiz.receiver.updateParent();
    }

    function onOpenFileUploader(e, el) {
        openFileuploader = true;
    }
    function onCloseFileuploader(data) {
        if (data) {
            const { url, type } = data;
            if (currentActive == currentGroup) {
                currentGroup.src = url;
                currentGroup.type = type;
                currentGroup.isEditing = false;
                updateGroups();
            } else if (currentActive == currentElement) {
                currentElement.src = url;
                currentElement.type = type;
                updateElements();
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
        updateElements(el);
    }
    function stopCardTextEditing(e, el) {
        el.isEditing = false;
        // if element is empty, we set back to an empty element with options
        if (el.src?.trim().length === 0) {
            el.src = null;
            el.type = null;
        }
        updateElements(el);
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
        updateElements(el);
    }
    function editGroupText(e, g) {
        g.isEditing = true;
        g.src = g.src ? g.src : "";
        g.type = "text";
        updateGroups(g);
    }
    function setBackgroundColor(e, g) {
        g.backgroundColor = e.target.value;
        updateGroups(g);
    }
    function saveCardText(e, el) {
        el.src = e.target.innerText;
    }
    function saveGroupText(e, g) {
        g.src = e.target.innerText;
        updateGroups(g);
    }

    function addGroup(serverGroup) {
        if (groups.length + 1 > MAX_GROUPS) return;
        const colors = GROUP_COLORS;

        groups = [
            ...groups,
            {
                id: groupCounter++,
                type: serverGroup?.type,
                src: serverGroup?.src,
                isEditing: !(
                    serverGroup &&
                    typeof serverGroup.type !== "undefined" &&
                    typeof serverGroup.src !== "undefined"
                ),
                backgroundColor: serverGroup?.backgroundColor
                    ? serverGroup?.backgroundColor
                    : colors[groupCounter % colors.length],
            },
        ];
    }
    function resetGroup(g) {
        let index = groups.findIndex((group) => group.id == g.id);
        groups[index].type = null;
        groups[index].src = null;
        groups[index].backgroundColor = null;
        groups[index].isEditing = true;
        updateGroups(g);
    }
    function deleteGroup(g) {
        if (groups.length - 1 < MIN_GROUPS) return;

        groups = groups.filter((group) => group.id !== g.id);

        updateGroups(g);
        distributeCards();
    }
    function addElement(group, serverElement) {
        if (elements.length + 1 > MAX_ELEMENTS) return;

        group = typeof group !== "undefined" ? group : serverElement?.group;
        const { x, y } = getCardPosition(group);
        zIndex++;
        elements = [
            ...elements,
            {
                id: elementCounter++,
                group,
                x,
                y,
                zIndex,
                type: serverElement?.type,
                src: serverElement?.src,
                isEditing: false,
                hint: serverElement?.hint,
                feedback: serverElement?.feedback,
                tts: serverElement?.tts,
            },
        ];
        // updateElements();
        resizeUserCard();
    }
    function deleteElement(el) {
        elements.splice(elements.indexOf(el), 1);
        updateElements(el);
    }

    function toggleGroupEdit(g) {
        g.isEditing = !g.isEditing;
        currentGroup = g.isEditing ? g : null;

        updateGroups(g);
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
        updateElements(el);

        draggableelement = null;
        isDragOverMe = Array(groups.length).fill(false);
    }
    function handleCardMouseDown(e, el) {
        currentElement = el;
        currentActive = currentElement;
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
            const backgroundDiv = document.querySelector(
                `#group-${groups[index].id}`,
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
            }
        }
        isDragOverMe = temp;
    }

    function getCardPosition(group) {
        const background = document.querySelector("#group-" + group);

        // make this dynamic
        const w = card.width;
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
        updateElements();
    }

    function getQuizData() {
        function sanatizeElements() {
            let temp = [];
            for (let i = 0; i < elements.length; i++) {
                let el = elements[i];
                if (el.src && el.type) {
                    temp.push({
                        id: el.id,
                        group: el.group,
                        src: el.src,
                        type: el.type,
                        tts: el.tts,
                        hint: el.hint,
                        feedback: el.feedback,
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
                    backgroundColor: g.backgroundColor,
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

    function resizeUserCard() {
        if (groups.length === 0) return;

        const columns = groups.length;
        const container = document.querySelector("#group-" + groups[0].id);
        const value = Math.min(container.clientWidth, container.clientHeight);
        const padding = card.width * 0.04;

        card = {
            width: Math.ceil(value / columns + 1),
            padding: padding < 15 ? 15 : padding,
        };
    }

    function loadGamestate(gamestate) {
        if (gamestate && Object.keys(gamestate).length > 0) {
            if (gamestate.groups) {
                for (let i = 0; i < gamestate.groups.length; i++) {
                    addGroup(gamestate.groups[i]);
                }
            }

            // before adding elements to the dom, the groups need to be added as dom elements
            tick().then(() => {
                if (gamestate.elements) {
                    for (let i = 0; i < gamestate.elements.length; i++) {
                        addElement(
                            groups[gamestate.elements[i].group.id],
                            gamestate.elements[i],
                        );
                    }
                }
                // update the parent once
                Quiz.receiver.updateParent();
            });
        } else {
            // if there is no gamestate to load, initialize with MIN_GROUPS groups
            for (let i = 0; i < MIN_GROUPS; i++) addGroup();
        }
    }

    onMount(() => {
        // if we received a gamestate, load it
        loadGamestate(gamestate);

        // init sender / receiver communication via postmessage
        Quiz.receiver.init({
            addContainer: addGroup,
            removeContainer: deleteGroup,
            resetContainer: resetGroup,
            addElement,
            removeElement: deleteElement,
            updateParent: getQuizData,
            initalData: {
                task: gamestate?.task,
                title: gamestate?.title,
                feedbacks: gamestate?.feedbacks,
                options: gamestate?.options,
                groups: gamestate?.groups,
                elements: gamestate?.elements,
                id,
            },
        });

        // update the parent once
        Quiz.receiver.updateParent();

        // has to be top window, because we can be in an iframe
        window.top.addEventListener("resize", resizeUserCard);
        return () => {
            window.top.removeEventListener("resize", resizeUserCard);
        };
    });
</script>

<svelte:window bind:innerWidth bind:innerHeight />

<!-- Tailwind can not do dynamic classes, so we have an invisible element, that creates these classes before dynamically putting them into the HTML -->
<span
    class="hidden grid-rows-1 grid-rows-2 grid-rows-3 col-span-3 col-span-4 col-span-6 col-span-12"
/>

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
                on:input={updateElements}
            />
            {#if currentElement?.hint?.trim().length > 0}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="absolute right-2 btn btn-xs btn-circle btn-ghost mt-3"
                    on:click={(e) => {
                        currentElement.hint = null;
                        updateElements();
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
    <h3 class="font-bold text-lg" slot="header">{$t("quiz.feedback.add")}</h3>
    <div slot="body">
        <p class="py-4">{$t("quiz.feedback.description")}</p>
        <div class="relative">
            <input
                type="text"
                class="input input-bordered w-full pr-10"
                bind:value={currentElement.feedback}
                on:input={updateElements}
            />

            {#if currentElement.feedback?.trim().length > 0}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    class="absolute right-2 btn btn-xs btn-circle btn-ghost mt-3"
                    on:click={(e) => {
                        currentElement.feedback = null;
                        updateElements();
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
    class="grid grid-cols-12 grid-rows-{POSITIONS[groups.length][orientation]
        .rows} overflow-hidden h-screen"
>
    {#each groups as g, i}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="col-span-{POSITIONS[groups.length][orientation].span[
                i
            ]} relative group"
            style="background-color:{g.backgroundColor}40;"
            id="group-{g.id}"
            on:mouseenter={(e) => {
                currentGroup = g;
                currentActive = currentGroup;
            }}
        >
            <div
                class="absolute top-0 left-0 w-full h-full flex items-center justify-center"
                style="opacity:{isDragOverMe[i] || !g.type
                    ? 1
                    : 0.5};background:{isDragOverMe[i] || !g.type
                    ? 'rgba(0,0,0,.2)'
                    : 'unset'}"
            >
                {#if !g.type && g.isEditing}
                    <FileTypeOptions
                        on:click:text={(e) => {
                            editGroupText(e, g);
                        }}
                        on:click:image={(e) => {
                            onOpenFileUploader(e);
                        }}
                        color="btn-accent-light"
                        types={{ text: true, image: true }}
                        textText={$t("quiz.groupassignment.backgroundText")}
                        imageText={$t("quiz.groupassignment.backgroundImage")}
                    />
                {:else if g.type === "text" && g.isEditing}
                    <div
                        class="text-black text-center edit-group mt-20 mb-20"
                        contenteditable={true}
                        use:linkify
                        use:focus={g.isEditing}
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

            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="flex-none absolute right-0 top-0 group-actions"
                on:click={(e) => {
                    currentActive = g;
                }}
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
                                        "quiz.groupassignment.changeBackgroundText",
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
                                        "quiz.groupassignment.changeBackgroundImage",
                                    )}</a
                                >
                            </li>
                            <li>
                                <!-- svelte-ignore a11y-click-events-have-key-events -->
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <!-- svelte-ignore a11y-missing-attribute -->
                                <a on:click={(e) => {}}
                                    >{$t(
                                        "quiz.groupassignment.changeBackgroundColor",
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
                                        "quiz.groupassignment.resetBackground",
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
                                            "quiz.groupassignment.deleteGroup",
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
                use:clicksound={{ sound: "/media/pop-sound.mp3" }}
                type="button"
                class="absolute right-2 bottom-2 btn btn-circle btn-primary add-element"
                style="z-index: {zIndex + 1}"
            >
                <i class="fal fa-plus" />
            </button>

            {#each elements as el}
                {#if el.group == g.id}
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <div
                        id="user-card-{el.id}"
                        class="absolute card bg-white shadow border cursor-grab user-card display-inline-block {el.feedback
                            ? 'shadow-warning shadow-md'
                            : ''}"
                        style="left:{el.x}; top:{el.y};z-index: {el.zIndex};width:{card.width}px;padding:{card.padding}px;opacity: {g.isEditing ||
                        (isDragging && currentElement.id !== el.id)
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
                                    on:click:text={(e) => {
                                        editCardText(e, el);
                                    }}
                                    on:click:media={(e) => {
                                        onOpenFileUploader(e, el);
                                    }}
                                />
                            {:else if el.type == "text"}
                                <div
                                    contenteditable="true"
                                    class="w-full user-text"
                                    use:focus={el.isEditing}
                                    use:resizetext={{
                                        parentId: "user-card-" + el.id,
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
                            <Hint
                                content={el.hint}
                                on:click={(e) => {
                                    editCardHint(e, el);
                                }}
                            />
                        {/if}
                        {#if !el.isEditing && el.tts?.enabled}
                            <button
                                class="btn btn-circle btn-info btn-xs btn-outline text-info absolute bottom-2 right-2"
                                on:click={(e) => {
                                    var msg = new SpeechSynthesisUtterance();
                                    msg.text = currentElement.src;
                                    msg.lang = "de";
                                    window.speechSynthesis.speak(msg);
                                }}
                            >
                                <i class="far fa-ear" />
                            </button>
                        {/if}
                        <div
                            class="pin"
                            style="background-color:{groups[el.group]
                                .backgroundColor};"
                        ></div>

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
                                                        : "core.change",
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
                                                >{$t("quiz.feedback.title")}
                                                {$t(
                                                    !el.feedback
                                                        ? "core.add"
                                                        : "core.change",
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
                                                    sound: "/media/delete-sound.mp3",
                                                }}
                                                on:click={(e) => {
                                                    deleteElement(el);
                                                }}
                                                >{$t(
                                                    "quiz.groupassignment.deleteCard",
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
    .user-card:hover .user-card-actions,
    .group:hover .group-actions,
    .group:hover .add-element {
        display: block;
    }
    .group-actions,
    .user-card-actions,
    .add-element {
        display: none;
    }

    .edit-group {
        font-size: 5vmin;
        word-break: break-word;
    }
</style>
