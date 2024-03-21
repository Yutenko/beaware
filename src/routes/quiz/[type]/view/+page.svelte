<script>
    import { GroupAssignmentEmbed } from "$components";
    import types from "$components/quiz/types";
    
    export let data;

    let { type } = data.params;
</script>

{#if type == types.groupassignment}
    <GroupAssignmentEmbed />
{/if}
