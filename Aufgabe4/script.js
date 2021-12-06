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
    const loadButton = document.getElementById("load-Button");
    const saveButton = document.getElementById("save-Button");
    const display = document.getElementById("display");
    const interpretInput = document.getElementById("interpret");
    const datetimeInput = document.getElementById("datetime");
    const priceInput = document.getElementById("price");
    const entereventButton = document.getElementById("enterevent");
    const eventliste = document.getElementById("eventliste");
    let elementID = 0;
    loadButton.addEventListener("click", loadButtonHandler);
    saveButton.addEventListener("click", saveButtonHandler);
    entereventButton.addEventListener("click", enterEvent);
    eventliste.addEventListener("click", enterEvent);
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
    function saveButtonHandler() {
        console.log("Save Button clicked");
        console.log("aktuelle Input: " + inputFeld.value);
        localStorage.setItem("gis_praktikum-input", inputFeld.value);
    }
    function loadButtonHandler() {
        console.log("Load Button clicked");
        let valueFromLocalStorage = localStorage.getItem("gis_praktikum_input");
        console.log("aktueller Wert im Local Storage: " + valueFromLocalStorage);
        display.textContent = valueFromLocalStorage;
    }
    if (localStorage.getItem(elementID.toString()) !== null) {
        load();
    }
    function load() {
        for (let i = 0; i < localStorage.length; i++) {
            let interpret = interpretInput.value;
            let price = parseInt(priceInput.value);
            let datetime = new Date(datetimeInput.value);
            interpret = (JSON.parse(localStorage.getItem(i.toString()))).interpret;
            price = (JSON.parse(localStorage.getItem(i.toString()))).price;
            datetime = (JSON.parse(localStorage.getItem(i.toString()))).datetime;
            createEvent(interpret, price, datetime);
        }
    }
})(Eventseite || (Eventseite = {}));
//# sourceMappingURL=script.js.map