<script>
    import { onMount } from "svelte";
    import { default as QUIZ_TYPE } from "$components/quiz/quiztypes";
    import { t } from "$lib/translations";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    async function getQuizzes() {
        const response = await fetch("/api/getallquizzes");
        return await response.json();
    }
    let data;
    const types = Object.values(QUIZ_TYPE);
    let selectedTypes = [];
    let filteredQuizzes = [];

    function selectType(e) {
        let type = parseInt(e.target.value);

        // 0 = all types combined
        if (type == 0) {
            const temp = [...types];
            temp.shift();
            selectedTypes = temp;
        } else {
            selectedTypes = [type];
        }
    }

    $: filterQuizzes(selectedTypes);

    function filterQuizzes(types) {
        filteredQuizzes =
            data?.quizzes.filter((quiz) =>
                selectedTypes.includes(parseInt(quiz.type)),
            ) || [];
    }

    function selectQuiz(quiz) {
        dispatch("on:select", quiz);
    }

    onMount(async () => {
        data = await getQuizzes();

        selectType({ target: { value: 0 } });
    });
</script>

{#await data}
    <p>Loading...</p>
{:then}
    <form class="flex flex-col w-4/5">
        <div class="flex gap-1">
            <input
                type="text"
                placeholder={$t("quiz.quiz")}
                class="input input-bordered w-full"
            />
            <button class="btn btn-outline btn-primary"
                ><i class="far fa-search"></i></button
            >
            <select class="select w-auto" on:change={selectType}>
                {#each types as type}
                    <option value={type}>{$t(`quiz.types.${type}`)}</option>
                {/each}
            </select>
        </div>
    </form>
    {#if filteredQuizzes.length > 0}
        <div class="overflow-x-auto">
            <table class="table table-xs">
                <tbody>
                    {#each filteredQuizzes as quiz, index}
                        <tr>
                            <th>{index + 1}</th>
                            <td>{quiz.title}</td>
                            <td
                                ><button
                                    class="btn btn-ghost btn-xs"
                                    on:click={() => selectQuiz(quiz)}
                                    >{$t("editor.quizSelect")}</button
                                ></td
                            >
                            <td>{$t(`quiz.types.${quiz.type}`)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
{/await}
