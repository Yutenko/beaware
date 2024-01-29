import { writable } from 'svelte/store';

function createEditorStore(store) {
    const { subscribe, update, set } = writable(store);

    return {
        subscribe,
        set,
        setTitle: (title) => update(state => ({ ...state, title })),
        setQuiz: (quiz) => update(state => ({ ...state, quiz })),
        setEditor: (editor) => update(state => ({ ...state, editor })),
        setReadingtime: (readingtime) => update(state => ({ ...state, readingtime })),
        resetQuiz: () => update(state => ({ ...state, quiz: {} }))
    }
}

export const store = createEditorStore({});
