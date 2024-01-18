<script>
    import { onMount } from "svelte";
    const powerLevel = ["full", "half", "quarter", "empty"].reverse();
    let powerPercent = 80;
    let step = 0;

    onMount(() => {
        setInterval(() => {
            if (step + 1 > powerLevel.length - 1) {
                step = 0;
            } else {
                step += 1;
            }
        }, 450);
    });
</script>

<span class="flex items-center text-base-100 gap-2">
    {powerPercent}%
    <i class="fal fa-2x fa-battery-{powerLevel[step]}"></i>
</span>
