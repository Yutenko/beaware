<script>
    import AppWindow from "./AppWindow.svelte";

    import { breakpoint } from "$lib/utils";
    import { systemApps } from "$lib/stores-global";
    import { APP_STATE } from "$components/learningenvironment/constants.json";
    import {
        App_MailClientEmbed,
        App_LearningUnitEmbed,
        App_ResultsEmbed,
        App_Browser,
        AppIcon,
    } from "$components";
    import { onMount } from "svelte";
    import APP_TYPE from "$components/apps/types";

    export let app = {};

    let appIconSize = 100;
    let appBadgeSize = (appIconSize * 29) / 100;
    const progressFillColor = "white";
    const progressOpacity = 0.9;
    const progressDuration = app.installed ? 0 : 10;

    $: setAppIconSize($breakpoint);

    function setAppIconSize(breakpoint) {
        if (breakpoint.isSm) appIconSize = 70;
        else if (breakpoint.isMd) appIconSize = 90;
        else if (breakpoint.isLg) appIconSize = 110;
        else if (breakpoint.isXl) appIconSize = 140;
        else if (breakpoint.is2Xl) appIconSize = 150;
        else appIconSize = 170;
    }

    function getAppComponent() {
        if (app.type === APP_TYPE.BROWSER) return App_Browser;
        if (app.type === APP_TYPE.MAIL) return App_MailClientEmbed;
        if (app.type === APP_TYPE.LEARNINGUNIT) return App_LearningUnitEmbed;
        if (app.type === APP_TYPE.RESULTS) return App_ResultsEmbed;
    }

    function openApp() {
        if (app.installed) {
            systemApps.setAppState(app.id, APP_STATE.OPEN);
        }
    }

    function checkInstalled() {
        // app not installed, wait for animation and set flag to installed = true
        if (!app.installed) {
            setTimeout(
                function () {
                    systemApps.setAppInstalled(app.id);
                },
                (progressDuration + 3) * 1000,
            );
        }
    }

    onMount(() => {
        app.component = getAppComponent();
        checkInstalled();
    });
</script>

<AppWindow
    component={app.component}
    state={app.state}
    title={app.title}
    icon={app.icon}
    id={app.id}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
    class="indicator items-center mb-[1rem] mt-[1rem]"
    style="padding:{$breakpoint.isSm ? 0 : 1}rem"
    on:click={openApp}
>
    <div
        class="app-icon"
        style="--appiconsize:{appIconSize}px;
               --installed:{app.installed ? '' : "'"};
               --appiconsizeunitless:{appIconSize};
               --progressopacity:{progressOpacity};
               --progressfillcolor:{progressFillColor};
               --progressdurationplustwo:{progressDuration + 2}s;
               --progressdurationplusthree:{progressDuration + 3}s;"
    >
        {#if !app.installed}
            <div class="progress z-10">
                <svg>
                    <circle
                        cx="50"
                        cy="50"
                        r="25"
                        fill="transparent"
                        stroke-width="50"
                        stroke-dasharray="360"
                        stroke-dashoffset="360"
                    ></circle>
                </svg>
            </div>
        {/if}

        <div class="absolute top-0 left-0 p-1">
            <AppIcon icon={app.icon} />
            <p class="text-base-100 mt-2">{app.title}</p>
        </div>
        {#if app.badge > 0}
            <span
                class="w-10 h-10 indicator-item badge"
                style="width:{appBadgeSize}px;height:{appBadgeSize}px;"
            >
                {app.badge}
            </span>
        {/if}
    </div>
</div>

<style>
    .badge {
        background: #eb4f3e;
        border: none;
        color: #fff;
        font-size: 18px;
    }
    .app-icon {
        user-select: none;
        cursor: pointer;
        width: var(--appiconsize);
        height: var(--appiconsize);
        background: rgba(255, 255, 255, 1);
        background-size: cover;
        border-radius: 20%;
        position: relative;
        /*-webkit-mask-image: linear-gradient(white, black);*/
        transition: all 0.2s ease-in-out;
    }
    .app-icon:hover {
        transform: scale(1.1);
    }
    .app-icon:before {
        content: var(--installed);
        display: block;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.4);
        position: absolute;
        border-radius: 20%;
        opacity: 0;
        animation:
            app-icon-fade-in 400ms 600ms ease-out forwards,
            app-icon-fade-out 300ms var(--progressdurationplustwo) ease-in
                forwards;
    }
    @keyframes app-icon-fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes app-icon-fade-out {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    .app-icon .progress {
        opacity: var(--progressopacity);
        position: relative;
        width: 70%;
        height: 70%;
        top: 15%;
        left: 15%;
        border-radius: 100%;
        box-shadow: inset 0 0 0 4px var(--progressfillcolor);
        transform: rotate(-90deg);
        opacity: 0;
        animation:
            progress-start 400ms 600ms ease-out forwards,
            progress-leave 300ms var(--progressdurationplustwo) ease-in forwards;
    }
    @keyframes progress-start {
        from {
            transform: scale(0.3) rotate(-90deg);
            box-shadow: inset 0 0 0 12px var(--progressfillcolor);
            opacity: 0;
        }
        to {
            transform: scale(1) rotate(-90deg);
            box-shadow: inset 0 0 0 4px var(--progressfillcolor);
            opacity: var(--progressopacity);
        }
    }
    @keyframes progress-leave {
        from {
            opacity: var(--progressopacity);
            transform: rotate(-90deg);
        }
        to {
            opacity: 0;
            transform: scale(3) rotate(-90deg);
        }
    }
    svg {
        width: 100px;
        height: 100px;
        transform: scale(calc(var(--appiconsizeunitless) / 143));
        transform-origin: top left;
    }
    svg circle {
        stroke: white;
        animation:
            progress-circle 10s 2s linear forwards,
            progress-leave 300ms 13s linear;
        opacity: 0.6;
    }
    @keyframes progress-circle {
        from {
            stroke-dasharray: 360;
            stroke-dashoffset: 360;
        }
        to {
            stroke-dasharray: 540;
            stroke-dashoffset: 360;
        }
    }
</style>
