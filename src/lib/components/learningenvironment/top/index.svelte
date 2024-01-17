<script>
    import Time from "./Time.svelte";
    import Date from "./Date.svelte";
    import Profile from "./Profile.svelte";
    import WLAN from "./WLAN.svelte";
    import Battery from "./Battery.svelte";
</script>

<div class="flex flex-row">
    <Time />
    <Date />
    <Profile />
    <WLAN />
    <Battery />
</div>
