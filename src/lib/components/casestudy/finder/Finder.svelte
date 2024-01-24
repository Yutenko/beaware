<script>
    import { onMount } from "svelte";
    import { default as QUIZ_TYPE } from "$components/quiz/types";
    import { t } from "$lib/translations";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    async function getCasestudies() {
        const response = await fetch("/api/getallcasestudies");
        return await response.json();
    }

    let data;
    const types = Object.values(QUIZ_TYPE);
    let filteredCasestudies = [];
    let searchText = "";

    function filterCasestudies() {
        filteredCasestudies =
            data?.casestudies.filter((cs) => {
                let includesText = cs.title
                    .toLowerCase()
                    .includes(searchText.toLowerCase());
                if (includesText) {
                    return cs;
                }
            }) || [];
    }

    function selectCasestudy(cs) {
        dispatch("select", cs);
    }

    onMount(async () => {
        data = await getCasestudies();
        filterCasestudies()
    });
</script>

{#await data}
    <p>Loading...</p>
{:then}
    <form class="flex flex-col w-4/5">
        <div class="flex gap-1 relative">
            <input
                type="text"
                placeholder={$t("editor.casestudy")}
                class="input input-bordered w-full"
                bind:value={searchText}
                on:input={filterCasestudies}
                on:click={filterCasestudies}
            />
        </div>
    </form>

    {#if filteredCasestudies.length > 0}
        <div class="overflow-x-auto w-4/5 mt-2 h-[500px]">
            <table class="table table-xs">
                <tbody>
                    {#each filteredCasestudies as cs, index}
                        <tr class="hover">
                            <th>{index + 1}</th>
                            <td>{cs.title}</td>
                            <td
                                ><button
                                    class="btn btn-ghost btn-xs"
                                    on:click={() => selectCasestudy(cs)}
                                    >{$t("editor.select")}</button
                                ></td
                            >
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    {/if}
{/await}
