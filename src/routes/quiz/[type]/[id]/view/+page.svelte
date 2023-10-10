<script>
    import { GroupAssignmentEmbed } from "$components";
    export let data;
</script>

{#if data.params.type == 1}
    <GroupAssignmentEmbed mode={data.mode} />
{/if}
