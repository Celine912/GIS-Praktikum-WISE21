namespace Client {
    console.log("Client läuft"); 

    const url: string = "http://127.0.0.1:3010"; 
    const path: string = "/convertDate"; 

    const myForm: HTMLFormElement = <HTMLFormElement>document.getElementById("myform"); 
    const sendButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("send-button"); 
    const dateInput: HTMLInputElement = <HTMLInputElement>document.getElementById("date"); 

    sendButton.addEventListener("click", function(evt: Event) {
        evt.preventDefault(); 
        request(); 
    });

    console.log(myForm, sendButton); 


    
    async function request (): Promise<void> {

        let urlWithQuery: string = url + path + "?b=" + JSON.stringify(new Date(dateInput.value)); 
        
        let response: Response = await fetch(urlWithQuery); 
        let responseText: string = await response.text(); 
        console.log(responseText); 
    }
}