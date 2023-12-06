<script>
    import { tooltip } from "$lib/actions";

    const MODE = {
        ALWAYS: 1,
        AVAILABLE: 2,
        SMART: 3,
    };

    export let mode = MODE.AVAILABLE;
    export let content = "";
</script>

<button
    on:click
    class="btn btn-circle btn-xs btn-outline btn-info absolute top-2 left-2"
    use:tooltip={{ content }}
    ><i class="far fa-info" />
</button>
