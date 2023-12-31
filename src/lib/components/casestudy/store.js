import { writable } from 'svelte/store';

function createEditorStore() {
    const { subscribe, update } = writable({});

    return {
        subscribe,
        setQuiz: (quiz) => update((o) => o.quiz = quiz),
        setData: (data) => update((o) => o.data = data)
    };
}

export const store = createEditorStore();
