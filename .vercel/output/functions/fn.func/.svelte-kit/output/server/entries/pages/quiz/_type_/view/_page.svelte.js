import { c as create_ssr_component, v as validate_component } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import "../../../../../chunks/index2.js";
import { t as types } from "../../../../../chunks/types.js";
import "devalue";
import "../../../../../chunks/client.js";
import { G as GroupAssignment_Embed } from "../../../../../chunks/GroupAssignment-Embed.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import "dayjs";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { type } = data.params;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${type == types.groupassignment ? `${validate_component(GroupAssignment_Embed, "GroupAssignmentEmbed").$$render($$result, {}, {}, {})}` : ``}`;
});
export {
  Page as default
};
