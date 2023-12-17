<script>
    import { GroupAssignmentEdit, GroupAssignmentPlay } from "$components";

    export let data;
</script>

{#if data.mode === "edit"}
    <GroupAssignmentEdit gamestate={data.gamestate} id={data.id} />
{:else}
    <GroupAssignmentPlay gamestate={data.gamestate} />
{/if}
