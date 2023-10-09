/** Dispatch event on click outside of node */
export function clickoutside(node) {

    const handleClick = event => {
        if (node && !node.contains(event.target) && !event.defaultPrevented) {
            node.dispatchEvent(
                new CustomEvent('clickoutside', node)
            )
        }
    }

    document.addEventListener('click', handleClick, true);

    return {
        destroy() {
            document.removeEventListener('click', handleClick, true);
        }
    }
}

export const focus = (node) => {
    node.focus()
}

export const resizetext = (node, options) => {
    function handleResize() {
        let minSize = options?.minSize || 10
        let maxSize = options?.maxSize || 56
        let step = options?.step || 1
        let unit = options?.unit || 'px'

        let i = minSize
        let overflow = false

        const parent = node.parentNode
        const isOverflown = ({ clientWidth, clientHeight, scrollWidth, scrollHeight }) => (scrollWidth > clientWidth) || (scrollHeight > clientHeight)

        while (!overflow && i < maxSize) {
            node.style.fontSize = `${i}${unit}`
            overflow = isOverflown(parent)

            if (!overflow) i += step
        }

        // revert to last state where no overflow happened
        node.style.fontSize = `${i - step}${unit}`
    }


    const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'characterData') {
                handleResize()
            }
        }
    });

    // Starten Sie die Beobachtung des Textinhalts
    observer.observe(node, { childList: true, characterData: true, subtree: true });
    handleResize()
    node.addEventListener('input', handleResize, true);
    window.addEventListener('resize', handleResize, true);

    return {
        destroy() {
            node.removeEventListener('input', handleResize, true);
            window.removeEventListener('resize', handleResize, true);
            observer.disconnect();
        }
    }
}

export const linkify = (node) => {
    const linkRegex = /((http(s)?(\:\/\/))?(www\.)?([\w\-\.\/])*(\.[a-zA-Z]{2,3}\/?))(?!(.*a>)|(\'|\"))/g

    function replacer(matched) {
        let withProtocol = matched

        if (!withProtocol.startsWith("http")) {
            withProtocol = "http://" + matched
        }

        const newStr = `<a class="link" href="${withProtocol}"> ${matched} </a>`
        return newStr
    }
    function handleBlur(event) { node.innerHTML = node.innerHTML.replace(linkRegex, replacer) }

    node.addEventListener('blur', handleBlur, true);

    return {
        destroy() {
            node.removeEventListener('blur', handleBlur, true);
        }
    }
}

// zoomnode.js
export const zoom = (node) => {
    let isZoomed = false;

    let originalWidth;
    let originalHeight;
    let parent = node.parentNode;


    node.style.transition = "transform 0.5s ease-out"

    function handleZoom() {
        if (isZoomed) {
            // Wenn das Bild maximiert wird, speichern Sie seine ursprüngliche Größe
            originalWidth = node.width;
            originalHeight = node.height;


            // Setzen Sie die Größe des Bildes auf die Bildschirmgröße
            node.style.width = '100vw';
            node.style.height = '100vh';
            node.style.objectFit = 'contain'; // Anpassen des Skalierungsverhaltens
            node.style.position = 'fixed';
            node.style.top = '0';
            node.style.left = '0';
            node.style.transform = 'translate(0, 0)';
            node.style.zIndex = '9999';
            node.style.cursor = "zoomout";

            // Ausblenden Sie den Hintergrund
            document.body.style.overflow = 'hidden';
            document.body.appendChild(node);
        } else {
            // Wenn das Bild wiederhergestellt wird, setzen Sie die ursprüngliche Größe und Position zurück
            node.style.width = originalWidth + 'px';
            node.style.height = originalHeight + 'px';
            node.style.objectFit = 'initial'; // Setzen Sie es auf 'cover' oder 'contain', je nach Bedarf
            node.style.position = 'static';
            node.style.transform = 'none';
            node.style.zIndex = 'auto';
            node.style.cursor = "zoomin";
            parent.appendChild(node);

            // Blenden Sie den Hintergrund wieder ein
            document.body.style.overflow = 'auto';
        }
        isZoomed = !isZoomed;
    }

    handleZoom();
    node.addEventListener('click', handleZoom, true);

    return {
        destroy() {
            node.removeEventListener('click', handleZoom, true);
        }
    }

}



// tooltip.js
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
export function tooltip(node, options) {
    const tip = tippy(node, options);

    return {
        update: (newParams) => tip.setProps(newParams),
        destroy: () => tip.destroy(),
    };
};


export function clicksound(node, options) {
    function handleSound() {
        let audio = new Audio(options.sound);
        audio.play();
    }

    node.addEventListener('click', handleSound, true);
    return {
        destroy: () => {
            node.removeEventListener('click', handleSound, true);
        }
    }
}






