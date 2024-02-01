import { c as create_ssr_component, a as add_attribute, e as escape, v as validate_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import { e as t } from "../../../../../chunks/index2.js";
import "devalue";
import "../../../../../chunks/client.js";
import { s as store, P as PlainEditor } from "../../../../../chunks/PlainEditor.js";
import { s as subscribe } from "../../../../../chunks/hooks.server.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import { M as Modal } from "../../../../../chunks/Modal.js";
import "dayjs";
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $store, $$unsubscribe_store;
  let $t, $$unsubscribe_t;
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let openDeleteCasestudyModal = false;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="navbar bg-base-100 fixed top-0 left-0 w-full z-20 shadow-sm"><div class="flex-1"><input type="text" class="btn btn-ghost text-xl"${add_attribute("placeholder", $t("editor.untitledCasestudy"), 0)}${add_attribute("value", $store.title, 0)}></div> <div class="flex-none">${``} <i class="${"fas fa-sync " + escape("", true)}"></i> <button class="btn btn-ghost">${escape($t("core.save"))}</button> <div class="flex-none group-actions"><div class="dropdown dropdown-end">  <label tabindex="0" class="btn btn-circle btn-ghost" data-svelte-h="svelte-1qfuuny"><i class="far fa-ellipsis-v"></i></label>  <div tabindex="0" class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"><ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"><li>   <a class="text-error">${escape($t("editor.delete"))}</a></li></ul></div></div></div></div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: openDeleteCasestudyModal },
      {
        open: ($$value) => {
          openDeleteCasestudyModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<div slot="footer"><form method="post" action="?/delete&mode=edit"><button class="btn btn-secondary" type="submit">${escape($t("editor.deletePermanent"))}</button> <button class="btn btn-primary">${escape($t("core.close"))}</button></form></div>`;
        },
        body: () => {
          return `<div slot="body"><p class="pt-4">${escape($t("editor.deleteDescription"))}</p></div>`;
        },
        header: () => {
          return `<h3 class="font-bold text-lg" slot="header">${escape($t("editor.delete"))}</h3>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_store();
  $$unsubscribe_t();
  return $$rendered;
});
const Editor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let is404;
  let { state = {} } = $$props;
  const { title, editor } = state;
  if (title)
    store.setTitle(title);
  if (editor)
    store.setEditor(editor);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  is404 = Object.keys(state).length === 0;
  return `${is404 ? `<p data-svelte-h="svelte-swq3p4">404</p>` : `${validate_component(Navbar, "Navbar").$$render($$result, {}, {}, {})} ${validate_component(PlainEditor, "PlainEditor").$$render($$result, {}, {}, {})}`}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Editor, "CasestudyEditor").$$render($$result, { state: data.state }, {}, {})}`;
});
export {
  Page as default
};
