import { writable } from 'svelte/store';
import { APP_STATE } from '$components/learningenvironment/constants';
import APP_TYPE from '$components/apps/types';

import apps from "$lib/configs/apps.config.json";

function createSystemAppsStore(store) {
    const { subscribe, update } = writable(store);

    function setAppInstalled(id) {
        update(state => {
            state.apps[id].installed = true
            return { ...state }
        })
    }

    function installApp(id) {
        let newApp = {
            id,
            title: "Main",
            icon: "main",
            type: APP_TYPE.LEARNINGUNIT,
            badge: 4,
            target: null,
            installed: false,
            state: APP_STATE.CLOSED,
            opened: null,
            isResizing: false,
            width: 0,
            height: 0
        }

        update(state => {
            state.apps[newApp.id] = newApp
            return { ...state }
        })
    }

    function minimizeAllOpenApps() {
        update(state => {
            Object.values(state.apps).forEach(app => {
                if (app.state === APP_STATE.OPEN) {
                    setAppState(app.id, APP_STATE.MINIMIZED)
                }
            })
            return { ...state }
        })
    }
    function openAllMinimizedApps() {
        update(state => {
            Object.values(state.apps).forEach(app => {
                if (app.state === APP_STATE.MINIMIZED) {
                    setAppState(app.id, APP_STATE.OPEN)
                }
            })
            return { ...state }
        })
    }

    return {
        subscribe,

    }
}

const store = createSystemAppsStore(apps);
export default store;
