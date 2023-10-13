<script>
    import { GroupAssignmentEmbed } from "$components";
    import { t } from "$lib/translations";
    import Quiz from "../shared";

    let groups = [];
    Quiz.sender.init({
        onUpdate: (data) => {
            groups = data.groups;
        },
    });
</script>

<div class="container mx-auto flex flex-col items-center setup-container">
    <GroupAssignmentEmbed mode={"edit"} />
    <div class="flex w-full justify-between mt-5 mb-5">
        <button
            class="btn btn-primary self-start"
            on:click={Quiz.sender.api.addContainer}
            ><i class="fas fa-plus" />{$t(
                "quiz.groupassignment.addCategory"
            )}</button
        >
        <button class="btn btn-primary self-end"
            ><i class="fas fa-gamepad" />{$t("quiz.play")}</button
        >
    </div>
</div>

<style>
</style>
