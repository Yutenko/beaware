<script>
    import { PairAssignmentEmbed, PairAssignmentList } from "$components";
    import { t } from "$lib/translations";
    import Quiz from "../shared";
    import { onMount } from "svelte";

    let groups = [];
    Quiz.sender.init({
        onUpdate: (data) => {
            groups = data.groups;
        },
    });
    
</script>

<div class="container mx-auto flex flex-col items-center setup-container">
    <PairAssignmentEmbed mode={"edit"} />
    <div class="flex w-full justify-between mt-5 mb-5">
        <button
            class="btn btn-primary self-start"
            on:click={Quiz.sender.api.addContainer}
            ><i class="fas fa-plus" />{$t(
                "quiz.pairassignment.addCategory"
            )}</button
        >
        <button class="btn btn-primary self-end"
            ><i class="fas fa-gamepad" />{$t("quiz.play")}</button
        >
    </div>
    <PairAssignmentList {groups} />
</div>

<style>
</style>
