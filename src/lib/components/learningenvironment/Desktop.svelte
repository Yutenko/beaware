<script>
    import { systemSettings } from "$lib/stores-global/index";

    let config = $systemSettings;
</script>

<section class="bg" style="background-image:url({config.background})">
    <slot />
</section>

<style>
    .bg {
        position: fixed;
        background-position: center center;
        background-repeat: no-repeat;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        width: 100%;
        height: 100vh;
        overflow: hidden;
    }
</style>
