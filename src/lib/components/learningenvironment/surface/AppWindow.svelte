<script>
    import { draggable } from "@neodrag/svelte";
    import { onMount } from "svelte";

    export let component;
    export let open;
</script>

{#if open}
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="absolute z-30 w-[85vw]">
        <div
            class="mockup-window border border-base-300 bg-base-200 max-h-[80vh] resize"
            use:draggable
        >
            <div class="flex border-t border-base-300 bg-base-100">
                <svelte:component this={component} />
            </div>
        </div>
    </div>
{/if}
