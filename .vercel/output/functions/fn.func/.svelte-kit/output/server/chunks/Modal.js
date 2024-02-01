import { c as create_ssr_component, b as createEventDispatcher, a as add_attribute, e as escape } from "./ssr.js";
import "./MS365Login.svelte_svelte_type_style_lang.js";
const css = {
  code: ".is-fullscreen.svelte-179mf3w{height:100vh !important;max-height:100vh !important;padding:0px}",
  map: null
};
const Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let { open } = $$props;
  let { fullscreen = false } = $$props;
  let dialog;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.fullscreen === void 0 && $$bindings.fullscreen && fullscreen !== void 0)
    $$bindings.fullscreen(fullscreen);
  $$result.css.add(css);
  return `   <dialog class="modal"${add_attribute("this", dialog, 0)}> <div class="${"modal-box w-full " + escape(fullscreen ? "is-fullscreen" : "", true) + " svelte-179mf3w"}">${slots.header ? slots.header({}) : ``} ${slots.body ? slots.body({}) : ``} <form method="dialog">${slots.footer ? slots.footer({}) : ``}</form></div> </dialog>`;
});
export {
  Modal as M
};
