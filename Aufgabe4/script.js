"use strict";
var Eventseite;
(function (Eventseite) {
    class TodoElement {
        interpret;
        price;
        date;
        constructor(interpret, price, date) {
            this.interpret = interpret;
            this.price = price;
            this.date = date;
        }
    }
    /*const inputFeld: HTMLInputElement = <HTMLInputElement>document.getElementById("input-Element");
    const display: HTMLDivElement = <HTMLDivElement>document.getElementById("display");
    */
    const interpretInput = document.getElementById("interpret");
    const priceInput = document.getElementById("price");
    const datetimeInput = document.getElementById("datetime");
    const entereventButton = document.getElementById("enterevent");
    const eventliste = document.getElementById("eventliste");
    let elementID = 0;
    entereventButton.addEventListener("click", enterEvent);
    if (localStorage.length > 0) {
        load();
    }
    console.log("Test ausführen");
    function load() {
        let index = 1;
        for (let i = 1; i < localStorage.length; i++) {
            while (localStorage.getItem(index.toString()) === null) {
                index++;
            }
            let interpret = (JSON.parse(localStorage.getItem(index.toString()))).interpret;
            let price = (JSON.parse(localStorage.getItem(index.toString()))).price;
            let datetime = (JSON.parse(localStorage.getItem(index.toString()))).datetime;
            createEvent(interpret, price, datetime);
            index++;
        }
    }
    function enterEvent() {
        let interpret = interpretInput.value;
        let price = parseInt(priceInput.value);
        let datetime = new Date(datetimeInput.value);
        console.log(interpret + "\n" + priceInput + "\n" + datetime);
        let todoElement = new TodoElement(interpret, datetime, price);
        let json = JSON.stringify(todoElement);
        localStorage.setItem(elementID.toString(), json);
        createEvent(interpret, price, datetime);
    }
    function createEvent(interpret, price, datetime) {
        let tr = document.createElement("tr");
        let interpretElement = document.createElement("td");
        let priceElement = document.createElement("td");
        let datetimeElement = document.createElement("td");
        let deleteElement = document.createElement("td");
        let deleteButton = document.createElement("button");
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
    function deleteevent(deleteevent) {
        let eventID = deleteevent.target.id;
        let tr = document.getElementById("delete" + eventID);
        tr.remove();
        localStorage.removeItem(eventID.toString());
    }
})(Eventseite || (Eventseite = {}));
//# sourceMappingURL=script.js.map