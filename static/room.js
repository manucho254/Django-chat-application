const roomName = JSON.parse(document.getElementById('room-name').textContent);
const chatLog = document.querySelector('#chat-log');
const emptyText = document.createElement("span");

if (chatLog.childNodes.length < 1) {
    emptyText.id = 'emptyText';
    emptyText.innerText = 'No messages';
    emptyText.classList.add("emptyText");
    chatLog.appendChild(emptyText);
}

const chatSocket = new WebSocket(
    'ws://' +
    window.location.host +
    '/ws/chat/' +
    roomName +
    '/'
);

chatSocket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    const chatMessage = document.createElement('div');
    const userId = data['user_id'];
    const loggedInUserId = JSON.parse(document.getElementById('user_id').textContent)
    chatMessage.innerText = `${data.message}`;

    if (userId === loggedInUserId) {
        chatMessage.classList.add("messages", "sender");
    } else {
        chatMessage.classList.add("messages", "reciever");
    }

    chatLog.appendChild(chatMessage);

    if (chatLog.childNodes.length != 0) {
        chatLog.removeChild(emptyText);
    }
};

chatSocket.onclose = function(e) {
    console.error('Chat socket closed unexpectedly');
};

document.querySelector('#chat-message-input').focus();
document.querySelector('#chat-message-input').onkeyup = function(e) {
    if (e.keyCode === 13) { // enter, return
        document.querySelector('#chat-message-submit').click();
    }
};

document.querySelector('#chat-message-submit').onclick = function(e) {
    const messageInputDom = document.querySelector('#chat-message-input');
    const message = messageInputDom.value;
    if (message === '') {
        const fieldErrorMessage = document.querySelector('#field-error-message');
        const error = document.createElement('span');
        error.innerText = "This field can't be empty";
        error.classList.add("bg-light", "p-2", "rounded", "text-danger");
        fieldErrorMessage.appendChild(error);
        setInterval(function removeError() {
            fieldErrorMessage.remove(error);
        }, 1000)
        removeError()
    } else {
        chatSocket.send(JSON.stringify({
            'message': message
        }));
        messageInputDom.value = '';
    }
};