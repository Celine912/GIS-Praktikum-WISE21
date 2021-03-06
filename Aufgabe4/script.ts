import * as mongo from "mongodb";

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


  const inputFeld: HTMLInputElement = <HTMLInputElement>document.getElementById("input-element");
  const saveButton: HTMLElement = <HTMLButtonElement>document.getElementById("save-button");
  const loadButton: HTMLElement = <HTMLButtonElement>document.getElementById("load-button");
  const display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");

  const interpretInput: HTMLInputElement = <HTMLInputElement>document.getElementById("interpret");
  const datetimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("datetime");
  const priceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("price");
  const entereventButton: HTMLElement = <HTMLButtonElement>document.getElementById("enterevent");
  const eventtabelle: HTMLElement = <HTMLElement>document.getElementById("eventtabelle");

  let elementID: number = 0;

  saveButton.addEventListener("click", saveButtonHandler);
  loadButton.addEventListener("click", loadButtonHandler);
  entereventButton.addEventListener("click", enterEvent);

  if (localStorage.length > 0) {
      load();
  }

  console.log("Test");

  function load(): void {
      let key: number = 0;
      for (let i: number = 0; i < localStorage.length; i++) {

          let interpret: string;
          let price: number;
          let date: Date;

          while (localStorage.getItem(key.toString()) === null) {
              key++;
          }

          interpret = (JSON.parse(localStorage.getItem(key.toString()))).interpret;
          price = (JSON.parse(localStorage.getItem(key.toString()))).price;        
          date = new Date((JSON.parse(localStorage.getItem(key.toString()))).date);

          localStorage.removeItem(key.toString());
          localStorage.setItem(i.toString(), JSON.stringify(new TodoElement(interpret, price, date)));

          createEvent(interpret, price, date);
          key++;
      }
  }

  function enterEvent(): void {
      let interpret: string = interpretInput.value;
      let price: number = parseInt(priceInput.value);
      let datetime: Date = new Date(datetimeInput.value);
      console.log(interpret + "\n" + priceInput + "\n" + datetime);

      let todoElement: TodoElement = new TodoElement(interpret, price, datetime);
      let json: string = JSON.stringify(todoElement);
      localStorage.setItem(elementID.toString(), json);

      createEvent(interpret, price, datetime);
  }

  function createEvent(interpret: string, price: number, datetime: Date): void {
      let tr: HTMLElement = document.createElement("tr");
      let interpretElement: HTMLElement = document.createElement("td");
      let priceElement: HTMLElement = document.createElement("td");
      let datetimeElement: HTMLElement = document.createElement("td");
      let l??schenElement: HTMLElement = document.createElement("td");
      let l??schenButton: HTMLElement = document.createElement("button");

      tr.id = "l??schen" + elementID.toString();
      l??schenButton.id = elementID.toString();

      interpretElement.innerText = interpret;
      priceElement.innerText = price + "";
      datetimeElement.innerText = datetime + "";
      l??schenButton.innerHTML = "l??schen";

      l??schenElement.append(l??schenButton);
      l??schenElement.addEventListener("click", eventL??schen);

      tr.appendChild(interpretElement);
      tr.appendChild(priceElement);
      tr.appendChild(datetimeElement);
      tr.appendChild(l??schenElement);

      eventtabelle.appendChild(tr);
      elementID++;
  }

  function eventL??schen(eventL??schen: Event): void {

      let eventID: string = (<HTMLElement>eventL??schen.target).id;
      console.log(eventID);
      let tr: HTMLElement = document.getElementById("l??schen" + eventID);
      localStorage.removeItem(eventID.toString());
      tr.remove();
  }

  function saveButtonHandler(): void {
      console.log("Save Button clicked");
      console.log("aktuelle Input: " + inputFeld.value);
      localStorage.setItem("Abgabe4", inputFeld.value);
  }

  function loadButtonHandler(): void {
      console.log("Load Button clicked");
      let valueFromLocalStorage: string = localStorage.getItem("Abgabe4");
      console.log("aktueller Wert im Local Storage: " + valueFromLocalStorage);
      display.textContent = valueFromLocalStorage;
  }
}