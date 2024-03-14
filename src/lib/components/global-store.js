import { writable } from 'svelte/store';
import { APP_STATE } from '$components/learningenvironment/constants';
import APP_TYPE from '$components/apps/types';

import apps from "$lib/configs/apps.config.json";
import collections from "$lib/configs/collections.config.json";
import certificate from "$lib/configs/certificate.config.json";

function createGlobalStore() {
    const { update, subscribe } = writable({
        config: {
            apps: apps,
            collections: collections,
            certificate: certificate
        },
        results: {},
        currentApp: {}
    });

    function updateResults(collectionResults) {
        update(state => {
            state.results = Object.assign({}, state.results, collectionResults)
            return { ...state }
        })
    }

    function setCurrentApp(id, appwindow) {
        update(state => {
            state.config.apps[id].target = appwindow;
            state.currentApp = state.config.apps[id]
            return { ...state }
        })
    }
    function setAppResizing(isResizing, w, h) {
        update(state => {
            state.currentApp.isResizing = isResizing
            state.currentApp.width = w
            state.currentApp.height = h
            return { ...state }
        })
    }
    function setAppDimensions(w, h) {
        update(state => {
            state.currentApp.width = w
            state.currentApp.height = h
            return { ...state }
        })
    }

    function setAppState(id, appstate) {
        update(state => {
            state.config.apps[id].state = appstate
            if (appstate === APP_STATE.OPEN) {
                state.config.apps[id].opened = new Date().getTime()
            }
            // if apps get closed or minimized, set the current app to the last opened app
            if (appstate === APP_STATE.CLOSED || appstate === APP_STATE.MINIMIZED) {
                const openApps = Object.values(state.config.apps).filter(app => app.state === APP_STATE.OPEN)
                const len = openApps.length
                if (len > 0) {
                    setTimeout(function () {
                        setCurrentApp(openApps[len - 1].id, openApps[len - 1].target)
                    })
                }
            }
            return { ...state }
        })
    }

    function setAppInstalled(id) {
        update(state => {
            state.config.apps[id].installed = true
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
            state.config.apps[newApp.id] = newApp
            return { ...state }
        })
    }

    function minimizeAllOpenApps() {
        update(state => {
            Object.values(state.config.apps).forEach(app => {
                if (app.state === APP_STATE.OPEN) {
                    setAppState(app.id, APP_STATE.MINIMIZED)
                }
            })
            return { ...state }
        })
    }
    function openAllMinimizedApps() {
        update(state => {
            Object.values(state.config.apps).forEach(app => {
                if (app.state === APP_STATE.MINIMIZED) {
                    setAppState(app.id, APP_STATE.OPEN)
                }
            })
            return { ...state }
        })
    }

    return {
        subscribe,
        setCurrentApp,
        setAppState,
        setAppResizing,
        setAppDimensions,
        minimizeAllOpenApps,
        openAllMinimizedApps,
        installApp,
        setAppInstalled,
        updateResults
    }
}


export const globalStore = createGlobalStore()


