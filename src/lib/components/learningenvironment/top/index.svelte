<script>
    import Time from "./Time.svelte";
    import Date from "./Date.svelte";
    import Profile from "./Profile.svelte";
    import WLAN from "./WLAN.svelte";
    import Battery from "./Battery.svelte";
</script>

<div class="flex flex-row pt-2 pl-2 pb-2 pr-2">
    <div class="flex flex-1 items-center gap-4">
        <Time />
        <Date />
    </div>
    <div class="flex flex-none items-center gap-2">
        <Profile />
        <WLAN />
        <Battery />
    </div>
</div>
