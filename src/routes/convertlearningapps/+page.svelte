<script>
    import { enhance } from "$app/forms";
    let url = "";
    let urls = [];

    function getFilenameWithoutExtension(path) {
        const parts = path.split("/"); 
        const filename = parts.pop(); 

        return filename.replace(/\.[^/.]+$/, ""); 
    }
</script>

<form
    method="post"
    use:enhance={() => {
        return async ({ result, update }) => {
            if (result?.data?.url) {
                urls = [
                    ...urls,
                    {
                        origin: url,
                        converted: getFilenameWithoutExtension(result.data.url),
                    },
                ];
            }
            update();
        };
    }}
>
    <input
        name="url"
        type="text"
        class="input input-bordered w-full"
        bind:value={url}
    />
    <div class="flex w-full flex-row-reverse mt-5 mb-5">
        <button type="submit" class="btn btn-primary"
            ><i class="fas fa-save" />submit</button
        >
    </div>

    <div class="overflow-x-auto">
        <table class="table">
            <!-- head -->
            <thead>
                <tr>
                    <th>from</th>
                    <th>to</th>
                </tr>
            </thead>
            <tbody>
                {#each urls.reverse() as u}
                    <!-- row 1 -->
                    <tr>
                        <td>
                            <a href={u.origin} target="_blank">{u.origin}</a>
                        </td>
                        <td>
                            <a
                                href="/quiz/1/embed?id={u.converted}"
                                target="_blank">{u.converted}</a
                            >
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</form>
