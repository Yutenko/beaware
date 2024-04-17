import { browser } from '$app/environment'


const messages = {
    CLOSE_CURRENT_APPWINDOW: 'close-current-appwindow',

    GET_MAILS: 'get-mails',
    UPDATE_MAILS: 'update-mails',

    GET_RESULTS: 'get-results',
    UPDATE_RESULTS: 'update-results',

    GET_DETAILS: 'get-details',

}

const LearningEnvironment = {
    // child to parent = parent as receiver
    receiver: {
        init: (options) => {
            if (browser && options && Object.keys(options).length > 0) {
                const { onGetMails, onGetResults, onGetDetails } = options;

                function handleReceiverMessages(event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.GET_MAILS) {
                            onGetMails(message.data);
                        } else if (message.cmd === messages.GET_RESULTS) {
                            onGetResults(message.data);
                        } else if (message.cmd === messages.GET_DETAILS) {
                            onGetDetails(message.data);
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
        getMails: () => {
            LearningEnvironment.receiver._send({ cmd: messages.GET_MAILS });
        },
        updateMails: (data) => {
            LearningEnvironment.receiver._send({ cmd: messages.UPDATE_MAILS, data });
        },
        getResults: (data) => {
            LearningEnvironment.receiver._send({ cmd: messages.GET_RESULTS, data });
        },
        updateResults: (data) => {
            LearningEnvironment.receiver._send({ cmd: messages.UPDATE_RESULTS, data });
        },
        getDetails: (data) => {
            LearningEnvironment.receiver._send({ cmd: messages.GET_DETAILS, data });
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

                const { onCloseCurrentAppwindow, onGetResults, onUpdateResults, onGetMails, onUpdateMails, onGetDetails } = options;

                function handleSenderMessages(event) {

                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.CLOSE_CURRENT_APPWINDOW) {
                            onCloseCurrentAppwindow();
                        }
                        else if (message.cmd === messages.UPDATE_RESULTS) {
                            onUpdateResults(message.data);
                        }
                        else if (message.cmd === messages.UPDATE_MAILS) {
                            onUpdateMails(message.data);
                        }
                        else if (message.cmd === messages.GET_MAILS) {
                            onGetMails();
                        } else if (message.cmd === messages.GET_RESULTS) {
                            onGetResults(message.data);
                        } else if (message.cmd === messages.GET_DETAILS) {
                            onGetDetails(message.data);
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
        receiveResults: (data) => {
            LearningEnvironment.sender._send({ cmd: messages.GET_RESULTS, data });
        },
        receiveDetails: (data) => {
            LearningEnvironment.sender._send({ cmd: messages.GET_DETAILS, data });
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




