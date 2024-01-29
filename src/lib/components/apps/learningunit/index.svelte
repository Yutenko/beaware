<script>
    import { onMount, tick } from "svelte";
    import { t } from "$lib/translations";
    import { blur } from "svelte/transition";
    import Quiz from "$components/quiz/shared";
    import Casestudy from "$components/casestudy/shared";
    import types from "./types";
    import { lestore } from "$lib/components/learningenvironment/store.js";

   

    const config = {
        id: "collection-id",
        title: "Datenschutz allgemein",
        description:
            "In diesem Projekt können Sie die Datenschutz allgemeinen Fragen zur Verfügung gestellt werden.",
        apps: [
            {
                type: types.CASESTUDY,
                id: "5c4c8252-c1e3-4e18-9028-78de3b9ef7c8",
                play: "/casestudy/5c4c8252-c1e3-4e18-9028-78de3b9ef7c8",
            },
            {
                type: types.QUIZ,
                id: "a8d238e2-5c86-4b08-87d7-cb1f310687a8",
                play: "/quiz/1/embed?id=a8d238e2-5c86-4b08-87d7-cb1f310687a8",
            },
            {
                type: types.CASESTUDY,
                id: "dcc00729-c6e3-42bd-8c42-c3e7fca0cff2",
                play: "/casestudy/dcc00729-c6e3-42bd-8c42-c3e7fca0cff2",
            },
        ],
    };

    let step = -1;
    let gameFinished = false;
    let allGamesFinished = false;

    function next() {
        gameFinished = false;
        if (step + 1 < config.apps.length) {
            step++;
        } else {
            allGamesFinished = true;
        }
    }

    function restart() {
        step = -1;
        allGamesFinished = false;
        next();
    }

    function handleFinished(data) {
        gameFinished = true;
    }
    function handleProgress(data) {}

    onMount(async () => {
        Quiz.sender.init({
            onFinished: handleFinished,
            onProgress: handleProgress,
        });
        Casestudy.sender.init({
            onFinished: handleFinished,
            onProgress: handleProgress,
        });
        await tick();
        console.log($lestore.currentApp);
    });

    $: isStart = step === -1;
    $: inProgress = step > -1 && !allGamesFinished;
</script>

{#if isStart}
    <div
        class="hero min-h-screen"
        style="background-image: url(/media/learningenvironment/backgrounds/learningunit_bg.png);"
    >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">{config.title}</h1>
                <p class="mb-5">
                    {config.description}
                </p>
                <button class="btn btn-primary" on:click={restart}>
                    {$t("lunit.start")}
                </button>
            </div>
        </div>
    </div>
{/if}

{#if inProgress}
    <div class="min-h-screen">
        <iframe
            src={config.apps[step].play}
            transition:blur={{ amount: 10 }}
            title="lu-content"
        ></iframe>
        {#if gameFinished}
            <button
                class="absolute right-2 bottom-2 rounded-full btn btn-secondary"
                on:click={next}
            >
                {$t("lunit.next")}
            </button>
        {/if}
    </div>
{/if}

{#if allGamesFinished}
    <div
        class="hero min-h-screen"
        style="background-image: url(/media/learningenvironment/backgrounds/learningunit_bg.png);"
    >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">{$t("lunit.finished")}</h1>
                <p class="mb-5"></p>
            </div>
        </div>
    </div>
{/if}
