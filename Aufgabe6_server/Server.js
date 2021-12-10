"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
var CelineServer;
(function (CelineServer) {
    const hostname = "127.0.0.1";
    const port = 3010;
    const server = http.createServer((request, response) => {
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/plain");
        response.setHeader("Access-Control-Allow-Origin", "*");
        let url = new URL(request.url || "", `http://${request.headers.host}`);
        if (url.pathname === "/") {
            response.write("Server erreichbar");
        }
        else if (request.method === "GET") {
            let date = new Date(JSON.parse(url.searchParams.get("b")));
            response.write("Day: " + date.getDay() + "," + "Month:" + date.getMonth() + "," + "Year:" + date.getFullYear());
        }
        else {
            response.statusCode = 404;
        }
        response.end();
    });
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
})(CelineServer || (CelineServer = {}));
//# sourceMappingURL=server.js.map