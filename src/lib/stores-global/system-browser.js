import { writable } from 'svelte/store';
import browser from "$lib/configs/browser.config.json";

function createSystemBrowserStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
    }
}

const store = createSystemBrowserStore(browser);
export default store;
