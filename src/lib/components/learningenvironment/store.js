import { writable } from 'svelte/store';
import { APP_STATE } from './constants.json';
import APP_TYPE from '$components/apps/types';


let store = {
    config: {
        apps: {
            "1234": {
                id: "1234",
                title: "BEFox",
                icon: "phirephox",
                program: APP_TYPE.BROWSER,
                badge: 0,
                target: null,
                state: APP_STATE.CLOSED,
                opened: null,
                isResizing: false,
                width: 0,
                height: 0
            },
            "2345": {
                id: "2345",
                title: "BEMail",
                icon: "gmail",
                program: APP_TYPE.MAIL,
                badge: 2,
                target: null,
                state: APP_STATE.CLOSED,
                opened: null,
                isResizing: false,
                width: 0,
                height: 0
            },
            "3456": {
                id: "3456",
                title: "Datenschutz Allgemein",
                icon: null,
                program: APP_TYPE.LEARNINGUNIT,
                badge: 15,
                target: null,
                state: APP_STATE.CLOSED,
                opened: null,
                isResizing: false,
                width: 0,
                height: 0
            }
        }
    },
    currentApp: {}
}


export const lestore = ((store) => {
    const { subscribe, update } = writable(store);


    function setCurrentApp(id, appwindow) {
        update(state => {
            state.config.apps[id].target = appwindow;
            state.currentApp = state.config.apps[id]
            return state
        })
    }
    function setAppResizing(isResizing, w, h) {
        update(state => {
            state.currentApp.isResizing = isResizing
            state.currentApp.width = w
            state.currentApp.height = h
            return state
        })
    }
    function setAppDimensions(w, h) {
        update(state => {
            state.currentApp.width = w
            state.currentApp.height = h
            return state
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

            return state
        })
    }

    function minimizeAllOpenApps() {
        update(state => {
            Object.values(state.config.apps).forEach(app => {
                if (app.state === APP_STATE.OPEN) {
                    setAppState(app.id, APP_STATE.MINIMIZED)
                }
            })
            return state
        })
    }
    function openAllMinimizedApps() {
        update(state => {
            Object.values(state.config.apps).forEach(app => {
                if (app.state === APP_STATE.MINIMIZED) {
                    setAppState(app.id, APP_STATE.OPEN)
                }
            })
            return state
        })
    }

    return {
        subscribe,
        setCurrentApp,
        setAppState,
        setAppResizing,
        setAppDimensions,
        minimizeAllOpenApps,
        openAllMinimizedApps
    }
})(store);


