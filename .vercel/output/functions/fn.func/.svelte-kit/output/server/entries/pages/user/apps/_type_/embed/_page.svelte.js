import { c as create_ssr_component, b as createEventDispatcher, e as escape, a as add_attribute, d as each, v as validate_component } from "../../../../../../chunks/ssr.js";
import { b as breakpoint } from "../../../../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import { e as t } from "../../../../../../chunks/index2.js";
import "devalue";
import "../../../../../../chunks/client.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import dayjs from "dayjs";
import { t as types } from "../../../../../../chunks/types2.js";
import { s as subscribe } from "../../../../../../chunks/hooks.server.js";
const categories = {
  INBOX: 0,
  SPAM: 1,
  DRAFTS: 2,
  TRASH: 3
};
function isEmpty(category, emails) {
  const firstOccurenceIndex = emails.findIndex((mail) => mail.category === category);
  return firstOccurenceIndex === -1;
}
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let title;
  let isAllMailsEmpty;
  let isFilteredMailsEmpty;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { emails = [] } = $$props;
  let { category = categories.INBOX } = $$props;
  let filteredEmails = emails;
  let searchText = "";
  let navbarHeight = 0;
  function filterEmails(emails2) {
    filteredEmails = emails2.filter((mail) => {
      let includesText = mail.content.toLowerCase().includes(searchText.toLowerCase()) || mail.subject.toLowerCase().includes(searchText.toLowerCase()) || mail.from.toLowerCase().includes(searchText.toLowerCase());
      if (includesText) {
        return mail;
      }
    }) || [];
  }
  createEventDispatcher();
  if ($$props.emails === void 0 && $$bindings.emails && emails !== void 0)
    $$bindings.emails(emails);
  if ($$props.category === void 0 && $$bindings.category && category !== void 0)
    $$bindings.category(category);
  title = $t(`mail.categories.${category}`);
  {
    filterEmails(emails);
  }
  isAllMailsEmpty = isEmpty(category, emails);
  isFilteredMailsEmpty = filteredEmails.length === 0;
  $$unsubscribe_t();
  return `<div class="navbar bg-base-100"><div class="flex-1"> <a class="font-bold text-xl pl-4">${escape(title)}</a></div> <div class="flex-none gap-2"><div class="form-control"><input type="text"${add_attribute("placeholder", $t("mail.search"), 0)} class="input input-bordered w-24"${add_attribute("value", searchText, 0)}></div></div></div> <div class="overflow-x-auto overflow-y-auto" style="${"height:calc(100% - " + escape(navbarHeight, true) + "px)"}"><table class="table"><tbody>${isAllMailsEmpty ? `<div class="flex items-center justify-center h-[70vh] opacity-50 text-lg">${escape($t(`mail.empty.${category}`))}</div>` : ``} ${isFilteredMailsEmpty ? `<div class="flex items-center justify-center h-[70vh] opacity-50 text-lg">${escape($t(`mail.noSearchResults`))}</div>` : ``} ${each(filteredEmails, (email) => {
    return `${email.category === category ? `<tr class="hover cursor-pointer"><th></th> <td><div class="card overflow-hidden"><div class="card-body"><div class="date absolute top-2 right-2 opacity-50">${escape(dayjs(email.created).format("MMMM D, YYYY h:mm A"))}</div> <h2 class="card-title">${escape(email.from)} ${!email.read ? `<div class="badge badge-secondary">${escape($t("mail.badges.new"))} </div>` : ``}</h2> <p class="font-bold">${escape(email.subject)}</p> <p class="text-sm opacity-50 text-ellipsis h-[2rem]">${escape(email.content)} </p></div> </div></td> </tr>` : ``}`;
  })}</tbody></table> </div>`;
});
const css$1 = {
  code: ".center.svelte-11jr5y{margin:0 auto}",
  map: null
};
const Categories = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  createEventDispatcher();
  let { emails = [] } = $$props;
  let { isMobile = false } = $$props;
  let counts = { item0: 0, item1: 0, item2: 0, item3: 0 };
  function updateCounts(emails2) {
    Object.keys(counts).forEach((key) => {
      counts[key] = 0;
    });
    for (let i = 0; i < emails2.length; i++) {
      if (!emails2[i].read) {
        counts["item" + [emails2[i].category]]++;
      }
    }
  }
  if ($$props.emails === void 0 && $$bindings.emails && emails !== void 0)
    $$bindings.emails(emails);
  if ($$props.isMobile === void 0 && $$bindings.isMobile && isMobile !== void 0)
    $$bindings.isMobile(isMobile);
  $$result.css.add(css$1);
  {
    updateCounts(emails);
  }
  $$unsubscribe_t();
  return ` <ul class="${escape(isMobile ? "menu-horizontal center w-full" : "", true) + " menu h-full bg-base-200 svelte-11jr5y"}"><li>   <a${add_attribute("class", "active", 0)}>${isMobile ? `${escape($t(`mail.categories.${categories.INBOX}`).slice(0, 4))}` : `<i class="fas fa-inbox"></i> ${escape($t(`mail.categories.${categories.INBOX}`))}`} ${counts.item0 > 0 ? `<span class="badge badge-sm">${escape(counts.item0)}</span>` : ``}</a></li> <li>   <a${add_attribute("class", "", 0)}>${isMobile ? `${escape($t(`mail.categories.${categories.SPAM}`).slice(0, 4))}` : `<i class="fas fa-inbox"></i> ${escape($t(`mail.categories.${categories.SPAM}`))}`} ${counts.item1 > 0 ? `<span class="badge badge-sm">${escape(counts.item1)}</span>` : ``}</a></li> <li>   <a${add_attribute("class", "", 0)}><i class="fas fa-trash"></i> ${isMobile ? `${escape($t(`mail.categories.${categories.TRASH}`).slice(0, 1))}` : `${escape($t(`mail.categories.${categories.TRASH}`))}`} ${counts.item3 > 0 ? `<span class="badge badge-sm">${escape(counts.item3)}</span>` : ``}</a></li> </ul>`;
});
const css = {
  code: ".h-100vh.svelte-u0xvum{height:100vh}",
  map: null
};
const Mail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isMobile;
  let $breakpoint, $$unsubscribe_breakpoint;
  $$unsubscribe_breakpoint = subscribe(breakpoint, (value) => $breakpoint = value);
  let emails = [
    {
      id: "a",
      from: "Christian Dietz",
      to: "masterofdesaster@beaware.be",
      subject: "Erinnerung",
      content: "Dies ist eine E-Mail, welche einen Eintrag von Christian Dietz erinnert wurde. anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
      created: (/* @__PURE__ */ new Date()).getTime(),
      read: false,
      category: categories.INBOX
    },
    {
      id: "b",
      from: "Kurt Reber",
      to: "masterofdesaster@beaware.be",
      subject: "Degustation",
      content: "Wein Käse anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
      created: (/* @__PURE__ */ new Date()).getTime(),
      read: false,
      category: categories.INBOX
    },
    {
      id: "c",
      from: "Oliver Ott",
      to: "masterofdesaster@beaware.be",
      subject: "Übernahme",
      content: "In Thailand und Asien überhaupt wurde anskjdnjkasnd kjsakjnd nsajknd kaskdnj sandknksa djknsaj dksan kdjnsan dkjasnjk nasknd jkasnd kjasndj naskjndj sandjknsa kdjnask ndsa",
      created: (/* @__PURE__ */ new Date()).getTime(),
      read: false,
      category: categories.SPAM
    }
  ];
  emails[0];
  let currentCategory = categories.INBOX;
  $$result.css.add(css);
  isMobile = $breakpoint.isSm || $breakpoint.isMd || $breakpoint.isLg;
  $$unsubscribe_breakpoint();
  return `${!isMobile ? `<div class="grid grid-cols-12 overflow-hidden text-left"><div class="col-span-2 h-100vh svelte-u0xvum">${validate_component(Categories, "Categories").$$render($$result, { emails }, {}, {})}</div> <div class="col-span-4 h-100vh border-r border-base-200 pr-4 svelte-u0xvum">${validate_component(Table, "Table").$$render($$result, { emails, category: currentCategory }, {}, {})}</div> <div class="col-span-6 h-100vh svelte-u0xvum">${``}</div></div>` : `<div class="grid grid-cols-12 overflow-hidden text-left"><div class="col-span-12 h-100vh svelte-u0xvum"><div class="navbar bg-base-100" style="min-height:unset;padding:0px;"><div class="flex-1">${validate_component(Categories, "Categories").$$render($$result, { isMobile, emails }, {}, {})}</div> <div class="flex-none gap-2"></div></div> ${`${validate_component(Table, "Table").$$render($$result, { emails, category: currentCategory }, {}, {})}`}</div></div>`}`;
});
const QUIZ = 1;
const CASESTUDY = 2;
const LU_TYPE = {
  QUIZ,
  CASESTUDY
};
const order = {
  SEQUENTIAL: 1,
  RANDOM: 2
};
const Learningunit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isStart;
  let inProgress;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  const config = {
    id: "collection-id",
    title: "Datenschutz allgemein",
    description: "In diesem Projekt können Sie die Datenschutz allgemeinen Fragen zur Verfügung gestellt werden.",
    order: order.SQUENTIAL,
    apps: [
      {
        type: LU_TYPE.CASESTUDY,
        id: "5c4c8252-c1e3-4e18-9028-78de3b9ef7c8",
        play: "/casestudy/5c4c8252-c1e3-4e18-9028-78de3b9ef7c8"
      },
      {
        type: LU_TYPE.QUIZ,
        id: "f3ea52c0-f382-471d-9ec5-f8eb50d0261d",
        play: "/quiz/1/embed?id=f3ea52c0-f382-471d-9ec5-f8eb50d0261d"
      },
      {
        type: LU_TYPE.CASESTUDY,
        id: "dcc00729-c6e3-42bd-8c42-c3e7fca0cff2",
        play: "/casestudy/dcc00729-c6e3-42bd-8c42-c3e7fca0cff2"
      }
    ]
  };
  let step = -1;
  isStart = step === -1;
  inProgress = step > -1;
  $$unsubscribe_t();
  return `${isStart ? `<div class="hero min-h-screen" style="background-image: url(/media/learningenvironment/backgrounds/learningunit_bg.png);"><div class="hero-overlay bg-opacity-60"></div> <div class="hero-content text-center text-neutral-content"><div class="max-w-md"><h1 class="mb-5 text-5xl font-bold">${escape(config.title)}</h1> <p class="mb-5">${escape(config.description)}</p> <button class="btn btn-primary">${escape($t("lunit.start"))}</button></div></div></div>` : ``} ${inProgress ? `<div class="min-h-screen"><iframe${add_attribute("src", config.apps[step].play, 0)} title="lu-content"></iframe> ${``}</div>` : ``} ${``}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let { type } = data.params;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${type == types.MAIL ? `${validate_component(Mail, "MailClient").$$render($$result, {}, {}, {})}` : `${type == types.LEARNINGUNIT ? `${validate_component(Learningunit, "LearningUnit").$$render($$result, {}, {}, {})}` : ``}`}`;
});
export {
  Page as default
};
