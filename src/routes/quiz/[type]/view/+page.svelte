<script>
    import { GroupAssignmentEmbed } from "$components";
    export let data;

    let { type } = data.params;
</script>

{#if type == 1}
    <GroupAssignmentEmbed />
{/if}
