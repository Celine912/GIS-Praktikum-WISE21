"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1"; // localhost
const port = 3200;
const mongoUrl = "mongodb://localhost:27017"; // URL zur MongoDB-Datenbank
let mongoClient = new mongo.MongoClient(mongoUrl); // Inszanziierung de MongoClients
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    // response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    switch (url.pathname) {
        case "/concertEvents":
            switch (request.method) {
                case "GET":
                    await mongoClient.connect();
                    response.end(await dbGet());
                    console.log("GET");
                    response.end();
                    break;
                case "POST":
                    let input;
                    request.on("data", (data) => {
                        input += data;
                    });
                    request.on("end", async () => {
                        input = input.replace("undefined", "");
                        await mongoClient.connect();
                        console.log("POST");
                        await dbSet(input);
                        response.end();
                    });
                    break;
                default:
                    break;
            }
            break;
        default:
            response.statusCode = 404;
            break;
    }
});
async function dbSet(event) {
    await mongoClient.db("Eventdatenbank").collection("Enterevent").insertOne(JSON.parse(event));
    mongoClient.close();
}
async function dbGet() {
    let result = await mongoClient.db("Eventdatenbank").collection("Enterevent").find().toArray();
    mongoClient.close();
    return JSON.stringify(result);
}
// Funktion zu auslesen der Datenbank
async function dbFind(db, collection, requestObject, response) {
    let result = await mongoClient
        .db(db)
        .collection(collection)
        .find(requestObject)
        .toArray();
    // console.log(result, requestObject); // bei Fehlern zum Testen
    response.setHeader("Content-Type", "application/json");
    response.write(JSON.stringify(result));
}
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
//# sourceMappingURL=Server.js.map