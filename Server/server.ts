import * as http from "http";

namespace CelineServer {

  const hostname: string = "127.0.0.1"; 
  const port: number = 3010; 

  const server: http.Server = http.createServer(
    (request: http.IncomingMessage, response: http.ServerResponse) => {
      

      response.statusCode = 200; 

     
      response.setHeader("Content-Type", "text/plain"); 
      response.setHeader("Access-Control-Allow-Origin", "*"); 
    

      let url: URL = new URL(request.url || "", `http://${request.headers.host}`); 

      if (url.pathname === "/") {
        response.write("Server erreichbar");
    }
      else if (request.method === "GET") {
    let date: Date = new Date(JSON.parse(url.searchParams.get("b")))
    response.write("Day: " + date.getDay() + "," + "Month:" + date.getMonth() + "," + "Year:" +  date.getFullYear());
    } else {
        response.statusCode = 404;
    }
      response.end(); 
    }
  );


  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`); 
  });
}
