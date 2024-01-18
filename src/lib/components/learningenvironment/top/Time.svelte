<script>
    import { onMount } from "svelte";
    import dayjs from "dayjs";

    let format = "HH:mm";
    let currentTime = dayjs().format(format);

    onMount(() => {
        const interval = setInterval(() => {
            currentTime = dayjs().format(format);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    });
</script>

<span class="text-base-100">{currentTime}</span>
