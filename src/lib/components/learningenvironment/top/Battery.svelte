<script>
    import { onMount } from "svelte";
    import { linear } from "svelte/easing";
    const powerLevel = ["full", "half", "quarter", "empty"].reverse();
    let powerPercent = 84;
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

<div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="text-base-100 btn btn-ghost">
        <span class="flex items-center text-base-100 gap-2">
            {powerPercent}%
            <i class="fal fa-2x fa-battery-{powerLevel[step]}"></i>
        </span>
    </div>
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <ul class="menu bg-base-200 w-56 rounded-box dropdown-content z-10">
        <li class="menu-title">Power</li>
        <li><a>Item 1</a></li>
        <li><a>Item 2</a></li>
        <li><a>Item 3</a></li>
    </ul>
</div>
