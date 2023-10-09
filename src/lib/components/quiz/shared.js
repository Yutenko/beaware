import { browser } from '$app/environment'


const messages = {
    ADD_CONTAINER: 'add-container',
    REMOVE_CONTAINER: 'remove-container',
    RESET_CONTAINER: 'reset-container',
    ADD_ELEMENT: 'add-element',
    REMOVE_ELEMENT: 'remove-element',
    UPDATE_PARENT: 'update-parent',
    UPDATE_CHILD: 'update-child'
}

const Quiz = {
    // child to parent = receiver
    receiver: {
        init: (options) => {
            if (browser && options && Object.keys(options).length > 0) {
                const { addContainer, removeContainer, resetContainer, addElement, removeElement, updateParent, updateChild } = options;
                Quiz.receiver._updateFn = updateParent;

                window.addEventListener('message', function (event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.ADD_CONTAINER) {
                            addContainer(message.data);
                        } else if (message.cmd === messages.REMOVE_CONTAINER) {
                            removeContainer(message.data);
                        } else if (message.cmd === messages.RESET_CONTAINER) {
                            resetContainer(message.data);
                        } else if (message.cmd === messages.ADD_ELEMENT) {
                            addElement(message.data);
                        } else if (message.cmd === messages.REMOVE_ELEMENT) {
                            removeElement(message.data);
                        } else if (message.cmd === messages.UPDATE_CHILD) {
                            updateChild(message.data);
                        } else if (message.cmd === messages.UPDATE_PARENT) {
                            return Quiz.receiver.updateParent();
                        }

                        Quiz.receiver.updateParent();
                    }
                });
            }
        },
        updateParent: () => {
            Quiz.receiver._send({ cmd: messages.UPDATE_PARENT, data: Quiz.receiver._updateFn() });
        },
        _send: (options) => {
            window.parent.postMessage(JSON.stringify(options), "*")
        },
        _updateFn: null
    },

    // parent to child = sender
    sender: {
        init: (options) => {
            if (browser) {
                Quiz.sender._iframe = document.querySelector('iframe[data-is-receiver="true"]')
                const { onUpdate } = options;

                window.addEventListener('message', function (event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.UPDATE_PARENT) {
                            onUpdate(JSON.parse(message.data));
                        }
                    }
                });
            }
        },
        _send: (options) => {
            var iframe = Quiz.sender._iframe;
            if (iframe) {
                iframe.contentWindow.postMessage(JSON.stringify(options), "*")
            }
        },
        api: {
            addContainer: () => {
                Quiz.sender._send({ cmd: messages.ADD_CONTAINER });
            },
            removeContainer: (container) => {
                Quiz.sender._send({ cmd: messages.REMOVE_CONTAINER, data: container });
            },
            resetContainer: (container) => {
                Quiz.sender._send({ cmd: messages.RESET_CONTAINER, data: container });
            },
            updateParent: () => {
                Quiz.sender._send({ cmd: messages.UPDATE_PARENT });
            },
            updateChild: (data) => {
                Quiz.sender._send({ cmd: messages.UPDATE_CHILD, data });
            }
        },
        _iframe: null
    }
}

export default Quiz




