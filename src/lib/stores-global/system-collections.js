import { writable } from 'svelte/store';
import collections from "$lib/configs/collections.config.json";

function createSystemCollectionsStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
    }
}

const store = createSystemCollectionsStore(collections);
export default store;
