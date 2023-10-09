<script>
    import { PairAssignmentEdit, PairAssignmentPlay } from "$components";

    export let data;
</script>

{#if data.mode === "edit"}
    <PairAssignmentEdit />
{:else}
    <PairAssignmentPlay />
{/if}
