<script>
    import { onMount } from "svelte";
    import OverviewProgress from "./OverviewProgress.svelte";
    import { types as LU_TYPE } from "$components/apps/learningunit/constants";
    import LearningEnvironment from "$components/learningenvironment/shared";

    let userResults = {};
    let systemCollections = {};

    $: collectionsTouched = Object.keys(userResults);

    function onGetDetails(data) {
        userResults = data.userResults;
        systemCollections = data.systemCollections;
    }

    onMount(() => {
        LearningEnvironment.receiver.init({ onGetDetails });
        LearningEnvironment.receiver.getDetails();
    });

</script>

<button class="btn btn-outline-primary">Zertifikat</button>

{#if collectionsTouched.length > 0}
    <div role="tablist" class="tabs tabs-bordered">
        {#each collectionsTouched as cid}
            <input
                type="radio"
                name={systemCollections[cid].title}
                role="tab"
                class="tab"
                aria-label={cid}
            />
            <div role="tabpanel" class="tab-content p-10">
                <OverviewProgress
                    collection={systemCollections[cid]}
                    results={userResults[cid]}
                />
                <article class="prose max-w-full">
                    <p>{systemCollections[cid].description}</p>
                </article>
                {#if Object.keys(userResults[cid]).length > 0}
                    {#each Object.keys(userResults[cid]) as appid}
                        <div class="collapse collapse-arrow bg-base-200">
                            <input
                                type="radio"
                                name="my-accordion-2"
                                checked="checked"
                            />
                            <div class="collapse-title text-xl font-medium">
                                {userResults[cid][appid].type}
                            </div>
                            <div class="collapse-content">
                                {#if userResults[cid][appid].type === LU_TYPE.QUIZ}
                                    <div class="overflow-x-auto">
                                        <table class="table">
                                            <!-- head -->
                                            <thead>
                                                <tr>
                                                    <th>Karte</th>
                                                    <th>Anzahl Versuche</th>
                                                    <th>Richtig/Falsch</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {#each userResults[cid][appid].progress as progress}
                                                    <tr>
                                                        <td>{progress.id}</td>
                                                        <td
                                                            >{progress.attempts}</td
                                                        >
                                                        <td
                                                            >{progress.points}</td
                                                        >
                                                    </tr>
                                                {/each}
                                            </tbody>
                                        </table>
                                    </div>
                                {:else if userResults[cid][appid].type === LU_TYPE.CASESTUDY}
                                    <p>CASESTUDY</p>
                                {/if}
                            </div>
                        </div>
                    {/each}
                {/if}
            </div>
        {/each}
    </div>
{/if}
