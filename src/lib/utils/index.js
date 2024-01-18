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


const tailwindbreakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536
}

export const breakpoint = readable({}, (set) => {
    let setBreakpoint = () => {
        set({
            isSm: window.innerWidth < tailwindbreakpoints.sm,
            isMd: window.innerWidth >= tailwindbreakpoints.sm && window.innerWidth < tailwindbreakpoints.md,
            isLg: window.innerWidth >= tailwindbreakpoints.md && window.innerWidth < tailwindbreakpoints.lg,
            isXl: window.innerWidth >= tailwindbreakpoints.lg && window.innerWidth < tailwindbreakpoints.xl,
            is2Xl: window.innerWidth >= tailwindbreakpoints.xl && window.innerWidth < tailwindbreakpoints["2xl"]
        })
    }
    if (browser) {
        setBreakpoint()
        window.addEventListener("resize", setBreakpoint);
    }
    return () => {
        if (browser) {
            window.removeEventListener("resize", setBreakpoint);
        }
    }
})




