<script>
    import { t } from "$lib/translations";
    import { createEventDispatcher } from "svelte";
    import { default as fileTypes } from "./types.json";

    const dispatch = createEventDispatcher();

    function handleTextOption(e) {
        dispatch("click:text");
    }
    function handleImageOption(e) {
        dispatch("click:image");
    }
    function handleVideoOption(e) {
        dispatch("click:video");
    }
    function handleAudioOption(e) {
        dispatch("click:audio");
    }
    function handleMediaOption(e) {
        dispatch("click:media");
    }

    export let description = false;
    export let color = "btn-primary";
    export let textText = $t("core.fileuploader.text");
    export let mediaText = $t("core.fileuploader.media");
    export let imageText = $t("core.fileuploader.image");
    export let videoText = $t("core.fileuploader.video");
    export let audioText = $t("core.fileuploader.audio");
    export let types = fileTypes;

    let isMedia = types.image && types.video && types.audio;
</script>

<div class="flex flex-col text-center">
    {#if description}
        <p class="mt-1 text-sm mb-6 pl-4 pr-4">
            {description}
        </p>
    {/if}
    <div class="join justify-center">
        {#if types.text}
            <button class="btn {color} join-item" on:click={handleTextOption}
                >{textText}</button
            >
        {/if}
        {#if isMedia}
            <button class="btn {color} join-item" on:click={handleMediaOption}
                >{mediaText}</button
            >
        {:else}
            {#if types.image}
                <button
                    class="btn {color} join-item"
                    on:click={handleImageOption}>{imageText}</button
                >
            {/if}
            {#if types.video}
                <button
                    class="btn {color} join-item"
                    on:click={handleVideoOption}>{videoText}</button
                >
            {/if}
            {#if types.audio}
                <button
                    class="btn {color} join-item"
                    on:click={handleAudioOption}>{audioText}</button
                >
            {/if}
        {/if}
    </div>
</div>
