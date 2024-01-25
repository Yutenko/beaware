<script>
    export let open;
    export let fullscreen = false;
    let dialog;

    $: if (dialog && open) {
        dialog.showModal();
    }
</script>

<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="modal {fullscreen ? 'w-[100vw] h-[100vh]' : ''}"
    bind:this={dialog}
    on:close={() => (open = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-box w-full" on:click|stopPropagation>
        <slot name="header" />
        <slot name="body" />

        <div class="modal-action">
            <form method="dialog">
                <slot name="footer" />
            </form>
        </div>
    </div>
</dialog>
