<script>
    import { onMount } from "svelte";
    import { viewport } from "$lib/actions";
    import Casestudy from "./shared";
    import { t } from "$lib/translations";

    export let time = 0;
    let scrolledToTheEnd = false;
    let interval;

    let now = 0;
    let end = 0;

    $: count = Math.round((end - now) / 1000);
    $: h = Math.floor(count / 3600);
    $: m = Math.floor((count - h * 3600) / 60);
    $: s = count - h * 3600 - m * 60;

    $: timePassed = count === 0;
    $: if (timePassed) {
        clearInterval(interval);
        checkFinished();
    }
    $: handleTimer(time);

    function reset() {
        now = 0;
        end = 0;
        timePassed = false;
        scrolledToTheEnd = false;
    }

    function checkFinished() {
        if (timePassed && scrolledToTheEnd) {
            Casestudy.receiver.finished();
            clearInterval(interval);
        }
    }

    function updateTimer() {
        now = Date.now();
    }

    function handleTimer() {
        reset();
        now = Date.now();
        end = now + time * 1000;
        interval = setInterval(updateTimer, 1000);
    }

    function handleScroll() {
        scrolledToTheEnd = true;
        checkFinished();
    }

    onMount(() => {
        return reset;
    });
</script>

<button
    disabled
    use:viewport
    on:enterViewport={handleScroll}
    class="float-right mr-2 mb-2 rounded-full btn btn-secondary"
>
    {#if h > 0}
        {h}{$t("lunit.time.hoursShort")}
    {/if}
    {#if m > 0}
        {m}{$t("lunit.time.minutesShort")}
    {/if}
    {#if s > 0}
        {s}{$t("lunit.time.secondsShort")}
    {/if}
    {$t("lunit.next")}
</button>
