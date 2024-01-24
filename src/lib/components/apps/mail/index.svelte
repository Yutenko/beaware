<script>
    import Table from "./Table.svelte";
    import Categories from "./Categories.svelte";
    import Content from "./Content.svelte";
    import { breakpoint } from "$lib/utils";
    import { categories } from "./constants";

    let emails = [
        {
            id: "a",
            from: "Christian Dietz",
            to: "masterofdesaster@beaware.be",
            subject: "Erinnerung",
            content:
                "Dies ist eine E-Mail, welche einen Eintrag von Christian Dietz erinnert wurde. anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
            created: new Date().getTime(),
            read: false,
            category: categories.INBOX,
        },
        {
            id: "b",
            from: "Kurt Reber",
            to: "masterofdesaster@beaware.be",
            subject: "Degustation",
            content:
                "Wein Käse anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
            created: new Date().getTime(),
            read: false,
            category: categories.INBOX,
        },
        {
            id: "c",
            from: "Oliver Ott",
            to: "masterofdesaster@beaware.be",
            subject: "Übernahme",
            content:
                "In Thailand und Asien überhaupt wurde anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
            created: new Date().getTime(),
            read: false,
            category: categories.SPAM,
        },
    ];

    let currentMail = emails[0];
    let currentCategory = categories.INBOX;
    let openMail = false;
    $: isMobile = $breakpoint.isSm || $breakpoint.isMd || $breakpoint.isLg;

    function closeMailContent() {
        openMail = false;
    }
    function openMailContent() {
        openMail = true;
    }
    function selectMail(e) {
        let index = emails.findIndex((mail) => mail.id === e.detail.id);
        currentMail = emails[index];
        currentMail.read = true;
        emails = emails;
        openMailContent();
    }
    function selectCategory(e) {
        currentCategory = e.detail;
        closeMailContent();
    }
    function deleteMail(e) {
        // delete permanently
        if (currentCategory === categories.TRASH) {
            emails = emails.filter((mail) => mail.id !== e.detail.id);
        } else {
            // move to trash = category 3
            let index = emails.findIndex((mail) => mail.id === e.detail.id);
            emails[index].category = categories.TRASH;
            emails = emails;
        }

        closeMailContent();
    }
</script>

{#if !isMobile}
    <div class="grid grid-cols-12 overflow-hidden text-left">
        <div class="col-span-2 h-100vh">
            <Categories {emails} on:select:item={selectCategory} />
        </div>
        <div class="col-span-4 h-100vh border-r border-base-200 pr-4">
            <Table
                {emails}
                category={currentCategory}
                on:select:mail={selectMail}
            />
        </div>
        <div class="col-span-6 h-100vh">
            {#if openMail}
                <Content data={currentMail} on:delete:mail={deleteMail} />
            {/if}
        </div>
    </div>
{:else}
    <div class="grid grid-cols-12 overflow-hidden text-left">
        <div class="col-span-12 h-100vh">
            <div class="navbar bg-base-100">
                <div class="flex-1">
                    <Categories
                        {isMobile}
                        {emails}
                        on:select:item={selectCategory}
                    />
                </div>
                <div class="flex-none gap-2"></div>
            </div>
            {#if openMail}
                <Content
                    {isMobile}
                    data={currentMail}
                    on:close:mail={closeMailContent}
                    on:delete:mail={deleteMail}
                />
            {:else}
                <Table
                    {emails}
                    category={currentCategory}
                    on:select:mail={selectMail}
                />
            {/if}
        </div>
    </div>
{/if}

<style>
    .h-100vh {
        height: 100vh;
    }
</style>
