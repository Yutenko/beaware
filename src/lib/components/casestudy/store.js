import { writable } from 'svelte/store';

function createEditorStore(store) {
    const { subscribe, update } = writable(store);

    return {
        subscribe,
        setQuiz: (quiz) => update(state => ({ ...state, quiz:quiz.id })),
        setEditor: (editor) => update(state => ({ ...state, editor }))
    }
}

export const store = createEditorStore({});
