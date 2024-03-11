<script>
    import { onMount } from "svelte";
    import { t } from "$lib/translations";
    import { blur } from "svelte/transition";
    import Quiz from "$components/quiz/shared";
    import Casestudy from "$components/casestudy/shared";
    import LU_TYPE from "./types";
    import LearningEnvironment from "$components/learningenvironment/shared";
    import { order } from "./constants";

    const config = {
        id: "collection-id",
        title: "Datenschutz allgemein",
        description:
            "In diesem Projekt können Sie die Datenschutz allgemeinen Fragen zur Verfügung gestellt werden.",
        order: order.SQUENTIAL,
        units: [
            {
                type: LU_TYPE.CASESTUDY,
                id: "5c4c8252-c1e3-4e18-9028-78de3b9ef7c8",
                play: "/casestudy/5c4c8252-c1e3-4e18-9028-78de3b9ef7c8",
            },
            {
                type: LU_TYPE.QUIZ,
                id: "f3ea52c0-f382-471d-9ec5-f8eb50d0261d",
                play: "/quiz/1/embed?id=f3ea52c0-f382-471d-9ec5-f8eb50d0261d",
            },
            {
                type: LU_TYPE.CASESTUDY,
                id: "dcc00729-c6e3-42bd-8c42-c3e7fca0cff2",
                play: "/casestudy/dcc00729-c6e3-42bd-8c42-c3e7fca0cff2",
            },
        ],
    };

    let results = {};

    let step = -1;
    let gameFinished = false;
    let allGamesFinished = false;

    function next() {
        gameFinished = false;
        if (step + 1 < config.units.length) {
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

    function closeLearningUnit() {
        LearningEnvironment.receiver.closeCurrentAppWindow();
    }

    function handleStart() {
        const collectionId = config.id;
        const unitId = config.units[step].id;

        results[collectionId][unitId] = {};
        results[collectionId][unitId].progress = [];
        results[collectionId][unitId].timeStarted = new Date().getTime();
        results[collectionId][unitId].timeFinished = null;

        LearningEnvironment.receiver.updateResults(results);
    }
    function handleFinished(data) {
        gameFinished = true;

        const collectionId = config.id;
        const unitId = config.units[step].id;

        results[collectionId][unitId].progress = data;
        results[collectionId][unitId].timeFinished = new Date().getTime();

        LearningEnvironment.receiver.updateResults(results);
    }

    onMount(async () => {
        const collectionId = config.id;
        results[collectionId] = {};

        Quiz.sender.init({
            onStart: handleStart,
            onFinished: handleFinished,
        });
        Casestudy.sender.init({
            onStart: handleStart,
            onFinished: handleFinished,
        });

        if (config.order === order.RANDOM) {
            const firstElement = config.units.shift();
            config.units = config.units.sort(() => 0.5 - Math.random());
            config.units = [firstElement, ...config.units];
        }
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
            src={config.units[step].play}
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
                <button class="btn btn-primary" on:click={closeLearningUnit}>
                    {$t("lunit.endit")}
                </button>
            </div>
        </div>
    </div>
{/if}
