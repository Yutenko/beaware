import { c as create_ssr_component, b as createEventDispatcher, a as add_attribute, d as each, e as escape, v as validate_component } from "../../../chunks/ssr.js";
import "../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import { e as t } from "../../../chunks/index2.js";
import "devalue";
import "../../../chunks/client.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import { s as subscribe, b as is_promise, n as noop } from "../../../chunks/hooks.server.js";
import { t as types } from "../../../chunks/types.js";
import { M as Modal } from "../../../chunks/Modal.js";
import "dayjs";
const Finder$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  createEventDispatcher();
  let data;
  let filteredCasestudies = [];
  let searchText = "";
  $$unsubscribe_t();
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <p data-svelte-h="svelte-qdsr2u">Loading...</p> `;
    }
    return function() {
      return ` <form class="flex flex-col w-4/5"><div class="flex gap-1 relative"><input type="text"${add_attribute("placeholder", $t("editor.casestudy"), 0)} class="input input-bordered w-full"${add_attribute("value", searchText, 0)}></div></form> ${filteredCasestudies.length > 0 ? `<div class="overflow-x-auto w-4/5 mt-2 h-[500px]"><table class="table table-xs"><tbody>${each(filteredCasestudies, (cs, index) => {
        return `<tr class="hover"><th>${escape(index + 1)}</th> <td>${escape(cs.title)}</td> <td><button class="btn btn-ghost btn-xs">${escape($t("editor.select"))}</button></td> </tr>`;
      })}</tbody></table></div>` : ``} `;
    }();
  }(data)}`;
});
const Finder = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  createEventDispatcher();
  let data;
  const types$1 = Object.values(types);
  let filteredQuizzes = [];
  let searchText = "";
  function filterQuizzes() {
    filteredQuizzes = [];
  }
  {
    filterQuizzes();
  }
  $$unsubscribe_t();
  return `${function(__value) {
    if (is_promise(__value)) {
      __value.then(null, noop);
      return ` <p data-svelte-h="svelte-qdsr2u">Loading...</p> `;
    }
    return function() {
      return ` <form class="flex flex-col w-4/5"><div class="flex gap-1 relative"><input type="text"${add_attribute("placeholder", $t("quiz.quiz"), 0)} class="input input-bordered w-full"${add_attribute("value", searchText, 0)}> <select class="select w-auto">${each(types$1, (type) => {
        return `<option${add_attribute("value", type, 0)}>${escape($t(`quiz.types.${type}`))}</option>`;
      })}</select></div></form> ${filteredQuizzes.length > 0 ? `<div class="overflow-x-auto w-4/5 mt-2 h-[500px]"><table class="table table-xs"><tbody>${each(filteredQuizzes, (quiz, index) => {
        return `<tr class="hover"><th>${escape(index + 1)}</th> <td>${escape(quiz.title)}</td> <td><button class="btn btn-ghost btn-xs">${escape($t("editor.select"))}</button></td> <td>${escape($t(`quiz.types.${quiz.type}`))}</td> </tr>`;
      })}</tbody></table></div>` : ``} `;
    }();
  }(data)}`;
});
let mode = "edit";
let id = "";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let openModal = false;
  let selectedData = {};
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="grid grid-cols-2 max-w-7xl" style="margin:0 auto;"><div class="">${validate_component(Finder, "QuizFinder").$$render($$result, {}, {}, {})} <a data-sveltekit-preload-data="tap" class="btn btn-ghost btn-sm w-full" href="${"/quiz/1/setup?mode=" + escape(mode, true) + "&id=" + escape(id, true)}">Neue Gruppenzuordnung</a></div> <div>${validate_component(Finder$1, "CasestudyFinder").$$render($$result, {}, {}, {})} <a class="btn btn-ghost btn-sm w-full" data-sveltekit-preload-data="tap" href="/casestudy" data-svelte-h="svelte-169p8uo">Neues Fallbeispiel</a></div></div> ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: openModal },
      {
        open: ($$value) => {
          openModal = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<div slot="body">${`<a${add_attribute("href", selectedData.play, 0)} class="btn btn-primary">Spielen</a> <a${add_attribute("href", selectedData.edit, 0)} class="btn btn-secondary">Bearbeiten</a>`} ${``}</div>`;
        },
        header: () => {
          return `<h3 class="font-bold text-lg" slot="header">${escape(selectedData.title)}</h3>`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Page as default
};
