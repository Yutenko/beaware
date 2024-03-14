<script>
    import { globalStore } from "$components/global-store";
</script>

<div class="dropdown dropdown-end">
    <div tabindex="0" role="button" class="text-base-100 btn btn-ghost">
        Christian
    </div>
    <ul class="menu bg-base-200 rounded-box dropdown-content z-10">
        <li class="menu-title">Profile</li>
        <li>
            <div>
                <div class="flex flex-col gap-2 p-2">
                    <div class="stat-desc">Allgemeine Datenschutzfragen</div>
                    <div class="flex flex-row items-center gap-2 relative">
                        <progress
                            class="progress progress-primary w-56"
                            value="30"
                            max="100"
                        >
                        </progress>
                        <div class="absolute left-0 top-0 z-10"></div>
                        <div class="stat-value text-sm">86%</div>
                    </div>
                </div>
            </div>
        </li>
    </ul>
</div>
