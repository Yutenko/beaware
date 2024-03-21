import { writable } from 'svelte/store';

const profile = { name: "Christian" }

function createUserProfileStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
    }
}

const store = createUserProfileStore(profile);
export default store;
