<script>
    import { fade } from "svelte/transition";
    import { clickoutside } from "$lib/helper/index";

    export let open = false;
    export let src = "";
    function handleClose() {
        open = false;
    }
</script>

{#if open}
    <div
        class="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
    >
        <div
            class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            transition:fade
            use:clickoutside
            on:clickoutside={handleClose}
        />

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div
                class="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0"
                transition:fade
            >
                <img {src} class="max-w-full max-h-full" alt="" style="" />
            </div>
        </div>
    </div>
{/if}
