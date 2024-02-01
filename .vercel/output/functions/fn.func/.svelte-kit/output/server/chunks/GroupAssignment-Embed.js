import { s as subscribe } from "./hooks.server.js";
import { c as create_ssr_component, a as add_attribute } from "./ssr.js";
import { p as page } from "./stores.js";
const GroupAssignment_Embed = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  const type = $page.params.type;
  const mode = $page.url.searchParams.get("mode");
  const id = $page.url.searchParams.get("id");
  const src = `/quiz/${type}/embed/?mode=${mode}&id=${id}`;
  $$unsubscribe_page();
  return `<iframe${add_attribute("src", src, 0)} title="framed" data-is-quiz-receiver="true"></iframe>`;
});
export {
  GroupAssignment_Embed as G
};
