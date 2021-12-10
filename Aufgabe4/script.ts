namespace Eventseite {

  class TodoElement {
    interpret: string;
    price: number;
    date: Date;
    

    constructor(interpret: string, price: number, date: Date) {
        this.interpret = interpret;
        this.price = price;
        this.date = date;
        
    }
}


  /*const inputFeld: HTMLInputElement = <HTMLInputElement>document.getElementById("input-Element");
  const display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");
  */

  const interpretInput: HTMLInputElement = <HTMLInputElement>document.getElementById("interpret");
  const priceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("price");
  const datetimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("datetime");
  const entereventButton: HTMLElement = <HTMLButtonElement>document.getElementById("enterevent");
  const eventliste: HTMLElement = <HTMLElement>document.getElementById("eventliste");

  let elementID: number = 0;

  
  entereventButton.addEventListener("click", enterEvent);

  if (localStorage.length > 0) {
    load();
  }

  console.log("Test ausführen");

  function load(): void {
    let index: number = 1;
    for (let i: number = 1; i < localStorage.length; i++) {

        while (localStorage.getItem(index.toString()) === null) {
        index++;
        }

        let interpret: string = (JSON.parse(localStorage.getItem(index.toString()))).interpret;
        let price: number = (JSON.parse(localStorage.getItem(index.toString()))).price;
        let datetime: Date = (JSON.parse(localStorage.getItem(index.toString()))).datetime;
        createEvent(interpret, price, datetime);

        index++;
    }
  }
  function enterEvent(): void {
    let interpret: string = interpretInput.value;
    let price: number = parseInt(priceInput.value);
    let datetime: Date = new Date(datetimeInput.value);
    console.log(interpret + "\n" + priceInput + "\n" + datetime);


    let todoElement: TodoElement = new TodoElement(interpret, datetime, price);
    let json: string = JSON.stringify(todoElement);
    localStorage.setItem(elementID.toString(), json);

    createEvent(interpret, price, datetime);


}

  function createEvent(interpret: string, price: number, datetime: Date): void {
      let tr: HTMLElement = document.createElement("tr");
      let interpretElement: HTMLElement = document.createElement("td");
      let priceElement: HTMLElement = document.createElement("td");
      let datetimeElement: HTMLElement = document.createElement("td");
      let deleteElement: HTMLElement = document.createElement("td");
      let deleteButton: HTMLElement = document.createElement("button");

      tr.id = "delete" + elementID.toString();
      deleteButton.id = elementID.toString();

      interpretElement.innerText = interpret;
      priceElement.innerText = price + "";
      datetimeElement.innerText = datetime + "";
      deleteButton.innerHTML = "delete";

      deleteElement.append(deleteButton);
      deleteElement.addEventListener("click", deleteevent);

      tr.appendChild(interpretElement);
      tr.appendChild(priceElement);
      tr.appendChild(datetimeElement);
      tr.appendChild(deleteElement);

      eventliste.appendChild(tr);
      elementID++;
  }

  

  function deleteevent(deleteevent: Event): void {

      let eventID: string = (<HTMLElement>deleteevent.target).id;
      let tr: HTMLElement = document.getElementById("delete" + eventID);
      tr.remove();
      localStorage.removeItem(eventID.toString());
  }
}