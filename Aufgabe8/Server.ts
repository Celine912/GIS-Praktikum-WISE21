import * as http from "http";
import * as mongo from "mongodb";

const hostname: string = "127.0.0.1"; // localhost
const port: number = 3200;

const mongoUrl: string = "mongodb://localhost:27017"; // URL zur MongoDB-Datenbank
let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl); // Inszanziierung de MongoClients

const server: http.Server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.statusCode = 200;
    // response.setHeader("Content-Type", "text/plain");
    response.setHeader("Access-Control-Allow-Origin", "*"); // bei CORS Fehler
    let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

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
            let input: string;
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
   
async function dbSet(event: string) {
  await mongoClient.db("Eventdatenbank").collection("Enterevent").insertOne(JSON.parse(event));
  mongoClient.close();
}
async function dbGet(): Promise<string> {
  let result = await mongoClient.db("Eventdatenbank").collection("Enterevent").find().toArray();
  mongoClient.close();
  return JSON.stringify(result);
}
// Funktion zu auslesen der Datenbank
async function dbFind(
  db: string,
  collection: string,
  requestObject: any,
  response: http.ServerResponse
) {
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