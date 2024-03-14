<script>
    import { Modal } from "$components";
    import { onMount } from "svelte";
    import { t } from "$lib/translations";
    import { isRealMobileBrowser } from "$lib/utils";

    export let config = {};
    config = {
        startscreen: "http://localhost:5173/p/microsoft",
        bookmarks: [],
        specialURLs: [
            {
                url: "http://localhost:5173/p/google",
                favicon: "/media/simulation/p/google/favicon.ico",
                title: $t("phishing.google.tabtitle"),
                displayname: "https://accounts.google.com/v3/signin/",
            },
            {
                url: "http://localhost:5173/p/microsoft",
                favicon: "/media/simulation/p/ms/favicon.ico",
                title: $t("phishing.ms.tabtitle"),
                displayname:
                    "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
            },
        ],
    };

    let counter = 0;
    let tabs = [];
    let currentTab;
    let url;

    let urlInput;
    let iframe;
    let loading = false;
    let openCertificateModal = false;
    let isrealmobilebrowser = isRealMobileBrowser();

    addTab();

    function addTab() {
        tabs = [
            ...tabs,
            {
                id: counter++,
                url: null,
                displayname: null,
                favicon: null,
                title: $t("browser.newtab"),
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
        loading = false;
        currentTab = tabs[index];
        if (!currentTab.url) {
            url = "";
            urlInput?.focus();
        } else {
            url = currentTab.displayname;
        }
    }
    function enterURL(e) {
        if (e.keyCode === 13 || e.which === 13) {
            reload();
        }
    }

    function setTab({ tab, displayname, favicon, title }) {
        // check if url is a phishing simulated url
        if (config.specialURLs) {
            for (let i = 0; i < config.specialURLs.length; i++) {
                if (config.specialURLs[i].url === url) {
                    displayname = config.specialURLs[i].displayname;
                    favicon = config.specialURLs[i].favicon;
                    title = config.specialURLs[i].title;
                }
            }
        }
        if (url !== "") {
            tab.url = new URL(withHttp(url));
            tab.displayname = displayname ? displayname : tab.url.href;
            tab.favicon = favicon ? favicon : null;
            tab.title = title ? title : tab.url.hostname;
        } else {
            tab.url = null;
            tab.displayname = "";
            tab.title = $t("browser.newtab");
        }
        currentTab = tab;
        tabs = tabs;
        url = currentTab.displayname;
    }

    function reload() {
        if (url !== "") {
            loading = true;
        }
        setTab({ tab: currentTab });
    }
    function handleLoad(e) {
        urlInput.blur();
        loading = false;
    }
    function withHttp(url) {
        return !/^https?:\/\//i.test(url) ? `https://${url}` : url;
    }
    function openCertificateModalHandler() {
        openCertificateModal = true;
    }

    let browserWindowHeight = 0;
    let browserTabsHeight = 0;
    let browserNavHeight = 0;

    $: cframeH = browserWindowHeight - (browserTabsHeight + browserNavHeight);

    onMount(() => {
        if (config.startscreen) {
            url = config.startscreen;
            reload();
        }
    });
</script>

<div class="browser" bind:clientHeight={browserWindowHeight}>
    <!-- TABS -->
    <div
        role="tablist"
        class="tabs tabs-lifted block match-browser-window"
        bind:clientHeight={browserTabsHeight}
    >
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
                <div class="flex items-center min-w-[100px] max-w-[240px]">
                    {#if tab.favicon}
                        <div class="pr-2">
                            <img
                                src={tab.favicon}
                                class="h-[16px] w-[16px] {currentTab.id ===
                                    tab.id && loading
                                    ? 'spin-it'
                                    : ''}"
                                aria-hidden="true"
                                alt="favicon"
                            />
                        </div>
                    {:else}
                        <div class="pr-2">
                            <i
                                class="fal fa-globe {currentTab.id === tab.id &&
                                loading
                                    ? 'fa-spin'
                                    : ''}"
                            ></i>
                        </div>
                    {/if}
                    <span class="pr-5 max-h-[28px]">{tab.title}</span>
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
    <div class="navbar bg-base-200" bind:clientHeight={browserNavHeight}>
        {#if !isrealmobilebrowser}
            <div class="justify-start">
                <div role="button" class="btn btn-ghost btn-circle">
                    <i class="fas fa-long-arrow-left"></i>
                </div>
                <div role="button" class="btn btn-ghost btn-circle">
                    <i class="fas fa-long-arrow-right"></i>
                </div>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-interactive-supports-focus -->
                <div
                    role="button"
                    class="btn btn-ghost btn-circle"
                    on:click={reload}
                >
                    <i class="fas fa-redo-alt"></i>
                </div>
            </div>
        {/if}
        <div class="justify-center w-11/12">
            <div class="w-full flex items-center">
                {#if currentTab.url}
                    <div class="absolute z-10">
                        <details class="dropdown">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <summary
                                class="btn btn-sm btn-ghost btn-circle ml-2 text-success"
                            >
                                <i class="far fa-lock"></i>
                            </summary>
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
                                        {currentTab?.url?.origin}
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
                        </details>
                    </div>
                {/if}
                <input
                    on:click={(e) => {
                        // hack, without the input is not focusable
                        e.target.focus();
                    }}
                    bind:this={urlInput}
                    on:keydown={enterURL}
                    bind:value={url}
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

    <div
        class="content-frame relative w-full border-t border-base-200 overflow-hidden"
        style="height: {cframeH}px;"
    >
        {#if currentTab.url}
            <iframe
                class="w-full min-w-full h-full"
                style="z-index:-1"
                bind:this={iframe}
                src={currentTab.url.href +
                    "?beawaretimestamp=" +
                    new Date().getTime()}
                on:load={handleLoad}
                title="content-iframe"
            ></iframe>
        {/if}
    </div>
</div>

<Modal bind:open={openCertificateModal}>
    <h3 class="font-bold text-lg" slot="header">
        {$t("browser.certificateViewer")}: {currentTab.url?.hostname}
    </h3>
    <div slot="body">
        <div class="overflow-x-auto">
            <div class="mt-4 mb-4">
                <p class="mb-4">Issued To</p>
                <table class="table table-xs pl-4">
                    <tbody>
                        <tr>
                            <td>Common Name (CN)</td>
                            <td>*{currentTab.url?.hostname}</td>
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

<style>
    .browser {
        width: 100%;
        height: 100%;
        padding-top: 5px;
        border-radius: 10px;
        text-align: left;
    }
    .tab-active {
        background-color: #f2f2f2 !important;
    }
    .match-browser-window {
        margin-top: -5px;
        margin-left: -1px;
        margin-bottom: -3px;
    }
    .content-frame {
        border: none;
    }
    iframe {
        border: none;
    }
    .spin-it {
        animation-name: spin;
        animation-duration: 5000ms;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
