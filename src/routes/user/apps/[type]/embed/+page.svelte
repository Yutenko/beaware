<script>
    import { MailClient, LearningUnit } from "$components";
    import types from "$components/apps/types";
    export let data;

    let { type } = data.params;
</script>

{#if type == types.MAIL}
    <MailClient />
{:else if type == types.LEARNINGUNIT}
    <LearningUnit />    
{/if}
