"use strict";
var Client;
(function (Client) {
    console.log("Client läuft");
    const url = "http://127.0.0.1:3010";
    const path = "/convertDate";
    const myForm = document.getElementById("myform");
    const sendButton = document.getElementById("send-button");
    const dateInput = document.getElementById("date");
    const addElement = document.getElementById("add");
    sendButton.addEventListener("click", function (evt) {
        evt.preventDefault();
        request();
    });
    console.log(myForm, sendButton);
    async function request() {
        let urlWithQuery = url + path + "?b=" + JSON.stringify(new Date(dateInput.value));
        let response = await fetch(urlWithQuery);
        let responseText = await response.text();
        console.log(responseText);
        addElement.innerText = responseText;
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map