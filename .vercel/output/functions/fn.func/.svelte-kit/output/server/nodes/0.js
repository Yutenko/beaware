import * as universal from '../entries/pages/_layout.js';
import * as server from '../entries/pages/_layout.server.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export { server };
export const server_id = "src/routes/+layout.server.js";
export const imports = ["_app/immutable/nodes/0.hKH_YNvh.js","_app/immutable/chunks/index.hwPIL90K.js","_app/immutable/chunks/preload-helper.0HuHagjb.js","_app/immutable/chunks/index.MoR2mFp7.js","_app/immutable/chunks/scheduler.cOHHkP0m.js","_app/immutable/chunks/index.44LrZ0tY.js"];
export const stylesheets = ["_app/immutable/assets/0.1i9iSGO8.css"];
export const fonts = [];
