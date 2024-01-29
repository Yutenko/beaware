<script>
    import { t } from "$lib/translations";
    import { store } from "./store";
    import { fade } from "svelte/transition";
    import { onMount } from "svelte";
    import { Modal } from "$components"
    import { enhance } from "$app/forms";

    let openDeleteCasestudyModal = false;

    const TIME_TO_IDLE = 10; // in seconds
    let doFade = false;
    function toggleFade() {
        doFade = !doFade;
    }

    async function save() {
        toggleFade();

        let formData = new FormData();
        formData.append("title", $store.title);
        formData.append("quiz", JSON.stringify($store.quiz));
        formData.append("editor", JSON.stringify($store.editor));

        fetch(window.location.href+"?/update", {
            body: formData,
            method: "post",
        }).then(() => setTimeout(toggleFade, 2000));
    }

    onMount(() => {
        let inactivityTime = function () {
            let time;
            window.onload = resetTimer;

            document.onmousemove = resetTimer;
            document.onkeydown = resetTimer;

            function resetTimer() {
                clearTimeout(time);
                time = setTimeout(save, TIME_TO_IDLE * 1000);
            }
        };

        inactivityTime();
    });
</script>

<div class="navbar bg-base-100 fixed top-0 left-0 w-full z-20 shadow-sm">
    <div class="flex-1">
        <input
            type="text"
            class="btn btn-ghost text-xl"
            placeholder={$t("editor.untitledCasestudy")}
            bind:value={$store.title}
        />
    </div>
    <div class="flex-none">
        {#if doFade}
            <div
                in:fade
                out:fade
                class="text-sm pr-4 pl-4 text-neutral-content"
            >
                {$t("core.saving")}...
            </div>
        {/if}
        <i class="fas fa-sync {doFade ? 'fa-spin' : ''}"></i>
        <button class="btn btn-ghost" on:click={save}>{$t("core.save")}</button>
        <div class="flex-none group-actions">
            <div class="dropdown dropdown-end">
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="btn btn-circle btn-ghost">
                    <i class="far fa-ellipsis-v" />
                </label>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <div
                    tabindex="0"
                    class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"
                >
                    <ul
                        class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                    >
                       

                        <li>
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <!-- svelte-ignore a11y-no-static-element-interactions -->
                            <!-- svelte-ignore a11y-missing-attribute -->
                            <a class="text-error" on:click={(e) => {
                                openDeleteCasestudyModal = true;
                            }}
                                >{$t("editor.delete")}</a
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<Modal bind:open={openDeleteCasestudyModal}>
    <h3 class="font-bold text-lg" slot="header">{$t("editor.delete")}</h3>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div slot="body">
        <p class="pt-4">{$t("editor.deleteDescription")}</p>
    </div>
    <div slot="footer">
        <form
            method="post"
            action="?/delete&mode=edit"
            use:enhance
        >
            <button class="btn btn-secondary" type="submit">
                {$t("editor.deletePermanent")}
            </button>
            <button class="btn btn-primary" on:click={() => {}}>
                {$t("core.close")}
            </button>
        </form>
    </div>
</Modal>
