<script>
    import { categories } from "./constants";
    import { t } from "$lib/translations";
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let emails = [];
    export let isMobile = false;

    let active = categories.INBOX;
    function selectItem(item) {
        active = item;
        dispatch("select:item", item);
    }

    let counts = {
        item0: 0,
        item1: 0,
        item2: 0,
        item3: 0,
    };

    // mail not read, count one up
    function updateCounts(emails) {
        // reset counts
        Object.keys(counts).forEach((key) => {
            counts[key] = 0;
        });

        // recalculate counts
        for (let i = 0; i < emails.length; i++) {
            if (!emails[i].read) {
                counts["item" + [emails[i].category]]++;
            }
        }
    }
    $: updateCounts(emails);
</script>

<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<ul
    class="{isMobile
        ? 'menu-horizontal center w-full'
        : ''} menu h-full bg-base-200"
>
    <li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a
            on:click={() => selectItem(categories.INBOX)}
            class={active === categories.INBOX ? "active" : ""}
        >
            {#if isMobile}
                {$t(`mail.categories.${categories.INBOX}`).slice(0, 4)}
            {:else}
                <i class="fas fa-inbox"></i>
                {$t(`mail.categories.${categories.INBOX}`)}
            {/if}
            {#if counts.item0 > 0}
                <span class="badge badge-sm">{counts.item0}</span>
            {/if}
        </a>
    </li>
    <li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a
            on:click={() => selectItem(categories.SPAM)}
            class={active === categories.SPAM ? "active" : ""}
        >
            {#if isMobile}
                {$t(`mail.categories.${categories.SPAM}`).slice(0, 4)}
            {:else}
                <i class="fas fa-inbox"></i>
                {$t(`mail.categories.${categories.SPAM}`)}
            {/if}
            {#if counts.item1 > 0}
                <span class="badge badge-sm">{counts.item1}</span>
            {/if}
        </a>
    </li>
   
    <li>
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <a
            on:click={() => selectItem(categories.TRASH)}
            class={active === categories.TRASH ? "active" : ""}
        >
            <i class="fas fa-trash"></i>
            {#if isMobile}
                {$t(`mail.categories.${categories.TRASH}`).slice(0, 1)}
            {:else}
                {$t(`mail.categories.${categories.TRASH}`)}
            {/if}
            {#if counts.item3 > 0}
                <span class="badge badge-sm">{counts.item3}</span>
            {/if}
        </a>
    </li>
</ul>

<style>
    .center {
        margin: 0 auto;
    }
</style>
