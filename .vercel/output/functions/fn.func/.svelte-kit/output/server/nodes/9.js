import * as universal from '../entries/pages/quiz/_type_/embed/_page.js';
import * as server from '../entries/pages/quiz/_type_/embed/_page.server.js';

export const index = 9;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/quiz/_type_/embed/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/quiz/[type]/embed/+page.js";
export { server };
export const server_id = "src/routes/quiz/[type]/embed/+page.server.js";
export const imports = ["_app/immutable/nodes/9.zHm-ooCc.js","_app/immutable/chunks/scheduler.cOHHkP0m.js","_app/immutable/chunks/index.44LrZ0tY.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/index.d2CmnkrZ.js","_app/immutable/chunks/MS365Login.svelte_svelte_type_style_lang.B6GZ_MWG.js","_app/immutable/chunks/index.MoR2mFp7.js","_app/immutable/chunks/index.hwPIL90K.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/shared.M8ULrqnv.js","_app/immutable/chunks/types.18TL9lEU.js","_app/immutable/chunks/constants.dbhUNUj9.js","_app/immutable/chunks/entry.tU5bMAfH.js","_app/immutable/chunks/forms.nm2FTXk8.js","_app/immutable/chunks/stores.jHieH2uS.js","_app/immutable/chunks/Modal.N9oYkXC9.js","_app/immutable/chunks/index.j3h183Vw.js"];
export const stylesheets = ["_app/immutable/assets/MS365Login.P67lxdBh.css"];
export const fonts = [];
