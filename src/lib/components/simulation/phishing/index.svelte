<script>
    import MS365Login from "./MS365Login.svelte";
    import GoogleLogin from "./GoogleLogin.svelte";

    const config = {
        isGoogle: true,
        isMicrosoft: false,
    };
</script>

{#if config.isGoogle}
    <GoogleLogin />
{:else if config.isMicrosoft}
    <MS365Login />
{/if}
