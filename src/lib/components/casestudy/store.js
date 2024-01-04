import { writable } from 'svelte/store';

function createEditorStore(store) {
    const { subscribe, update } = writable(store);

    return {
        subscribe,
        setQuiz: (quiz) => update(state => ({ ...state, quiz })),
        setEditor: (editor) => update(state => ({ ...state, editor })),
        resetQuiz: () => update(state => ({ ...state, quiz: {} }))
    }
}

export const store = createEditorStore({});
