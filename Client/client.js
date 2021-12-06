"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
var Client;
(function (Client) {
    console.log("Client läuft");
    const url = "http://127.0.0.1:3000";
    const myform = document.getElementById("myform");
    const sendButton = document.getElementById("send-button");
    console.log(myform, sendButton);
    function sendForm() {
        let formData = new FormData(myform);
        let query = new url_1.URLSearchParams(formData);
        let urlwithQuery = url + "?" + query.toString();
    }
})(Client || (Client = {}));
//# sourceMappingURL=client.js.map