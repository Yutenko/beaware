<script>
    import { onMount } from "svelte";
    import Quiz from "$components/quiz/shared";
    import types from "./types";
    import { t } from "$lib/translations";

    const config = {
        id: "collection-id",
        title: "Datenschutz allgemein",
        description:
            "In diesem Projekt können Sie die Datenschutz allgemeinen Fragen zur Verfügung gestellt werden.",
        apps: [
            { type: types.QUIZ, id: "862649f9-f9ca-49b8-9cd6-fac9b583fff4" },
            { type: types.QUIZ, id: "862649f9-f9ca-49b8-9cd6-fac9b583fff4" },
            { type: types.QUIZ, id: "862649f9-f9ca-49b8-9cd6-fac9b583fff4" },
            {
                type: types.CASESTUDY,
                id: "dcc00729-c6e3-42bd-8c42-c3e7fca0cff2",
            },
        ],
    };

    const savegame = {
        "collection-id": {
            "862649f9-f9ca-49b8-9cd6-fac9b583fff4": {
                progress: [1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
            },
        },
    };

    onMount(() => {
        Quiz.sender.init({
            onFinished: (data) => {},
            onProgress: (data) => {},
        });
    });
</script>

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
            <button class="btn btn-primary">{$t("lunit.start")}</button>
        </div>
    </div>
</div>
