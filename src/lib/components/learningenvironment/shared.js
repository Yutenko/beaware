import { browser } from '$app/environment'


const messages = {
    CLOSE_CURRENT_APPWINDOW: 'close-current-appwindow',
    UPDATE_RESULTS: 'update-results',
}

const LearningEnvironment = {
    // child to parent = receiver
    receiver: {
        init: (options) => {
            if (browser && options && Object.keys(options).length > 0) {
                console.log("Initialized Appwindow");
            }
        },
        closeCurrentAppWindow: () => {
            LearningEnvironment.receiver._send({ cmd: messages.CLOSE_CURRENT_APPWINDOW });
        },
        updateResults: (data) => {
            LearningEnvironment.receiver._send({ cmd: messages.UPDATE_RESULTS, data });
        },
        _send: (options) => {
            window.parent.postMessage(JSON.stringify(options), "*")
        },
    },

    // parent to child = sender
    sender: {
        init: (options) => {
            if (browser) {

                const { onCloseCurrentAppwindow, onUpdateResults } = options;

                function handleSenderMessages(event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.CLOSE_CURRENT_APPWINDOW) {
                            onCloseCurrentAppwindow();
                        }
                        else if (message.cmd === messages.UPDATE_RESULTS) {
                            onUpdateResults(message.data);
                        }
                    }
                }

                window.addEventListener('message', handleSenderMessages);

                LearningEnvironment.sender._messagesFn = handleSenderMessages;
            }
        },
        _send: (options) => {
            const iframe = document.querySelector('iframe[data-is-appwindow-receiver="true"]')
            iframe.contentWindow.postMessage(JSON.stringify(options), "*")
        },
        _messagesFn: null
    },
    cleanUp: () => {
        if (browser) {
            window.removeEventListener('message', LearningEnvironment.sender._messagesFn)
        }
    }
}

export default LearningEnvironment




