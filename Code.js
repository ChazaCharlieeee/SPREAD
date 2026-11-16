"use strict";

const SAVE_KEY = "cookie_clicker_save_v1";
const REMOTE_URL_KEY = "spread_clicker_remote_server_v1";

const BUILDINGS = [
  { id: "cursor", name: "Spread Cursor", icon: "👆", cost: 15, cps: 0.1, desc: "Clicks the spread for you." },
  { id: "grandma", name: "Spread Grandma", icon: "👵", cost: 100, cps: 1, desc: "A nice grandma to make more spreads." },
  { id: "farm", name: "Spread Farm", icon: "🌾", cost: 1100, cps: 8, desc: "Grows fresh spreads in the fields." },
  { id: "mine", name: "Spread Mine", icon: "⛏️", cost: 12000, cps: 47, desc: "Mines ingredients for your spreads." },
  { id: "factory", name: "Spread Factory", icon: "🏭", cost: 130000, cps: 260, desc: "Mass-produces freshly made spreads." },
  { id: "bank", name: "Spread Bank", icon: "🏦", cost: 1400000, cps: 1400, desc: "Makes your spread earn interest." },
  { id: "temple", name: "Spread Temple", icon: "🏛️", cost: 20000000, cps: 7800, desc: "A sacred place of spread worship." },
  { id: "lab", name: "Spread Lab", icon: "🧪", cost: 330000000, cps: 44000, desc: "Discovers new ways to make spreads." },
  { id: "portal", name: "Spread Portal", icon: "🌀", cost: 5100000000, cps: 260000, desc: "Brings spreads in from somewhere else." },
  { id: "galaxy", name: "Spread Galaxy", icon: "🌌", cost: 75000000000, cps: 1600000, desc: "Turns an entire galaxy into a spread factory." },
  { id: "dimension", name: "Spread Dimension", icon: "🔮", cost: 1100000000000, cps: 10000000, desc: "Makes spreads across dimensions." },
  { id: "time-machine", name: "Spread Time Machine", icon: "⏳", cost: 14000000000000, cps: 77000000, desc: "Borrows spreads from the future." },
  { id: "antimatter", name: "Spread Antimatter Condenser", icon: "⚛️", cost: 170000000000000, cps: 430000000, desc: "Condenses antimatter into pure spread." },
  { id: "prism", name: "Spread Prism", icon: "🔺", cost: 2100000000000000, cps: 2900000000, desc: "Turns light itself into spreads." },
  { id: "chancemaker", name: "Spread Chancemaker", icon: "🎲", cost: 26000000000000000, cps: 21000000000, desc: "Takes a chance and wins more spreads." },
  { id: "fractal-engine", name: "Spread Fractal Engine", icon: "🧬", cost: 310000000000000000, cps: 150000000000, desc: "Makes tiny spread makers that make more spread makers." },
  { id: "spreadster", name: "Spreadster", icon: "📻", cost: 4200000000000000000, cps: 800000000000, desc: "Broadcasts fresh spreads to everyone." },
  { id: "spreadsheet", name: "Spreadsheet", icon: "📊", cost: 58000000000000000000, cps: 4500000000000, desc: "Organizes spreads into perfectly productive rows." },
  { id: "spreadstergram", name: "Spreadstergram", icon: "📸", cost: 850000000000000000000, cps: 29000000000000, desc: "Shares spreads so fast they make more spreads." }
];

const UPGRADES = [
  { id: "strong-fingers", name: "Spread Strong Fingers", icon: "💪", cost: 50, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 10, type: "click", mult: 2 },
  { id: "grandmas-rolling-pin", name: "Spread Rolling Pins", icon: "🧑‍🍳", cost: 500, desc: "Grandmas make spreads twice as fast.", req: (s) => (s.buildings.grandma || 0) >= 1, type: "building", target: "grandma", mult: 2 },
  { id: "butter-cookie", name: "Spread Butter", icon: "🧈", cost: 1000, desc: "Double spreads per click again.", req: (s) => s.totalCookies >= 500, type: "click", mult: 2 },
  { id: "fertilizer", name: "Spread Magic Fertilizer", icon: "🌱", cost: 5500, desc: "Spread farms are twice as productive.", req: (s) => (s.buildings.farm || 0) >= 1, type: "building", target: "farm", mult: 2 },
  { id: "chocolate-chips", name: "Spread Extra Toppings", icon: "🍫", cost: 12000, desc: "Double spreads per click once more.", req: (s) => s.totalClicks >= 100, type: "click", mult: 2 },
  { id: "laser-drills", name: "Spread Laser Drills", icon: "🔦", cost: 60000, desc: "Spread mines are twice as productive.", req: (s) => (s.buildings.mine || 0) >= 1, type: "building", target: "mine", mult: 2 },
  { id: "sugar-rush", name: "Spread Sugar Rush", icon: "🍬", cost: 100000, desc: "Your clicks are extra sweet.", req: (s) => s.totalCookies >= 50000, type: "click", mult: 3 },
  { id: "robot-bakers", name: "Spread Robot Makers", icon: "🤖", cost: 650000, desc: "Spread factories are twice as productive.", req: (s) => (s.buildings.factory || 0) >= 1, type: "building", target: "factory", mult: 2 },
  { id: "interest", name: "Spread Compound Interest", icon: "💰", cost: 7000000, desc: "Spread banks are twice as productive.", req: (s) => (s.buildings.bank || 0) >= 1, type: "building", target: "bank", mult: 2 },
  { id: "lab-research", name: "Spread Research", icon: "🔬", cost: 990000000, desc: "Spread Labs are twice as productive.", req: (s) => (s.buildings.lab || 0) >= 1, type: "building", target: "lab", mult: 2 },
  { id: "portal-stabilizer", name: "Spread Stabilizer", icon: "🪄", cost: 15300000000, desc: "Spread Portals are twice as productive.", req: (s) => (s.buildings.portal || 0) >= 1, type: "building", target: "portal", mult: 2 },
  { id: "galactic-spread", name: "Spread Galactic Boost", icon: "🌠", cost: 225000000000, desc: "Spread Galaxies are twice as productive.", req: (s) => (s.buildings.galaxy || 0) >= 1, type: "building", target: "galaxy", mult: 2 },
  { id: "dimensional-spread", name: "Spread Dimension Boost", icon: "💫", cost: 3300000000000, desc: "Spread Dimensions are twice as productive.", req: (s) => (s.buildings.dimension || 0) >= 1, type: "building", target: "dimension", mult: 2 },
  { id: "time-tuner", name: "Spread Time Tuner", icon: "⌚", cost: 42000000000000, desc: "Spread Time Machines are twice as productive.", req: (s) => (s.buildings["time-machine"] || 0) >= 1, type: "building", target: "time-machine", mult: 2 },
  { id: "antimatter-coils", name: "Spread Antimatter Coils", icon: "🧲", cost: 510000000000000, desc: "Spread Antimatter Condensers are twice as productive.", req: (s) => (s.buildings.antimatter || 0) >= 1, type: "building", target: "antimatter", mult: 2 },
  { id: "prismatic-lenses", name: "Spread Prismatic Lenses", icon: "🌈", cost: 6300000000000000, desc: "Spread Prisms are twice as productive.", req: (s) => (s.buildings.prism || 0) >= 1, type: "building", target: "prism", mult: 2 },
  { id: "lucky-dice", name: "Spread Lucky Dice", icon: "🎰", cost: 78000000000000000, desc: "Spread Chancemakers are twice as productive.", req: (s) => (s.buildings.chancemaker || 0) >= 1, type: "building", target: "chancemaker", mult: 2 },
  { id: "fractal-blueprints", name: "Spread Fractal Blueprints", icon: "🧩", cost: 930000000000000000, desc: "Spread Fractal Engines are twice as productive.", req: (s) => (s.buildings["fractal-engine"] || 0) >= 1, type: "building", target: "fractal-engine", mult: 2 },
  { id: "spreadster-amplifier", name: "Spreadster Amplifier", icon: "📡", cost: 12600000000000000000, desc: "Spreadsters make twice as many spreads each second.", req: (s) => (s.buildings.spreadster || 0) >= 1, type: "building", target: "spreadster", mult: 2 },
  { id: "spreadsheet-formulas", name: "Spreadsheet Formulas", icon: "🧮", cost: 174000000000000000000, desc: "Spreadsheets make twice as many spreads each second.", req: (s) => (s.buildings.spreadsheet || 0) >= 1, type: "building", target: "spreadsheet", mult: 2 },
  { id: "spreadstergram-filters", name: "Spreadstergram Filters", icon: "🌈", cost: 2550000000000000000000, desc: "Spreadstergrams make twice as many spreads each second.", req: (s) => (s.buildings.spreadstergram || 0) >= 1, type: "building", target: "spreadstergram", mult: 2 }
];

const ACHIEVEMENTS = [
  { id: "first-cookie", icon: "✨", name: "First spread", desc: "Make your first spread.", check: (s) => s.totalClicks >= 1 },
  { id: "busy-hands", icon: "👆", name: "Busy hands", desc: "Make 100 clicks.", check: (s) => s.totalClicks >= 100 },
  { id: "dozen", icon: "🥣", name: "Making a batch", desc: "Make 1,000 spreads total.", check: (s) => s.totalCookies >= 1000 },
  { id: "cookie-mogul", icon: "🧁", name: "Spread mogul", desc: "Make 100,000 spreads total.", check: (s) => s.totalCookies >= 100000 },
  { id: "sweet-empire", icon: "🏰", name: "Spread empire", desc: "Make 10 million spreads total.", check: (s) => s.totalCookies >= 10000000 },
  { id: "big-bakery", icon: "🏠", name: "Big spreadery", desc: "Own 25 buildings.", check: (s) => getBuildingCount(s) >= 25 },
  { id: "spread-billionaire", icon: "💎", name: "Spread Billionaire", desc: "Make 1 billion spreads total.", check: (s) => s.totalCookies >= 1000000000 },
  { id: "spread-collector", icon: "🏪", name: "Spread Collector", desc: "Own 50 buildings.", check: (s) => getBuildingCount(s) >= 50 }
];

const HEADLINES = [
  { min: 0, text: "Fresh spreads, straight from the jar." },
  { min: 50, text: "Local spread maker's jar mysteriously starts refilling itself." },
  { min: 500, text: "Grandmas everywhere report a sudden rise in spread demand." },
  { min: 5000, text: "Spread farms flourish as the world's taste for spreads grows." },
  { min: 50000, text: "Experts confirm: there is no such thing as too many spreads." },
  { min: 500000, text: "Your spreadery is now visible from space." }
];

function createDefaultState() {
  return {
    cookies: 0,
    totalCookies: 0,
    totalClicks: 0,
    playTimeSeconds: 0,
    buildings: {},
    upgrades: [],
    achievements: [],
    soundEnabled: true,
    lastSaved: Date.now()
  };
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createDefaultState();
    const saved = JSON.parse(raw);
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) throw new Error("Save data is not an object.");
    const defaults = createDefaultState();
    const state = { ...defaults, ...saved };
    delete state.goldenCaught;
    ["cookies", "totalCookies", "totalClicks", "playTimeSeconds", "lastSaved"].forEach((key) => {
      if (!Number.isFinite(state[key]) || state[key] < 0) state[key] = defaults[key];
    });
    if (!state.buildings || typeof state.buildings !== "object" || Array.isArray(state.buildings)) state.buildings = {};
    if (!Array.isArray(state.upgrades)) state.upgrades = [];
    if (!Array.isArray(state.achievements)) state.achievements = [];
    state.achievements = state.achievements.filter((id) => id !== "golden-touch");
    state.soundEnabled = Boolean(state.soundEnabled);
    return state;
  } catch (error) {
    console.warn("Could not load the game save; starting a fresh game.", error);
    return createDefaultState();
  }
}

let state = loadGame();
let frenzyMultiplier = 1;
let frenzyEndTime = 0;
let audioContext = null;
let clickBoostEndTime = 0;
let productionBoostEndTime = 0;
let lastFrameTime = performance.now();
let unlockCheckTime = 0;
let shopRenderTime = 0;
let spreadAnimationTimer;
let cheatInput = "";
const SPREAD_CHEAT_CODE = "Charlie12032012";
let remoteSocket = null;
let remoteConnectionWanted = false;
let remoteEndpoint = "";
let remoteReconnectTimer = 0;
let remoteRequestCounter = 0;
let remoteAddressSaved = true;
let remoteAuthToken = null;
let pendingAdminCredentials = null;
let remoteSessions = [];
let selectedRemoteClientId = null;

const els = {
  cookieCount: document.getElementById("cookie-count"),
  cps: document.getElementById("cps-display"),
  cpc: document.getElementById("cpc-display"),
  total: document.getElementById("stat-total"),
  clicks: document.getElementById("stat-clicks"),
  time: document.getElementById("stat-time"),
  cookieButton: document.getElementById("cookie-btn"),
  upgrades: document.getElementById("upgrades-container"),
  buildings: document.getElementById("buildings-container"),
  achievements: document.getElementById("achievements-container"),
  achievementCount: document.getElementById("achievements-count"),
  toastContainer: document.getElementById("toast-container"),
  news: document.getElementById("news-text"),
  frenzyBanner: document.getElementById("frenzy-banner"),
  frenzyTimer: document.getElementById("frenzy-timer"),
  soundButton: document.getElementById("toggle-sfx-btn"),
  resetButton: document.getElementById("reset-btn"),
  buildingSummary: document.getElementById("building-summary"),
  adminPanel: document.getElementById("admin-panel"),
  adminClose: document.getElementById("admin-close"),
  adminAmount: document.getElementById("admin-amount"),
  adminAdd: document.getElementById("admin-add"),
  adminRemove: document.getElementById("admin-remove"),
  adminRandom: document.getElementById("admin-random"),
  adminClickBoost: document.getElementById("admin-click-boost"),
  adminProductionBoost: document.getElementById("admin-production-boost"),
  adminEveryBuilding: document.getElementById("admin-every-building"),
  adminAllUpgrades: document.getElementById("admin-all-upgrades"),
  adminSugarFrenzy: document.getElementById("admin-sugar-frenzy"),
  clickBoostStatus: document.getElementById("click-boost-status"),
  productionBoostStatus: document.getElementById("production-boost-status"),
  adminStatus: document.getElementById("admin-status"),
  adminLogin: document.getElementById("admin-login"),
  adminTools: document.getElementById("admin-tools"),
  adminUsername: document.getElementById("admin-username"),
  adminPassword: document.getElementById("admin-password"),
  adminLoginSubmit: document.getElementById("admin-login-submit"),
  adminLogout: document.getElementById("admin-logout"),
  adminLocalTarget: document.getElementById("admin-local-target"),
  adminTargetStatus: document.getElementById("admin-target-status"),
  adminScopeTitle: document.getElementById("admin-scope-title"),
  remoteSessionList: document.getElementById("remote-session-list"),
  remoteSessionsEmpty: document.getElementById("remote-sessions-empty"),
  remoteEndpoint: document.getElementById("remote-endpoint"),
  remoteLoginStatus: document.getElementById("remote-login-status"),
  remoteStatus: document.getElementById("remote-status"),
  remoteClientCount: document.getElementById("remote-client-count")
};

function formatNumber(value) {
  if (!Number.isFinite(value)) return "0";
  if (value < 1000) return Math.floor(value).toLocaleString();
  const suffixes = [
    "", "K", "M", "B", "T", "Qa", "Qi", "Sextillion", "Septillion",
    "Octillion", "Nonillion", "Decillion", "Undecillion", "Duodecillion",
    "Tredecillion", "Quattuordecillion", "Quindecillion", "Sexdecillion",
    "Septendecillion", "Octodecillion", "Novemdecillion"
  ];
  const tier = Math.floor(Math.log10(value) / 3);
  if (tier >= suffixes.length) return value.toExponential(2);
  const scaled = value / Math.pow(1000, tier);
  const formatted = scaled.toFixed(scaled >= 100 ? 1 : 2);
  return suffixes[tier] ? `${formatted} ${suffixes[tier]}` : formatted;
}

function formatRate(value) {
  if (value < 1000) return value < 10 ? value.toFixed(1) : Math.floor(value).toLocaleString();
  return formatNumber(value);
}

function formatTime(seconds) {
  const total = Math.floor(seconds);
  if (total < 60) return `${total}s`;
  const minutes = Math.floor(total / 60);
  if (minutes < 60) return `${minutes}m ${total % 60}s`;
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

function getBuildingCount(game = state) {
  return Object.values(game.buildings).reduce((sum, count) => sum + (Number.isFinite(count) ? count : 0), 0);
}

function getBuildingCost(building) {
  return Math.floor(building.cost * Math.pow(1.15, state.buildings[building.id] || 0));
}

function getBuildingMultiplier(id) {
  return UPGRADES.filter((upgrade) => upgrade.type === "building" && upgrade.target === id && state.upgrades.includes(upgrade.id))
    .reduce((multiplier, upgrade) => multiplier * upgrade.mult, 1);
}

function getCookiesPerSecond() {
  const boost = Date.now() < productionBoostEndTime ? 2 : 1;
  return BUILDINGS.reduce((sum, building) => sum + (state.buildings[building.id] || 0) * building.cps * getBuildingMultiplier(building.id), 0) * frenzyMultiplier * boost;
}

function getCookiesPerClick() {
  const multiplier = UPGRADES.filter((upgrade) => upgrade.type === "click" && state.upgrades.includes(upgrade.id))
    .reduce((total, upgrade) => total * upgrade.mult, 1);
  const boost = Date.now() < clickBoostEndTime ? 2 : 1;
  return Math.max(1, Math.floor(multiplier * frenzyMultiplier * boost));
}

function saveGame() {
  state.lastSaved = Date.now();
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error("Could not save your game progress.", error);
    showToast("Your progress could not be saved in this browser.");
  }
}

function setRemoteStatus(message, status = "") {
  const statusElement = remoteAuthToken ? els.remoteStatus : els.remoteLoginStatus;
  statusElement.textContent = message;
  statusElement.dataset.state = status;
}

function updateRemoteTargetUI() {
  const selectedSession = remoteSessions.find((session) => session.id === selectedRemoteClientId);
  els.adminLocalTarget.setAttribute("aria-pressed", String(!selectedSession));
  els.adminTargetStatus.textContent = selectedSession
    ? `Targeting ${selectedSession.label}. Admin actions will affect that tab only.`
    : "Controlling this tab.";
  els.adminScopeTitle.textContent = selectedSession
    ? `Controls apply to ${selectedSession.label}.`
    : "Controls apply to this tab.";
  els.remoteSessionList.querySelectorAll("[data-session-id]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.sessionId === selectedRemoteClientId));
  });
}

function renderRemoteSessions(sessions) {
  const previousSelection = selectedRemoteClientId;
  remoteSessions = sessions.filter((session) =>
    session
    && typeof session.id === "string"
    && /^[a-f0-9]{12}$/.test(session.id)
    && typeof session.label === "string"
  );
  const selectionWasLost = Boolean(previousSelection)
    && !remoteSessions.some((session) => session.id === selectedRemoteClientId);
  if (!remoteSessions.some((session) => session.id === selectedRemoteClientId)) {
    selectedRemoteClientId = null;
  }

  els.remoteSessionList.replaceChildren();
  remoteSessions.forEach((session) => {
    const item = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "admin-action remote-session";
    button.dataset.sessionId = session.id;
    button.textContent = session.label;
    button.setAttribute("aria-pressed", String(session.id === selectedRemoteClientId));
    button.addEventListener("click", () => {
      selectedRemoteClientId = session.id;
      updateRemoteTargetUI();
    });
    item.appendChild(button);
    els.remoteSessionList.appendChild(item);
  });
  els.remoteSessionsEmpty.hidden = remoteSessions.length > 0;
  updateRemoteTargetUI();
  if (selectionWasLost) {
    els.adminTargetStatus.textContent = "The selected game tab disconnected. Local control is selected.";
  }
}

function getDefaultRemoteEndpoint() {
  if (location.protocol !== "http:" && location.protocol !== "https:") return "";
  const url = new URL(location.href);
  url.protocol = location.protocol === "https:" ? "wss:" : "ws:";
  url.pathname = "/live";
  url.search = "";
  url.hash = "";
  return url.href;
}

function connectRemote(endpointText = "") {
  const candidate = endpointText.trim() || els.remoteEndpoint.value.trim() || getDefaultRemoteEndpoint();
  if (!candidate) {
    setRemoteStatus("Enter the secure WebSocket address from your hosted server.", "error");
    return;
  }

  let url;
  try {
    url = new URL(candidate);
  } catch {
    setRemoteStatus("Enter a valid WebSocket address.", "error");
    return;
  }

  if (url.protocol !== "ws:" && url.protocol !== "wss:") {
    setRemoteStatus("The address must start with ws:// or wss://.", "error");
    return;
  }
  if ((location.protocol === "https:" || location.protocol === "file:") && url.protocol !== "wss:") {
    setRemoteStatus("Use wss:// so the admin key is sent over an encrypted connection.", "error");
    return;
  }
  const isLoopback = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
  if (url.protocol === "ws:" && !isLoopback) {
    setRemoteStatus("Use wss:// for remote servers so the admin key is encrypted.", "error");
    return;
  }
  if (url.username || url.password || url.search || url.hash) {
    setRemoteStatus("Remove credentials, query text, and fragments from the address.", "error");
    return;
  }
  if (url.pathname === "/") url.pathname = "/live";
  if (url.pathname !== "/live") {
    setRemoteStatus("The server address must use the /live path.", "error");
    return;
  }

  const normalizedEndpoint = url.href;
  if (remoteSocket && remoteEndpoint === normalizedEndpoint) {
    remoteConnectionWanted = true;
    if (remoteSocket.readyState === WebSocket.OPEN) sendRemoteLogin();
    return;
  }
  if (remoteSocket) {
    const previousSocket = remoteSocket;
    remoteSocket = null;
    previousSocket.close();
  }

  remoteEndpoint = normalizedEndpoint;
  els.remoteEndpoint.value = remoteEndpoint;
  remoteConnectionWanted = true;
  window.clearTimeout(remoteReconnectTimer);
  try {
    localStorage.setItem(REMOTE_URL_KEY, remoteEndpoint);
    remoteAddressSaved = true;
  } catch (error) {
    console.warn("Could not save the remote server address.", error);
    remoteAddressSaved = false;
  }
  openRemoteSocket(remoteEndpoint);
}

function openRemoteSocket(endpoint) {
  if (!remoteConnectionWanted) return;
  if (typeof WebSocket !== "function") {
    setRemoteStatus("This browser does not support WebSocket connections.", "error");
    return;
  }

  setRemoteStatus("Connecting…");
  let socket;
  try {
    socket = new WebSocket(endpoint);
  } catch (error) {
    console.error("Could not connect to the remote game server.", error);
    setRemoteStatus("Could not open the connection; retrying…", "error");
    scheduleRemoteReconnect(endpoint);
    return;
  }
  remoteSocket = socket;

  socket.addEventListener("open", () => {
    if (remoteSocket !== socket) return;
    setRemoteStatus(remoteAddressSaved ? "Connected. Sign in to unlock admin controls." : "Connected, but this browser could not save the server address.", "connected");
    if (pendingAdminCredentials) sendRemoteLogin();
  });
  socket.addEventListener("message", (event) => {
    if (remoteSocket !== socket) return;
    let message;
    try {
      message = JSON.parse(event.data);
    } catch (error) {
      console.error("The remote server sent an invalid message.", error);
      setRemoteStatus("The server sent an invalid message.", "error");
      return;
    }

    if (!message || typeof message !== "object" || Array.isArray(message)) {
      setRemoteStatus("The server sent an invalid message.", "error");
      return;
    }

    if (message.type === "status" && Number.isInteger(message.connectedTabs)) {
      els.remoteClientCount.textContent = String(message.connectedTabs);
    } else if (message.type === "sessions" && Array.isArray(message.sessions)) {
      renderRemoteSessions(message.sessions);
    } else if (message.type === "auth-ok" && typeof message.sessionToken === "string") {
      remoteAuthToken = message.sessionToken;
      pendingAdminCredentials = null;
      els.adminPassword.value = "";
      els.adminLogin.hidden = true;
      els.adminTools.hidden = false;
      selectedRemoteClientId = null;
      renderRemoteSessions([]);
      setRemoteStatus("Signed in. Select a connected game tab below to control it.", "connected");
      els.adminLogout.focus();
    } else if (message.type === "auth-failed") {
      pendingAdminCredentials = null;
      els.adminPassword.value = "";
      setRemoteStatus(message.message || "Sign-in failed.", "error");
    } else if (message.type === "sent" && typeof message.requestId === "string") {
      const target = remoteSessions.find((session) => session.id === message.targetClientId);
      setRemoteStatus(`Command sent to ${target ? target.label : "the selected game tab"}.`, "connected");
    } else if (message.type === "error") {
      if (typeof message.message === "string" && message.message.toLowerCase().includes("sign in again")) {
        remoteAuthToken = null;
        els.adminTools.hidden = true;
        els.adminLogin.hidden = false;
        selectedRemoteClientId = null;
        renderRemoteSessions([]);
      }
      setRemoteStatus(message.message || "The server rejected the command.", "error");
    } else if (message.type === "command") {
      applyRemoteAdminCommand(message);
    }
  });
  socket.addEventListener("close", () => {
    if (remoteSocket !== socket) return;
    remoteSocket = null;
    remoteAuthToken = null;
    els.adminTools.hidden = true;
    els.adminLogin.hidden = false;
    selectedRemoteClientId = null;
    renderRemoteSessions([]);
    els.remoteClientCount.textContent = "0";
    if (remoteConnectionWanted) {
      setRemoteStatus("Disconnected. Reconnecting; sign in again when connected.");
      scheduleRemoteReconnect(endpoint);
    } else {
      setRemoteStatus("Not connected");
    }
  });
  socket.addEventListener("error", () => {
    if (remoteSocket === socket) setRemoteStatus("Connection failed; checking the server…", "error");
  });
}

function scheduleRemoteReconnect(endpoint) {
  window.clearTimeout(remoteReconnectTimer);
  remoteReconnectTimer = window.setTimeout(() => {
    if (remoteConnectionWanted) openRemoteSocket(endpoint);
  }, 5000);
}

function sendRemoteLogin() {
  if (!pendingAdminCredentials || !remoteSocket || remoteSocket.readyState !== WebSocket.OPEN) return;
  try {
    remoteSocket.send(JSON.stringify({
      type: "login",
      username: pendingAdminCredentials.username,
      password: pendingAdminCredentials.password
    }));
    setRemoteStatus("Checking your sign-in…");
  } catch (error) {
    console.error("Could not send admin sign-in.", error);
    setRemoteStatus("Could not send sign-in; please retry.", "error");
  }
}

function loginToRemoteAdmin() {
  const username = els.adminUsername.value.trim();
  const password = els.adminPassword.value;
  if (!username || !password) {
    setRemoteStatus("Enter both your admin username and password.", "error");
    return;
  }
  pendingAdminCredentials = { username, password };
  connectRemote();
}

function logoutRemoteAdmin() {
  if (remoteSocket && remoteSocket.readyState === WebSocket.OPEN) {
    remoteSocket.send(JSON.stringify({ type: "logout" }));
  }
  remoteAuthToken = null;
  pendingAdminCredentials = null;
  els.adminPassword.value = "";
  selectedRemoteClientId = null;
  renderRemoteSessions([]);
  els.adminTools.hidden = true;
  els.adminLogin.hidden = false;
  setRemoteStatus("Signed out.");
  els.adminUsername.focus();
}

function sendRemoteAdminCommand(action, payload = {}) {
  const targetClientId = selectedRemoteClientId;
  if (!targetClientId) return false;
  if (!remoteAuthToken || !remoteSocket || remoteSocket.readyState !== WebSocket.OPEN) {
    setRemoteStatus("This action ran here, but the remote server is not connected.", "error");
    return false;
  }

  const requestId = `${Date.now()}-${++remoteRequestCounter}`;
  try {
    remoteSocket.send(JSON.stringify({ type: "admin-command", requestId, sessionToken: remoteAuthToken, targetClientId, action, payload }));
    setRemoteStatus("Sending the command to other connected tabs…");
    return true;
  } catch (error) {
    console.error("Could not send the remote admin command.", error);
    setRemoteStatus("This action ran here, but the remote command could not be sent.", "error");
    return false;
  }
}

function initializeRemoteControl() {
  let savedEndpoint = "";
  try {
    savedEndpoint = localStorage.getItem(REMOTE_URL_KEY) || "";
  } catch (error) {
    console.warn("Could not read the saved remote server address.", error);
  }
  const endpoint = savedEndpoint || getDefaultRemoteEndpoint();
  if (endpoint) {
    els.remoteEndpoint.value = endpoint;
    connectRemote(endpoint);
  }
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  els.toastContainer.appendChild(toast);
  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity .25s ease";
    window.setTimeout(() => toast.remove(), 260);
  }, 3000);
}

function playTone(startFrequency, endFrequency, duration, volume) {
  if (!state.soundEnabled) return;
  const AudioContextType = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextType) return;
  if (!audioContext) audioContext = new AudioContextType();
  if (audioContext.state === "suspended") audioContext.resume();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  const now = audioContext.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(startFrequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function speakSpread() {
  if (!state.soundEnabled || !("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance("spread");
  utterance.lang = "en-US";
  utterance.rate = 1.1;
  utterance.pitch = 1;
  const englishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.startsWith("en"));
  if (englishVoice) utterance.voice = englishVoice;
  window.speechSynthesis.speak(utterance);
}

function renderShop() {
  const availableUpgrades = UPGRADES.filter((upgrade) => !state.upgrades.includes(upgrade.id) && upgrade.req(state));
  els.upgrades.replaceChildren();
  if (availableUpgrades.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-msg";
    message.textContent = state.upgrades.length === UPGRADES.length
      ? "Every upgrade unlocked. Your spreadery is in good hands!"
      : "Make a little more spread to discover your next upgrade.";
    els.upgrades.appendChild(message);
  } else {
    availableUpgrades.forEach((upgrade) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `upgrade-btn ${state.cookies >= upgrade.cost ? "affordable" : "locked"}`;
      button.dataset.cost = String(upgrade.cost);
      button.title = `${upgrade.name}: ${upgrade.desc}`;
      const icon = document.createElement("span");
      icon.className = "upgrade-icon";
      icon.textContent = upgrade.icon;
      const info = document.createElement("span");
      info.className = "upgrade-info";
      const name = document.createElement("span");
      name.className = "upgrade-name";
      name.textContent = upgrade.name;
      const cost = document.createElement("span");
      cost.className = "upgrade-cost";
      cost.textContent = `${formatNumber(upgrade.cost)} spreads`;
      info.append(name, cost);
      button.append(icon, info);
      button.addEventListener("click", () => buyUpgrade(upgrade.id));
      els.upgrades.appendChild(button);
    });
  }

  els.buildings.replaceChildren();
  BUILDINGS.forEach((building) => {
    const owned = state.buildings[building.id] || 0;
    const cost = getBuildingCost(building);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `building-card ${state.cookies >= cost ? "affordable" : "locked"}`;
    button.dataset.cost = String(cost);
    button.title = building.desc;
    const icon = document.createElement("span");
    icon.className = "building-icon";
    icon.textContent = building.icon;
    const info = document.createElement("span");
    info.className = "building-info";
    const name = document.createElement("span");
    name.className = "building-name";
    name.textContent = building.name;
    const meta = document.createElement("span");
    meta.className = "building-meta";
    const buildingCps = building.cps * getBuildingMultiplier(building.id);
    meta.innerHTML = `<span class="building-cost">${formatNumber(cost)} spreads</span> · ${formatRate(buildingCps)}/sec`;
    info.append(name, meta);
    const count = document.createElement("span");
    count.className = "building-count";
    count.textContent = String(owned);
    button.append(icon, info, count);
    button.addEventListener("click", () => buyBuilding(building.id));
    els.buildings.appendChild(button);
  });
  shopRenderTime = 0;
}

function updateShopAffordability() {
  els.upgrades.querySelectorAll(".upgrade-btn").forEach((button) => {
    button.classList.toggle("affordable", state.cookies >= Number(button.dataset.cost));
    button.classList.toggle("locked", state.cookies < Number(button.dataset.cost));
  });
  els.buildings.querySelectorAll(".building-card").forEach((button) => {
    button.classList.toggle("affordable", state.cookies >= Number(button.dataset.cost));
    button.classList.toggle("locked", state.cookies < Number(button.dataset.cost));
  });
}

function renderAchievements() {
  els.achievements.replaceChildren();
  const unlocked = new Set(state.achievements);
  ACHIEVEMENTS.forEach((achievement) => {
    const tile = document.createElement("div");
    tile.className = `ach-tile ${unlocked.has(achievement.id) ? "unlocked" : ""}`;
    tile.textContent = achievement.icon;
    tile.title = `${achievement.name}${unlocked.has(achievement.id) ? " (unlocked)" : " (locked)"}\n${achievement.desc}`;
    els.achievements.appendChild(tile);
  });
  els.achievementCount.textContent = `${unlocked.size} / ${ACHIEVEMENTS.length}`;
}

function checkAchievements() {
  let changed = false;
  ACHIEVEMENTS.forEach((achievement) => {
    if (!state.achievements.includes(achievement.id) && achievement.check(state)) {
      state.achievements.push(achievement.id);
      showToast(`🏆 ${achievement.name} unlocked!`);
      changed = true;
    }
  });
  if (changed) renderAchievements();
}

function buyBuilding(id) {
  const building = BUILDINGS.find((item) => item.id === id);
  if (!building) return;
  const cost = getBuildingCost(building);
  if (state.cookies < cost) return;
  state.cookies -= cost;
  state.buildings[id] = (state.buildings[id] || 0) + 1;
  playTone(440, 660, 0.12, 0.1);
  renderShop();
  checkAchievements();
}

function buyUpgrade(id) {
  const upgrade = UPGRADES.find((item) => item.id === id);
  if (!upgrade || state.upgrades.includes(id) || !upgrade.req(state) || state.cookies < upgrade.cost) return;
  state.cookies -= upgrade.cost;
  state.upgrades.push(id);
  playTone(520, 880, 0.16, 0.12);
  showToast(`✨ ${upgrade.name} unlocked!`);
  renderShop();
}

function startSugarFrenzy() {
  frenzyMultiplier = 7;
  frenzyEndTime = Date.now() + 15000;
  showToast("🍯 Sugar rush! 7× production for 15 seconds!");
}

els.cookieButton.addEventListener("click", (event) => {
  const gain = getCookiesPerClick();
  state.cookies += gain;
  state.totalCookies += gain;
  state.totalClicks++;
  els.cookieButton.classList.add("clicked");
  window.clearTimeout(spreadAnimationTimer);
  spreadAnimationTimer = window.setTimeout(() => els.cookieButton.classList.remove("clicked"), 130);
  speakSpread();
  checkAchievements();
  updateShopAffordability();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !els.adminPanel.hidden) {
    closeAdminPanel();
    return;
  }
  if (event.ctrlKey || event.altKey || event.metaKey || event.key.length !== 1) return;
  const target = event.target;
  if (target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))) return;
  cheatInput = (cheatInput + event.key).slice(-SPREAD_CHEAT_CODE.length);
  if (cheatInput.toLowerCase() !== SPREAD_CHEAT_CODE.toLowerCase()) return;

  cheatInput = "";
  openAdminPanel();
});

function openAdminPanel() {
  els.adminPanel.hidden = false;
  els.adminStatus.textContent = "";
  (remoteAuthToken ? els.adminAmount : els.adminUsername).focus();
}

function closeAdminPanel() {
  els.adminPanel.hidden = true;
  els.cookieButton.focus();
}

function getAdminAmount() {
  const amount = els.adminAmount.valueAsNumber;
  if (!Number.isFinite(amount) || amount <= 0 || amount > 1e60) {
    els.adminStatus.textContent = "Enter an amount greater than 0 and no more than 1 novemdecillion.";
    return null;
  }
  return amount;
}

function refreshAfterAdminChange() {
  checkAchievements();
  renderShop();
  updateShopAffordability();
  updateNews();
  saveGame();
}

function grantAdminSpreads(amount, message) {
  if (!Number.isFinite(state.cookies + amount) || !Number.isFinite(state.totalCookies + amount)) {
    els.adminStatus.textContent = "That amount is too large to add.";
    return false;
  }
  state.cookies += amount;
  state.totalCookies += amount;
  els.adminStatus.textContent = message;
  return true;
}

function applyRemoteAdminCommand(command) {
  if (!command || typeof command !== "object" || Array.isArray(command)) {
    setRemoteStatus("The server sent an invalid command.", "error");
    return;
  }
  const amount = command.payload && command.payload.amount;
  if (["grant", "remove", "random"].includes(command.action)
    && (!Number.isFinite(amount) || amount <= 0 || amount > 1e60)) {
    console.error("The remote server sent an invalid spread amount.");
    setRemoteStatus("The server sent an invalid command.", "error");
    return;
  }

  switch (command.action) {
    case "grant":
      if (!grantAdminSpreads(amount, `Remote admin added ${formatNumber(amount)} spreads.`)) {
        showToast("Remote admin's spread grant was too large for this save.");
        return;
      }
      refreshAfterAdminChange();
      showToast(`Remote admin: +${formatNumber(amount)} spreads`);
      break;
    case "remove": {
      const removed = Math.min(amount, state.cookies);
      state.cookies -= removed;
      refreshAfterAdminChange();
      showToast(`Remote admin removed ${formatNumber(removed)} spreads`);
      break;
    }
    case "random":
      if (Math.random() < 0.5) {
        if (!grantAdminSpreads(amount, `Remote admin bonus: ${formatNumber(amount)} spreads.`)) {
          showToast("Remote admin's spread grant was too large for this save.");
          return;
        }
        showToast(`Remote admin: lucky gain of ${formatNumber(amount)} spreads`);
      } else {
        const lost = Math.min(amount, state.cookies);
        state.cookies -= lost;
        showToast(`Remote admin: lost ${formatNumber(lost)} spreads`);
      }
      refreshAfterAdminChange();
      break;
    case "click-boost":
      clickBoostEndTime = Date.now() + 60000;
      updateAdminBoosterStatus();
      showToast("Remote admin doubled click power for 60 seconds!");
      break;
    case "production-boost":
      productionBoostEndTime = Date.now() + 60000;
      updateAdminBoosterStatus();
      showToast("Remote admin doubled production for 60 seconds!");
      break;
    case "every-building":
      BUILDINGS.forEach((building) => {
        state.buildings[building.id] = (state.buildings[building.id] || 0) + 1;
      });
      refreshAfterAdminChange();
      showToast("Remote admin added one of every building!");
      break;
    case "all-upgrades":
      state.upgrades = UPGRADES.map((upgrade) => upgrade.id);
      refreshAfterAdminChange();
      showToast("Remote admin unlocked every upgrade!");
      break;
    case "sugar-frenzy":
      startSugarFrenzy();
      break;
    default:
      console.error("The remote server sent an unsupported admin command.");
      setRemoteStatus("The server sent an unsupported command.", "error");
  }
}

els.adminLoginSubmit.addEventListener("click", loginToRemoteAdmin);
els.adminUsername.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loginToRemoteAdmin();
});
els.adminPassword.addEventListener("keydown", (event) => {
  if (event.key === "Enter") loginToRemoteAdmin();
});
els.adminLogout.addEventListener("click", logoutRemoteAdmin);
els.adminLocalTarget.addEventListener("click", () => {
  selectedRemoteClientId = null;
  updateRemoteTargetUI();
  els.adminAmount.focus();
});

els.adminClose.addEventListener("click", closeAdminPanel);
els.adminPanel.addEventListener("click", (event) => {
  if (event.target === els.adminPanel) closeAdminPanel();
});

els.adminAdd.addEventListener("click", () => {
  const amount = getAdminAmount();
  if (amount === null) return;
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("grant", { amount });
    return;
  }
  if (!grantAdminSpreads(amount, `Added ${formatNumber(amount)} spreads to your jar.`)) return;
  refreshAfterAdminChange();
});

els.adminPanel.querySelectorAll("[data-admin-grant]").forEach((button) => {
  button.addEventListener("click", () => {
    const amount = Number(button.dataset.adminGrant);
    if (selectedRemoteClientId) {
      sendRemoteAdminCommand("grant", { amount });
      return;
    }
    if (grantAdminSpreads(amount, `Bonus! Added ${formatNumber(amount)} spreads.`)) {
      refreshAfterAdminChange();
    }
  });
});

els.adminRemove.addEventListener("click", () => {
  const amount = getAdminAmount();
  if (amount === null) return;
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("remove", { amount });
    return;
  }
  const removed = Math.min(amount, state.cookies);
  state.cookies -= removed;
  els.adminStatus.textContent = `Removed ${formatNumber(removed)} spreads from your jar.`;
  refreshAfterAdminChange();
});

els.adminRandom.addEventListener("click", () => {
  const amount = getAdminAmount();
  if (amount === null) return;
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("random", { amount });
    return;
  }
  if (Math.random() < 0.5) {
    if (!grantAdminSpreads(amount, `Lucky! You gained ${formatNumber(amount)} spreads.`)) return;
  } else {
    const lost = Math.min(amount, state.cookies);
    state.cookies -= lost;
    els.adminStatus.textContent = `Oh no! You lost ${formatNumber(lost)} spreads.`;
  }
  refreshAfterAdminChange();
});

els.adminClickBoost.addEventListener("click", () => {
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("click-boost");
    return;
  }
  clickBoostEndTime = Date.now() + 60000;
  updateAdminBoosterStatus();
});

els.adminProductionBoost.addEventListener("click", () => {
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("production-boost");
    return;
  }
  productionBoostEndTime = Date.now() + 60000;
  updateAdminBoosterStatus();
});

els.adminEveryBuilding.addEventListener("click", () => {
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("every-building");
    return;
  }
  BUILDINGS.forEach((building) => {
    state.buildings[building.id] = (state.buildings[building.id] || 0) + 1;
  });
  els.adminStatus.textContent = "Your spreadery gained one of every building!";
  refreshAfterAdminChange();
});

els.adminAllUpgrades.addEventListener("click", () => {
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("all-upgrades");
    return;
  }
  state.upgrades = UPGRADES.map((upgrade) => upgrade.id);
  els.adminStatus.textContent = "Every upgrade unlocked! All their bonuses are active.";
  refreshAfterAdminChange();
});

els.adminSugarFrenzy.addEventListener("click", () => {
  if (selectedRemoteClientId) {
    sendRemoteAdminCommand("sugar-frenzy");
    return;
  }
  startSugarFrenzy();
  els.adminStatus.textContent = "Sugar frenzy! All production is 7× for 15 seconds.";
});

function updateAdminBoosterStatus() {
  const clickSeconds = Math.max(0, Math.ceil((clickBoostEndTime - Date.now()) / 1000));
  const productionSeconds = Math.max(0, Math.ceil((productionBoostEndTime - Date.now()) / 1000));
  els.clickBoostStatus.textContent = clickSeconds ? `Active · ${clickSeconds}s` : "Ready";
  els.productionBoostStatus.textContent = productionSeconds ? `Active · ${productionSeconds}s` : "Ready";
}

els.soundButton.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  els.soundButton.setAttribute("aria-pressed", String(state.soundEnabled));
  els.soundButton.textContent = state.soundEnabled ? "🔊 Sound on" : "🔇 Sound off";
  saveGame();
});

els.resetButton.addEventListener("click", () => {
  if (!window.confirm("Start a fresh spreadery? This will erase your saved progress.")) return;
  state = createDefaultState();
  frenzyMultiplier = 1;
  frenzyEndTime = 0;
  clickBoostEndTime = 0;
  productionBoostEndTime = 0;
  updateAdminBoosterStatus();
  saveGame();
  renderShop();
  renderAchievements();
  showToast("Your spreadery is ready for a fresh start!");
});

function updateNews() {
  const eligible = HEADLINES.filter((headline) => state.totalCookies >= headline.min);
  els.news.textContent = eligible[Math.floor(Math.random() * eligible.length)].text;
}

function gameLoop(now) {
  const delta = Math.min((now - lastFrameTime) / 1000, 1);
  lastFrameTime = now;
  if (frenzyMultiplier > 1 && Date.now() >= frenzyEndTime) {
    frenzyMultiplier = 1;
    els.frenzyBanner.classList.add("hidden");
  } else if (frenzyMultiplier > 1) {
    els.frenzyBanner.classList.remove("hidden");
    els.frenzyTimer.textContent = `${Math.ceil((frenzyEndTime - Date.now()) / 1000)}s`;
  }

  const cookiesPerSecond = getCookiesPerSecond();
  if (cookiesPerSecond > 0) {
    const earned = cookiesPerSecond * delta;
    state.cookies += earned;
    state.totalCookies += earned;
  }
  state.playTimeSeconds += delta;
  unlockCheckTime += delta;
  shopRenderTime += delta;
  if (unlockCheckTime >= 1) {
    unlockCheckTime = 0;
    checkAchievements();
    const eligibleCount = UPGRADES.filter((upgrade) => !state.upgrades.includes(upgrade.id) && upgrade.req(state)).length;
    if (eligibleCount !== els.upgrades.querySelectorAll(".upgrade-btn").length) renderShop();
  }
  if (shopRenderTime >= 1) {
    shopRenderTime = 0;
    updateShopAffordability();
    updateAdminBoosterStatus();
  }

  els.cookieCount.textContent = formatNumber(state.cookies);
  els.cps.textContent = formatRate(cookiesPerSecond);
  els.cpc.textContent = `+${formatNumber(getCookiesPerClick())}`;
  els.total.textContent = formatNumber(state.totalCookies);
  els.clicks.textContent = state.totalClicks.toLocaleString();
  els.time.textContent = formatTime(state.playTimeSeconds);
  const buildingCount = getBuildingCount();
  els.buildingSummary.textContent = buildingCount
    ? `${buildingCount} helper${buildingCount === 1 ? "" : "s"} making spreads`
    : "Your spreadery is just getting started";
  document.title = `${formatNumber(state.cookies)} spreads — Spread Clicker`;
  requestAnimationFrame(gameLoop);
}

function startGame() {
  initializeRemoteControl();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.warn("Could not enable the offline app cache.", error);
    });
  }
  const awaySeconds = Math.max(0, (Date.now() - state.lastSaved) / 1000);
  const offlineCookies = Math.min(awaySeconds, 8 * 60 * 60) * getCookiesPerSecond() * 0.5;
  if (offlineCookies > 0) {
    state.cookies += offlineCookies;
    state.totalCookies += offlineCookies;
    window.setTimeout(() => showToast(`Welcome back! Your spreadery made ${formatNumber(offlineCookies)} spreads.`), 400);
  }
  els.soundButton.setAttribute("aria-pressed", String(state.soundEnabled));
  els.soundButton.textContent = state.soundEnabled ? "🔊 Sound on" : "🔇 Sound off";
  renderShop();
  renderAchievements();
  updateNews();
  window.setInterval(saveGame, 10000);
  window.setInterval(updateNews, 10000);
  window.addEventListener("beforeunload", saveGame);
  requestAnimationFrame(gameLoop);
}

startGame();
