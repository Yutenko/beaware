import { writable } from 'svelte/store';

const results = {}

function createUserResultsStore(store) {
    const { subscribe, update, set } = writable(store);

    function updateResults(collectionResults) {
        update(state => {
            state = Object.assign({}, state, collectionResults)

            return { ...state }
        })
    }

    return {
        subscribe,
        updateResults
    }
}

const store = createUserResultsStore(results);
export default store;
