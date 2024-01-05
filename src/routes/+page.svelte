<script>
    import { QuizFinder, CasestudyFinder, Modal } from "$components";

    let mode = "edit";
    let id = "";
    let openModal = false;
    let selectedData = {};
    let selectedType = "quiz";

    function handleSelect(type, e) {
        selectedData = e.detail;
        selectedType = type;
        openModal = true;
    }
</script>

<a class="btn btn-ghost" href="/demo">Demo</a>
<div class="grid grid-cols-2 max-w-7xl" style="margin:0 auto;">
    <div class="">
        <QuizFinder on:select={(e) => handleSelect("quiz", e)} />
        <a
            class="btn btn-ghost btn-sm w-full"
            href="/quiz/1/setup?mode={mode}&id={id}">Neue Gruppenzuordnung</a
        >
    </div>
    <div>
        <CasestudyFinder on:select={(e) => handleSelect("casestudy", e)} />
        <a class="btn btn-ghost btn-sm w-full" href="/casestudy"
            >Neues Fallbeispiel</a
        >
    </div>
</div>

<Modal bind:open={openModal}>
    <h3 class="font-bold text-lg" slot="header">{selectedData.title}</h3>
    <div slot="body">
        {#if selectedType === "quiz"}
            <a href={selectedData.play} class="btn btn-primary">Spielen</a>
            <a href={selectedData.edit} class="btn btn-secondary">Bearbeiten</a>
        {/if}
        {#if selectedType === "casestudy"}
            <a href={selectedData.url} class="btn btn-secondary">Bearbeiten</a>
        {/if}
    </div>
</Modal>

<style>
</style>
