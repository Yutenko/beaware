import { c as create_ssr_component } from "../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<a class="btn btn-ghost" href="/user" data-svelte-h="svelte-og544o">User</a> <a class="btn btn-ghost" href="/author" data-svelte-h="svelte-1g94984">Author</a>`;
});
export {
  Page as default
};
