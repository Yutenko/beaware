<script>
    import { slide } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import { t } from "$lib/translations";
    import dayjs from "dayjs";

    const dispatch = createEventDispatcher();
    function closeMail() {
        dispatch("close:mail");
    }
    function deleteMail() {
        dispatch("delete:mail", data);
    }

    export let data = {};
    export let portrait = false;
</script>

<div class="navbar bg-base-100">
    <div class="flex-1"></div>

    <div class="flex-none">
        <button class="btn btn-circle btn-outline" on:click={deleteMail}>
            <i class="fas fa-trash"></i>
        </button>
        {#if portrait}
            <button class="btn btn-circle btn-outline" on:click={closeMail}>
                <i class="fas fa-times"></i>
            </button>
        {/if}
    </div>
</div>

<div
    class="pl-12 pr-12 pt-12"
    transition:slide={{
        duration: 200,
        axis: portrait ? "x" : "y",
    }}
>
    <div class="flex">
        <div class="avatar placeholder">
            <div class="bg-neutral text-neutral-content rounded-full w-12 h-12">
                <span>{data.from.slice(0, 2)}</span>
            </div>
        </div>
        <div
            class="card overflow-hidden pl-4 pb-4 w-full border-b rounded-none"
        >
            <div class="card-body">
                <div class="date absolute top-2 right-2 opacity-50">
                    {dayjs(data.created).format("MMMM D, YYYY h:mm A")}
                </div>
                <h2 class="card-title">
                    {data.from}
                </h2>
                <p class="font-bold">{data.subject}</p>
                <p class="text-sm opacity-50 text-ellipsis h-[2rem]">
                    {$t("mail.to")}: {data.to}
                </p>
            </div>
        </div>
    </div>

    <div class="pt-4">{data.content}</div>
</div>

<style>
    .card {
        padding-left: 1rem;
    }
    .card-body {
        padding: 0;
    }
</style>
