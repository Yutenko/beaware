<script>
    import { fullscreen } from "$lib/actions";

    let isFullscreen = false;

    function toggleFullscreen() {
        isFullscreen = !isFullscreen;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="dropdown dropdown-end" use:fullscreen on:click={toggleFullscreen}>
    <div tabindex="0" role="button" class="text-base-100 btn btn-ghost">
        <span class="text-base-100">
            <i class="fas fa-{isFullscreen ? 'compress' : 'expand'}"></i>
        </span>
    </div>
</div>
