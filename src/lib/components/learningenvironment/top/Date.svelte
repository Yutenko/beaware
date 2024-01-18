<script>
    import { onMount, onDestroy } from "svelte";
    import dayjs from "dayjs";

    let format = "ddd D MMMM";
    let currentDate = dayjs().format(format);
    let timeoutId;

    function updateDate() {
        currentDate = dayjs().format(format);
        setupNextDayUpdate();
    }

    function setupNextDayUpdate() {
        const now = dayjs();
        const nextDay = now.add(1, "day").startOf("day");
        const msUntilNextDay = nextDay.diff(now);

        timeoutId = setTimeout(updateDate, msUntilNextDay);
    }

    onMount(() => {
        setupNextDayUpdate();
    });

    onDestroy(() => {
        clearTimeout(timeoutId);
    });
</script>

<span class="text-base-100">{currentDate}</span>
