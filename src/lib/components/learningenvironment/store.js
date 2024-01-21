import { writable } from 'svelte/store';
import { APPS_PER_PAGE } from './constants.json';

function createLearningenvironmentStore() {
    const { subscribe, update, set } = writable({
        config: { apps: new Array(APPS_PER_PAGE + 4) },
        icons: ["phedge", "saphari", "phrome", "mail"],
        currentApp: {}
    });


    return {
        subscribe,
        set,
        setCurrentApp: (target) => update(state => ({ ...state, currentApp: { target } })),
    }
}

export const store = createLearningenvironmentStore();
