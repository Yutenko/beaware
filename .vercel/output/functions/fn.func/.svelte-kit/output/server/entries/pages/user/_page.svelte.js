import { c as create_ssr_component, e as escape, o as onDestroy, v as validate_component, a as add_attribute, m as missing_component, b as createEventDispatcher, d as each } from "../../../chunks/ssr.js";
import { i as isRealMobileBrowser, b as breakpoint } from "../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
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
import dayjs from "dayjs";
import { s as subscribe } from "../../../chunks/hooks.server.js";
import { M as Modal } from "../../../chunks/Modal.js";
import { w as writable } from "../../../chunks/index3.js";
import { t as types } from "../../../chunks/types2.js";
import { METHODS } from "moveable";
const css$4 = {
  code: ".bg.svelte-1n1g92y{position:fixed;background-position:center center;background-repeat:no-repeat;background-size:cover;width:100%;height:100vh;overflow:hidden}",
  map: null
};
const Desktop = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const config = {
    background: "/media/learningenvironment/backgrounds/Background_01_BeAware.svg"
  };
  $$result.css.add(css$4);
  return `<section class="bg svelte-1n1g92y" style="${"background-image:url(" + escape(config.background, true) + ")"}">${slots.default ? slots.default({}) : ``} </section>`;
});
let format$1 = "HH:mm";
const Time = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentTime = dayjs().format(format$1);
  return `<span class="text-base-100">${escape(currentTime)}</span>`;
});
let format = "ddd D MMMM";
const Date$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let currentDate = dayjs().format(format);
  let timeoutId;
  onDestroy(() => {
    clearTimeout(timeoutId);
  });
  return `<div class="dropdown"><div tabindex="0" role="button" class="text-base-100 btn btn-ghost"><span class="text-base-100">${escape(currentDate)}</span></div>  <ul class="menu bg-base-200 w-56 rounded-box dropdown-content z-10" data-svelte-h="svelte-129unj2"><li class="menu-title">Zeit und Datum</li> <li><a>Item 1</a></li> <li><a>Item 2</a></li> <li><a>Item 3</a></li></ul></div>`;
});
const Profile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="dropdown dropdown-end" data-svelte-h="svelte-1k23pbl"><div tabindex="0" role="button" class="text-base-100 btn btn-ghost">Christian</div> <ul class="menu bg-base-200 w-56 rounded-box dropdown-content z-10"><li class="menu-title">Profile</li> <li><a>Item 1</a></li> <li><details open><summary>Auswertung</summary> <ul><li><a>Collection-ID 1</a></li> <li><a>Collection-ID 2</a></li></ul></details></li> <li><a>Item 3</a></li></ul></div>`;
});
const WLAN = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="dropdown dropdown-end" data-svelte-h="svelte-3dbn8b"><div tabindex="0" role="button" class="text-base-100 btn btn-ghost"><span class="text-base-100"><i class="fas fa-wifi"></i></span></div>  <ul class="menu bg-base-200 w-56 rounded-box dropdown-content z-10"><li class="menu-title">WLAN</li> <li><a>Item 1</a></li> <li><a>Item 2</a></li> <li><a>Item 3</a></li></ul></div>`;
});
let powerPercent = 84;
const Battery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const powerLevel = ["full", "half", "quarter", "empty"].reverse();
  let step = 0;
  return `<div class="dropdown dropdown-end"><div tabindex="0" role="button" class="text-base-100 btn btn-ghost"><span class="flex items-center text-base-100 gap-2">${escape(powerPercent)}%
            <i class="${"fal fa-2x fa-battery-" + escape(powerLevel[step], true)}"></i></span></div>  <ul class="menu bg-base-200 w-56 rounded-box dropdown-content z-10" data-svelte-h="svelte-1py0hqv"><li class="menu-title">Power</li> <li><a>Item 1</a></li> <li><a>Item 2</a></li> <li><a>Item 3</a></li></ul></div>`;
});
const Top = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="flex flex-row pt-2 pl-2 pb-2 pr-2"><div class="flex flex-1 items-center gap-4">${validate_component(Time, "Time").$$render($$result, {}, {}, {})} ${validate_component(Date$1, "Date").$$render($$result, {}, {}, {})}</div> <div class="flex flex-none items-center gap-2">${validate_component(Profile, "Profile").$$render($$result, {}, {}, {})} ${validate_component(WLAN, "WLAN").$$render($$result, {}, {}, {})} ${validate_component(Battery, "Battery").$$render($$result, {}, {}, {})}</div></div>`;
});
const APPS_PER_PAGE = 15;
const APP_STATE = {
  CLOSED: 0,
  OPEN: 1,
  MINIMIZED: 2,
  MAXIMIZED: 3
};
function createGlobalStore() {
  const { update, subscribe: subscribe2 } = writable({
    config: {
      apps: {
        "1234": {
          id: "1234",
          title: "PHedge",
          icon: "phedge",
          program: types.BROWSER,
          badge: 0,
          target: null,
          state: APP_STATE.CLOSED,
          opened: null,
          isResizing: false,
          width: 0,
          height: 0
        },
        "2345": {
          id: "2345",
          title: "PHmail",
          icon: "mail",
          program: types.MAIL,
          badge: 2,
          target: null,
          state: APP_STATE.CLOSED,
          opened: null,
          isResizing: false,
          width: 0,
          height: 0
        },
        "3456": {
          id: "3456",
          title: "Datenschutz Allgemein",
          icon: "quiz",
          program: types.LEARNINGUNIT,
          badge: 15,
          target: null,
          state: APP_STATE.CLOSED,
          opened: null,
          isResizing: false,
          width: 0,
          height: 0
        },
        "4567": {
          id: "4567",
          title: "WiMA",
          icon: "quiz",
          program: types.LEARNINGUNIT,
          badge: 4,
          target: null,
          state: APP_STATE.CLOSED,
          opened: null,
          isResizing: false,
          width: 0,
          height: 0
        },
        "5678": {
          id: "5678",
          title: "Resultate",
          icon: "stats",
          program: types.LEARNINGUNIT,
          badge: 4,
          target: null,
          state: APP_STATE.CLOSED,
          opened: null,
          isResizing: false,
          width: 0,
          height: 0
        },
        "6789": {
          id: "6789",
          title: "Main",
          icon: "main",
          program: types.LEARNINGUNIT,
          badge: 4,
          target: null,
          state: APP_STATE.CLOSED,
          opened: null,
          isResizing: false,
          width: 0,
          height: 0
        }
      }
    },
    currentApp: {}
  });
  function setCurrentApp(id, appwindow) {
    update((state) => {
      state.config.apps[id].target = appwindow;
      state.currentApp = state.config.apps[id];
      return { ...state };
    });
  }
  function setAppResizing(isResizing, w, h) {
    update((state) => {
      state.currentApp.isResizing = isResizing;
      state.currentApp.width = w;
      state.currentApp.height = h;
      return { ...state };
    });
  }
  function setAppDimensions(w, h) {
    update((state) => {
      state.currentApp.width = w;
      state.currentApp.height = h;
      return { ...state };
    });
  }
  function setAppState(id, appstate) {
    update((state) => {
      state.config.apps[id].state = appstate;
      if (appstate === APP_STATE.OPEN) {
        state.config.apps[id].opened = (/* @__PURE__ */ new Date()).getTime();
      }
      if (appstate === APP_STATE.CLOSED || appstate === APP_STATE.MINIMIZED) {
        const openApps = Object.values(state.config.apps).filter((app) => app.state === APP_STATE.OPEN);
        const len = openApps.length;
        if (len > 0) {
          setTimeout(function() {
            setCurrentApp(openApps[len - 1].id, openApps[len - 1].target);
          });
        }
      }
      return { ...state };
    });
  }
  function minimizeAllOpenApps() {
    update((state) => {
      Object.values(state.config.apps).forEach((app) => {
        if (app.state === APP_STATE.OPEN) {
          setAppState(app.id, APP_STATE.MINIMIZED);
        }
      });
      return { ...state };
    });
  }
  function openAllMinimizedApps() {
    update((state) => {
      Object.values(state.config.apps).forEach((app) => {
        if (app.state === APP_STATE.MINIMIZED) {
          setAppState(app.id, APP_STATE.OPEN);
        }
      });
      return { ...state };
    });
  }
  return {
    subscribe: subscribe2,
    setCurrentApp,
    setAppState,
    setAppResizing,
    setAppDimensions,
    minimizeAllOpenApps,
    openAllMinimizedApps
  };
}
const globalStore = createGlobalStore();
const css$3 = {
  code: '.mockup-window.svelte-12zxj86.svelte-12zxj86{padding:0px !important}.mockup-window.svelte-12zxj86.svelte-12zxj86::before{content:none !important}.mac-window.svelte-12zxj86 .title-bar.svelte-12zxj86{width:100%;clear:both;padding-top:0.5rem;display:flex}.mac-window.svelte-12zxj86 .title-bar .buttons.svelte-12zxj86{height:100%;width:61px;float:left;margin-left:9px}.mac-window.svelte-12zxj86 .title-bar .buttons .close.svelte-12zxj86,.mac-window.svelte-12zxj86 .title-bar .buttons .maximize.svelte-12zxj86,.mac-window.svelte-12zxj86 .title-bar .buttons .minimize.svelte-12zxj86{float:left;height:15px;width:15px;border-radius:50%;margin-top:5px;background:#fb4948;border:1px solid rgba(214, 46, 48, 0.15);position:relative}.mac-window.svelte-12zxj86 .title-bar .buttons .close.svelte-12zxj86:before,.mac-window.svelte-12zxj86 .title-bar .buttons .maximize.svelte-12zxj86:before,.mac-window.svelte-12zxj86 .title-bar .buttons .minimize.svelte-12zxj86:before{content:"";position:absolute;height:1px;width:8px;background:#360000;top:50%;left:50%;transform:translateY(-50%) translateX(-50%) rotate(45deg);opacity:0}.mac-window.svelte-12zxj86 .title-bar .buttons .close.svelte-12zxj86:after,.mac-window.svelte-12zxj86 .title-bar .buttons .maximize.svelte-12zxj86:after,.mac-window.svelte-12zxj86 .title-bar .buttons .minimize.svelte-12zxj86:after{content:"";position:absolute;height:1px;width:8px;background:#360000;top:50%;left:50%;transform:translateY(-50%) translateX(-50%) rotate(-45deg);opacity:0}.mac-window.svelte-12zxj86 .title-bar .buttons .minimize.svelte-12zxj86{background:#fdb225;margin-left:8.5px;border-color:rgba(213, 142, 27, 0.15);position:relative}.mac-window.svelte-12zxj86 .title-bar .buttons .minimize.svelte-12zxj86:before{content:"";position:absolute;height:1px;width:8px;background:#864502;top:50%;left:50%;transform:translateY(-50%) translateX(-50%)}.mac-window.svelte-12zxj86 .title-bar .buttons .minimize.svelte-12zxj86:after{display:none}.mac-window.svelte-12zxj86 .title-bar .buttons .maximize.svelte-12zxj86{float:right;background:#2ac833;border-color:rgba(30, 159, 32, 0.15)}.mac-window.svelte-12zxj86 .title-bar .buttons .maximize.svelte-12zxj86:before{width:6px;height:6px;background:#0b5401;transform:translateY(-50%) translateX(-50%);border:1px solid #2ac833;border-radius:2px}.mac-window.svelte-12zxj86 .title-bar .buttons .maximize.svelte-12zxj86:after{width:10px;height:2px;background:#2ac833;transform:translateY(-50%) translateX(-50%) rotate(45deg)}.mac-window.svelte-12zxj86 .title-bar .buttons:hover .close.svelte-12zxj86:after,.mac-window.svelte-12zxj86 .title-bar .buttons:hover .close.svelte-12zxj86:before,.mac-window.svelte-12zxj86 .title-bar .buttons:hover .maximize.svelte-12zxj86:after,.mac-window.svelte-12zxj86 .title-bar .buttons:hover .maximize.svelte-12zxj86:before,.mac-window.svelte-12zxj86 .title-bar .buttons:hover .minimize.svelte-12zxj86:after,.mac-window.svelte-12zxj86 .title-bar .buttons:hover .minimize.svelte-12zxj86:before{opacity:1}.mac-window.svelte-12zxj86 .title-bar .title.svelte-12zxj86{margin:0 auto}',
  map: null
};
let startWidth = 1100;
let startHeight = 600;
const AppWindow = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let openFullscreenApp;
  let minimized;
  let isForeground;
  let dimensions;
  let isMeResizing;
  let $globalStore, $$unsubscribe_globalStore;
  $$unsubscribe_globalStore = subscribe(globalStore, (value) => $globalStore = value);
  let { id } = $$props;
  let { state = APP_STATE.CLOSED } = $$props;
  let { icon } = $$props;
  let { title } = $$props;
  let { component } = $$props;
  let isrealmobilebrowser = isRealMobileBrowser();
  let appwindow = null;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.state === void 0 && $$bindings.state && state !== void 0)
    $$bindings.state(state);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.component === void 0 && $$bindings.component && component !== void 0)
    $$bindings.component(component);
  $$result.css.add(css$3);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    openFullscreenApp = state !== APP_STATE.CLOSED;
    {
      if (state === APP_STATE.OPEN) {
        globalStore.setCurrentApp(id, appwindow);
      }
    }
    minimized = state === APP_STATE.MINIMIZED;
    isForeground = $globalStore.currentApp.target === appwindow;
    dimensions = {
      w: $globalStore.currentApp.width ? $globalStore.currentApp.width : $globalStore.currentApp.target?.clientWidth,
      h: $globalStore.currentApp.height ? $globalStore.currentApp.height : $globalStore.currentApp.target?.clientHeight
    };
    isMeResizing = $globalStore.currentApp.target === appwindow && $globalStore.currentApp.isResizing;
    $$rendered = `${state !== APP_STATE.CLOSED && !isrealmobilebrowser ? `  <div class="${"mockup-window " + escape(minimized ? "hidden" : "", true) + " mac-window fixed top-4 left-8 border border-base-300 bg-base-200 " + escape(isForeground ? "shadow-lg" : "", true) + " svelte-12zxj86"}" style="${"width:" + escape(startWidth, true) + "px;height:" + escape(startHeight, true) + "px;z-index:" + escape(isForeground ? "999999" : "30", true) + ";"}"${add_attribute("this", appwindow, 0)}> ${!isForeground ? `<div class="absolute w-full h-full top-0 left-0 z-50"></div>` : ``} <div class="title-bar svelte-12zxj86"><div class="buttons svelte-12zxj86"><div class="close svelte-12zxj86"></div> <div class="minimize svelte-12zxj86"></div> <div class="maximize svelte-12zxj86"></div></div> <div class="title svelte-12zxj86">${escape(title)}</div> <div class="pr-4">${validate_component(AppIcon, "AppIcon").$$render($$result, { icon, width: 8, opacity: 80 }, {}, {})}</div></div> ${isMeResizing ? `<div class="absolute top-0 left-0 w-full h-full z-20 flex items-center justify-center flex-col bg-opacity-75 bg-base-100"><p class="text-lg">${escape(dimensions.w)}px x ${escape(dimensions.h)}px</p></div>` : ``} ${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>` : ``} ${state !== APP_STATE.CLOSED && isrealmobilebrowser ? `${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        fullscreen: true,
        open: openFullscreenApp
      },
      {
        open: ($$value) => {
          openFullscreenApp = $$value;
          $$settled = false;
        }
      },
      {
        body: () => {
          return `<div class="h-[100vh]" slot="body">${validate_component(component || missing_component, "svelte:component").$$render($$result, {}, {}, {})}</div>`;
        },
        header: () => {
          return `<div class="navbar bg-base-100" slot="header"><div class="flex-1"> <a class="font-bold text-xl pl-4">${validate_component(AppIcon, "AppIcon").$$render($$result, { icon, width: 8, opacity: 80 }, {}, {})}</a></div>   <div class="flex-none gap-2" data-svelte-h="svelte-1ddd538"><div class="btn btn-circle btn-ghost"><i class="fal fa-times"></i></div></div></div>`;
        }
      }
    )}` : ``}`;
  } while (!$$settled);
  $$unsubscribe_globalStore();
  return $$rendered;
});
const css$2 = {
  code: ".badge.svelte-1flgbg1.svelte-1flgbg1{background:#eb4f3e;border:none;color:#fff;font-size:18px}.app-icon.svelte-1flgbg1.svelte-1flgbg1{-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;width:var(--appiconsize);height:var(--appiconsize);background:rgba(255, 255, 255, 1);background-size:cover;border-radius:20%;position:relative;transition:all 0.2s ease-in-out}.app-icon.svelte-1flgbg1.svelte-1flgbg1:hover{transform:scale(1.1)}.app-icon.svelte-1flgbg1.svelte-1flgbg1:before{content:var(--installed);display:block;width:100%;height:100%;background:rgba(0, 0, 0, 0.4);position:absolute;border-radius:20%;opacity:0;animation:svelte-1flgbg1-app-icon-fade-in 400ms 600ms ease-out forwards,\n            svelte-1flgbg1-app-icon-fade-out 300ms var(--progressdurationplustwo) ease-in\n                forwards}@keyframes svelte-1flgbg1-app-icon-fade-in{from{opacity:0}to{opacity:1}}@keyframes svelte-1flgbg1-app-icon-fade-out{from{opacity:1}to{opacity:0}}.app-icon.svelte-1flgbg1 .progress.svelte-1flgbg1{opacity:var(--progressopacity);position:relative;width:70%;height:70%;top:15%;left:15%;border-radius:100%;box-shadow:inset 0 0 0 4px var(--progressfillcolor);transform:rotate(-90deg);opacity:0;animation:svelte-1flgbg1-progress-start 400ms 600ms ease-out forwards,\n            svelte-1flgbg1-progress-leave 300ms var(--progressdurationplustwo) ease-in forwards}@keyframes svelte-1flgbg1-progress-start{from{transform:scale(0.3) rotate(-90deg);box-shadow:inset 0 0 0 12px var(--progressfillcolor);opacity:0}to{transform:scale(1) rotate(-90deg);box-shadow:inset 0 0 0 4px var(--progressfillcolor);opacity:var(--progressopacity)}}@keyframes svelte-1flgbg1-progress-leave{from{opacity:var(--progressopacity);transform:rotate(-90deg)}to{opacity:0;transform:scale(3) rotate(-90deg)}}svg.svelte-1flgbg1.svelte-1flgbg1{width:100px;height:100px;transform:scale(calc(var(--appiconsizeunitless) / 143));transform-origin:top left}svg.svelte-1flgbg1 circle.svelte-1flgbg1{stroke:white;animation:svelte-1flgbg1-progress-circle 10s 2s linear forwards,\n            svelte-1flgbg1-progress-leave 300ms 13s linear;opacity:0.6}@keyframes svelte-1flgbg1-progress-circle{from{stroke-dasharray:360;stroke-dashoffset:360}to{stroke-dasharray:540;stroke-dashoffset:360}}",
  map: null
};
const progressFillColor = "white";
const progressOpacity = 0.9;
const App = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let app;
  let $breakpoint, $$unsubscribe_breakpoint;
  let $globalStore, $$unsubscribe_globalStore;
  $$unsubscribe_breakpoint = subscribe(breakpoint, (value) => $breakpoint = value);
  $$unsubscribe_globalStore = subscribe(globalStore, (value) => $globalStore = value);
  let { installed = true } = $$props;
  let { id } = $$props;
  let appIconSize = 100;
  let appBadgeSize = appIconSize * 29 / 100;
  const progressDuration = installed ? 0 : 10;
  function setAppIconSize(breakpoint2) {
    if (breakpoint2.isSm)
      appIconSize = 70;
    else if (breakpoint2.isMd)
      appIconSize = 90;
    else if (breakpoint2.isLg)
      appIconSize = 110;
    else if (breakpoint2.isXl)
      appIconSize = 140;
    else if (breakpoint2.is2Xl)
      appIconSize = 150;
    else
      appIconSize = 170;
  }
  if ($$props.installed === void 0 && $$bindings.installed && installed !== void 0)
    $$bindings.installed(installed);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$2);
  app = $globalStore.config.apps[id] || {};
  {
    setAppIconSize($breakpoint);
  }
  $$unsubscribe_breakpoint();
  $$unsubscribe_globalStore();
  return `${validate_component(AppWindow, "AppWindow").$$render(
    $$result,
    {
      component: app.component,
      state: app.state,
      title: app.title,
      icon: app.icon,
      id: app.id
    },
    {},
    {}
  )}    <div class="indicator items-center mb-[1rem] mt-[1rem]" style="${"padding:" + escape($breakpoint.isSm ? 0 : 1, true) + "rem"}"><div class="app-icon svelte-1flgbg1" style="${"--appiconsize:" + escape(appIconSize, true) + "px; --installed:" + escape(installed ? "" : "'", true) + "; --appiconsizeunitless:" + escape(appIconSize, true) + "; --progressopacity:" + escape(progressOpacity, true) + "; --progressfillcolor:" + escape(progressFillColor, true) + "; --progressdurationplustwo:" + escape(progressDuration + 2, true) + "s; --progressdurationplusthree:" + escape(progressDuration + 3, true) + "s;"}">${!installed ? `<div class="progress z-10 svelte-1flgbg1" data-svelte-h="svelte-kqegbw"><svg class="svelte-1flgbg1"><circle cx="50" cy="50" r="25" fill="transparent" stroke-width="50" stroke-dasharray="360" stroke-dashoffset="360" class="svelte-1flgbg1"></circle></svg></div>` : ``} <div class="absolute top-0 left-0 p-1">${validate_component(AppIcon, "AppIcon").$$render($$result, { icon: app.icon }, {}, {})} <p class="text-base-100 mt-2">${escape(app.title)}</p></div> ${app.badge > 0 ? `<span class="w-10 h-10 indicator-item badge svelte-1flgbg1" style="${"width:" + escape(appBadgeSize, true) + "px;height:" + escape(appBadgeSize, true) + "px;"}">${escape(app.badge)}</span>` : ``}</div> </div>`;
});
const Moveable$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  createEventDispatcher();
  let moveableElement;
  let moveable;
  onDestroy(() => {
  });
  function getInstance() {
    return moveable;
  }
  if ($$props.getInstance === void 0 && $$bindings.getInstance && getInstance !== void 0)
    $$bindings.getInstance(getInstance);
  return `<div${add_attribute("this", moveableElement, 0)}></div>`;
});
const Moveable$2 = Moveable$1;
const Moveable = /* @__PURE__ */ (() => {
  const prototype = Moveable$2.prototype;
  if (!prototype) {
    return Moveable$2;
  }
  METHODS.forEach((name) => {
    prototype[name] = function(...args) {
      const self = this.getInstance();
      const result = self[name](...args);
      if (result === self) {
        return this;
      } else {
        return result;
      }
    };
  });
  return Moveable$2;
})();
const css$1 = {
  code: ".page-nav.svelte-x5226g.svelte-x5226g{margin:0 auto;background:rgba(255, 255, 255, 0.5)}.page-nav.svelte-x5226g .badge.svelte-x5226g{border:white;border:none;background:rgba(255, 255, 255, 0.5)}.page-nav.svelte-x5226g .active.svelte-x5226g{background:rgba(255, 255, 255, 1)}.moveable-line{display:none !important}",
  map: null
};
const Surface = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $globalStore, $$unsubscribe_globalStore;
  $$unsubscribe_globalStore = subscribe(globalStore, (value) => $globalStore = value);
  let config = $globalStore.config;
  let apps = Object.keys(config.apps);
  const pages = new Array(Math.ceil(apps.length / APPS_PER_PAGE));
  let currentPage = 0;
  let carousel;
  function getAppsForPage(page) {
    return apps.slice(page * APPS_PER_PAGE, page * APPS_PER_PAGE + APPS_PER_PAGE);
  }
  $$result.css.add(css$1);
  $$unsubscribe_globalStore();
  return `${$globalStore.currentApp.state === APP_STATE.OPEN ? `${validate_component(Moveable, "Moveable").$$render(
    $$result,
    {
      target: $globalStore.currentApp.target,
      draggable: true,
      throttleDrag: 1,
      resizable: true,
      throttleResize: 1,
      bounds: {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        position: "css",
        minWidth: 100,
        minHeight: 100
      },
      renderDirections: ["nw", "ne", "sw", "se"],
      minWidth: 100
    },
    {},
    {}
  )}` : ``} <section class="p-8 flex flex-col"><div class="carousel rounded-box w-full"${add_attribute("this", carousel, 0)}>${each(pages, (_, index) => {
    return `<div class="carousel-item w-full"><div class="grid grid-cols-4 grid-rows-4 lg:grid-cols-5 lg:grid-rows-3 w-full items-baseline text-center">${each(getAppsForPage(index), (id) => {
      return `<div>${validate_component(App, "App").$$render($$result, { id }, {}, {})} </div>`;
    })}</div> </div>`;
  })}</div> ${pages.length > 1 ? `<div class="page-nav rounded-full bg-base-100 flex p-2 gap-2 svelte-x5226g">${each(pages, (_, index) => {
    return `<div class="${"badge badge-xs " + escape(currentPage === index ? "active" : "", true) + " svelte-x5226g"}"></div>`;
  })}</div>` : ``} </section>`;
});
const css = {
  code: ".appwindow-bar.svelte-12rfyhz{position:absolute;background-color:rgba(255, 255, 255, 0.5);background-image:linear-gradient(180deg, #91e7db, #505a78);margin:0 auto;bottom:5px;left:0;right:0}.app-icon.svelte-12rfyhz{-webkit-user-select:none;-moz-user-select:none;user-select:none;cursor:pointer;width:5vmax;height:5vmax;background:rgba(255, 255, 255, 1);background-size:cover;border-radius:20%;position:relative;transition:all 0.2s ease-in-out}.puff-in-center.svelte-12rfyhz{animation:svelte-12rfyhz-puff-in-center 0.3s cubic-bezier(0.47, 0, 0.745, 0.715) both}@keyframes svelte-12rfyhz-puff-in-center{0%{transform:scale(2);filter:blur(4px);opacity:0}100%{transform:scale(1);filter:blur(0);opacity:1}}",
  map: null
};
const AppWindowManager = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let minimizedapps;
  let irmb;
  let dockWidth;
  let $t, $$unsubscribe_t;
  let $globalStore, $$unsubscribe_globalStore;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  $$unsubscribe_globalStore = subscribe(globalStore, (value) => $globalStore = value);
  $$result.css.add(css);
  minimizedapps = Object.values($globalStore.config.apps).filter((app) => app.state !== APP_STATE.CLOSED).sort((a, b) => a.opened - b.opened);
  irmb = isRealMobileBrowser();
  $t("lenv.minimizeall");
  dockWidth = minimizedapps.length * 7.5;
  $$unsubscribe_t();
  $$unsubscribe_globalStore();
  return `${minimizedapps.length > 0 && !irmb ? ` <div class="appwindow-bar flex gap-2 items-center text-center justify-center rounded-badge p-3 bg-base-300 min-w-[17%] max-w-[80%] svelte-12rfyhz" style="${"width:" + escape(dockWidth, true) + "%"}">${``} ${each(minimizedapps, (app) => {
    return `  <div class="app-icon puff-in-center svelte-12rfyhz">${validate_component(AppIcon, "AppIcon").$$render($$result, { icon: app.icon, opacity: 80 }, {}, {})} </div>`;
  })}</div>` : ``}`;
});
const Bottom = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(AppWindowManager, "AppWindowManager").$$render($$result, {}, {}, {})}`;
});
const Learningenvironment = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Desktop, "Desktop").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Top, "Top").$$render($$result, {}, {}, {})} ${validate_component(Surface, "Surface").$$render($$result, {}, {}, {})} ${validate_component(Bottom, "Bottom").$$render($$result, {}, {}, {})}`;
    }
  })}`;
});
const AppIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { icon = "default" } = $$props;
  let { width } = $$props;
  let { opacity = 100 } = $$props;
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0)
    $$bindings.width(width);
  if ($$props.opacity === void 0 && $$bindings.opacity && opacity !== void 0)
    $$bindings.opacity(opacity);
  icon = icon ? icon : "default";
  return `<img class="${escape(width ? "w-" + width : "w-full", true) + " h-full inline-block"}" style="${"opacity: " + escape(opacity / 100, true)}" src="${"/media/learningenvironment/appicons/" + escape(icon, true) + ".svg"}" alt="appicon">`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Learningenvironment, "LearningEnvironment").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
