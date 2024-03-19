<script>
    import { onMount, onDestroy } from "svelte";
    import { t } from "$lib/translations";
    import { blur } from "svelte/transition";
    import Quiz from "$components/quiz/shared";
    import Casestudy from "$components/casestudy/shared";
    import LearningEnvironment from "$components/learningenvironment/shared";
    import { order } from "./constants";
    import { globalStore } from "$components/global-store";

    export let id = "";
    $: collection = $globalStore.config.collections[id];

    let results = {};

    let step = -1;
    let gameFinished = false;
    let allGamesFinished = false;

    $: isStart = step === -1;
    $: inProgress = step > -1 && !allGamesFinished;

    function next() {
        gameFinished = false;
        if (step + 1 < collection.units.length) {
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
        const unitId = collection.units[step].id;

        results[collection.id][unitId] = {};
        results[collection.id][unitId].progress = [];
        results[collection.id][unitId].timeStarted = new Date().getTime();
        results[collection.id][unitId].timeFinished = null;

        LearningEnvironment.receiver.updateResults(results);
    }
    function handleFinished(data) {
        const unitId = collection.units[step].id;

        gameFinished = true;

        results[collection.id][unitId].progress = data;
        results[collection.id][unitId].timeFinished = new Date().getTime();

        LearningEnvironment.receiver.updateResults(results);
    }

    onMount(async () => {
        results[collection.id] = {};

        Quiz.sender.init({
            onStart: handleStart,
            onFinished: handleFinished,
        });
        Casestudy.sender.init({
            onStart: handleStart,
            onFinished: handleFinished,
        });

        if (collection.order === order.RANDOM) {
            const firstElement = collection.units.shift();
            collection.units = collection.units.sort(() => 0.5 - Math.random());
            collection.units = [firstElement, ...collection.units];
        }
    });

    onDestroy(async () => {
        Quiz.cleanUp();
        Casestudy.cleanUp();
    });
</script>

{#if isStart}
    <div
        class="hero min-h-screen"
        style="background-image: url(/media/learningenvironment/backgrounds/learningunit_bg.png);"
    >
        <div class="hero-overlay bg-opacity-60"></div>
        <div class="hero-content text-center text-neutral-content">
            <div class="max-w-md">
                <h1 class="mb-5 text-5xl font-bold">{collection.title}</h1>
                <p class="mb-5">
                    {collection.description}
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
            src={collection.units[step].play}
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
