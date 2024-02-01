import { c as create_ssr_component, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import "../../../../chunks/index2.js";
import "devalue";
import "../../../../chunks/client.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import { s as store, P as PlainEditor } from "../../../../chunks/PlainEditor.js";
import "dayjs";
const Reader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let is404;
  let { state = {} } = $$props;
  const { rvt, editor } = state;
  if (editor)
    store.setEditor(editor);
  if (rvt)
    store.setRVT(rvt);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  is404 = Object.keys(state).length === 0;
  return `${is404 ? `<p data-svelte-h="svelte-swq3p4">404</p>` : `${validate_component(PlainEditor, "PlainEditor").$$render($$result, { readOnly: true }, {}, {})}`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Reader, "CasestudyReader").$$render($$result, { state: data.state }, {}, {})}`;
});
export {
  Page as default
};
