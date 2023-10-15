<script>
    import { GroupAssignmentEdit, GroupAssignmentPlay } from "$components";

    export let data;
</script>

{#if data.mode === "edit"}
    <GroupAssignmentEdit gamestate={data.gamestate} />
{:else}
    <GroupAssignmentPlay gamestate={data.gamestate} />
{/if}
