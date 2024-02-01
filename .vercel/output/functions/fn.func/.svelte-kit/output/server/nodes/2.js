

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/quiz/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.O40qIc44.js","_app/immutable/chunks/scheduler.cOHHkP0m.js","_app/immutable/chunks/index.44LrZ0tY.js"];
export const stylesheets = ["_app/immutable/assets/2.BQToByj8.css"];
export const fonts = [];
