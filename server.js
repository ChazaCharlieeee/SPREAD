"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { WebSocket, WebSocketServer } = require("ws");

const PORT = Number(process.env.PORT) || 8080;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const MAX_SPREAD_AMOUNT = 1e60;
const ADMIN_SESSION_MS = 12 * 60 * 60 * 1000;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const MAX_LOGIN_ATTEMPTS = 5;
const loginAttemptsByIp = new Map();
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
const COMMANDS_WITH_AMOUNT = new Set(["grant", "remove", "random"]);
const ALLOWED_COMMANDS = new Set([
  ...COMMANDS_WITH_AMOUNT,
  "click-boost",
  "production-boost",
  "every-building",
  "all-upgrades",
  "sugar-frenzy"
]);

if (!ADMIN_USERNAME || ADMIN_USERNAME.length > 80) {
  throw new Error("Set ADMIN_USERNAME to a non-empty value no longer than 80 characters.");
}
if (ADMIN_PASSWORD.length < 12 || ADMIN_PASSWORD.length > 256) {
  throw new Error("Set ADMIN_PASSWORD to a private value between 12 and 256 characters long.");
}

function sendJson(socket, value) {
  if (socket.readyState === WebSocket.OPEN) socket.send(JSON.stringify(value));
}

function sendConnectionCount() {
  const message = JSON.stringify({ type: "status", connectedTabs: webSockets.clients.size });
  webSockets.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) client.send(message);
  });
}

function sendAdminSessionLists() {
  const sessions = Array.from(webSockets.clients)
    .filter((client) => client.readyState === WebSocket.OPEN)
    .map((client) => ({
      id: client.clientId,
      label: `Game tab ${client.clientId.slice(0, 6)}`
    }));

  webSockets.clients.forEach((admin) => {
    if (admin.readyState !== WebSocket.OPEN
      || !admin.adminSessionToken
      || Date.now() >= admin.adminSessionExpiresAt) return;
    sendJson(admin, {
      type: "sessions",
      sessions: sessions.filter((session) => session.id !== admin.clientId)
    });
  });
}

function isAllowedOrigin(origin, request) {
  if (typeof origin !== "string" || !origin) return false;

  let parsedOrigin;
  try {
    parsedOrigin = new URL(origin);
  } catch {
    return false;
  }
  if (parsedOrigin.protocol !== "http:" && parsedOrigin.protocol !== "https:") return false;

  if (ALLOWED_ORIGINS.length) return ALLOWED_ORIGINS.includes(parsedOrigin.origin);
  return parsedOrigin.host === request.headers.host;
}

function safeStringMatches(candidate, expected) {
  if (typeof candidate !== "string" || candidate.length > 256) return false;
  const expectedHash = crypto.createHash("sha256").update(expected, "utf8").digest();
  const candidateHash = crypto.createHash("sha256").update(candidate, "utf8").digest();
  return crypto.timingSafeEqual(candidateHash, expectedHash);
}

function getLoginAttemptState(ip) {
  const now = Date.now();
  let state = loginAttemptsByIp.get(ip);
  if (state && now < state.lockedUntil) return state;
  if (!state || now >= state.windowEndsAt || state.lockedUntil > 0) {
    state = { attempts: 0, windowEndsAt: now + LOGIN_WINDOW_MS, lockedUntil: 0 };
    loginAttemptsByIp.set(ip, state);
  }
  return state;
}

function signIn(socket, request, message) {
  const ip = request.socket.remoteAddress || "unknown";
  const attemptState = getLoginAttemptState(ip);
  if (Date.now() < attemptState.lockedUntil) {
    sendJson(socket, { type: "auth-failed", message: "Too many sign-in attempts. Try again in 15 minutes." });
    return;
  }

  const usernameMatches = safeStringMatches(message.username, ADMIN_USERNAME);
  const passwordMatches = safeStringMatches(message.password, ADMIN_PASSWORD);
  if (!usernameMatches || !passwordMatches) {
    attemptState.attempts++;
    if (attemptState.attempts >= MAX_LOGIN_ATTEMPTS) {
      attemptState.lockedUntil = Date.now() + LOGIN_WINDOW_MS;
    }
    sendJson(socket, {
      type: "auth-failed",
      message: attemptState.lockedUntil
        ? "Too many sign-in attempts. Try again in 15 minutes."
        : "Username or password is incorrect."
    });
    return;
  }

  loginAttemptsByIp.delete(ip);
  const sessionToken = crypto.randomBytes(32).toString("base64url");
  socket.adminSessionToken = sessionToken;
  socket.adminSessionExpiresAt = Date.now() + ADMIN_SESSION_MS;
  sendJson(socket, { type: "auth-ok", sessionToken, expiresAt: socket.adminSessionExpiresAt });
  sendAdminSessionLists();
}

function validateCommand(message) {
  if (!message || typeof message !== "object" || Array.isArray(message)) return null;
  if (message.type !== "admin-command" || !ALLOWED_COMMANDS.has(message.action)) return null;

  if (COMMANDS_WITH_AMOUNT.has(message.action)) {
    const amount = message.payload && message.payload.amount;
    if (!Number.isFinite(amount) || amount <= 0 || amount > MAX_SPREAD_AMOUNT) return null;
    return { action: message.action, payload: { amount } };
  }

  return { action: message.action, payload: {} };
}

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
const webSockets = new WebSocketServer({ noServer: true, maxPayload: 4096 });

server.on("upgrade", (request, socket, head) => {
  let pathname;
  try {
    pathname = new URL(request.url, "http://localhost").pathname;
  } catch {
    socket.write("HTTP/1.1 400 Bad Request\r\n\r\n");
    socket.destroy();
    return;
  }

  if (pathname !== "/live" || !isAllowedOrigin(request.headers.origin, request)) {
    socket.write("HTTP/1.1 403 Forbidden\r\nConnection: close\r\n\r\n");
    socket.destroy();
    return;
  }

  webSockets.handleUpgrade(request, socket, head, (client) => {
    webSockets.emit("connection", client, request);
  });
});

webSockets.on("connection", (socket) => {
  socket.clientId = crypto.randomBytes(6).toString("hex");
  sendConnectionCount();
  sendAdminSessionLists();
  socket.on("message", (data, isBinary) => {
    if (isBinary) {
      sendJson(socket, { type: "error", message: "Binary messages are not supported." });
      return;
    }
    let message;
    try {
      message = JSON.parse(data.toString());
    } catch {
      sendJson(socket, { type: "error", message: "Invalid command format." });
      return;
    }

    if (!message || typeof message !== "object" || Array.isArray(message)) {
      sendJson(socket, { type: "error", message: "Invalid command format." });
      return;
    }

    if (message.type === "login") {
      if (typeof message.username !== "string" || message.username.length > 80
        || typeof message.password !== "string" || message.password.length > 256) {
        sendJson(socket, { type: "auth-failed", message: "Username or password is incorrect." });
        return;
      }
      signIn(socket, request, message);
      return;
    }

    if (message.type === "logout") {
      socket.adminSessionToken = null;
      socket.adminSessionExpiresAt = 0;
      sendJson(socket, { type: "logged-out" });
      return;
    }

    const requestId = typeof message.requestId === "string" ? message.requestId.slice(0, 80) : "";
    if (!socket.adminSessionToken || Date.now() >= socket.adminSessionExpiresAt
      || !safeStringMatches(message.sessionToken, socket.adminSessionToken)) {
      socket.adminSessionToken = null;
      socket.adminSessionExpiresAt = 0;
      sendJson(socket, { type: "error", requestId, message: "Sign in again before sending admin commands." });
      return;
    }

    const command = validateCommand(message);
    if (!command) {
      sendJson(socket, { type: "error", requestId, message: "That admin command is invalid." });
      return;
    }

    if (typeof message.targetClientId !== "string" || !/^[a-f0-9]{12}$/.test(message.targetClientId)) {
      sendJson(socket, { type: "error", requestId, message: "Select an active game tab first." });
      return;
    }

    const target = Array.from(webSockets.clients)
      .find((client) => client.clientId === message.targetClientId);
    if (!target || target === socket || target.readyState !== WebSocket.OPEN) {
      sendJson(socket, { type: "error", requestId, message: "That game tab is no longer connected." });
      sendAdminSessionLists();
      return;
    }

    sendJson(target, { type: "command", ...command });
    sendJson(socket, { type: "sent", requestId, targetClientId: target.clientId });
  });

  socket.on("close", () => {
    sendConnectionCount();
    sendAdminSessionLists();
  });
  socket.on("error", (error) => console.error("A game tab connection failed.", error));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Spread Clicker server listening on port ${PORT}.`);
});
