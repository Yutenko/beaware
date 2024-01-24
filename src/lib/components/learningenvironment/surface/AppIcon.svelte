<script>
    export let icon = "default";
    export let width;
    export let opacity = 100;
</script>

<img
    class="{width ? 'w-' + width : 'w-full'} h-full inline-block"
    style="opacity: {opacity / 100}"
    src="/media/learningenvironment/appicons/{icon}.svg"
    alt="appicon"
/>
