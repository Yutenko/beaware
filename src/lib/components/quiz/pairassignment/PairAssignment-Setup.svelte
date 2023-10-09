<script>
    import { PairAssignmentEmbed, PairAssignmentList } from "$components";
    import { t } from "$lib/translations";

    let items = [{ identifier: "Kategorie" }];
</script>

<div class="container mx-auto flex flex-col items-center setup-container">
    <PairAssignmentEmbed mode={"edit"} />
    <div class="flex w-full justify-between mt-5 mb-5">
        <button class="btn btn-primary self-start"
            ><i class="fas fa-plus" />{$t(
                "quiz.pairsassignment.addCategory"
            )}</button
        >
        <button class="btn btn-primary self-end"
            ><i class="fas fa-gamepad" />{$t("quiz.play")}</button
        >
    </div>
    <PairAssignmentList {items} />
</div>

<style>
</style>
