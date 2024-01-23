<script>
    import { lestore } from "../store.js";
    import { APP_STATE } from "../constants.json";

    $: minimizedapps = Object.values($lestore.config.apps).filter(
        (app) => app.state === APP_STATE.MINIMIZED,
    );
</script>

{#if minimizedapps.length > 0}
    <div
        class="appwindow-bar flex gap-2 items-center text-center justify-center rounded-badge p-3 bg-base-300 min-w-[15%] max-w-[80%]"
        style="width:{minimizedapps.length * 7.5}%"
    >
        {#each minimizedapps as app}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="app-icon puff-in-center"
                on:click={() => lestore.setAppState(app.id, APP_STATE.OPEN)}
            >
                <img
                    class="w-full h-full"
                    src="/media/learningenvironment/appicons/{app.icon}.svg"
                    alt="appicon"
                />
            </div>
        {/each}
    </div>
{/if}

<style>
    .appwindow-bar {
        position: absolute;
        background-color: rgba(255, 255, 255, 0.5);
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
