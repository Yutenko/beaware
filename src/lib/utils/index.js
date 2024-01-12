import { readable } from 'svelte/store';
import { browser } from "$app/environment"

export const orientation = readable("landscape", (set) => {
    let setOrientation = () => {
        set(window.innerWidth > window.innerHeight ? "landscape" : "portrait");
    }

    if (browser) {
        setOrientation()
        window.addEventListener("resize", setOrientation);
    }

    return () => {
        if (browser) {
            window.removeEventListener("resize", setOrientation);
        }
    }

})


