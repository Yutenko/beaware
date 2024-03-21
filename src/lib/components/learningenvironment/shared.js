import { browser } from '$app/environment'


const messages = {
    CLOSE_CURRENT_APPWINDOW: 'close-current-appwindow',
    UPDATE_RESULTS: 'update-results',
    GET_MAILS: 'get-mails'
}

const LearningEnvironment = {
    // child to parent = parent as receiver
    receiver: {
        init: (options) => {
            if (browser && options && Object.keys(options).length > 0) {
                const { onGetMails } = options;

                function handleReceiverMessages(event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.GET_MAILS) {
                            onGetMails(message.data);
                        }
                    }
                }

                window.addEventListener('message', handleReceiverMessages);
                LearningEnvironment.sender._messagesFn = handleReceiverMessages;
            }
        },
        closeCurrentAppWindow: () => {
            LearningEnvironment.receiver._send({ cmd: messages.CLOSE_CURRENT_APPWINDOW });
        },
        updateResults: (data) => {
            LearningEnvironment.receiver._send({ cmd: messages.UPDATE_RESULTS, data });
        },
        getMails: () => {
            LearningEnvironment.receiver._send({ cmd: messages.GET_MAILS });
        },
        _send: (options) => {
            window.parent.postMessage(JSON.stringify(options), "*")
        },
        _messagesFn: null
    },

    // parent to child = parent as sender
    sender: {
        init: (options) => {
            if (browser) {

                const { onCloseCurrentAppwindow, onUpdateResults, onGetMails } = options;

                function handleSenderMessages(event) {

                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.CLOSE_CURRENT_APPWINDOW) {
                            onCloseCurrentAppwindow();
                        }
                        else if (message.cmd === messages.UPDATE_RESULTS) {
                            onUpdateResults(message.data);
                        }
                        else if (message.cmd === messages.GET_MAILS) {
                            onGetMails();
                        }
                    }
                }

                window.addEventListener('message', handleSenderMessages);
                LearningEnvironment.sender._messagesFn = handleSenderMessages;
            }
        },
        receiveMails: (data) => {
            LearningEnvironment.sender._send({ cmd: messages.GET_MAILS, data });
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
            window.removeEventListener('message', LearningEnvironment.receiver._messagesFn)
        }
    }
}

export default LearningEnvironment




