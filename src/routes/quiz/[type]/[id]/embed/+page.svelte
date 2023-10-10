<script>
    import { GroupAssignmentEdit, GroupAssignmentPlay } from "$components";

    export let data;
</script>

{#if data.mode === "edit"}
    <GroupAssignmentEdit />
{:else}
    <GroupAssignmentPlay />
{/if}
