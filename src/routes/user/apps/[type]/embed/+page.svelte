<script>
    import { App_MailClient, App_LearningUnit } from "$components";
    import types from "$components/apps/types";
    export let data;

    let { type } = data.params;
</script>

{#if type == types.MAIL}
    <App_MailClient />
{:else if type == types.LEARNINGUNIT}
    <App_LearningUnit />    
{/if}
