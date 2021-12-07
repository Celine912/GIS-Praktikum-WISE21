"use strict";
var Eventseite;
(function (Eventseite) {
    class TodoElement {
        interpret;
        date;
        price;
        constructor(interpret, date, price) {
            this.interpret = interpret;
            this.date = date;
            this.price = price;
        }
    }
    const inputFeld = document.getElementById("input-Element");
    const display = document.getElementById("display");
    const interpretInput = document.getElementById("interpret");
    const datetimeInput = document.getElementById("datetime");
    const priceInput = document.getElementById("price");
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
            let interpret = (JSON.parse(localStorage.getItem(i.toString()))).interpret;
            let price = (JSON.parse(localStorage.getItem(i.toString()))).price;
            let datetime = (JSON.parse(localStorage.getItem(i.toString()))).datetime;
            createEvent(interpret, price, datetime);
            index++;
        }
    }
    function createEvent(interpret, price, datetime) {
        let interpretElement = document.createElement("td");
        let priceElement = document.createElement("td");
        let datetimeElement = document.createElement("td");
        let deleteElement = document.createElement("td");
        let tr = document.createElement("tr");
        let deleteButton = document.createElement("button");
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
    function enterEvent() {
        let interpret = interpretInput.value;
        let price = parseInt(priceInput.value);
        let datetime = new Date(datetimeInput.value);
        console.log(interpret + "\n" + priceInput + "\n" + datetime);
        createEvent(interpret, price, datetime);
        let todoElement = new TodoElement(interpret, datetime, price);
        let json = JSON.stringify(todoElement);
        localStorage.setItem(elementID.toString(), json);
    }
    function deleteevent(deleteevent) {
        let eventID = deleteevent.target.id;
        let tr = document.getElementById("delete" + eventID);
        tr.remove();
        localStorage.removeItem(eventID.toString());
    }
})(Eventseite || (Eventseite = {}));
//# sourceMappingURL=script.js.map