namespace Eventseite {

  class TodoElement {
    interpret: string;
    date: Date;
    price: number;
    

    constructor(interpret: string, date: Date, price: number) {
        this.interpret = interpret;
        this.date = date;
        this.price = price;
        
    }
}


  const inputFeld: HTMLInputElement = <HTMLInputElement>document.getElementById("input-Element");
  const loadButton: HTMLElement = <HTMLButtonElement>document.getElementById("load-button");
  const saveButton: HTMLElement = <HTMLButtonElement>document.getElementById("save-button");
  const display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");

  const interpretInput: HTMLInputElement = <HTMLInputElement>document.getElementById("interpret");
  const datetimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("datetime");
  const priceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("price");
  const entereventButton: HTMLElement = <HTMLButtonElement>document.getElementById("enterevent");
  const eventliste: HTMLElement = <HTMLElement>document.getElementById("eventliste");

  let elementID: number = 0;

  loadButton.addEventListener("click", loadButtonHandler);
  saveButton.addEventListener("click", saveButtonHandler);
  entereventButton.addEventListener("click", enterEvent);
  eventliste.addEventListener("click", enterEvent);


  function createEvent(interpret: string, price: number, datetime: Date): void {
      let interpretElement: HTMLElement = document.createElement("td");
      let priceElement: HTMLElement = document.createElement("td");
      let datetimeElement: HTMLElement = document.createElement("td");
      let deleteElement: HTMLElement = document.createElement("td");
      let tr: HTMLElement = document.createElement("tr");
      let deleteButton: HTMLElement = document.createElement("button");

      tr.id = "delete" + elementID.toString();
      deleteButton.id = elementID.toString();

      interpretElement.innerText = interpret;
      datetimeElement.innerText = datetime + "";
      priceElement.innerText = price + "";
      deleteButton.innerHTML = "delete";

      deleteElement.append(deleteButton);
      deleteElement.addEventListener("click", deleteevent);

      tr.appendChild(interpretElement);
      tr.appendChild(datetimeElement);
      tr.appendChild(priceElement);
      tr.appendChild(deleteElement);

      eventliste.appendChild(tr);
      elementID++;
  }

  function enterEvent(): void {
    let interpret: string = interpretInput.value;
    let price: number = parseInt(priceInput.value);
    let datetime: Date = new Date(datetimeInput.value);
    console.log(interpret + "\n" + priceInput + "\n" + datetime);

    createEvent(interpret, price, datetime);

    let todoElement: TodoElement = new TodoElement(interpret, datetime, price);
    let json: string = JSON.stringify(todoElement);
    localStorage.setItem(elementID.toString(), json);

}

  function deleteevent(deleteevent: Event): void {

      let eventID: string = (<HTMLElement>deleteevent.target).id;
      let tr: HTMLElement = document.getElementById("delete" + eventID);
      tr.remove();
      localStorage.removeItem(eventID.toString());
  }

  function saveButtonHandler(): void {
      console.log("Save Button clicked");
      console.log("aktuelle Input: " + inputFeld.value);
      localStorage.setItem("gis_praktikum-input", inputFeld.value);
  }

  function loadButtonHandler(): void {
      console.log("Load Button clicked");
      let valueFromLocalStorage: string = localStorage.getItem("gis_praktikum_input");
      console.log("aktueller Wert im Local Storage: " + valueFromLocalStorage);
      display.textContent = valueFromLocalStorage;
  }


  if (localStorage.length > 0) {
    load();
}

  console.log("Test ausführen");

  function load(): void {
    let index: number = 0;
    for (let i: number = 0; i < localStorage.length; i++) {

        while (localStorage.getItem(index.toString()) === null) {

}

        let interpret: string = interpretInput.value;
        let price: number = parseInt(priceInput.value);
        let datetime: Date = new Date(datetimeInput.value);

        interpret = (JSON.parse(localStorage.getItem(i.toString()))).interpret;
        price = (JSON.parse(localStorage.getItem(i.toString()))).price;
        datetime = (JSON.parse(localStorage.getItem(i.toString()))).datetime;

        index++;

        createEvent(interpret, price, datetime);
    }
  }
}