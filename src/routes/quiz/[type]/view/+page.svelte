<script>
    import { GroupAssignmentEmbed } from "$components";
    import types from "$components/quiz/types.json";
    export let data;

    let { type } = data.params;
</script>

{#if type == types.groupAssignment}
    <GroupAssignmentEmbed />
{/if}
