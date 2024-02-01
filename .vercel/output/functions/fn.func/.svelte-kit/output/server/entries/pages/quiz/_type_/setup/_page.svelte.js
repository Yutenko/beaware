import { c as create_ssr_component, v as validate_component, e as escape, a as add_attribute, d as each } from "../../../../../chunks/ssr.js";
import "../../../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import { e as t } from "../../../../../chunks/index2.js";
import { s as subscribe } from "../../../../../chunks/hooks.server.js";
import { O as OPTIONS } from "../../../../../chunks/constants.js";
import "devalue";
import "../../../../../chunks/client.js";
import { p as page } from "../../../../../chunks/stores.js";
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
import { G as GroupAssignment_Embed } from "../../../../../chunks/GroupAssignment-Embed.js";
const Options = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { open = false } = $$props;
  let { options = {} } = $$props;
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { open },
      {
        open: ($$value) => {
          open = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="btn btn-primary" slot="footer">${escape($t("core.close"))}</button>`;
        },
        body: () => {
          return `<div slot="body">  <div class="mt-8 mb-4 collapse cursor-pointer bg-base-200"><input type="checkbox"> <div class="collapse-title text-base font-medium">${escape($t("quiz.settings.mode.title"))}</div> <div class="collapse-content"><div class="overflow-x-auto"><table class="table"><tbody><tr><td>${escape($t("quiz.settings.mode.free"))}</td> <td colspan="2">${escape($t("quiz.settings.mode.freeDescription"))}</td> <td><input type="radio" name="radio-20" class="radio" ${options.mode.free ? "checked" : ""}></td></tr> <tr><td>${escape($t("quiz.settings.mode.exam"))}</td> <td colspan="2">${escape($t("quiz.settings.mode.examDescription"))}</td> <td><input type="radio" name="radio-20" class="radio" ${options.mode.exam ? "checked" : ""}></td></tr> ${options.mode.exam ? `<tr><td colspan="4"><label class="form-control w-full"><div class="label"><span class="label-text text-info">${escape($t("quiz.settings.threshold"))}</span></div> <input type="number" class="input w-full" placeholder="0%"${add_attribute("value", options.threshold, 0)}></label></td></tr>` : ``} <tr><td>${escape($t("quiz.settings.mode.instant"))}</td> <td colspan="2">${escape($t("quiz.settings.mode.instantDescription"))}</td> <td><input type="radio" name="radio-20" class="radio" ${options.mode.instant ? "checked" : ""}></td></tr> ${options.mode.instant ? `<tr><td colspan="4"><label class="form-control w-full"><div class="label"><span class="label-text text-info">${escape($t("quiz.settings.threshold"))}</span></div> <input type="number" class="input w-full" placeholder="0%"${add_attribute("value", options.threshold, 0)}></label></td></tr>` : ``} <tr><td>${escape($t("quiz.settings.mode.end"))}</td> <td colspan="2">${escape($t("quiz.settings.mode.endDescription"))}</td> <td><input type="radio" name="radio-20" class="radio" ${options.mode.end ? "checked" : ""}></td></tr> ${options.mode.end ? `<tr><td colspan="4"><label class="form-control w-full"><div class="label"><span class="label-text text-info">${escape($t("quiz.settings.threshold"))}</span></div> <input type="number" class="input w-full" placeholder="0%"${add_attribute("value", options.threshold, 0)}></label></td></tr>` : ``}</tbody></table></div></div></div>   <div class="mb-4 collapse cursor-pointer bg-base-200"><input type="checkbox"> <div class="collapse-title text-base font-medium">${escape($t("quiz.settings.hints.title"))}</div> <div class="collapse-content"><div class="overflow-x-auto"><table class="table"><tbody><tr><td>${escape($t("quiz.settings.hints.available"))}</td> <td colspan="2"></td> <td><input type="radio" name="radio-40" class="radio" ${options.hints.available ? "checked" : ""}></td></tr> <tr><td>${escape($t("quiz.settings.hints.always"))}</td> <td colspan="2"></td> <td><input type="radio" name="radio-40" class="radio" ${options.hints.always ? "checked" : ""}></td></tr> <tr><td>${escape($t("quiz.settings.hints.smart"))}</td> <td colspan="2"></td> <td><input type="radio" name="radio-40" class="radio" ${options.hints.smart ? "checked" : ""}></td></tr></tbody></table></div></div></div></div>`;
        },
        header: () => {
          return `<h3 class="font-bold text-lg" slot="header">${escape($t("quiz.settings.title"))}</h3>`;
        }
      }
    )}`;
  } while (!$$settled);
  $$unsubscribe_t();
  return $$rendered;
});
const GroupAssignment_Setup = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let state;
  let feedbacksPercentage;
  let $t, $$unsubscribe_t;
  let $page, $$unsubscribe_page;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let learningappsurl = "";
  let importLAForm = null;
  let title = "";
  let task = "";
  let feedbacks = {};
  let iframeData = {};
  let openOptionsModal = false;
  let openImportLaModal = false;
  let openDeleteQuizModal = false;
  let options = OPTIONS;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    state = JSON.stringify(Object.assign(iframeData, { title, task, feedbacks, options }));
    feedbacksPercentage = Object.keys(feedbacks).length === 0 ? 100 : feedbacksPercentage;
    $$rendered = `<div class="pt-24"></div> <div class="flex-none absolute right-0 top-0 group-actions"><div class="dropdown dropdown-end">  <label tabindex="0" class="btn btn-circle btn-ghost" data-svelte-h="svelte-1ch3z5q"><i class="far fa-ellipsis-v"></i></label>  <div tabindex="0" class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"><ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"> <li>  <a>${escape($t("quiz.importLA"))}</a></li> <li>   <a class="text-error">${escape($t("quiz.delete"))}</a></li></ul></div></div></div> <div class="container mx-auto max-w-6xl"><div class="mb-6"></div> <h4 class="text-xl">${escape($t("quiz.title"))}</h4> <div class="form-control w-full"> <input type="text" class="input input-bordered w-full"${add_attribute("value", title, 0)}></div> <div class="mb-6"></div> <h4 class="text-xl">${escape($t("quiz.task"))}</h4> <div class="form-control w-full"> <label class="label"><span class="label-text">${escape($t("quiz.taskDescription"))}</span></label> <textarea class="textarea textarea-bordered">${escape("")}</textarea></div></div> <div class="mb-6"></div> <div class="container mx-auto flex flex-col items-center setup-container max-w-6xl">${validate_component(GroupAssignment_Embed, "GroupAssignmentEmbed").$$render($$result, {}, {}, {})} <div class="flex w-full justify-between mt-5 mb-5"><button class="btn btn-primary self-start"><i class="fas fa-plus"></i>${escape($t("quiz.groupassignment.addGroup"))}</button> ${options.threshold && !options.mode.free > 0 ? `  <div class="self-center text-info btn btn-ghost">${escape(options.threshold)}% ${escape($t("quiz.toSucceed"))}</div>` : ``}  <div class="self-end"> <div class="btn btn-circle btn-ghost" data-svelte-h="svelte-9sssod"><i class="fal fa-wrench"></i></div>  <a class="btn btn-primary" href="${"/quiz/" + escape($page.params.type, true) + "/embed?id=" + escape($page.url.searchParams.get("id"), true)}" target="_blank"><i class="fas fa-gamepad"></i>${escape($t("quiz.play"))}</a></div></div></div> <div class="container mx-auto max-w-6xl"><h4 class="text-xl">${escape($t("quiz.feedback.title"))}</h4> <p class="label-text">${escape($t("quiz.feedback.basedOnSolutionDescription"))}</p> <div class="mb-6"></div> ${Object.keys(feedbacks).length > 0 ? `<input type="range" min="0" max="100" class="range range-primary mt-4 mb-4"${add_attribute("value", feedbacksPercentage, 0)}> <div class="w-full flex justify-between text-xs px-2 relative h-16" style="margin-left:-25px">${each(Object.keys(feedbacks), (key) => {
      return `    <div class="btn btn-circle btn-outline absolute" style="${"left:" + escape(key, true) + "%;opacity:" + escape(feedbacks[key] === -1 ? 0.2 : 1, true) + ";"}">${escape(key)}%
                </div>`;
    })}</div>` : ``} <textarea class="textarea textarea-bordered w-full textarea-lg"${add_attribute(
      "placeholder",
      `${$t(feedbacksPercentage === 100 ? "quiz.feedback.solved100" : "quiz.feedback.startFrom")} ${feedbacksPercentage !== 100 ? feedbacksPercentage + "%" : ""}`,
      0
    )}>${escape("")}</textarea> <form method="post" action="${"?/update&id=" + escape($page.url.searchParams.get("id"), true)}"><input class="hidden" name="state"${add_attribute("value", state, 0)}> <div class="flex w-full flex-row-reverse mt-5 mb-5"><button type="submit" class="btn btn-primary"><i class="fas fa-save"></i>${escape($t("quiz.save"))}</button></div></form></div> ${validate_component(Options, "OptionsModal").$$render(
      $$result,
      { open: openOptionsModal, options },
      {
        open: ($$value) => {
          openOptionsModal = $$value;
          $$settled = false;
        },
        options: ($$value) => {
          options = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: openImportLaModal },
      {
        open: ($$value) => {
          openImportLaModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="btn btn-primary" slot="footer">${escape($t("quiz.convert"))}</button>`;
        },
        body: () => {
          return `<div slot="body"><div class="form-control w-full"><form method="post" action="${"?/importla&id=" + escape($page.url.searchParams.get("id"), true) + "&mode=" + escape($page.url.searchParams.get("mode"), true)}"${add_attribute("this", importLAForm, 0)}> <input type="text" class="input input-bordered w-full" aria-label="Import" name="learningappsurl"${add_attribute("value", learningappsurl, 0)}></form></div></div>`;
        },
        header: () => {
          return `<h3 class="font-bold text-lg" slot="header">${escape($t("quiz.importLA"))}</h3>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: openDeleteQuizModal },
      {
        open: ($$value) => {
          openDeleteQuizModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<div slot="footer"><form method="post" action="${"?/delete&id=" + escape($page.url.searchParams.get("id"), true) + "&mode=" + escape($page.url.searchParams.get("mode"), true)}"><button class="btn btn-secondary" type="submit">${escape($t("quiz.deletePermanent"))}</button> <button class="btn btn-primary">${escape($t("core.close"))}</button></form></div>`;
        },
        body: () => {
          return `<div slot="body"><p class="pt-4">${escape($t("quiz.deleteDescription"))}</p></div>`;
        },
        header: () => {
          return `<h3 class="font-bold text-lg" slot="header">${escape($t("quiz.delete"))}</h3>`;
        }
      }
    )} <div class="pb-96"></div>`;
  } while (!$$settled);
  $$unsubscribe_t();
  $$unsubscribe_page();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(GroupAssignment_Setup, "GroupAssignmentSetup").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
