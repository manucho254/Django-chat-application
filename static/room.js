const roomName = JSON.parse(document.getElementById('room-name').textContent);
const chatLog = document.querySelector('#chat-log');

if (chatLog.childNodes.length < 1) {
    const emptyText = document.createElement("span");
    emptyText.id = 'emptyText';
    emptyText.innerText = 'No messages';
    emptyText.className = "emptyText";
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
    chatMessage.innerText = `${data.message + '\n'}`;
    chatMessage.classList.add("messages");
    chatLog.appendChild(chatMessage);
    if (chatLog.childNodes.length >= 1) {
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
    chatSocket.send(JSON.stringify({
        'message': message
    }));
    messageInputDom.value = '';
};