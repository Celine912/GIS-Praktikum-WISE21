"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const mongo = require("mongodb");
const hostname = "127.0.0.1";
const port = 3010;
let url = "mongodb://localhost:27017";
let mongoClient = new mongo.MongoClient(url);
const server = http.createServer(async (request, response) => {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*");
    let url = new URL(request.url || "", `http://${request.headers.host}`);
    if (url.pathname === "/Enterevent") {
        await mongoClient.connect();
        response.write(await dbGet());
    }
    else if (request.method === "POST") {
        let input;
        request.on("data", (data) => {
            input += data;
        });
        request.on("end", async () => {
            await mongoClient.connect();
            input = input.replace("undefined", "");
            await dbSet(input);
        });
    }
    else {
        response.statusCode = 404;
    }
    mongoClient.close();
    response.end();
});
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
async function dbGet() {
    let result = await mongoClient.db("Eventdatenbank").collection("Enterevent").find().toArray();
    return JSON.stringify(result);
    mongoClient.close();
}
async function dbSet(event) {
    mongoClient.db("Eventdatenbank").collection("Entervent").insertOne(JSON.parse(event));
    mongoClient.close();
}
//# sourceMappingURL=Server.js.map