<script>
    import { MailClient } from "$components";
    import types from "$components/apps/types";
    export let data;

    let { type } = data.params;
</script>

{#if type == types.mail}
    <MailClient />
{/if}
