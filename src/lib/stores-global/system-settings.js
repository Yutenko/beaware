import { writable } from 'svelte/store';

const systemSettings = {
    background:
        "/media/learningenvironment/backgrounds/Background_01_BeAware.svg",
};

function createSystemSettingsStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
    }
}

const store = createSystemSettingsStore(systemSettings);
export default store;
