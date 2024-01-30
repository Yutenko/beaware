<script>
    import { onMount } from "svelte";
    import App from "./App.svelte";
    import { globalStore } from "$components/global-store";
    import { APPS_PER_PAGE, APP_STATE } from "../constants.json";
    import Moveable from "svelte-moveable";

    let config = $globalStore.config;
    let apps = Object.keys(config.apps);

    const pages = new Array(Math.ceil(apps.length / APPS_PER_PAGE));

    let currentPage = 0;
    let carousel;

    function getAppsForPage(page) {
        return apps.slice(
            page * APPS_PER_PAGE,
            page * APPS_PER_PAGE + APPS_PER_PAGE,
        );
    }

    function handleScroll() {
        const scrollLeft = carousel.scrollLeft;
        const slideWidth = carousel.offsetWidth;
        const newSlide = Math.round(scrollLeft / slideWidth);

        if (newSlide !== currentPage) {
            currentPage = newSlide;
        }
    }

    onMount(() => {
        carousel.addEventListener("scroll", handleScroll);
    });
</script>

{#if $globalStore.currentApp.state === APP_STATE.OPEN}
    <Moveable
        target={$globalStore.currentApp.target}
        draggable={true}
        throttleDrag={1}
        resizable={true}
        throttleResize={1}
        bounds={{
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            position: "css",
            minWidth: 100,
            minHeight: 100,
        }}
        renderDirections={["nw", "ne", "sw", "se"]}
        minWidth={100}
        on:drag={({ detail: e }) => {
            e.target.style.transform = e.transform;
        }}
        on:resizeStart={() => {
            globalStore.setAppResizing(true);
        }}
        on:resize={({ detail: e }) => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
            globalStore.setAppDimensions(e.width, e.height);
        }}
        on:resizeEnd={() => {
            globalStore.setAppResizing(false);
        }}
    />
{/if}

<section class="p-8 flex flex-col">
    <div class="carousel rounded-box w-full" bind:this={carousel}>
        {#each pages as _, index}
            <div class="carousel-item w-full">
                <div
                    class="grid grid-cols-4 grid-rows-4 lg:grid-cols-5 lg:grid-rows-3 w-full items-baseline text-center"
                >
                    {#each getAppsForPage(index) as id}
                        <div>
                            <App {id} />
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    {#if pages.length > 1}
        <div class="page-nav rounded-full bg-base-100 flex p-2 gap-2">
            {#each pages as _, index}
                <div
                    class="badge badge-xs {currentPage === index
                        ? 'active'
                        : ''}"
                ></div>
            {/each}
        </div>
    {/if}
</section>

<style>
    .page-nav {
        margin: 0 auto;
        background: rgba(255, 255, 255, 0.5);
    }
    .page-nav .badge {
        border: white;
        border: none;
        background: rgba(255, 255, 255, 0.5);
    }
    .page-nav .active {
        background: rgba(255, 255, 255, 1);
    }

    :global(.moveable-line) {
        display: none !important;
    }
    :global(.moveable-control) {
    }
</style>
