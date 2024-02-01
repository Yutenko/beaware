import * as universal from '../entries/pages/quiz/_type_/view/_page.js';

export const index = 11;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/quiz/_type_/view/_page.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/quiz/[type]/view/+page.js";
export const imports = ["_app/immutable/nodes/11.B45lbEov.js","_app/immutable/chunks/scheduler.cOHHkP0m.js","_app/immutable/chunks/index.44LrZ0tY.js","_app/immutable/chunks/MS365Login.svelte_svelte_type_style_lang.B6GZ_MWG.js","_app/immutable/chunks/index.MoR2mFp7.js","_app/immutable/chunks/index.hwPIL90K.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/types.18TL9lEU.js","_app/immutable/chunks/entry.tU5bMAfH.js","_app/immutable/chunks/GroupAssignment-Embed.DVt58Vnx.js","_app/immutable/chunks/stores.jHieH2uS.js"];
export const stylesheets = ["_app/immutable/assets/MS365Login.P67lxdBh.css"];
export const fonts = [];
