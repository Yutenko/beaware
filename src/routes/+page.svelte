<script>
    let mode = "edit";
    let id = "";
    export let data;
</script>

<div class="content">
    <div class="mockup-phone justify-center">
        <div class="camera"></div>
        <div class="display">
            <div class="artboard artboard-demo phone-1 overflow-y-auto">
                <a
                    class="btn btn-ghost btn-xs"
                    href="/quiz/1/setup?mode={mode}&id={id}"
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
        </div>
    </div>
</div>

<style>
    .content {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
</style>
