import { s as subscribe } from "./hooks.server.js";
import { c as create_ssr_component, e as escape, v as validate_component } from "./ssr.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import { w as writable } from "./index3.js";
import { e as t } from "./index2.js";
import "./MS365Login.svelte_svelte_type_style_lang.js";
function createEditorStore(store2) {
  const { subscribe: subscribe2, update, set } = writable(store2);
  return {
    subscribe: subscribe2,
    set,
    setTitle: (title) => update((state) => ({ ...state, title })),
    setQuiz: (quiz) => update((state) => ({ ...state, quiz })),
    setEditor: (editor) => update((state) => ({ ...state, editor })),
    setRVT: (rvt) => update((state) => ({ ...state, rvt })),
    resetQuiz: () => update((state) => ({ ...state, quiz: {} }))
  };
}
const store = createEditorStore({});
const messages = {
  START: "start",
  FINISHED: "finished"
};
const Casestudy = {
  // child to parent = receiver
  receiver: {
    init: (options) => {
    },
    start: (data) => {
      Casestudy.receiver._send({ cmd: messages.START, data });
    },
    finished: (data) => {
      Casestudy.receiver._send({ cmd: messages.FINISHED, data });
    },
    _send: (options) => {
      window.parent.postMessage(JSON.stringify(options), "*");
    }
  },
  // parent to child = sender
  sender: {
    init: (options) => {
    },
    _send: (options) => {
      const iframe = document.querySelector('iframe[data-is-cs-receiver="true"]');
      iframe.contentWindow.postMessage(JSON.stringify(options), "*");
    }
  }
};
function evalCasestudy(data) {
  return [{ points: 1 }];
}
const RVTTrigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let count;
  let h;
  let m;
  let s;
  let timePassed;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { time = 0 } = $$props;
  let scrolledToTheEnd = false;
  let interval;
  let now = 0;
  let end = 0;
  function reset() {
    now = 0;
    end = 0;
    timePassed = false;
    scrolledToTheEnd = false;
  }
  function checkFinished() {
    if (timePassed && scrolledToTheEnd) {
      const evaluation = evalCasestudy();
      Casestudy.receiver.finished(evaluation);
      clearInterval(interval);
    }
  }
  function updateTimer() {
    now = Date.now();
  }
  function handleTimer() {
    reset();
    now = Date.now();
    end = now + time * 1e3;
    interval = setInterval(updateTimer, 1e3);
  }
  if ($$props.time === void 0 && $$bindings.time && time !== void 0)
    $$bindings.time(time);
  count = Math.round((end - now) / 1e3);
  h = Math.floor(count / 3600);
  m = Math.floor((count - h * 3600) / 60);
  s = count - h * 3600 - m * 60;
  timePassed = count === 0;
  {
    if (timePassed) {
      clearInterval(interval);
      checkFinished();
    }
  }
  {
    handleTimer();
  }
  $$unsubscribe_t();
  return `<button disabled class="float-right mr-2 mb-2 rounded-full btn btn-secondary">${h > 0 ? `${escape(h)}${escape($t("lunit.time.hoursShort"))}` : ``} ${m > 0 ? `${escape(m)}${escape($t("lunit.time.minutesShort"))}` : ``} ${s > 0 ? `${escape(s)}${escape($t("lunit.time.secondsShort"))}` : ``} ${escape($t("lunit.next"))}</button>`;
});
const PlainEditor = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_t;
  let $store, $$unsubscribe_store;
  $$unsubscribe_t = subscribe(t, (value) => value);
  $$unsubscribe_store = subscribe(store, (value) => $store = value);
  let { readOnly = false } = $$props;
  let loaded = false;
  if ($$props.readOnly === void 0 && $$bindings.readOnly && readOnly !== void 0)
    $$bindings.readOnly(readOnly);
  $$unsubscribe_t();
  $$unsubscribe_store();
  return `<div><div id="editorjs" class="pt-24"></div> ${readOnly && loaded ? `${validate_component(RVTTrigger, "RVTTrigger").$$render($$result, { time: $store.rvt }, {}, {})}` : ``}</div>`;
});
export {
  PlainEditor as P,
  store as s
};
