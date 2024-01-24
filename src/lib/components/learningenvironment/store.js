import { writable } from 'svelte/store';
import { APP_STATE } from './constants.json';


export const lestore = (() => {
    const { subscribe, update } = writable({
        config: {
            apps: {
                "1234": { id: "1234", title: "Phedge", icon: "phedge", program: "browser", badge: 0, target: null, state: APP_STATE.CLOSED, lastMinimized: null },
                "2345": { id: "2345", title: "Mail", icon: "mail", program: "mail", badge: 2, target: null, state: APP_STATE.CLOSED, lastMinimized: null },
            }
        },
        currentApp: {}
    });

    function setCurrentApp(id, appwindow) {
        update(state => {
            state.config.apps[id].target = appwindow;
            state.currentApp = state.config.apps[id]
            return state
        })
    }
    function setAppState(id, appstate) {
        update(state => {
            state.config.apps[id].state = appstate
            return state
        })
    }


    return {
        subscribe,
        setCurrentApp,
        setAppState
    }
})();


