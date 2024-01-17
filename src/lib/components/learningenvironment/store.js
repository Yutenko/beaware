import { writable } from 'svelte/store';

function createLearningenvironmentStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
        set,
        setTitle: (title) => update(state => ({ ...state, title }))
    }
}

export const store = createLearningenvironmentStore({});
