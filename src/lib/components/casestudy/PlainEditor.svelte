<script>
    import { onMount } from "svelte";
    import Header from "@editorjs/header";
    import Quote from "@editorjs/quote";
    import Warning from "@editorjs/warning";
    import Paragraph from "@editorjs/paragraph";
    import Delimiter from "@editorjs/delimiter";
    import List from "@editorjs/list";
    import Table from "@editorjs/table";
    import Marker from "@editorjs/marker";
    import { store } from "./store";
    import { t } from "$lib/translations";
    import RVTTrigger from "./RVTTrigger.svelte";

    export let readOnly = false;
    let loaded = false;

    let EditorJS;
    let Image;
    let Video;
    let Underline;
    let Checklist;

    let editor;

    function save() {
        if (readOnly) return;

        editor
            .save()
            .then((outputData) => {
                store.setEditor(outputData);
            })
            .catch((error) => {
                console.log("Saving failed: ", error);
            });
    }

    async function initEditorJS() {
        EditorJS = (await import("@editorjs/editorjs")).default;
        Image = (await import("@editorjs/image")).default;
        Video = (await import("@weekwood/editorjs-video")).default;
        Underline = (await import("@editorjs/underline")).default;
        Checklist = (await import("@editorjs/checklist")).default;

        editor = new EditorJS({
            holder: "editorjs",
            data: $store.editor,
            onChange: save,
            readOnly,
            tools: {
                header: Header,
                quote: Quote,
                warning: Warning,
                delimiter: Delimiter,
                marker: Marker,
                underline: Underline,
                list: {
                    class: List,
                    inlineToolbar: true,
                    config: {
                        defaultStyle: "unordered",
                    },
                },
                paragraph: {
                    class: Paragraph,
                    inlineToolbar: true,
                },
                image: {
                    class: Image,
                    config: {
                        endpoints: {
                            byFile: "http://localhost:5173/api/upload",
                        },
                    },
                },
                table: {
                    class: Table,
                    inlineToolbar: true,
                    config: {
                        rows: 2,
                        cols: 3,
                    },
                },
                checklist: {
                    class: Checklist,
                    inlineToolbar: true,
                },
            },
            i18n: {
                messages: {
                    toolNames: {
                        Text: $t("editor.toolNames.Text"),
                        Heading: $t("editor.toolNames.Heading"),
                        List: $t("editor.toolNames.List"),
                        Warning: $t("editor.toolNames.Warning"),
                        Checklist: $t("editor.toolNames.Checklist"),
                        Quote: $t("editor.toolNames.Quote"),
                        Code: $t("editor.toolNames.Code"),
                        Image: $t("editor.toolNames.Image"),
                        Delimiter: $t("editor.toolNames.Delimiter"),
                        "Raw HTML": $t("editor.toolNames.RawHTML"),
                        Table: $t("editor.toolNames.Table"),
                        Link: $t("editor.toolNames.Link"),
                        Marker: $t("editor.toolNames.Marker"),
                        Bold: $t("editor.toolNames.Bold"),
                        Italic: $t("editor.toolNames.Italic"),
                        InlineCode: $t("editor.toolNames.InlineCode"),
                    },
                    blockTunes: {
                        delete: {
                            Delete: $t("editor.blockTunes.delete"),
                            "Click to delete": $t(
                                "editor.blockTunes.clickToDelete",
                            ),
                        },
                        moveUp: {
                            "Move up": $t("editor.blockTunes.moveUp"),
                        },
                        moveDown: {
                            "Move down": $t("editor.blockTunes.moveDown"),
                        },
                    },
                },
            },
        });
    }

    onMount(async () => {
        await initEditorJS();
        loaded = true;

        return save;
    });
</script>

<div>
    <div id="editorjs" class="pt-24"></div>
    {#if readOnly && loaded}
        <RVTTrigger time={$store.rvt} />
    {/if}
</div>
