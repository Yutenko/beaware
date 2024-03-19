<script>
    export let collection = {};
    export let results = {};

    $: completed = parseInt(
        (Object.keys(results).length * 100) / collection.units.length,
    );
</script>

<div>
    <div class="flex flex-col gap-2 p-2">
        <div class="stat-desc">
            {collection.title}
        </div>
        <div class="flex flex-row items-center gap-2 relative">
            <progress
                class="progress progress-success w-56"
                value={completed}
                max="100"
            >
            </progress>
            <div class="absolute left-0 top-0 z-10 w-56">
                <div
                    class="relative"
                    style="margin-left:{collection.threshold}%"
                >
                    <i class="fas fa-map-marker-check text-success"></i>
                </div>
            </div>
            <div class="stat-value text-sm">{completed}%</div>
        </div>
    </div>
</div>
