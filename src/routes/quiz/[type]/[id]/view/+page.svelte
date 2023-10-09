<script>
    import { PairAssignmentEmbed } from "$components";
    export let data;
</script>

{#if data.params.type == 1}
    <PairAssignmentEmbed mode={data.mode} />
{/if}
