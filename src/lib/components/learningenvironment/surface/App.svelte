<script>
    import { onMount } from "svelte";
    import { breakpoint } from "$lib/utils";

    export let installed = true;
    export let icon = "phedge";
    export let badge = 10;
    export let program = "";

    let appIconSize = 100;
    let appBadgeSize = (appIconSize * 30) / 100;
    const progressFillColor = "white";
    const progressOpacity = 0.9;
    const progressDuration = installed ? 0 : 10;

    $: setAppIconSize($breakpoint);

    function setAppIconSize(breakpoint) {
        if (breakpoint.isSm) appIconSize = 70;
        else if (breakpoint.isMd) appIconSize = 90;
        else if (breakpoint.isLg) appIconSize = 110;
        else if (breakpoint.isXl) appIconSize = 140;
        else if (breakpoint.is2Xl) appIconSize = 150;
        else appIconSize = 170;
    }
</script>

<div
    class="indicator min-h-[100px] items-center mb-[2.5rem]"
    style="padding:{$breakpoint.isSm ? 0 : 1}rem"
>
    <div
        class="app-icon"
        style="--appiconsize:{appIconSize}px;
    --installed:{installed ? '' : "'"};
    --appiconsizeunitless:{appIconSize};
    --progressopacity:{progressOpacity};
    --progressfillcolor:{progressFillColor};
    --progressdurationplustwo:{progressDuration + 2}s;
    --progressdurationplusthree:{progressDuration + 3}s;"
    >
        {#if !installed}
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
            <img
                class="w-full h-full"
                src="/media/learningenvironment/appicons/{icon}.svg"
                alt="appicon"
            />
        </div>
        {#if badge > 0}
            <span
                class="w-10 h-10 indicator-item badge"
                style="width:{appBadgeSize}px;height:{appBadgeSize}px;background:#eb4f3e;border:none;color:#fff;font-size:18px"
            >
                {badge}
            </span>
        {/if}
    </div>
</div>

<style>
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
        transform: scale(0.9);
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
