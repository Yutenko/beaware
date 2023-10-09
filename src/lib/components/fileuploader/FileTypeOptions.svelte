<script>
    import { t } from "$lib/translations";

    export let handleTextOption;
    export let handleMediaOption;
    export let description = false;
</script>

<div class="flex flex-col text-center">
    {#if description}
        <p class="mt-1 text-sm text-accent mb-6 pl-4 pr-4">
            {description}
        </p>
    {/if}
    <div class="join justify-center">
        <button class="btn btn-accent join-item" on:click={handleTextOption}
            >{$t("core.fileuploader.text")}</button
        >
        <button class="btn btn-accent join-item" on:click={handleMediaOption}
            >{$t("core.fileuploader.media")}</button
        >
    </div>
</div>
