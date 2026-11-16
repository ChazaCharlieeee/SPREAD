"use strict";

const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");

const PORT = Number(process.env.PORT) || 8080;
const APP_ROOT = __dirname;
const PUBLIC_FILES = new Map([
  ["/", "index.html"],
  ["/index.html", "index.html"],
  ["/Code.js", "Code.js"],
  ["/style.css", "style.css"],
  ["/spread-clicker.jpg", "spread-clicker.jpg"],
  ["/service-worker.js", "service-worker.js"]
]);
const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".jpg": "image/jpeg"
};

function serveApp(request, response) {
  if (request.method !== "GET") {
    response.writeHead(405, { "Allow": "GET", "Cache-Control": "no-store" });
    response.end("Method not allowed.");
    return;
  }

  let pathname;
  try {
    pathname = new URL(request.url, "http://localhost").pathname;
  } catch {
    response.writeHead(400, { "Cache-Control": "no-store" });
    response.end("Invalid request path.");
    return;
  }

  const fileName = PUBLIC_FILES.get(pathname);
  if (!fileName) {
    response.writeHead(404, { "Cache-Control": "no-store" });
    response.end("Not found.");
    return;
  }

  const filePath = path.join(APP_ROOT, fileName);
  fs.readFile(filePath, (error, contents) => {
    if (error) {
      console.error(`Could not read app asset ${fileName}.`, error);
      response.writeHead(500, { "Cache-Control": "no-store" });
      response.end("Could not load the game.");
      return;
    }

    response.writeHead(200, {
      "Content-Type": MIME_TYPES[path.extname(fileName)] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    response.end(contents);
  });
}

const server = http.createServer(serveApp);
server.listen(PORT, "0.0.0.0", () => {
  console.log(`Spread Clicker server listening on port ${PORT}.`);
});
