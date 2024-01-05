<script>
    import { QuizFinder } from "$components/index";
    import { t } from "$lib/translations";
    import { store } from "./store.js";

    function setQuiz(e) {
        store.setQuiz(e.detail);
    }
    function resetQuiz() {
        store.resetQuiz();
    }
    let openQuizFinder = false;
    function showQuizFinder() {
        openQuizFinder = true;
    }
</script>

<div class="ce-block__content pb-[300px]">
    {#if Object.keys($store.quiz).length > 0}
        <div class="h-[500px] absolute left-0 top-0 w-full bg-white z-10">
            <div role="alert" class="alert shadow-lg mb-3">
                <i class="far fa-info-circle text-primary"></i>
                <div>
                    <h3 class="font-bold">
                        {$t(`quiz.types.${$store.quiz.type}`)}
                    </h3>
                    <div class="text-xs">{$store.quiz.title}</div>
                </div>
                <button class="btn btn-sm btn-primary" on:click={resetQuiz}
                    >{$t("editor.quiz")} {$t("editor.change")}</button
                >
            </div>
            <iframe
                src={$store.quiz.play}
                class="w-full h-full"
                title="quiz-iframe"
            />
        </div>
    {/if}

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="max-w-2xl mx-auto" on:click={showQuizFinder}>
        <div class="flex items-center justify-center w-full flex-col">
            <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center pt-6 pb-6 w-full min-h-[250px] max-h-[500px] border-2 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800"
            >
                <div
                    class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                    <i class="fal fa-question mb-2"></i>
                    <p class="mb-2">
                        <span class="font-semibold"
                            >{$t("editor.quizAlert")}</span
                        >
                    </p>
                    <p class="text-xs">
                        {$t("editor.quizAlertDescription")}
                    </p>
                </div>
                {#if openQuizFinder}
                    <QuizFinder on:select={setQuiz} />
                {/if}
            </label>
        </div>
    </div>
</div>
