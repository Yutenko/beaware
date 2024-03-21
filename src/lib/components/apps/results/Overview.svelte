<script>
    import OverviewProgress from "./OverviewProgress.svelte";
    import {
        userProfile,
        userResults,
        systemCollections,
    } from "$lib/stores-global";
    import { t } from "$lib/translations";
    import { tooltip } from "$lib/actions";
</script>

<div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="text-base-100 btn btn-ghost">
        {$userProfile.name}
    </div>
    <ul class="menu bg-base-200 rounded-box dropdown-content z-10">
        <button
            class="absolute right-2 top-2 btn btn-circle btn-xs z-20"
            use:tooltip={{ content: $t("results.certificate.name") }}
            ><i class="fal fa-file-certificate"></i></button
        >
        <li class="menu-title">
            {$t("results.profile")}
        </li>
        {#each Object.keys($userResults) as cid}
            <li>
                <OverviewProgress
                    collection={$systemCollections[cid]}
                    results={$userResults[cid]}
                />
            </li>
        {/each}
    </ul>
</div>
