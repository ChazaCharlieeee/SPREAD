"use strict";

const SAVE_KEY = "cookie_clicker_save_v1";

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
let luckyClickArmed = false;
let lastFrameTime = performance.now();
let unlockCheckTime = 0;
let shopRenderTime = 0;
let spreadAnimationTimer;
let cheatInput = "";
const SPREAD_CHEAT_CODE = "Charlie12032012";

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
  adminMystery: document.getElementById("admin-mystery"),
  adminConfetti: document.getElementById("admin-confetti"),
  adminDisco: document.getElementById("admin-disco"),
  adminDance: document.getElementById("admin-dance"),
  adminLuckyClick: document.getElementById("admin-lucky-click"),
  clickBoostStatus: document.getElementById("click-boost-status"),
  productionBoostStatus: document.getElementById("production-boost-status"),
  adminStatus: document.getElementById("admin-status"),
  celebrationLayer: document.getElementById("celebration-layer")
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

function launchConfetti(count = 32) {
  const colors = ["#d97d55", "#e7b84f", "#83a66d", "#8d7ac4", "#e58aa0"];
  for (let index = 0; index < count; index++) {
    const piece = document.createElement("span");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--confetti-x", `${(Math.random() - 0.5) * 240}px`);
    piece.style.setProperty("--confetti-rotation", `${Math.random() * 900 - 450}deg`);
    piece.style.animationDelay = `${Math.random() * 0.25}s`;
    els.celebrationLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 2400);
  }
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

function startSugarFrenzy(duration = 15000) {
  frenzyMultiplier = 7;
  frenzyEndTime = Date.now() + duration;
  showToast(`🍯 Sugar rush! 7× production for ${Math.ceil(duration / 1000)} seconds!`);
}

els.cookieButton.addEventListener("click", (event) => {
  let gain = getCookiesPerClick();
  if (luckyClickArmed) {
    gain *= 10;
    luckyClickArmed = false;
    els.adminLuckyClick.setAttribute("aria-pressed", "false");
    els.adminLuckyClick.textContent = "🍀 Arm a 10× lucky click";
    els.adminStatus.textContent = `Lucky click! You earned ${formatNumber(gain)} spreads.`;
    showToast(`🍀 10× lucky click! +${formatNumber(gain)} spreads`);
    launchConfetti(24);
  } else if (Math.random() < 0.01) {
    gain *= 10;
    showToast(`🎉 Jackpot! That click made ${formatNumber(gain)} spreads!`);
    launchConfetti(24);
  }
  state.cookies += gain;
  state.totalCookies += gain;
  state.totalClicks++;
  if (state.totalClicks % 100 === 0) {
    const streakBonus = gain * 25;
    if (Number.isFinite(state.cookies + streakBonus) && Number.isFinite(state.totalCookies + streakBonus)) {
      state.cookies += streakBonus;
      state.totalCookies += streakBonus;
      showToast(`🎊 100-click streak! Bonus: ${formatNumber(streakBonus)} spreads!`);
      launchConfetti(20);
    }
  }
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
  els.adminAmount.focus();
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

els.adminClose.addEventListener("click", closeAdminPanel);
els.adminPanel.addEventListener("click", (event) => {
  if (event.target === els.adminPanel) closeAdminPanel();
});

els.adminAdd.addEventListener("click", () => {
  const amount = getAdminAmount();
  if (amount === null) return;
  if (!grantAdminSpreads(amount, `Added ${formatNumber(amount)} spreads to your jar.`)) return;
  refreshAfterAdminChange();
});

els.adminPanel.querySelectorAll("[data-admin-grant]").forEach((button) => {
  button.addEventListener("click", () => {
    const amount = Number(button.dataset.adminGrant);
    if (grantAdminSpreads(amount, `Bonus! Added ${formatNumber(amount)} spreads.`)) {
      refreshAfterAdminChange();
    }
  });
});

els.adminRemove.addEventListener("click", () => {
  const amount = getAdminAmount();
  if (amount === null) return;
  const removed = Math.min(amount, state.cookies);
  state.cookies -= removed;
  els.adminStatus.textContent = `Removed ${formatNumber(removed)} spreads from your jar.`;
  refreshAfterAdminChange();
});

els.adminRandom.addEventListener("click", () => {
  const amount = getAdminAmount();
  if (amount === null) return;
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
  clickBoostEndTime = Date.now() + 60000;
  updateAdminBoosterStatus();
});

els.adminProductionBoost.addEventListener("click", () => {
  productionBoostEndTime = Date.now() + 60000;
  updateAdminBoosterStatus();
});

els.adminEveryBuilding.addEventListener("click", () => {
  BUILDINGS.forEach((building) => {
    state.buildings[building.id] = (state.buildings[building.id] || 0) + 1;
  });
  els.adminStatus.textContent = "Your spreadery gained one of every building!";
  refreshAfterAdminChange();
});

els.adminAllUpgrades.addEventListener("click", () => {
  state.upgrades = UPGRADES.map((upgrade) => upgrade.id);
  els.adminStatus.textContent = "Every upgrade unlocked! All their bonuses are active.";
  refreshAfterAdminChange();
});

els.adminSugarFrenzy.addEventListener("click", () => {
  startSugarFrenzy();
  els.adminStatus.textContent = "Sugar frenzy! All production is 7× for 15 seconds.";
});

els.adminMystery.addEventListener("click", () => {
  const surprise = Math.floor(Math.random() * 4);
  if (surprise === 0) {
    const amount = Math.max(100, getCookiesPerClick() * 50);
    if (!grantAdminSpreads(amount, `Mystery jar prize: +${formatNumber(amount)} spreads!`)) return;
    refreshAfterAdminChange();
    launchConfetti(28);
  } else if (surprise === 1) {
    clickBoostEndTime = Date.now() + 45000;
    els.adminStatus.textContent = "Mystery jar prize: 2× click power for 45 seconds!";
    updateAdminBoosterStatus();
    showToast("⚡ The mystery jar boosted your clicks!");
  } else if (surprise === 2) {
    productionBoostEndTime = Date.now() + 45000;
    els.adminStatus.textContent = "Mystery jar prize: 2× production for 45 seconds!";
    updateAdminBoosterStatus();
    showToast("🏭 The mystery jar boosted production!");
  } else {
    els.adminStatus.textContent = "Mystery jar prize: a 7× sugar rush for 10 seconds!";
    startSugarFrenzy(10000);
  }
});

els.adminConfetti.addEventListener("click", () => {
  launchConfetti(52);
  playTone(520, 880, 0.22, 0.11);
  els.adminStatus.textContent = "Confetti party! The spreadery is celebrating.";
});

els.adminDisco.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("disco-mode");
  els.adminDisco.setAttribute("aria-pressed", String(enabled));
  els.adminDisco.textContent = `🪩 Disco mode: ${enabled ? "on" : "off"}`;
  els.adminStatus.textContent = enabled ? "Disco mode is on. Dance, little spreadery!" : "Disco mode is off.";
});

els.adminDance.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("dance-mode");
  els.adminDance.setAttribute("aria-pressed", String(enabled));
  els.adminDance.textContent = `💃 Dance mode: ${enabled ? "on" : "off"}`;
  els.adminStatus.textContent = enabled ? "Dance mode is on. Look at that spread move!" : "Dance mode is off.";
});

els.adminLuckyClick.addEventListener("click", () => {
  luckyClickArmed = !luckyClickArmed;
  els.adminLuckyClick.setAttribute("aria-pressed", String(luckyClickArmed));
  els.adminLuckyClick.textContent = luckyClickArmed
    ? "🍀 Lucky click armed!"
    : "🍀 Arm a 10× lucky click";
  els.adminStatus.textContent = luckyClickArmed
    ? "Your next spread click will be worth 10×!"
    : "Lucky click cancelled.";
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
  luckyClickArmed = false;
  document.body.classList.remove("disco-mode", "dance-mode");
  els.adminLuckyClick.setAttribute("aria-pressed", "false");
  els.adminLuckyClick.textContent = "🍀 Arm a 10× lucky click";
  els.adminDisco.setAttribute("aria-pressed", "false");
  els.adminDisco.textContent = "🪩 Disco mode: off";
  els.adminDance.setAttribute("aria-pressed", "false");
  els.adminDance.textContent = "💃 Dance mode: off";
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
