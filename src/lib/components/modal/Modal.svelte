<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let open;
    export let fullscreen = false;
    let dialog;

    $: if (dialog && open) {
        dialog.showModal();
    }

    function handleClose() {
        open = false;
        dialog.close();
        dispatch("close");
    }
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="modal"
    bind:this={dialog}
    on:close={handleClose}
    on:click|self={handleClose}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
        class="modal-box w-full {fullscreen ? 'is-fullscreen' : ''}"
        on:click|stopPropagation
    >
        <slot name="header" />
        <slot name="body" />
        <form method="dialog">
            <slot name="footer" />
        </form>
    </div>
</dialog>

<style>
    .is-fullscreen {
        height: 100vh !important;
        max-height: 100vh !important;
        padding: 0px;
    }
</style>
