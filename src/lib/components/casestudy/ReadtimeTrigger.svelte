<script>
    import { onDestroy } from "svelte";
    import { viewport } from "$lib/actions";
    import Casestudy from "./shared";

    export let time = 0;
    let interval;

    let now = 0;
    let end = 0;

    $: count = Math.round((end - now) / 1000);
    $: h = Math.floor(count / 3600);
    $: m = Math.floor((count - h * 3600) / 60);
    $: s = count - h * 3600 - m * 60;

    function updateTimer() {
        now = Date.now();
        if (count === 0) {
            clearInterval(interval);
            Casestudy.receiver.finished();
        }
    }

    function handleTimer() {
        now = Date.now();
        end = now + time * 1000;
        interval = setInterval(updateTimer, 1000);
    }

    onDestroy(() => {
        clearInterval(interval);
    });
</script>

<div
    class="text-gray-600 text-xs italic"
    use:viewport
    on:enterViewport={handleTimer}
    on:exitViewport={() => console.log("exit!")}
>
    {h}h {m}m {s}s
</div>
