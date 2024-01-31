import { browser } from '$app/environment'
import QUIZ_TYPE from './types';


const messages = {

    // setup and edit
    ADD_CONTAINER: 'add-container',
    REMOVE_CONTAINER: 'remove-container',
    RESET_CONTAINER: 'reset-container',
    ADD_ELEMENT: 'add-element',
    REMOVE_ELEMENT: 'remove-element',
    UPDATE_PARENT: 'update-parent',
    INITIAL_DATA: 'initial-data',

    // evaluation
    START: 'start',
    FINISHED: 'finished'

}

const Quiz = {
    // child to parent = receiver
    receiver: {
        init: (options) => {
            if (browser && options && Object.keys(options).length > 0) {
                const { addContainer, removeContainer, resetContainer, addElement, removeElement, updateParent, initalData } = options;
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
                        } else if (message.cmd === messages.UPDATE_PARENT) {
                            return Quiz.receiver.updateParent();
                        }

                        Quiz.receiver.updateParent();
                    }
                });

                // send initial data
                if (initalData) {
                    Quiz.receiver._send({ cmd: messages.INITIAL_DATA, data: JSON.stringify(initalData) });
                }
            }
        },
        updateParent: () => {
            if (Quiz.receiver._updateFn)
                Quiz.receiver._send({ cmd: messages.UPDATE_PARENT, data: Quiz.receiver._updateFn() });
        },
        start: (data) => {
            Quiz.receiver._send({ cmd: messages.START, data });
        },
        finished: (data) => {
            Quiz.receiver._send({ cmd: messages.FINISHED, data });
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

                const { onUpdate, onInitalData, onStart, onFinished } = options;

                window.addEventListener('message', function (event) {
                    if (event.data) {
                        let message = JSON.parse(event.data);

                        if (message.cmd === messages.UPDATE_PARENT) {
                            onUpdate(JSON.parse(message.data));
                        } else if (message.cmd === messages.INITIAL_DATA) {
                            onInitalData(JSON.parse(message.data));
                        } else if (message.cmd === messages.START) {
                            onStart();
                        } else if (message.cmd === messages.FINISHED) {
                            onFinished(message.data);
                        }
                    }
                });
            }
        },
        _send: (options) => {
            const iframe = document.querySelector('iframe[data-is-quiz-receiver="true"]')
            iframe.contentWindow.postMessage(JSON.stringify(options), "*")
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
            }
        }
    },
    shuffle: (array) => {
        return array => array.sort(() => 0.5 - Math.random());
    }
}

export function evalQuiz(type, data) {
    if (type === QUIZ_TYPE.groupassignment) {
        return data.map(el => {
            return { id: el.id, points: el.solved ? 1 : 0, attempts: el.timesAssigned }
        })
    }


    return data
}

export default Quiz




