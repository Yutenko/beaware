import { browser } from '$app/environment'


const messages = {
    CLOSE_CURRENT_APPWINDOW: 'close',
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
        _send: (options) => {
            window.parent.postMessage(JSON.stringify(options), "*")
        },
    },

    // parent to child = sender
    sender: {
        init: (options) => {
            if (browser) {

                const { onCloseCurrentAppwindow } = options;

                window.addEventListener('message', function (event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.CLOSE_CURRENT_APPWINDOW) {
                            onCloseCurrentAppwindow();
                        }
                    }
                });
            }
        },
        _send: (options) => {
            const iframe = document.querySelector('iframe[data-is-appwindow-receiver="true"]')
            iframe.contentWindow.postMessage(JSON.stringify(options), "*")
        }
    }
}

export default LearningEnvironment




