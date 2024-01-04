<script>
    import { QuizFinder } from "$components/index";
    import { t } from "$lib/translations";
    import { store } from "./store.js";

    let showQuizFinder = false;
    function toggleQuizFinder() {
        showQuizFinder = !showQuizFinder;
    }

    function setQuiz(e) {
        const quiz = e.detail;
        store.setQuiz(quiz);
    }
</script>

<div class="ce-block__content">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="max-w-2xl mx-auto" on:click={toggleQuizFinder}>
        <div class="flex items-center justify-center w-full flex-col">
            <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full min-h-[250px] border-2 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800"
            >
                <div
                    class="flex flex-col items-center justify-center pt-5 pb-6"
                >
                    <i class="fal fa-question mb-2"></i>
                    <p class="mb-2 text-sm">
                        <span class="font-semibold"
                            >{$t("editor.quizAlert")}</span
                        >
                    </p>
                    <p class="text-xs">
                        {$t("editor.quizAlertDescription")}
                    </p>
                </div>
                <QuizFinder on:select={setQuiz} />
            </label>
        </div>
    </div>
</div>
