<script>
    import { tooltip } from "$lib/actions";
    import { onMount } from "svelte";

    let button;
    export let content;
    export let activate = false;

    let options = {
        allowHTML: true,
        interactive: true,
    };

    $: if (button?.parentElement) {
        options.triggerTarget = button.parentElement;
    }

    $: if (activate && button) {
        button._tippy.show();
        const to = setTimeout(() => {
            button._tippy.hide();
            clearTimeout(to);
        }, 1000);
    }
</script>

{#if activate}
    <button
        bind:this={button}
        on:click
        class="btn btn-circle btn-xs btn-outline btn-info absolute ifb left-0 right-0"
        use:tooltip={{ content, ...options }}
    >
    </button>
{/if}

<style>
    .ifb {
        top: -7px;
        margin: 0 auto;
        z-index: 2;
    }
</style>
