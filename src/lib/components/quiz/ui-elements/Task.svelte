<script>
    import { t } from "$lib/translations";
    import { linkify } from "$lib/actions";

    let dialog;

    $: if (dialog && open) {
        dialog.showModal();
    }

    let open = true;
    export let title = "";
    export let task = "";

    function toggleOpen() {
        open = !open;
    }
</script>

<button
    class="btn btn-outline btn-xs absolute top-4 left-4 rounded-full"
    style="opacity: {open
        ? 0
        : 1}; transition: opacity 0.65s;z-index: 9999999999999999"
    on:click={toggleOpen}>{$t("quiz.task")}</button
>
<!-- svelte-ignore missing-declaration -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
    class="modal {open ? 'grow' : 'shrink'}"
    bind:this={dialog}
    on:close={() => (open = false)}
    on:click|self={() => dialog.close()}
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="modal-box" on:click|stopPropagation>
        <h3 class="font-bold text-lg">{title}</h3>
        <div>
            <p class="py-4" use:linkify>{@html task}</p>
            <div class="relative" />
        </div>

        <div class="modal-action" style="justify-content:center;">
            <form method="dialog">
                <button class="btn btn-primary">
                    {$t("core.close")}
                </button>
            </form>
        </div>
    </div>
</dialog>

<style>
    @-webkit-keyframes shrink {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0.1);
            opacity: 0;
        }
    }

    @-moz-keyframes shrink {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0.1);
            opacity: 0;
        }
    }

    @-o-keyframes shrink {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0.1);
            opacity: 0;
        }
    }

    @keyframes shrink {
        0% {
            transform: scale(1);
            opacity: 1;
        }

        100% {
            transform: scale(0.1);
            opacity: 0;
        }
    }

    @keyframes move-shrink {
        0% {
            transform-origin: 50% 50%;
        }

        100% {
            transform-origin: 0% 0%;
        }
    }

    @-moz-keyframes move-shrink {
        0% {
            transform-origin: 50% 50%;
        }

        100% {
            transform-origin: 0% 0%;
        }
    }

    @-o-keyframes move-shrink {
        0% {
            transform-origin: 50% 50%;
        }

        100% {
            transform-origin: 0% 0%;
        }
    }

    @-webkit-keyframes move-shrink {
        0% {
            transform-origin: 50% 50%;
        }

        100% {
            transform-origin: 0% 0%;
        }
    }

    .shrink {
        -webkit-animation:
            move-shrink 0.5s forwards,
            shrink 0.5s forwards;
        -moz-animation:
            move-shrink 0.5s forwards,
            shrink 0.5s forwards;
        -o-animation:
            move-shrink 0.5s forwards,
            shrink 0.5s forwards;
        animation:
            move-shrink 0.5s forwards,
            shrink 0.5s forwards;
    }

    @-webkit-keyframes grow {
        0% {
            transform: scale(0.1);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @-moz-keyframes grow {
        0% {
            transform: scale(0.1);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @-o-keyframes grow {
        0% {
            transform: scale(0.1);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes grow {
        0% {
            transform: scale(0.1);
            opacity: 0;
        }

        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes move-grow {
        0% {
            transform-origin: 0% 0%;
        }

        100% {
            transform-origin: 50% 50%;
        }
    }

    @-moz-keyframes move-grow {
        0% {
            transform-origin: 0% 0%;
        }

        100% {
            transform-origin: 50% 50%;
        }
    }

    @-o-keyframes move-grow {
        0% {
            transform-origin: 0% 0%;
        }

        100% {
            transform-origin: 50% 50%;
        }
    }

    @-webkit-keyframes move-grow {
        0% {
            transform-origin: 0% 0%;
        }

        100% {
            transform-origin: 50% 50%;
        }
    }

    .grow {
        -webkit-animation:
            move-grow 0.5s forwards,
            grow 0.5s forwards;
        -moz-animation:
            move-grow 0.5s forwards,
            grow 0.5s forwards;
        -o-animation:
            move-grow 0.5s forwards,
            grow 0.5s forwards;
        animation:
            move-grow 0.5s forwards,
            grow 0.5s forwards;
    }
</style>
