<script>
    import { t } from "$lib/translations";
    
    export let handleTextOption;
    export let handleMediaOption;
</script>

<div class="join justify-center">
    <button class="btn btn-accent join-item" on:click={handleTextOption}
        >{$t("core.fileuploader.text")}</button
    >
    <button class="btn btn-accent join-item" on:click={handleMediaOption}
        >{$t("core.fileuploader.media")}</button
    >
</div>
