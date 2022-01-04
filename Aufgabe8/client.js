"use strict";
var CelinesAbgabe;
(function (CelinesAbgabe) {
    const interpretInput = document.getElementById("interpret");
    const datetimeInput = document.getElementById("datetime");
    const priceInput = document.getElementById("price");
    const entereventButton = document.getElementById("enterevent");
    const eventtabelle = document.getElementById("eventtabelle");
    entereventButton.addEventListener("click", enterEvent);
    load();
    async function load() {
        let events;
        let response = await fetch("http://localhost:3010" + "/Enterevent", {
            method: "get"
        });
        events = JSON.parse(await response.text());
        for (let i = 0; i < events.length; i++) {
            createEvent(events[i].interpret, events[i].price, events[i].date);
        }
    }
    async function enterEvent() {
        let interpret = interpretInput.value;
        let price = parseInt(priceInput.value);
        let date = new Date(datetimeInput.value);
        console.log(interpret + "\n" + priceInput + "\n" + date);
        let event = {
            interpret,
            price,
            date
        };
        await versenden(event);
        createEvent(interpret, price, date);
    }
    async function versenden(event) {
        await fetch("http://localhost:3010/Enterevent", {
            method: "post",
            body: JSON.stringify(event),
        });
    }
    function createEvent(interpret, price, datetime) {
        let tr = document.createElement("tr");
        let interpretElement = document.createElement("td");
        let priceElement = document.createElement("td");
        let datetimeElement = document.createElement("td");
        interpretElement.innerText = interpret;
        priceElement.innerText = price + "";
        datetimeElement.innerText = datetime + "";
        tr.appendChild(interpretElement);
        tr.appendChild(priceElement);
        tr.appendChild(datetimeElement);
        eventtabelle.appendChild(tr);
    }
})(CelinesAbgabe || (CelinesAbgabe = {}));
//# sourceMappingURL=client.js.map