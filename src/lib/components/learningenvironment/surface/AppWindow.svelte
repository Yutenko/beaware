<script>
    import { lestore } from "../store.js";
    import { APP_STATE } from "../constants.json";

    export let id;
    export let state = APP_STATE.CLOSED;
    export let title;
    export let component;

    let appwindow = null;
    let stylesBeforeMaximation = {};
    let startWidth = 900;
    let startHeight = 600;

    $: if (state === APP_STATE.OPEN) {
        lestore.setCurrentApp(id, appwindow);
    }
    $: minimized = state === APP_STATE.MINIMIZED;

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
</script>

{#if state !== APP_STATE.CLOSED}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div
        bind:this={appwindow}
        class="mockup-window fade-in {minimized
            ? 'hidden'
            : ''} mac-window fixed top-4 left-8 border border-base-300 bg-base-200
        "
        on:click={() => lestore.setCurrentApp(id, appwindow)}
        style="width:{startWidth}px;height:{startHeight}px;z-index:{$lestore
            .currentApp.target === appwindow
            ? '999999'
            : '30'}"
    >
        <div class="title-bar">
            <div class="buttons">
                <div
                    class="close"
                    on:click={() => lestore.setAppState(id, APP_STATE.CLOSED)}
                ></div>
                <div
                    class="minimize"
                    on:click={() =>
                        lestore.setAppState(id, APP_STATE.MINIMIZED)}
                ></div>
                <div class="maximize" on:click={toggleMaximization}></div>
            </div>
            <div class="title">{title}</div>
        </div>
        <svelte:component this={component} />
    </div>
{/if}

<style>
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
        padding-bottom: 0.5rem;
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

    .fade-in {
        -webkit-animation: fade-in 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
        animation: fade-in 0.5s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    }

    @-webkit-keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .fade-out {
        -webkit-animation: fade-out 0.5s ease-out both;
        animation: fade-out 0.5s ease-out both;
    }

    @-webkit-keyframes fade-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    @keyframes fade-out {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
</style>
