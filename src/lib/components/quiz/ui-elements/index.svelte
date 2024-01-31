<script>
    import Task from "./Task.svelte";
    import CheckButton from "./CheckButton.svelte";
    import Feedback from "./Feedback.svelte";
    import Quiz, { evalQuiz } from "../shared";

    export let type;
    export let title = "";
    export let task = "";
    export let elements = [];
    export let mode = "free";
    export let feedbacks = {};
    export let onFeedbackClosed = () => {};
    export let checkSolution = () => {};

    $: assignedElementsCount = elements.filter(
        (el) => typeof el.assigned !== "undefined",
    ).length;

    $: finished = assignedElementsCount === elements.length;
    $: result = finished
        ? (elements.filter((el) => el.solved).length / elements.length) * 100
        : 0;
    $: solved =
        elements.filter((el) => typeof el.solved !== "undefined").length ===
        elements.length;

    function handleFinished() {
        checkSolution();

        // from here on, the state of the quiz is finalized and we can send it to the receiver
        const evaluation = evalQuiz(type, elements);
        Quiz.receiver.finished(evaluation);
    }
</script>

<Task {title} {task} />
<CheckButton
    {finished}
    {assignedElementsCount}
    {mode}
    on:click={handleFinished}
/>
<Feedback {feedbacks} {result} {solved} on:click={onFeedbackClosed} />
