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

export function focus(node, value = true) {
    let stop = () => { };

    const destroy = () => {
        stop && stop();
    };

    const update = (value) => {
        destroy();

        if (value) {
            node.focus();
        } else {
            node.blur();
        }
    };

    update(value);

    return {
        update,
        destroy,
    };
}


export const resizetext = (node, options) => {
    function handleResize() {
        let minSize = options?.minSize || 10
        let maxSize = options?.maxSize || 70
        let step = options?.step || 1
        let unit = options?.unit || 'px'
        let parent = options?.parentId ? document.getElementById(options.parentId) : node.parentElement

        let i = minSize
        let overflow = false

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
            originalWidth = node.width;
            originalHeight = node.height;

            node.style.width = '100vw';
            node.style.height = '100vh';
            node.style.objectFit = 'contain'; 
            node.style.position = 'fixed';
            node.style.top = '0';
            node.style.left = '0';
            node.style.transform = 'translate(0, 0)';
            node.style.zIndex = '9999';
            node.style.cursor = "zoomout";
            node.style.background = 'rgba(0,0,0,.6)';
            node.style.borderTopLeftRadius = '0px';
            node.style.borderTopRightRadius = '0px';
            node.style.borderBottomLeftRadius = '0px';
            node.style.borderBottomRightRadius = '0px';

            document.body.style.overflow = 'hidden';
            document.body.appendChild(node);
        } else {
            node.style.width = originalWidth + 'px';
            node.style.height = originalHeight + 'px';
            node.style.objectFit = 'initial'; 
            node.style.position = 'static';
            node.style.transform = 'none';
            node.style.zIndex = 'auto';
            node.style.cursor = "zoomin";
            node.style.removeProperty('background')
            node.style.removeProperty('border-top-left-radius')
            node.style.removeProperty('border-top-right-radius')
            node.style.removeProperty('border-bottom-left-radius')
            node.style.removeProperty('border-bottom-right-radius')

            parent.appendChild(node);

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














