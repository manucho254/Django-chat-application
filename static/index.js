//======================chat in the room you created=======================//

document.querySelector('#room-name-input').focus();
document.querySelector('#room-name-input').onkeyup = function(e) {
    if (e.keyCode === 13) { // enter, return
        document.querySelector('#room-name-submit').click();
    }
};

document.querySelector('#room-name-submit').onclick = function(e) {
    var roomName = document.querySelector('#room-name-input').value;
    if (roomName === '') {
        const fieldErrorMessage = document.querySelector('#field-error-message');
        const error = document.createElement('span');
        error.innerText = "This field can't be empty";
        error.classList.add("bg-light", "p-2", "rounded", "text-danger");
        fieldErrorMessage.appendChild(error);
    } else {
        window.location.pathname = '/chat/' + roomName + '/';
    }
};