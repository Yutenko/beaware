import { f as set_current_component, h as current_component, c as create_ssr_component, a as add_attribute, e as escape, v as validate_component, d as each, b as createEventDispatcher } from "../../../../../chunks/ssr.js";
import { n as noop, r as run_all, s as subscribe, d as assign, e as identity } from "../../../../../chunks/hooks.server.js";
import "../../../../../chunks/MS365Login.svelte_svelte_type_style_lang.js";
import { e as t } from "../../../../../chunks/index2.js";
import { P as POSITIONS, M as MIN_GROUPS, a as MAX_GROUPS, b as MAX_ELEMENTS } from "../../../../../chunks/constants.js";
import "devalue";
import "../../../../../chunks/client.js";
import "@editorjs/header";
import "@editorjs/quote";
import "@editorjs/warning";
import "@editorjs/paragraph";
import "@editorjs/delimiter";
import "@editorjs/list";
import "@editorjs/table";
import "@editorjs/marker";
import { p as page } from "../../../../../chunks/stores.js";
import { M as Modal } from "../../../../../chunks/Modal.js";
import "dayjs";
import { w as writable } from "../../../../../chunks/index3.js";
import { t as types } from "../../../../../chunks/types.js";
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0)
    raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0)
    raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
const Hint = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { mode = "available" } = $$props;
  let { content = "" } = $$props;
  let { timesAssigned = 0 } = $$props;
  let hintElement;
  if (mode.always)
    ;
  else if (mode.smart)
    ;
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.timesAssigned === void 0 && $$bindings.timesAssigned && timesAssigned !== void 0)
    $$bindings.timesAssigned(timesAssigned);
  {
    if (mode.smart && timesAssigned > 2) {
      hintElement._tippy.show();
    }
  }
  return `<button class="btn btn-circle btn-xs btn-outline btn-info absolute top-2 left-2"${add_attribute("this", hintElement, 0)} data-svelte-h="svelte-1u6buej"><i class="far fa-info"></i></button>`;
});
const css$4 = {
  code: ".ifb.svelte-1x1kfmk{top:-7px;margin:0 auto;z-index:2}",
  map: null
};
const IndividualFeedback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let button;
  let { content } = $$props;
  let { activate = false } = $$props;
  if ($$props.content === void 0 && $$bindings.content && content !== void 0)
    $$bindings.content(content);
  if ($$props.activate === void 0 && $$bindings.activate && activate !== void 0)
    $$bindings.activate(activate);
  $$result.css.add(css$4);
  {
    if (activate && button) {
      button._tippy.show();
      const to = setTimeout(
        () => {
          button._tippy.hide();
          clearTimeout(to);
        },
        1e3
      );
    }
  }
  return `${activate ? `<button class="btn btn-circle btn-xs btn-outline btn-info absolute ifb left-0 right-0 svelte-1x1kfmk"${add_attribute("this", button, 0)} data-svelte-h="svelte-uit58s"></button>` : ``}`;
});
const css$3 = {
  code: "@keyframes svelte-hk53f5-shrink{0%{transform:scale(1);opacity:1}100%{transform:scale(0.1);opacity:0}}@keyframes svelte-hk53f5-move-shrink{0%{transform-origin:50% 50%}100%{transform-origin:0% 0%}}.shrink.svelte-hk53f5{animation:svelte-hk53f5-move-shrink 0.5s forwards,\n            svelte-hk53f5-shrink 0.5s forwards}@keyframes svelte-hk53f5-grow{0%{transform:scale(0.1);opacity:0}100%{transform:scale(1);opacity:1}}@keyframes svelte-hk53f5-move-grow{0%{transform-origin:0% 0%}100%{transform-origin:50% 50%}}.grow.svelte-hk53f5{animation:svelte-hk53f5-move-grow 0.5s forwards,\n            svelte-hk53f5-grow 0.5s forwards}",
  map: null
};
const Task = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let dialog;
  let { title = "" } = $$props;
  let { task = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.task === void 0 && $$bindings.task && task !== void 0)
    $$bindings.task(task);
  $$result.css.add(css$3);
  $$unsubscribe_t();
  return `<button class="btn btn-outline btn-xs absolute top-4 left-4 rounded-full" style="${"opacity: " + escape(0, true) + "; transition: opacity 0.65s;z-index: 9999999999999999"}">${escape($t("quiz.task"))}</button>    <dialog class="${"modal " + escape("grow", true) + " svelte-hk53f5"}"${add_attribute("this", dialog, 0)}> <div class="modal-box"><h3 class="font-bold text-lg">${escape(title)}</h3> <div><p class="py-4"><!-- HTML_TAG_START -->${task}<!-- HTML_TAG_END --></p> <div class="relative"></div></div> <div class="modal-action" style="justify-content:center;"><form method="dialog"><button class="btn btn-primary">${escape($t("core.close"))}</button></form></div></div> </dialog>`;
});
const CheckButton = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let visible;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { mode = {} } = $$props;
  let { finished = false } = $$props;
  let { assignedElementsCount = 0 } = $$props;
  let checkButton;
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.finished === void 0 && $$bindings.finished && finished !== void 0)
    $$bindings.finished(finished);
  if ($$props.assignedElementsCount === void 0 && $$bindings.assignedElementsCount && assignedElementsCount !== void 0)
    $$bindings.assignedElementsCount(assignedElementsCount);
  visible = mode.free || mode.exam && finished;
  {
    if (assignedElementsCount && mode.instant) {
      checkButton.click();
    } else if (finished && mode.end) {
      checkButton.click();
    }
  }
  $$unsubscribe_t();
  return `<button class="${"btn btn-active btn-primary absolute bottom-4 right-0 left-0 ml-auto mr-auto w-fit rounded-full " + escape(visible ? "block" : "hidden", true)}" style="z-index: 9999999999999999"${add_attribute("this", checkButton, 0)}>${escape($t("quiz.checkSolution"))}</button>`;
});
function is_date(obj) {
  return Object.prototype.toString.call(obj) === "[object Date]";
}
function cubicOut(t2) {
  const f = t2 - 1;
  return f * f * f + 1;
}
function get_interpolator(a, b) {
  if (a === b || a !== a)
    return () => a;
  const type = typeof a;
  if (type !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error("Cannot interpolate values of different type");
  }
  if (Array.isArray(a)) {
    const arr = b.map((bi, i) => {
      return get_interpolator(a[i], bi);
    });
    return (t2) => arr.map((fn) => fn(t2));
  }
  if (type === "object") {
    if (!a || !b)
      throw new Error("Object cannot be null");
    if (is_date(a) && is_date(b)) {
      a = a.getTime();
      b = b.getTime();
      const delta = b - a;
      return (t2) => new Date(a + t2 * delta);
    }
    const keys = Object.keys(b);
    const interpolators = {};
    keys.forEach((key) => {
      interpolators[key] = get_interpolator(a[key], b[key]);
    });
    return (t2) => {
      const result = {};
      keys.forEach((key) => {
        result[key] = interpolators[key](t2);
      });
      return result;
    };
  }
  if (type === "number") {
    const delta = b - a;
    return (t2) => a + t2 * delta;
  }
  throw new Error(`Cannot interpolate ${type} values`);
}
function tweened(value, defaults = {}) {
  const store = writable(value);
  let task;
  let target_value = value;
  function set(new_value, opts) {
    if (value == null) {
      store.set(value = new_value);
      return Promise.resolve();
    }
    target_value = new_value;
    let previous_task = task;
    let started = false;
    let {
      delay = 0,
      duration = 400,
      easing = identity,
      interpolate = get_interpolator
    } = assign(assign({}, defaults), opts);
    if (duration === 0) {
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      store.set(value = target_value);
      return Promise.resolve();
    }
    const start = now() + delay;
    let fn;
    task = loop((now2) => {
      if (now2 < start)
        return true;
      if (!started) {
        fn = interpolate(value, new_value);
        if (typeof duration === "function")
          duration = duration(value, new_value);
        started = true;
      }
      if (previous_task) {
        previous_task.abort();
        previous_task = null;
      }
      const elapsed = now2 - start;
      if (elapsed > /** @type {number} */
      duration) {
        store.set(value = new_value);
        return false;
      }
      store.set(value = fn(easing(elapsed / duration)));
      return true;
    });
    return task.promise;
  }
  return {
    set,
    update: (fn, opts) => set(fn(target_value, value), opts),
    subscribe: store.subscribe
  };
}
const css$2 = {
  code: ".progress.svelte-1pxpcqo{position:absolute !important}.center.svelte-1pxpcqo{position:absolute;top:20%;left:50%;transform:translate(-50%, -50%);padding:10px}",
  map: null
};
const Feedback = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let progressPercent;
  let $progress, $$unsubscribe_progress;
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { solved } = $$props;
  let { feedbacks } = $$props;
  let { result } = $$props;
  let dialog;
  let feedback;
  const progress = tweened(0, { duration: 800, easing: cubicOut });
  $$unsubscribe_progress = subscribe(progress, (value) => $progress = value);
  if ($$props.solved === void 0 && $$bindings.solved && solved !== void 0)
    $$bindings.solved(solved);
  if ($$props.feedbacks === void 0 && $$bindings.feedbacks && feedbacks !== void 0)
    $$bindings.feedbacks(feedbacks);
  if ($$props.result === void 0 && $$bindings.result && result !== void 0)
    $$bindings.result(result);
  $$result.css.add(css$2);
  progressPercent = parseInt($progress * 100);
  $$unsubscribe_progress();
  $$unsubscribe_t();
  return `  ${solved && result > 49 ? `<div class="center svelte-1pxpcqo"></div>` : ``}   <dialog class="modal"${add_attribute("this", dialog, 0)}>  <div class="modal-box"> <article class="prose"> <h3 class="relative">${escape(feedback)}</h3> <div class="radial-progress progress svelte-1pxpcqo" style="${"--value:" + escape(progressPercent, true) + ";--thickness: 2px;--size: 3.5rem"}" role="progressbar">${escape(progressPercent)}%</div></article> <div class="modal-action"><form method="dialog"><button class="btn btn-primary">${escape($t("core.close"))}</button></form></div></div> </dialog>`;
});
const Ui_elements = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let assignedElementsCount;
  let finished;
  let result;
  let solved;
  let { type } = $$props;
  let { title = "" } = $$props;
  let { task = "" } = $$props;
  let { elements = [] } = $$props;
  let { mode = "free" } = $$props;
  let { feedbacks = {} } = $$props;
  let { onFeedbackClosed = () => {
  } } = $$props;
  let { checkSolution = () => {
  } } = $$props;
  if ($$props.type === void 0 && $$bindings.type && type !== void 0)
    $$bindings.type(type);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  if ($$props.task === void 0 && $$bindings.task && task !== void 0)
    $$bindings.task(task);
  if ($$props.elements === void 0 && $$bindings.elements && elements !== void 0)
    $$bindings.elements(elements);
  if ($$props.mode === void 0 && $$bindings.mode && mode !== void 0)
    $$bindings.mode(mode);
  if ($$props.feedbacks === void 0 && $$bindings.feedbacks && feedbacks !== void 0)
    $$bindings.feedbacks(feedbacks);
  if ($$props.onFeedbackClosed === void 0 && $$bindings.onFeedbackClosed && onFeedbackClosed !== void 0)
    $$bindings.onFeedbackClosed(onFeedbackClosed);
  if ($$props.checkSolution === void 0 && $$bindings.checkSolution && checkSolution !== void 0)
    $$bindings.checkSolution(checkSolution);
  assignedElementsCount = elements.filter((el) => typeof el.assigned !== "undefined").length;
  finished = assignedElementsCount === elements.length;
  result = finished ? elements.filter((el) => el.solved).length / elements.length * 100 : 0;
  solved = elements.filter((el) => typeof el.solved !== "undefined").length === elements.length;
  return `${validate_component(Task, "Task").$$render($$result, { title, task }, {}, {})} ${validate_component(CheckButton, "CheckButton").$$render($$result, { finished, assignedElementsCount, mode }, {}, {})} ${validate_component(Feedback, "Feedback").$$render($$result, { feedbacks, result, solved }, {}, {})}`;
});
const css$1 = {
  code: ".user-card.svelte-1yydgt2:hover .user-card-actions.svelte-1yydgt2,.group.svelte-1yydgt2:hover .group-actions.svelte-1yydgt2,.group.svelte-1yydgt2:hover .add-element.svelte-1yydgt2{display:block}.group-actions.svelte-1yydgt2.svelte-1yydgt2,.user-card-actions.svelte-1yydgt2.svelte-1yydgt2,.add-element.svelte-1yydgt2.svelte-1yydgt2{display:none}.edit-group.svelte-1yydgt2.svelte-1yydgt2{font-size:5vmin;word-break:break-word}",
  map: null
};
const GroupAssignment_Edit = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  let { gamestate } = $$props;
  let { id } = $$props;
  let openFileuploader = false;
  let openHintModal = false;
  let openFeedbackModal = false;
  let card = { width: 0, padding: 0 };
  let orientation;
  let oldOrientation;
  let groups = [];
  let elements = [];
  let isDragOverMe = Array(groups.length).fill(false);
  let zIndex = 0;
  let currentElement = {};
  let currentGroup;
  let currentActive;
  let isDragging = false;
  function updateGroups(g) {
    groups = groups;
    currentActive = g ? g : currentGroup;
  }
  function updateElements(el) {
    elements = elements;
    currentActive = el ? el : currentElement;
  }
  function onCloseFileuploader(data) {
    if (data) {
      const { url, type } = data;
      if (currentActive == currentGroup) {
        currentGroup.src = url;
        currentGroup.type = type;
        currentGroup.isEditing = false;
        updateGroups();
      } else if (currentActive == currentElement) {
        currentElement.src = url;
        currentElement.type = type;
        updateElements();
      }
    }
    openFileuploader = false;
  }
  function getCardPosition(group) {
    const background = document.querySelector("#group-" + group);
    const w = card.width;
    const h = 100;
    const maxX = background.clientWidth - w;
    const maxY = background.clientHeight - h;
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);
    return { x: randomX, y: randomY };
  }
  function distributeCards() {
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      const { x, y } = getCardPosition(element.group);
      element.x = x;
      element.y = y;
    }
    updateElements();
  }
  if ($$props.gamestate === void 0 && $$bindings.gamestate && gamestate !== void 0)
    $$bindings.gamestate(gamestate);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    {
      {
        orientation = "landscape";
        if (oldOrientation !== orientation) {
          tick().then(distributeCards);
        }
        oldOrientation = orientation;
      }
    }
    $$rendered = `  <span class="hidden grid-rows-1 grid-rows-2 grid-rows-3 col-span-3 col-span-4 col-span-6 col-span-12"></span> ${validate_component(FileUploader, "FileUploader").$$render(
      $$result,
      {
        handleClose: onCloseFileuploader,
        openFileuploader
      },
      {
        openFileuploader: ($$value) => {
          openFileuploader = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: openHintModal },
      {
        open: ($$value) => {
          openHintModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="btn btn-primary" slot="footer">${escape($t("core.close"))}</button>`;
        },
        body: () => {
          return `<div slot="body"><p class="py-4">${escape($t("quiz.addHintDescription"))}</p> <div class="relative"><input type="text" class="input input-bordered w-full pr-10"${add_attribute("value", currentElement.hint, 0)}> ${currentElement?.hint?.trim().length > 0 ? `  <div class="absolute right-2 btn btn-xs btn-circle btn-ghost mt-3" data-svelte-h="svelte-1c7v269"><i class="fal fa-times"></i></div>` : ``}</div></div>`;
        },
        header: () => {
          return `<h3 class="font-bold text-lg" slot="header">${escape($t("quiz.hint"))}</h3>`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      { open: openFeedbackModal },
      {
        open: ($$value) => {
          openFeedbackModal = $$value;
          $$settled = false;
        }
      },
      {
        footer: () => {
          return `<button class="btn btn-primary" slot="footer">${escape($t("core.close"))}</button>`;
        },
        body: () => {
          return `<div slot="body"><p class="py-4">${escape($t("quiz.feedback.description"))}</p> <div class="relative"><input type="text" class="input input-bordered w-full pr-10"${add_attribute("value", currentElement.feedback, 0)}> ${currentElement.feedback?.trim().length > 0 ? `  <div class="absolute right-2 btn btn-xs btn-circle btn-ghost mt-3" data-svelte-h="svelte-rw62dz"><i class="fal fa-times"></i></div>` : ``}</div></div>`;
        },
        header: () => {
          return `<h3 class="font-bold text-lg" slot="header">${escape($t("quiz.feedback.add"))}</h3>`;
        }
      }
    )}  <div class="${"grid grid-cols-12 grid-rows-" + escape(POSITIONS[groups.length][orientation].rows, true) + " overflow-hidden h-screen svelte-1yydgt2"}">${each(groups, (g, i) => {
      return ` <div class="${"col-span-" + escape(POSITIONS[groups.length][orientation].span[i], true) + " relative group svelte-1yydgt2"}" style="${"background-color:" + escape(g.backgroundColor, true) + "40;"}" id="${"group-" + escape(g.id, true)}"><div class="absolute top-0 left-0 w-full h-full flex items-center justify-center" style="${"opacity:" + escape(isDragOverMe[i] || !g.type ? 1 : 0.5, true) + ";background:" + escape(isDragOverMe[i] || !g.type ? "rgba(0,0,0,.2)" : "unset", true)}">${!g.type && g.isEditing ? `${validate_component(FileTypeOptions, "FileTypeOptions").$$render(
        $$result,
        {
          color: "btn-accent-light",
          types: { text: true, image: true },
          textText: $t("quiz.groupassignment.backgroundText"),
          imageText: $t("quiz.groupassignment.backgroundImage")
        },
        {},
        {}
      )}` : `${g.type === "text" && g.isEditing ? `<div class="text-black text-center edit-group mt-20 mb-20 svelte-1yydgt2"${add_attribute("contenteditable", true, 0)}>${escape(g.src)} </div>` : `${g.type === "text" && !g.isEditing ? `<div class="text-black text-center edit-group mt-20 mb-20 svelte-1yydgt2">${escape(g.src)} </div>` : `${g.type === "image" ? ` <img class="w-full h-full object-contain"${add_attribute("src", g.src, 0)}>` : ``}`}`}`}</div>  <div class="flex-none absolute right-0 top-0 group-actions svelte-1yydgt2" style="${"z-index:" + escape(zIndex + 1, true)}"><div class="dropdown dropdown-end">  <label tabindex="0" class="btn btn-circle btn-ghost" data-svelte-h="svelte-7pwrsu"><i class="far fa-ellipsis-v"></i></label>  <div tabindex="0" class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"><ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"> <li>  <a>${escape($t("quiz.groupassignment.changeBackgroundText"))}</a></li> <li>   <a>${escape($t("quiz.groupassignment.changeBackgroundImage"))}</a></li> <li>   <a>${escape($t("quiz.groupassignment.changeBackgroundColor"))}<label class="btn btn-circle btn-sm btn-ghost" style="${"background-color: " + escape(g.backgroundColor, true) + ";"}"><input type="color" class="invisible"${add_attribute("value", g.backgroundColor, 0)}></label></a></li>  <li>  <a>${escape($t("quiz.groupassignment.resetBackground"))}</a></li>  ${groups.length > 2 ? `<li>  <a class="text-error">${escape($t("quiz.groupassignment.deleteGroup"))}</a> </li>` : ``} </ul></div> </div></div> <button type="button" class="absolute right-2 bottom-2 btn btn-circle btn-primary add-element svelte-1yydgt2" style="${"z-index: " + escape(zIndex + 1, true)}"><i class="fal fa-plus"></i></button> ${each(elements, (el) => {
        return `${el.group == g.id ? ` <div id="${"user-card-" + escape(el.id, true)}" class="${"absolute card bg-white shadow border cursor-grab user-card display-inline-block " + escape(el.feedback ? "shadow-warning shadow-md" : "", true) + " svelte-1yydgt2"}" style="${"left:" + escape(el.x, true) + "; top:" + escape(el.y, true) + ";z-index: " + escape(el.zIndex, true) + ";width:" + escape(card.width, true) + "px;padding:" + escape(card.padding, true) + "px;opacity: " + escape(
          g.isEditing || isDragging ? 0.3 : 1,
          true
        ) + ";"}"><div class="w-full h-full relative inline-block">${!el.type ? `${validate_component(FileTypeOptions, "FileTypeOptions").$$render($$result, {}, {}, {})}` : `${el.type == "text" ? `<div contenteditable="true" class="w-full user-text">${escape(el.src)}</div> <div class="form-control" style="${"visibility:" + escape(el.isEditing ? "visible" : "hidden", true)}"><label class="label cursor-pointer"><span class="label-text">${escape($t("quiz.tts"))}</span> <input type="checkbox" class="toggle" ${el.tts?.enabled ? "checked" : ""}></label> </div>` : `${el.type == "image" ? ` <img${add_attribute("src", el.src, 0)} class="w-full h-full object-cover rounded-2xl"${add_attribute("style", "", 0)}>` : `${el.type == "video" ? ` <video controls class="w-full h-full object-cover rounded-2xl"><source${add_attribute("src", el.src, 0)}></video>` : `${el.type == "audio" ? `<audio controls class="w-full h-full object-cover rounded-2xl"><source${add_attribute("src", el.src, 0)}${add_attribute("type", el.type, 0)}></audio>` : ``}`}`}`}`}</div> ${el.hint && el.hint.trim().length > 0 ? `${validate_component(Hint, "Hint").$$render($$result, { content: el.hint }, {}, {})}` : ``} ${!el.isEditing && el.tts?.enabled ? `<button class="btn btn-circle btn-info btn-xs btn-outline text-info absolute bottom-2 right-2" data-svelte-h="svelte-16as8a9"><i class="far fa-ear"></i> </button>` : ``} <div class="pin" style="${"background-color:" + escape(groups[el.group].backgroundColor, true) + ";"}"></div> <div class="absolute right-0 top-0 user-card-actions svelte-1yydgt2" style="${"z-index:" + escape(zIndex + 1, true) + "}; " + escape(el.isEditing ? "display: none;" : "", true)}"><div class="dropdown dropdown-end">  <label tabindex="0" class="btn btn-xs btn-circle btn-ghost" data-svelte-h="svelte-1tc6nyk"><i class="far fa-ellipsis-v"></i></label>  <div tabindex="0" class="card compact dropdown-content z-[1] shadow bg-base-100 rounded-box w-64"><ul class="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"> <li>  <a class="text-info">${escape($t("quiz.hint"))} ${escape($t(!el.hint ? "core.add" : "core.change"))}</a></li> <li>   <a class="text-warning">${escape($t("quiz.feedback.title"))} ${escape($t(!el.feedback ? "core.add" : "core.change"))}</a></li> <li>   <a class="text-error">${escape($t("quiz.groupassignment.deleteCard"))}</a></li> </ul></div> </div></div> </div>` : ``}`;
      })} </div>`;
    })} </div>`;
  } while (!$$settled);
  $$unsubscribe_t();
  return $$rendered;
});
const css = {
  code: ".unassigned.svelte-143136f{background-color:#ffffff;opacity:0.7;background-size:21px 21px;background-image:repeating-linear-gradient(\n            45deg,\n            #c5c5c5 0,\n            #c5c5c5 2.1px,\n            #ffffff 0,\n            #ffffff 50%\n        )}.user-card.svelte-143136f{transition:border-color 0.2s ease-in-out;border:5px solid transparent}.user-card-solved.svelte-143136f{border:5px solid rgb(34 197 94)}.user-card-unsolved.svelte-143136f{border:5px solid rgb(239 68 68)}",
  map: null
};
const GroupAssignment_Play = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let validGamestate;
  let centerX;
  let { gamestate } = $$props;
  let task = gamestate?.task;
  let title = gamestate?.title;
  let groups = gamestate?.groups;
  let elements = gamestate?.elements;
  let feedbacks = gamestate?.feedbacks;
  let options = gamestate?.options;
  let showIndividualFeedbacks = false;
  let innerWidth = 0;
  let orientation;
  let zIndex = 100;
  let isDragOverMe = validGamestate ? Array(groups.length).fill(false) : [];
  let currentElementIndex = 0;
  let card = { width: 0, padding: 0 };
  function getElementBackgroundColor(el) {
    if (typeof el.assigned !== "undefined") {
      let bg = groups[el.assigned].backgroundColor;
      bg = bg.length === 9 ? bg.substring(0, bg.length - 2) : bg;
      if (bg)
        return bg;
    }
    return "none";
  }
  function checkSolution() {
    for (let i = 0; i < elements.length; i++) {
      if (typeof elements[i].assigned !== "undefined") {
        elements[i].solved = elements[i].assigned === elements[i].group;
      }
    }
  }
  function onFeedbackClosed() {
    showIndividualFeedbacks = true;
  }
  if ($$props.gamestate === void 0 && $$bindings.gamestate && gamestate !== void 0)
    $$bindings.gamestate(gamestate);
  $$result.css.add(css);
  validGamestate = gamestate?.groups?.length >= MIN_GROUPS && gamestate?.groups?.length <= MAX_GROUPS && gamestate?.elements?.length < MAX_ELEMENTS && gamestate?.options;
  {
    if (validGamestate && elements[currentElementIndex]) {
      elements[currentElementIndex].zIndex = zIndex++;
    }
  }
  centerX = (innerWidth - (card.width - card.padding / 2)) / 2 + 25;
  {
    {
      orientation = "landscape";
    }
  }
  return `  <span class="hidden grid-rows-1 grid-rows-2 grid-rows-3 col-span-3 col-span-4 col-span-6 col-span-12"></span> ${validGamestate ? `${validate_component(Ui_elements, "Meta").$$render(
    $$result,
    {
      title,
      task,
      elements,
      mode: options.mode,
      checkSolution,
      onFeedbackClosed,
      feedbacks,
      type: types.groupassignment
    },
    {},
    {}
  )}   <div class="${"grid grid-cols-12 grid-rows-" + escape(POSITIONS[groups.length][orientation].rows, true) + " overflow-hidden h-screen svelte-143136f"}">${each(groups, (g, i) => {
    return ` <div class="${"col-span-" + escape(POSITIONS[groups.length][orientation].span[i], true) + " relative group svelte-143136f"}" style="${"background-color:" + escape(g.backgroundColor, true) + "40;"}" id="${"group-" + escape(g.id, true)}"><div class="absolute top-0 left-0 w-full h-full flex items-center justify-center z-0" style="${"opacity:" + escape(isDragOverMe[i] ? 1 : 0.5, true) + "; background:" + escape(isDragOverMe[i] ? "rgba(0,0,0,.2)" : "unset", true)}">${g.type === "text" ? `<div class="text-black text-center edit-group mt-20 mb-20">${escape(g.src)} </div>` : `${g.type === "image" ? ` <img class="w-full h-full object-contain"${add_attribute("src", g.src, 0)}>` : ``}`}</div> ${each(elements, (el, j) => {
      return `${g.id === 0 ? ` <div id="${"user-card-" + escape(j, true)}" class="${"absolute card bg-white shadow border cursor-grab user-card " + escape(el.solved ? "user-card-solved" : "", true) + " " + escape(el.solved === false ? "user-card-unsolved" : "", true) + " svelte-143136f"}" style="${"top:35vmin;left:" + escape(centerX, true) + "px;width:" + escape(card.width, true) + "px;padding:" + escape(card.padding, true) + "px;z-index:" + escape(el.zIndex, true) + "; display: " + escape(currentElementIndex >= j ? "inline-block" : "none", true) + "; opacity: " + escape(1, true) + ";"}">${typeof el.assigned !== "undefined" ? `<div class="pin" style="${"background-color:" + escape(getElementBackgroundColor(el), true) + ";"}"></div>` : ``} <div class="w-full h-full relative inline-block">${el.type == "text" ? `<div class="w-full user-text"><!-- HTML_TAG_START -->${el.src}<!-- HTML_TAG_END --> </div>` : `${el.type == "image" ? ` <img${add_attribute("src", el.src, 0)} class="w-full h-full object-cover rounded-2xl"${add_attribute("style", "", 0)}>` : `${el.type == "video" ? ` <video controls class="w-full h-full object-cover rounded-2xl"><source${add_attribute("src", el.src, 0)}></video>` : `${el.type == "audio" ? `<audio controls class="w-full h-full object-cover rounded-2xl"><source${add_attribute("src", el.src, 0)}${add_attribute("type", el.type, 0)}></audio>` : ``}`}`}`}</div> ${el.hint && el.hint.trim().length > 0 ? `${validate_component(Hint, "Hint").$$render(
        $$result,
        {
          content: el.hint,
          mode: options.hints,
          timesAssigned: el.timesAssigned
        },
        {},
        {}
      )}` : ``} ${el.feedback && el.feedback.trim().length > 0 ? `${validate_component(IndividualFeedback, "IndividualFeedback").$$render(
        $$result,
        {
          content: el.feedback,
          activate: showIndividualFeedbacks
        },
        {},
        {}
      )}` : ``} ${el.tts?.enabled ? `<button class="btn btn-circle btn-info btn-xs btn-outline text-info absolute bottom-2 right-2" data-svelte-h="svelte-lv52vx"><i class="far fa-ear"></i> </button>` : ``} </div>` : ``}`;
    })} </div>`;
  })}</div>` : `<p data-svelte-h="svelte-69ezww">no gamestate found</p>`}`;
});
const FileUploader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  let $page, $$unsubscribe_page;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let { openFileuploader = false } = $$props;
  let { handleClose = () => {
  } } = $$props;
  let acceptedFiles = [];
  let dialog;
  if ($$props.openFileuploader === void 0 && $$bindings.openFileuploader && openFileuploader !== void 0)
    $$bindings.openFileuploader(openFileuploader);
  if ($$props.handleClose === void 0 && $$bindings.handleClose && handleClose !== void 0)
    $$bindings.handleClose(handleClose);
  $$unsubscribe_t();
  $$unsubscribe_page();
  return `<dialog class="modal"${add_attribute("this", dialog, 0)}><div class="modal-box items-center text-center"><form method="post" enctype="multipart/form-data"><button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" data-svelte-h="svelte-1am3xy4">✕</button> <h3 class="font-bold text-lg">${escape($t("core.fileuploader.dnd"))}</h3> <p class="py-4">${escape($t("core.fileuploader.browse"))}</p> <input name="file" type="file" class="file-input w-full max-w-xs"> ${$page.form?.error ? `<p class="error">${escape($page.form.error)}</p>` : ``} ${acceptedFiles.length > 0 ? `<button type="submit" class="btn btn-primary">${escape($t("core.fileuploader.upload"))}</button>` : ``}</form>  ${each(acceptedFiles, (file) => {
    return ` <img${add_attribute("src", file, 0)} class="w-40"${add_attribute("alt", file.name, 0)}>`;
  })}</div></dialog>`;
});
const text = true;
const image = true;
const video = true;
const audio = true;
const fileTypes = {
  text,
  image,
  video,
  audio
};
const FileTypeOptions = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $t, $$unsubscribe_t;
  $$unsubscribe_t = subscribe(t, (value) => $t = value);
  createEventDispatcher();
  let { description = false } = $$props;
  let { color = "btn-primary" } = $$props;
  let { textText = $t("core.fileuploader.text") } = $$props;
  let { mediaText = $t("core.fileuploader.media") } = $$props;
  let { imageText = $t("core.fileuploader.image") } = $$props;
  let { videoText = $t("core.fileuploader.video") } = $$props;
  let { audioText = $t("core.fileuploader.audio") } = $$props;
  let { types: types2 = fileTypes } = $$props;
  let isMedia = types2.image && types2.video && types2.audio;
  if ($$props.description === void 0 && $$bindings.description && description !== void 0)
    $$bindings.description(description);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.textText === void 0 && $$bindings.textText && textText !== void 0)
    $$bindings.textText(textText);
  if ($$props.mediaText === void 0 && $$bindings.mediaText && mediaText !== void 0)
    $$bindings.mediaText(mediaText);
  if ($$props.imageText === void 0 && $$bindings.imageText && imageText !== void 0)
    $$bindings.imageText(imageText);
  if ($$props.videoText === void 0 && $$bindings.videoText && videoText !== void 0)
    $$bindings.videoText(videoText);
  if ($$props.audioText === void 0 && $$bindings.audioText && audioText !== void 0)
    $$bindings.audioText(audioText);
  if ($$props.types === void 0 && $$bindings.types && types2 !== void 0)
    $$bindings.types(types2);
  $$unsubscribe_t();
  return `<div class="flex flex-col text-center">${description ? `<p class="mt-1 text-sm mb-6 pl-4 pr-4">${escape(description)}</p>` : ``} <div class="join justify-center">${types2.text ? `<button class="${"btn " + escape(color, true) + " join-item"}">${escape(textText)}</button>` : ``} ${isMedia ? `<button class="${"btn " + escape(color, true) + " join-item"}">${escape(mediaText)}</button>` : `${types2.image ? `<button class="${"btn " + escape(color, true) + " join-item"}">${escape(imageText)}</button>` : ``} ${types2.video ? `<button class="${"btn " + escape(color, true) + " join-item"}">${escape(videoText)}</button>` : ``} ${types2.audio ? `<button class="${"btn " + escape(color, true) + " join-item"}">${escape(audioText)}</button>` : ``}`}</div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${data.mode === "edit" ? `${validate_component(GroupAssignment_Edit, "GroupAssignmentEdit").$$render($$result, { gamestate: data.gamestate, id: data.id }, {}, {})}` : `${validate_component(GroupAssignment_Play, "GroupAssignmentPlay").$$render($$result, { gamestate: data.gamestate }, {}, {})}`}`;
});
export {
  Page as default
};
