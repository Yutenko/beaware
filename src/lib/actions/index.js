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

export const resizeText = (node, options) => {
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
    handleResize()


    node.addEventListener('input', handleResize, true);
    window.addEventListener('resize', handleResize, true);

    return {
        destroy() {
            node.removeEventListener('input', handleResize, true);
            window.removeEventListener('resize', handleResize, true);
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


