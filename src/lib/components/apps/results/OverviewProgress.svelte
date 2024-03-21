<script>
    export let collection = {};
    export let results = {};

    $: completed = parseInt(
        (Object.keys(results).length * 100) / collection.units.length,
    );

    // Farbe der Progressbar gibt an, wie gut man unterwegs ist bisher
</script>

<div>
    <div class="flex flex-col gap-2 p-2">
        <div class="stat-desc">
            {collection.title}
        </div>
        <div class="flex flex-row items-center gap-2 relative">
            <progress
                class="progress progress-success w-full min-w-[14rem]"
                value={completed}
                max="100"
            >
            </progress>
            <div class="stat-value text-sm">{completed}%</div>
        </div>
    </div>
</div>
