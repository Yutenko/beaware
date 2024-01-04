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

    let EditorJS;
    let Image;
    let Underline;
    let Checklist;

    let editor;

    function save() {
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
        Underline = (await import("@editorjs/underline")).default;
        Checklist = (await import("@editorjs/checklist")).default;

        editor = new EditorJS({
            holder: "editorjs",
            autofocus: true,
            onChange: save,
            data: $store.editor,
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
                            byFile: "http://localhost:5173/api/uploadimage",
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
        });
    }

    onMount(async () => {
        await initEditorJS();

        return save;
    });
</script>

<div id="editorjs"></div>
