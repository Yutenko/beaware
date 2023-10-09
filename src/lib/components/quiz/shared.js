import { browser } from '$app/environment'

class AQuiz {
    init(options) {
        if (browser && options && Object.keys(options).length > 0) {
            this.registerMessageReceiver(options)
        }
    }
    registerMessageReceiver(options) {
        const { addContainer, removeContainer, addElement, removeElement } = options;

        window.addEventListener('message', function (event) {
            if (event.source === window && event.data) {
                let message = JSON.parse(event.data);
                if (message.cmd === 'add-container') {
                    addContainer(message.data);
                } else if (message.cmd === 'remove-container') {
                    removeContainer(message.data);
                } else if (message.cmd === 'add-element') {
                    addElement(message.data);
                } else if (message.cmd === 'remove-element') {
                    removeElement(message.data);
                }
            }
        });
    }
    sendMessage(options) {
        window.parent.postMessage(JSON.stringify(options), "*")
    }


}

const Quiz = new AQuiz();
export default Quiz;