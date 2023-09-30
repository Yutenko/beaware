<script>
    import { enhance } from "$app/forms";
    import { t } from "$lib/translations";
    import { page } from "$app/stores";

    export let openFileuploader = false;
    export let handleClose = () => {};
    let acceptedFiles = [];

    function onChange(e) {
        const files = e.target.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                acceptedFiles = [...acceptedFiles, e.target.result];
            };
            reader.readAsDataURL(file);
        }
    }

    let dialog;
    $: if (dialog && openFileuploader) {
        dialog.showModal();
    }

    // wort medien nur, wenn mehr wie 2 typen, sonst text und bikld oder text und video
</script>

<dialog class="modal" bind:this={dialog}>
    <div class="modal-box items-center text-center">
        <form
            method="post"
            use:enhance={({ formElement }) => {
                return async ({ result, update }) => {
                    if (result.type == "success") {
                        formElement.reset();
                        dialog.close();
                        handleClose(result.data);
                    }
                    update();
                };
            }}
            enctype="multipart/form-data"
        >
            <button
                class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                on:click={() => {
                    dialog.close();
                    handleClose();
                }}>✕</button
            >
            <h3 class="font-bold text-lg">{$t("core.fileuploader.dnd")}</h3>
            <p class="py-4">{$t("core.fileuploader.browse")}</p>
            <input
                name="file"
                type="file"
                class="file-input w-full max-w-xs"
                on:change={onChange}
            />
            {#if $page.form?.error}
                <p class="error">{$page.form.error}</p>
            {/if}
            {#if acceptedFiles.length > 0}
                <button type="submit" class="btn btn-primary"
                    >{$t("core.fileuploader.upload")}</button
                >
            {/if}
        </form>
        {#each acceptedFiles as file}
            <img src={file} class=" w-40" alt={file.name} />
        {/each}
    </div>
</dialog>
