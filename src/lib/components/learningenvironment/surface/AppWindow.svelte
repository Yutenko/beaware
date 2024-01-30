<script>
    import { onMount } from "svelte";
    import { lestore } from "../store.js";
    import { APP_STATE } from "../constants.json";
    import { AppIcon, Modal } from "$components";
    import { isRealMobileBrowser } from "$lib/utils";
    import { fade } from "svelte/transition";
    import LearningEnvironment from "../shared";

    export let id;
    export let state = APP_STATE.CLOSED;
    export let icon;
    export let title;
    export let component;

    let isrealmobilebrowser = isRealMobileBrowser();
    $: openFullscreenApp = state !== APP_STATE.CLOSED;

    let appwindow = null;
    let stylesBeforeMaximation = {};
    let startWidth = 1100;
    let startHeight = 600;

    $: if (state === APP_STATE.OPEN) {
        lestore.setCurrentApp(id, appwindow);
    }
    $: minimized = state === APP_STATE.MINIMIZED;

    function handleClose() {
        lestore.setAppState(id, APP_STATE.CLOSED);
    }
    function handleMinimize() {
        lestore.setAppState(id, APP_STATE.MINIMIZED);
    }

    function toggleMaximization() {
        if (state === APP_STATE.MAXIMIZED) {
            appwindow.style.width = stylesBeforeMaximation.width;
            appwindow.style.height = stylesBeforeMaximation.height;
            appwindow.style.transform = stylesBeforeMaximation.transform;
            appwindow.style.left = "3rem";
            appwindow.style.top = "3rem";

            lestore.setAppState(id, APP_STATE.OPEN);
        } else {
            stylesBeforeMaximation.width = appwindow.style.width;
            stylesBeforeMaximation.height = appwindow.style.height;
            stylesBeforeMaximation.transform = appwindow.style.transform;

            appwindow.style.width = "100vw";
            appwindow.style.height = "100vh";
            appwindow.style.maxHeight = "100vh";
            appwindow.style.top = "0";
            appwindow.style.left = "0";
            appwindow.style.transform = "";

            lestore.setAppState(id, APP_STATE.MAXIMIZED);
        }
    }
    $: isForeground = $lestore.currentApp.target === appwindow;
    $: dimensions = {
        w: $lestore.currentApp.width
            ? $lestore.currentApp.width
            : $lestore.currentApp.target?.clientWidth,
        h: $lestore.currentApp.height
            ? $lestore.currentApp.height
            : $lestore.currentApp.target?.clientHeight,
    };

    $: isMeResizing =
        $lestore.currentApp.target === appwindow &&
        $lestore.currentApp.isResizing;

    onMount(() => {
        LearningEnvironment.sender.init({
            onCloseCurrentAppwindow: handleClose,
        });
    });
</script>

{#if state !== APP_STATE.CLOSED && !isrealmobilebrowser}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        bind:this={appwindow}
        on:click={() => lestore.setCurrentApp(id, appwindow)}
        transition:fade
        class="mockup-window {minimized
            ? 'hidden'
            : ''} mac-window fixed top-4 left-8 border border-base-300 bg-base-200 {isForeground
            ? 'shadow-lg'
            : ''}
        "
        style="width:{startWidth}px;height:{startHeight}px;z-index:{isForeground
            ? '999999'
            : '30'};"
    >
        <!-- HELPER, if window is in background, wrap it with this invisible div, to make it possible to click it from the background-->
        {#if !isForeground}
            <div
                class="absolute w-full h-full top-0 left-0 z-50"
                on:click={() => lestore.setCurrentApp(id, appwindow)}
            ></div>
        {/if}
        <div class="title-bar" on:dblclick={toggleMaximization}>
            <div class="buttons">
                <div class="close" on:click={handleClose}></div>
                <div class="minimize" on:click={handleMinimize}></div>
                <div class="maximize" on:click={toggleMaximization}></div>
            </div>
            <div class="title">
                {title}
            </div>
            <div class="pr-4">
                <AppIcon {icon} width={8} opacity={80} />
            </div>
        </div>
        {#if isMeResizing}
            <div
                class="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center flex-col bg-opacity-75 bg-base-100"
            >
                <p class="text-lg">
                    {dimensions.w}px x {dimensions.h}px
                </p>
            </div>
        {/if}
        <svelte:component this={component} />
    </div>
{/if}

{#if state !== APP_STATE.CLOSED && isrealmobilebrowser}
    <Modal
        fullscreen={true}
        bind:open={openFullscreenApp}
        on:close={handleClose}
    >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="navbar bg-base-100" slot="header">
            <div class="flex-1">
                <!-- svelte-ignore a11y-missing-attribute -->
                <a class="font-bold text-xl pl-4">
                    <AppIcon {icon} width={8} opacity={80} />
                </a>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div class="flex-none gap-2" on:click={handleClose}>
                <div class="btn btn-circle btn-ghost">
                    <i class="fal fa-times"></i>
                </div>
            </div>
        </div>
        <div class="h-[100vh]" slot="body">
            <svelte:component this={component} />
        </div>
    </Modal>
{/if}

<style>
    .app-icon {
        user-select: none;
        cursor: pointer;
        width: 10vmax;
        height: 10vmax;
        background: rgba(255, 255, 255, 1);
        background-size: cover;
        border-radius: 20%;
        position: relative;
        /*-webkit-mask-image: linear-gradient(white, black);*/
        transition: all 0.2s ease-in-out;
    }
    .mockup-window {
        padding: 0px !important;
    }
    .mockup-window::before {
        content: none !important;
    }

    .mac-window.minimize {
        top: 125%;
        -webkit-transform: translateY(-50%) translateX(-50%) scale(1);
        transform: translateY(-50%) translateX(-50%) scale(1);
        opacity: 1;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

    .mac-window.minimize:hover {
        top: 120%;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
    }

    .mac-window.maximize {
        height: 100%;
        max-height: 100%;
        width: 100%;
        max-width: 100%;
        -webkit-transform: translateY(-50%) translateX(-50%) scale(1);
        transform: translateY(-50%) translateX(-50%) scale(1);
    }

    .mac-window .title-bar {
        width: 100%;
        clear: both;
        padding-top: 0.5rem;
        display: flex;
    }

    .mac-window .title-bar .buttons {
        height: 100%;
        width: 61px;
        float: left;
        margin-left: 9px;
    }

    .mac-window .title-bar .buttons .close,
    .mac-window .title-bar .buttons .maximize,
    .mac-window .title-bar .buttons .minimize {
        float: left;
        height: 15px;
        width: 15px;
        border-radius: 50%;
        margin-top: 5px;
        background: #fb4948;
        border: 1px solid rgba(214, 46, 48, 0.15);
        position: relative;
    }

    .mac-window .title-bar .buttons .close:before,
    .mac-window .title-bar .buttons .maximize:before,
    .mac-window .title-bar .buttons .minimize:before {
        content: "";
        position: absolute;
        height: 1px;
        width: 8px;
        background: #360000;
        top: 50%;
        left: 50%;
        -webkit-transform: translateY(-50%) translateX(-50%) rotate(45deg);
        transform: translateY(-50%) translateX(-50%) rotate(45deg);
        opacity: 0;
    }

    .mac-window .title-bar .buttons .close:after,
    .mac-window .title-bar .buttons .maximize:after,
    .mac-window .title-bar .buttons .minimize:after {
        content: "";
        position: absolute;
        height: 1px;
        width: 8px;
        background: #360000;
        top: 50%;
        left: 50%;
        -webkit-transform: translateY(-50%) translateX(-50%) rotate(-45deg);
        transform: translateY(-50%) translateX(-50%) rotate(-45deg);
        opacity: 0;
    }

    .mac-window .title-bar .buttons .minimize {
        background: #fdb225;
        margin-left: 8.5px;
        border-color: rgba(213, 142, 27, 0.15);
        position: relative;
    }

    .mac-window .title-bar .buttons .minimize:before {
        content: "";
        position: absolute;
        height: 1px;
        width: 8px;
        background: #864502;
        top: 50%;
        left: 50%;
        -webkit-transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
    }

    .mac-window .title-bar .buttons .minimize:after {
        display: none;
    }

    .mac-window .title-bar .buttons .maximize {
        float: right;
        background: #2ac833;
        border-color: rgba(30, 159, 32, 0.15);
    }

    .mac-window .title-bar .buttons .maximize:before {
        width: 6px;
        height: 6px;
        background: #0b5401;
        -webkit-transform: translateY(-50%) translateX(-50%);
        transform: translateY(-50%) translateX(-50%);
        border: 1px solid #2ac833;
        border-radius: 2px;
    }

    .mac-window .title-bar .buttons .maximize:after {
        width: 10px;
        height: 2px;
        background: #2ac833;
        -webkit-transform: translateY(-50%) translateX(-50%) rotate(45deg);
        transform: translateY(-50%) translateX(-50%) rotate(45deg);
    }

    .mac-window .title-bar .buttons:hover .close:after,
    .mac-window .title-bar .buttons:hover .close:before,
    .mac-window .title-bar .buttons:hover .maximize:after,
    .mac-window .title-bar .buttons:hover .maximize:before,
    .mac-window .title-bar .buttons:hover .minimize:after,
    .mac-window .title-bar .buttons:hover .minimize:before {
        opacity: 1;
    }

    .mac-window .title-bar .title {
        margin: 0 auto;
    }
</style>
