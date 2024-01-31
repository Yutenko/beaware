import { browser } from '$app/environment'


const messages = {
    START: 'start',
    FINISHED: 'finished'
}

const Casestudy = {
    // child to parent = receiver
    receiver: {
        init: (options) => {
            if (browser && options && Object.keys(options).length > 0) {
                console.log("Initialized Casestudy");
            }
        },
        start: (data) => {
            Casestudy.receiver._send({ cmd: messages.START, data });
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

                const { onStart, onFinished } = options;

                window.addEventListener('message', function (event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.FINISHED) {
                            onFinished(message.data);
                        } else if (message.cmd === messages.START) {
                            onStart();
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

export function evalCasestudy(data) {
    return [{ points: 1 }]
}

export default Casestudy




