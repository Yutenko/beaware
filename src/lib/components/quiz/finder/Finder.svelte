<script>
    import { onMount } from "svelte";

    async function getQuizzes() {
        const response = await fetch("/api/getallquizzes");
        return await response.json();
    }
    let promise = getQuizzes();

    onMount(getQuizzes);
</script>

{#await promise}
    <p>Loading...</p>
{:then data}
    <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
    <div class="collapse bg-base-200">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">Alle Quizzes</div>
        <div class="collapse-content">
            <div class="overflow-x-auto">
                <table class="table">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each data?.quizzes as quiz, i}
                            <tr>
                                <th>{i + 1}</th>
                                <td>{quiz.title}</td>
                                <td>
                                    <a
                                        class="btn btn-ghost btn-xs"
                                        href={quiz.play}>Play</a
                                    >
                                </td><td>
                                    <a
                                        class="btn btn-ghost btn-xs"
                                        href={quiz.edit}>Edit</a
                                    >
                                </td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
{/await}
