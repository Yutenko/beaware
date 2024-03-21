<script>
    import {
        App_MailClient,
        App_LearningUnit,
        App_Results,
    } from "$components";
    import types from "$components/apps/types";
    
    export let data;

    let { type } = data.params;
</script>

{#if type == types.MAIL}
    <App_MailClient />
{:else if type == types.LEARNINGUNIT}
    <App_LearningUnit id={data.id} />
{:else if type == types.RESULTS}
    <App_Results />
{/if}
