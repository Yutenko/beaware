import { browser } from '$app/environment'


const messages = {
    FINISHED: 'finished',
    PROGRESS: 'progress'
}

const Casestudy = {
    // child to parent = receiver
    receiver: {
        init: (options) => {
            if (browser && options && Object.keys(options).length > 0) {
                console.log("Initialized Casestudy");
            }
        },
        progress: (data) => {
            Casestudy.receiver._send({ cmd: messages.PROGRESS, data });
        },
        finished: (data) => {
            Casestudy.receiver._send({ cmd: messages.FINISHED, data });
        },
        _send: (options) => {
            window.parent.postMessage(JSON.stringify(options), "*")
        },
    },

    // parent to child = sender
    sender: {
        init: (options) => {
            if (browser) {

                const { onFinished, onProgress } = options;

                window.addEventListener('message', function (event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.FINISHED) {
                            onFinished();
                        } else if (message.cmd === messages.PROGRESS) {
                            onProgress(JSON.parse(message.data));
                        }
                    }
                });
            }
        },
        _send: (options) => {
            const iframe = document.querySelector('iframe[data-is-cs-receiver="true"]')
            iframe.contentWindow.postMessage(JSON.stringify(options), "*")
        }
    }
}

export default Casestudy




