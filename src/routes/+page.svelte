<script>
    let mode = "edit";
    let id = "";
    export let data;
</script>

<div class="grid grid-cols-2 gap-4">
    <div class="quiz">
        <a class="btn btn-ghost btn-xs" href="/quiz/1/setup?mode={mode}&id={id}"
            >Create New Group Assignment Quiz</a
        >

        {#if data.quizzes.length > 0}
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <div class="collapse bg-base-200">
                <input type="checkbox" />
                <div class="collapse-title text-xl font-medium">
                    Alle Quizzes
                </div>
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
                                {#each data.quizzes as quiz, i}
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
        {/if}
    </div>

    <div class="casestudy">
        <a class="btn btn-ghost btn-xs" href="/casestudy/"
            >Create New Case Study</a
        >
        {#if data.casestudies.length > 0}
            <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
            <div class="collapse bg-base-200">
                <input type="checkbox" />
                <div class="collapse-title text-xl font-medium">
                    Alle Fallbeispiele
                </div>
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
                                {#each data.casestudies as cs, i}
                                    <tr>
                                        <th>{i + 1}</th>
                                        <td>{cs.title || ""}</td>
                                        <td>
                                            <a
                                                class="btn btn-ghost btn-xs"
                                                href={cs.url}>Edit</a
                                            >
                                        </td>
                                    </tr>
                                {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        {/if}
    </div>
</div>

<style>
    .content {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        height: 100vh;
    }
</style>
