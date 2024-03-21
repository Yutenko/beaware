import { writable } from 'svelte/store';

function createAppCurrentStore(store) {
    const { subscribe, update } = writable(store);

    function setApp(id, appwindow) {
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

    return {
        subscribe,
        setApp,
        setAppResizing,
        setAppDimensions,
        setAppState
    }
}

const store = createAppCurrentStore({});
export default store;
