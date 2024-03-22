import { writable } from 'svelte/store';

const results = {}

function createUserResultsStore(store) {
    const { subscribe, update, set } = writable(store);

    function updateResults(collectionResults) {
        update(state => {
            stateresults = Object.assign({}, state.results, collectionResults)

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
