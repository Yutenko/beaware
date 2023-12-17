<script>
    import { tooltip } from "$lib/actions";
    import { sticky } from "tippy.js";
    import { onMount } from "svelte";

    export let mode = "available";
    export let content = "";
    export let timesAssigned = 0;

    let options = {};
    let hintElement;

    if (mode.always) {
        options.trigger = "manual";
        options.onHide = () => {
            return false;
        };
        options.sticky = true;
        options.plugins = [sticky];
    } else if (mode.smart) {
        options.trigger = "manual";
    }

    $: if (mode.smart && timesAssigned > 2) {
        hintElement._tippy.show();
    }

    let observer;

    onMount(() => {
        if (mode.always) {
            observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        if (mode.always) {
                            hintElement._tippy.show();
                        }
                        observer.disconnect();
                    }
                });
            });
            observer.observe(hintElement);
        }
    });
</script>

<button
    bind:this={hintElement}
    on:click
    class="btn btn-circle btn-xs btn-outline btn-info absolute top-2 left-2"
    use:tooltip={{ content, ...options }}
    ><i class="far fa-info" />
</button>
