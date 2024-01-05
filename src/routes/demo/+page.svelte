<script>
    import { fly } from "svelte/transition";

    const content = [
        "/quiz/1/embed?id=6c48b93f-f28b-4551-b030-bcd05eab42ad", // quiz 1
        "/quiz/1/embed?id=7e569a97-ec0a-44a4-91ee-1af412fb2ea1", // quiz 2
        "/quiz/1/embed?id=f8f9a5c8-15f4-4c65-9e45-df492206036f", // quiz 3
        "/media/certificate.png", // fake certificate
    ];

    let step = -1;
    function next() {
        step++;
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<section class="homescreen" on:click|once={next}>
    <!-- svelte-ignore a11y-missing-attribute -->
    {#if step > -1}
        <iframe src={content[step]} transition:fly={{ y: 200, duration: 2000 }}
        ></iframe>
        <button
            class="btn btn-square btn-outline absolute right-2 bottom-2"
            on:click={next}
        >
            <i class="fas fa-step-forward"></i>
        </button>
    {/if}
</section>

<style>
    .homescreen {
        background-color: #000000;
        background-image: url("/media/homescreen.jpeg");
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        height: 100vh;
        display: flex;
        justify-content: center;
    }
    iframe {
        height: 85vh;
        width: 80vw;
        border: 0px;
    }
</style>
