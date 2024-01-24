<script>
    import { slide, fade } from "svelte/transition";
    import { categories } from "./constants.json";
    import { createEventDispatcher } from "svelte";
    import { t } from "$lib/translations";
    import dayjs from "dayjs";

    export let emails = [];
    export let category = categories.INBOX;
    let filteredEmails = emails;
    let searchText = "";
    let navbarHeight = 0;

    $: title = $t(`mail.categories.${category}`);
    $: filterEmails(emails);
    $: isAllMailsEmpty = isEmpty(category, emails);
    $: isFilteredMailsEmpty = filteredEmails.length === 0;

    function filterEmails(emails) {
        filteredEmails =
            emails.filter((mail) => {
                let includesText =
                    mail.content
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    mail.subject
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                    mail.from.toLowerCase().includes(searchText.toLowerCase());

                if (includesText) {
                    return mail;
                }
            }) || [];
    }

    const dispatch = createEventDispatcher();
    function selectMail(mail) {
        dispatch("select:mail", mail);
    }
    function isEmpty(category, emails) {
        const firstOccurenceIndex = emails.findIndex(
            (mail) => mail.category === category,
        );
        return firstOccurenceIndex === -1;
    }
</script>

<div class="navbar bg-base-100" bind:clientHeight={navbarHeight}>
    <div class="flex-1">
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="font-bold text-xl pl-4">{title}</a>
    </div>
    <div class="flex-none gap-2">
        <div class="form-control">
            <input
                type="text"
                placeholder={$t("mail.search")}
                class="input input-bordered w-24"
                bind:value={searchText}
                on:input={() => filterEmails(emails)}
                on:click={() => filterEmails(emails)}
            />
        </div>
    </div>
</div>

<div
    class="overflow-x-auto overflow-y-auto"
    style="height:calc(100% - {navbarHeight}px)"
    transition:slide={{
        duration: 150,
        axis: "y",
    }}
>
    <table class="table">
        <tbody>
            {#if isAllMailsEmpty}
                <div
                    class="flex items-center justify-center h-[70vh] opacity-50 text-lg"
                >
                    {$t(`mail.empty.${category}`)}
                </div>
            {/if}
            {#if isFilteredMailsEmpty}
                <div
                    class="flex items-center justify-center h-[70vh] opacity-50 text-lg"
                >
                    {$t(`mail.noSearchResults`)}
                </div>
            {/if}
            {#each filteredEmails as email}
                {#if email.category === category}
                    <tr
                        class="hover cursor-pointer"
                        on:click={() => selectMail(email)}
                    >
                        <th></th>
                        <td>
                            <div class="card overflow-hidden">
                                <div class="card-body">
                                    <div
                                        class="date absolute top-2 right-2 opacity-50"
                                    >
                                        {dayjs(email.created).format(
                                            "MMMM D, YYYY h:mm A",
                                        )}
                                    </div>
                                    <h2 class="card-title">
                                        {email.from}
                                        {#if !email.read}
                                            <div
                                                class="badge badge-secondary"
                                                transition:fade
                                            >
                                                {$t("mail.badges.new")}
                                            </div>
                                        {/if}
                                    </h2>
                                    <p class="font-bold">{email.subject}</p>
                                    <p
                                        class="text-sm opacity-50 text-ellipsis h-[2rem]"
                                    >
                                        {email.content}
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                {/if}
            {/each}
        </tbody>
    </table>
</div>

<style>
</style>
