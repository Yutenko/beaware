import * as server from '../entries/pages/author/_page.server.js';

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/author/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/author/+page.server.js";
export const imports = ["_app/immutable/nodes/4.9i6Tmife.js","_app/immutable/chunks/scheduler.cOHHkP0m.js","_app/immutable/chunks/index.44LrZ0tY.js","_app/immutable/chunks/MS365Login.svelte_svelte_type_style_lang.B6GZ_MWG.js","_app/immutable/chunks/index.MoR2mFp7.js","_app/immutable/chunks/index.hwPIL90K.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/entry.tU5bMAfH.js","_app/immutable/chunks/each.6w4Ej4nR.js","_app/immutable/chunks/types.18TL9lEU.js","_app/immutable/chunks/Modal.N9oYkXC9.js"];
export const stylesheets = ["_app/immutable/assets/MS365Login.P67lxdBh.css"];
export const fonts = [];
