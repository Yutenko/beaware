import { writable } from 'svelte/store';

const results = {}

function createUserResultsStore(store) {
    const { subscribe, update, set } = writable(store);

    function updateResults(collectionResults) {
        update(state => {
            stateresults = Object.assign({}, state.results, collectionResults)

            let collectionId = Object.keys(collectionResults)[0]
            let unitsTotal = state.config.collections[collectionId].units.length
            let unitsTouched = Object.keys(collectionResults[collectionId]).length

            state.currentApp.badge = unitsTotal - unitsTouched

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
