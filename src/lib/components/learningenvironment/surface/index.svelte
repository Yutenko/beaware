<script>
    import App from "./App.svelte";
    const icons = ["phedge", "saphari", "phrome", "mail"];
    const appsPerPage = 3 * 5;
    const config = { apps: new Array(appsPerPage + 4) };
    const pages = new Array(Math.ceil(config.apps.length / appsPerPage));
    let counter = 0;
    let currentPage = 0;

    function getAppsForPage(page) {
        return config.apps.slice(
            page * appsPerPage,
            page * appsPerPage + appsPerPage,
        );
    }
</script>

<section class="p-8 flex flex-col">
    <div class="carousel rounded-box h-full w-full">
        {#each pages as page, index}
            <div class="carousel-item w-full">
                <div
                    class="grid grid-cols-4 lg:grid-cols-5 grid-rows-4 w-full items-center text-center"
                >
                    {#each getAppsForPage(index) as app}
                        <div>
                            <App
                                badge={Math.floor(Math.random() * 11)}
                                installed={Math.random() > 0.5 ? true : false}
                                icon={icons[
                                    Math.floor(Math.random() * icons.length)
                                ]}
                            />
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
    <div class="page-nav rounded-full bg-base-100 flex p-2 gap-2">
        {#each pages as page}
            <div class="badge badge-xs"></div>
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
        background: rgba(255, 255, 255, 0.7);
    }
    .page-nav .active {
        border: white;
        background: white;
    }
</style>
