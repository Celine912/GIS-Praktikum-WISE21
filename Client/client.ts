import { URLSearchParams } from "url";

namespace Client{
    console.log("Client läuft");
    const url: string = "http://127.0.0.1:3000";

    const myform: HTMLFormElement = <HTMLFormElement> document.getElementById("myform");
    const sendButton: HTMLButtonElement = <HTMLButtonElement> document.getElementById("send-button");

    console.log(myform, sendButton);

    function sendForm(): void{
        let formData: FormData = new FormData(myform);
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        let urlwithQuery: string = url + "?" + query.toString();
        


    }

}