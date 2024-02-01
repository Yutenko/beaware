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

<div class="dropdown">
    <div tabindex="0" role="button" class="text-base-100 btn btn-ghost">
        <span class="text-base-100">{currentDate}</span>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul class="menu bg-base-200 w-56 rounded-box dropdown-content z-10">
        <li class="menu-title">Zeit und Datum</li>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
    </ul>
</div>
