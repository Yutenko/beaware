<script>
    import { onMount } from "svelte";
    import App from "./App.svelte";
    import { store } from "../store.js";
    import { APPS_PER_PAGE } from "../constants.json";
    import { MailClient, Browser } from "$components";

    let icons = $store.icons;
    let config = $store.config;

    const pages = new Array(Math.ceil(config.apps.length / APPS_PER_PAGE));

    let currentPage = 0;
    let carousel;

    function getAppsForPage(page) {
        return config.apps.slice(
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

<section class="p-8 flex flex-col">
    <div class="carousel rounded-box w-full" bind:this={carousel}>
        {#each pages as _, index}
            <div class="carousel-item w-full">
                <div
                    class="grid grid-cols-4 grid-rows-4 lg:grid-cols-5 lg:grid-rows-3 w-full items-baseline text-center"
                >
                    {#each getAppsForPage(index) as __}
                        <div class="overflow-hidden">
                            <App
                                badge={Math.floor(Math.random() * 11)}
                                installed={Math.random() > 0.5 ? true : false}
                                icon={icons[
                                    Math.floor(Math.random() * icons.length)
                                ]}
                                program={Browser}
                            />
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <div class="page-nav rounded-full bg-base-100 flex p-2 gap-2">
        {#each pages as _, index}
            <div
                class="badge badge-xs {currentPage === index ? 'active' : ''}"
            ></div>
        {/each}
    </div>
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
</style>
