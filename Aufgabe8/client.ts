namespace CelinesAbgabe {

    interface TodoElement {

        interpret: string;
        price: number;
        date: Date;
    }
    

    const interpretInput: HTMLInputElement = <HTMLInputElement>document.getElementById("interpret");
    const datetimeInput: HTMLInputElement = <HTMLInputElement>document.getElementById("datetime");
    const priceInput: HTMLInputElement = <HTMLInputElement>document.getElementById("price");
    const entereventButton: HTMLElement = <HTMLButtonElement>document.getElementById("enterevent");
    const eventtabelle: HTMLElement = <HTMLElement>document.getElementById("eventtabelle");


    entereventButton.addEventListener("click", enterEvent);
    load();


 

    async function enterEvent(): Promise<void> {

        let interpret: string = interpretInput.value;
        let price: number = parseInt(priceInput.value);
        let date: Date = new Date(datetimeInput.value);
        console.log(interpret + "\n" + priceInput + "\n" + date);

        let event: TodoElement = {
            interpret,
            price,
            date
        };
        
        await versenden(event);

        createEvent(interpret, price, date);
    }

    
    function createEvent(interpret: string, price: number, datetime: Date): void {
        let tr: HTMLElement = document.createElement("tr");
        let interpretElement: HTMLElement = document.createElement("td");
        let priceElement: HTMLElement = document.createElement("td");
        let datetimeElement: HTMLElement = document.createElement("td");
        
        interpretElement.innerText = interpret;
        priceElement.innerText = price + "";
        datetimeElement.innerText = datetime + "";
        
        tr.appendChild(interpretElement);
        tr.appendChild(priceElement);
        tr.appendChild(datetimeElement);
       

        eventtabelle.appendChild(tr);
    }

    async function versenden(event: TodoElement): Promise<void> {
        
        await fetch("http://localhost:3200/concertEvents", {
            method: "post",
            
            body: JSON.stringify(event)
        });

    }   
    async function load(): Promise<void> {

        let events: TodoElement[];
        
        let response: Response = await fetch("http://localhost:3200/concertEvents", {
            method: "GET"
        });
        events = JSON.parse(await response.text());

        for (let i: number = 0; i < events.length; i++) {
            createEvent(events[i].interpret, events[i].price, events[i].date);
        }

    }

}
