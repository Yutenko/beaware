import { writable, derived } from 'svelte/store';
import { APP_STATE } from '$components/learningenvironment/constants';
import APP_TYPE from '$components/apps/types';

import apps from "$lib/configs/apps.config.json";

export const currentApp = derived(apps, $apps => {
    const currentKey = Object.keys($apps).find(key => $apps[key].current === true);
    return currentKey ? apps[currentKey] : {};
});

//let openApps = derived(apps, ($apps) => Object.values($apps).filter(app => app.state === APP_STATE.OPEN))
//export let minimizedapps = Object.values(apps).filter((app) => app.state !== APP_STATE.CLOSED).sort((a, b) => a.opened - b.opened);

function createSystemAppsStore(store) {
    const { subscribe, update } = writable(store);


    function setAppCurrent(id, target) {
        update(state => {
            currentApp.current = false
            state[id].current = true
            state[id].target = target
            return { ...state }
        })
    }

    function setAppInstalled(id) {
        update(state => {
            state[id].installed = true
            return { ...state }
        })
    }

    function setAppBadge(id, badge) {
        update(state => {
            state[id].badge = badge
            return { ...state }
        })
    }

    function setAppState(id, appstate) {
        update(state => {
            state[id].state = appstate
            if (appstate === APP_STATE.OPEN) {
                state[id].opened = new Date().getTime()
            }

            // if apps get closed or minimized, set the current app to the last opened app
            const len = openApps.length
            if (len > 0) {
                setTimeout(function () {
                    setAppCurrent(openApps[len - 1].id, openApps[len - 1].target)
                })
            }

            return { ...state }
        })
    }

    function setAppResizing(id, isResizing, w, h) {
        update(state => {
            state[id].isResizing = isResizing
            state[id].width = w
            state[id].height = h
            return { ...state }
        })
    }
    function setAppDimensions(id, w, h) {
        update(state => {
            state[id].width = w
            state[id].height = h
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
            state[newApp.id] = newApp
            return { ...state }
        })
    }

    function minimizeAllOpenApps() {
        update(state => {
            Object.values(state).forEach(app => {
                if (app.state === APP_STATE.OPEN) {
                    setAppState(app.id, APP_STATE.MINIMIZED)
                }
            })
            return { ...state }
        })
    }
    function openAllMinimizedApps() {
        update(state => {
            Object.values(state).forEach(app => {
                if (app.state === APP_STATE.MINIMIZED) {
                    setAppState(app.id, APP_STATE.OPEN)
                }
            })
            return { ...state }
        })
    }

    return {
        subscribe,
        setAppCurrent,
        setAppInstalled,
        setAppBadge,
        setAppState,
        setAppResizing,
        setAppDimensions,
        installApp,
        minimizeAllOpenApps,
        openAllMinimizedApps
    }
}

export const store = createSystemAppsStore(apps);;
