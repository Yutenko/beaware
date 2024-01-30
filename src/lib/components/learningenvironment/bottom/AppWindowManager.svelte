<script>
    import { globalStore } from "$components/global-store";
    import { APP_STATE } from "../constants.json";
    import { tooltip } from "$lib/actions";
    import { AppIcon } from "$components";
    import { t } from "$lib/translations";
    import { isRealMobileBrowser } from "$lib/utils";
    import { fade } from "svelte/transition";

    $: minimizedapps = Object.values($globalStore.config.apps)
        .filter((app) => app.state !== APP_STATE.CLOSED)
        .sort((a, b) => a.opened - b.opened);

    $: irmb = isRealMobileBrowser();

    let lastAction = APP_STATE.OPEN;
    let dockHovered = false;

    function handleAppState(app) {
        if (app.state === APP_STATE.MINIMIZED) {
            app.state = APP_STATE.OPEN;
        }
        globalStore.setCurrentApp(app.id, app.target);
    }
    function handleAllApps() {
        if (lastAction === APP_STATE.OPEN) {
            globalStore.minimizeAllOpenApps();
            lastAction = APP_STATE.MINIMIZED;
        } else {
            globalStore.openAllMinimizedApps();
            lastAction = APP_STATE.OPEN;
        }
    }
    function toggleHovered() {
        dockHovered = !dockHovered;
    }
    $: dockHoveredTooltipContent =
        lastAction === APP_STATE.OPEN
            ? $t("lenv.minimizeall")
            : $t("lenv.openall");
    $: dockWidth = minimizedapps.length * 7.5;
</script>

{#if minimizedapps.length > 0 && !irmb}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="appwindow-bar flex gap-2 items-center text-center justify-center rounded-badge p-3 bg-base-300 min-w-[17%] max-w-[80%]"
        style="width:{dockWidth}%"
        transition:fade
        on:mouseenter={toggleHovered}
        on:mouseleave={toggleHovered}
        on:touchstart={toggleHovered}
        on:touchend={toggleHovered}
    >
        {#if dockHovered}
            <button
                class="absolute right-0 btn btn-square btn-ghost btn-sm opacity-80"
                on:click={handleAllApps}
                use:tooltip={{ content: dockHoveredTooltipContent }}
            >
                <i class="fas fa-window-restore"></i>
            </button>
        {/if}

        {#each minimizedapps as app}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="app-icon puff-in-center"
                on:click={() => handleAppState(app)}
                use:tooltip={{ content: app.title }}
            >
                <AppIcon icon={app.icon} opacity={80} />
            </div>
        {/each}
    </div>
{/if}

<style>
    .appwindow-bar {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
        background-image: linear-gradient(180deg, #91e7db, #505a78);
        margin: 0 auto;
        bottom: 5px;
        left: 0;
        right: 0;
    }
    .app-icon {
        user-select: none;
        cursor: pointer;
        width: 5vmax;
        height: 5vmax;
        background: rgba(255, 255, 255, 1);
        background-size: cover;
        border-radius: 20%;
        position: relative;
        /*-webkit-mask-image: linear-gradient(white, black);*/
        transition: all 0.2s ease-in-out;
    }
    .puff-in-center {
        -webkit-animation: puff-in-center 0.3s
            cubic-bezier(0.47, 0, 0.745, 0.715) both;
        animation: puff-in-center 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) both;
    }

    @-webkit-keyframes puff-in-center {
        0% {
            -webkit-transform: scale(2);
            transform: scale(2);
            -webkit-filter: blur(4px);
            filter: blur(4px);
            opacity: 0;
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
    }
    @keyframes puff-in-center {
        0% {
            -webkit-transform: scale(2);
            transform: scale(2);
            -webkit-filter: blur(4px);
            filter: blur(4px);
            opacity: 0;
        }
        100% {
            -webkit-transform: scale(1);
            transform: scale(1);
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
    }
</style>
