import { writable } from 'svelte/store';

const results =
{
    "collection-id-1":
    {
        "5c4c8252-c1e3-4e18-9028-78de3b9ef7c8": {
            "progress": [
                {
                    "points": 1
                }
            ],
            "timeStarted": 1711631839232,
            "timeFinished": 1711631845225
        },
        "f3ea52c0-f382-471d-9ec5-f8eb50d0261d": {
            "progress": [
                {
                    "id": 0,
                    "points": 1,
                    "attempts": 1
                },
                {
                    "id": 1,
                    "points": 1,
                    "attempts": 1
                }
            ],
            "timeStarted": 1711631846187,
            "timeFinished": 1711631850996
        },
        "dcc00729-c6e3-42bd-8c42-c3e7fca0cff2": {
            "progress": [
                {
                    "points": 1
                }
            ],
            "timeStarted": 1711631854142,
            "timeFinished": 1711631866209
        }
    }
}


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
