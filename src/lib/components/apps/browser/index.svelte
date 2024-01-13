<script>
    import { Modal } from "$components";
    import { onMount } from "svelte";
    import { t } from "$lib/translations";

    let counter = 0;
    let tabs = [];
    let currentTab;
    let url;

    let urlInput;
    let iframe;
    let loading = false;
    let openCertificateModal = false;

    addTab();

    function addTab() {
        tabs = [
            ...tabs,
            {
                id: counter++,
                url: { hostname: $t("browser.newtab") },
            },
        ];
        return changeTab(tabs.length - 1);
    }
    function removeTab(index) {
        // if current tab is closed, change to tab before this one
        if (tabs[index].id === currentTab.id) {
            index - 1 >= 0 && changeTab(index - 1);
        }
        if (tabs.length === 1) return;
        tabs = tabs.filter((_, i) => i !== index);
    }
    function changeTab(index) {
        currentTab = tabs[index];
        if (!currentTab.url.origin) {
            url = "";
            urlInput?.focus();
        } else {
            url = currentTab.url.hostname;
        }
    }
    function enterURL(e) {
        if (e.keyCode === 13 || e.which === 13) {
            forceReload();
        }
    }
    function loadURL() {
        if (url !== "") {
            loading = true;
            currentTab.url = new URL(withHttp(url));
        } else {
            currentTab.url = { hostname: $t("browser.newtab") };
        }

        tabs = tabs;
        urlInput.blur();
    }
    function reload() {
        if (currentTab.url.hostname) {
            forceReload();
        }
    }
    function forceReload() {
        // nice hacky way to reload current tab
        currentTab.url = url;
        setTimeout(loadURL, 10);
    }
    function handleLoad(e) {
        loading = false;
    }
    function withHttp(url) {
        return !/^https?:\/\//i.test(url) ? `https://${url}` : url;
    }
    function openCertificateModalHandler() {
        openCertificateModal = true;
    }

    onMount(() => {
        url = "https://spieldeinleben.ch/";
        forceReload();
    });
</script>

<Modal bind:open={openCertificateModal}>
    <h3 class="font-bold text-lg" slot="header">
        {$t("browser.certificateViewer")}: {currentTab.url.hostname}
    </h3>
    <div slot="body">
        <div class="overflow-x-auto">
            <div class="mt-4 mb-4">
                <p class="mb-4">Issued To</p>
                <table class="table table-xs pl-4">
                    <tbody>
                        <tr>
                            <td>Common Name (CN)</td>
                            <td>*{currentTab.url.host}</td>
                        </tr>
                        <tr>
                            <td>Organisation (O)</td>
                            <td>Not part of the certificate</td>
                        </tr>
                        <tr>
                            <td>Organisational Unit (OU)</td>
                            <td>Not part of the certificate</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="mt-4 mb-4">
                <p class="mb-4">Issued By</p>
                <table class="table table-xs pl-4">
                    <tbody>
                        <tr>
                            <td>Common Name (CN)</td>
                            <td>GTS CA 1C3</td>
                        </tr>
                        <tr>
                            <td>Organisation (O)</td>
                            <td>Google Trust Services LLC</td>
                        </tr>
                        <tr>
                            <td>Organisational Unit (OU)</td>
                            <td>Not part of the certificate</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-4 mb-4">
                <p class="mb-4">Validity Period</p>
                <table class="table table-xs pl-4">
                    <tbody>
                        <tr>
                            <td>Issued On</td>
                            <td>heute</td>
                        </tr>
                        <tr>
                            <td>Expires On</td>
                            <td>2090</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mt-4 mb-4">
                <p class="mb-4">SHA-256 Fingerprints</p>
                <table class="table table-xs pl-4">
                    <tbody>
                        <tr>
                            <td>Certificate</td>
                            <td
                                >3u2193u9281u838998u189u32819u3984u9u9bu982398n4ux93843249v34c3898x324c9823cn2u4xn32u4</td
                            >
                        </tr>
                        <tr>
                            <td>Public Key</td>
                            <td
                                >34i30928if2i309i3029i44324324234kml320990n93024xu49n3u29x3nu3a39s2b9832vu49b3u2u2392s</td
                            >
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</Modal>

<div class="browser">
    <!-- TABS -->
    <div role="tablist" class="tabs tabs-lifted block match-browser-window">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        {#each tabs as tab, index}
            <!-- svelte-ignore a11y-interactive-supports-focus -->
            <a
                role="tab"
                class="tab {currentTab.id === tab.id
                    ? 'tab-active'
                    : ''} pr-0 overflow-hidden"
                on:click={() => changeTab(index)}
            >
                <div class="flex items-center min-w-[100px] max-w-[200px]">
                    <span
                        class="{currentTab.id === tab.id && loading
                            ? 'visible'
                            : 'invisible'} loading loading-ring loading-xs mr-2"
                    ></span>
                    <div class="pr-5">{tab.url.hostname}</div>
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    {#if tabs.length > 1}
                        <a
                            class="absolute right-0 btn btn-ghost btn-sm opacity-20"
                            on:click={() => removeTab(index)}
                        >
                            <i class="fa fa-times"></i>
                        </a>
                    {/if}
                </div>
            </a>
        {/each}
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a role="tab" class="tab max-w-[30px]">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <a class="btn btn-ghost btn-sm opacity-50" on:click={addTab}>
                <i class="fa fa-plus"></i>
            </a>
        </a>
    </div>

    <!-- NAVBAR -->
    <div class="navbar bg-base-200">
        <div class="justify-start">
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <i class="fas fa-long-arrow-left"></i>
            </div>
            <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
                <i class="fas fa-long-arrow-right"></i>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                tabindex="0"
                role="button"
                class="btn btn-ghost btn-circle"
                on:click={reload}
            >
                <i class="fas fa-redo-alt"></i>
            </div>
        </div>
        <div class="justify-center w-11/12">
            <div class="w-full flex items-center">
                <div class="absolute z-10">
                    <div class="dropdown">
                        {#if currentTab.url.origin}
                            <div
                                tabindex="0"
                                role="button"
                                class="btn btn-sm btn-ghost btn-circle ml-2 text-success"
                            >
                                <i class="far fa-lock"></i>
                            </div>
                            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                            <div
                                tabindex="0"
                                class="dropdown-content z-[1] card card-compact bg-base-100 p-2 shadow"
                            >
                                <div class="card-body">
                                    <h3 class="card-title">
                                        {$t("browser.security")}
                                    </h3>
                                    <p class="text-sm opacity-50">
                                        {currentTab.url.origin}
                                    </p>
                                    <div class="overflow-x-auto">
                                        <table class="table">
                                            <!-- head -->
                                            <thead>
                                                <tr>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th>
                                                        <i class="far fa-lock">
                                                        </i>
                                                    </th>
                                                    <td>
                                                        <div class="font-bold">
                                                            {$t(
                                                                "browser.connectionSafe",
                                                            )}
                                                        </div>
                                                        <p class="opacity-50">
                                                            {$t(
                                                                "browser.securityDescription",
                                                            )}
                                                        </p>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                                <!-- row 2 -->
                                                <tr
                                                    class="hover cursor-pointer"
                                                    on:click={openCertificateModalHandler}
                                                >
                                                    <th>
                                                        <i class="far fa-check"
                                                        ></i>
                                                    </th>
                                                    <td>
                                                        <div class="font-bold">
                                                            {$t(
                                                                "browser.validCertificate",
                                                            )}
                                                        </div>
                                                    </td>
                                                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                                                    <td>
                                                        <!-- svelte-ignore a11y-interactive-supports-focus -->
                                                        <div
                                                            role="button"
                                                            class="btn btn-ghost btn-circle"
                                                        >
                                                            <i
                                                                class="fas fa-external-link"
                                                            ></i>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                <input
                    bind:this={urlInput}
                    bind:value={url}
                    on:keydown={enterURL}
                    type="text"
                    placeholder={$t("browser.typeurl")}
                    class="input input-bordered w-full pl-14 rounded-full"
                />
            </div>
        </div>
        <div class="justify-end">
            <button class="btn btn-ghost btn-circle">
                <i class="far fa-ellipsis-v"></i>
            </button>
        </div>
    </div>

    <!-- CONTENT-FRAME -->
    <div class="content-frame border-t border-base-200 overflow-auto">
        {#if currentTab.url.origin}
            <iframe
                bind:this={iframe}
                src={currentTab.url.origin}
                on:load={handleLoad}
                title="content-iframe"
            ></iframe>
        {/if}
    </div>
</div>

<style>
    .browser {
        height: 90vh;
        margin: 1rem;
        padding-top: 4px;
        border: 1px solid #ddd;
        border-radius: 10px;
        overflow: hidden;
    }
    .tab-active {
        background-color: #f2f2f2 !important;
    }
    .match-browser-window {
        margin-top: -5px;
        margin-left: -1px;
        margin-bottom: -2px;
    }
    .content-frame {
        height: 89.5%;
        overflow: auto;
        position: relative;
    }
    .content-frame::before {
        content: "";
        position: absolute;
        background-image: url(/media/edge.webp);
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
    }
    iframe {
        width: 100%;
        height: 100%;
        border: none;
        position: absolute;
        z-index: 1;
        background: #fff;
    }
</style>
