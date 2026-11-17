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

const CURSORS = [
  { id: "starter", name: "Starter Cursor", icon: "👆", cost: 0, multiplier: 1 },
  { id: "bronze", name: "Bronze Pointer", icon: "🖱️", cost: 100, multiplier: 1.5 },
  { id: "gold", name: "Golden Pointer", icon: "🌟", cost: 750, multiplier: 2 },
  { id: "diamond", name: "Diamond Cursor", icon: "💎", cost: 5000, multiplier: 3 },
  { id: "rainbow", name: "Rainbow Cursor", icon: "🌈", cost: 25000, multiplier: 5 },
  { id: "cosmic", name: "Cosmic Cursor", icon: "🪄", cost: 150000, multiplier: 10 }
];

const UPGRADES = [
  { id: "strong-fingers", name: "Spread Strong Fingers", icon: "💪", cost: 25, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 10, type: "click", mult: 2 },
  { id: "grandmas-rolling-pin", name: "Spread Rolling Pins", icon: "🧑‍🍳", cost: 500, desc: "Grandmas make spreads twice as fast.", req: (s) => (s.buildings.grandma || 0) >= 1, type: "building", target: "grandma", mult: 2 },
  { id: "butter-cookie", name: "Spread Butter", icon: "🧈", cost: 250, desc: "Double spreads per click again.", req: (s) => s.totalCookies >= 250, type: "click", mult: 2 },
  { id: "fertilizer", name: "Spread Magic Fertilizer", icon: "🌱", cost: 5500, desc: "Spread farms are twice as productive.", req: (s) => (s.buildings.farm || 0) >= 1, type: "building", target: "farm", mult: 2 },
  { id: "chocolate-chips", name: "Spread Extra Toppings", icon: "🍫", cost: 1000, desc: "Double spreads per click once more.", req: (s) => s.totalClicks >= 100, type: "click", mult: 2 },
  { id: "laser-drills", name: "Spread Laser Drills", icon: "🔦", cost: 60000, desc: "Spread mines are twice as productive.", req: (s) => (s.buildings.mine || 0) >= 1, type: "building", target: "mine", mult: 2 },
  { id: "sugar-rush", name: "Spread Sugar Rush", icon: "🍬", cost: 5000, desc: "Triple spreads per click.", req: (s) => s.totalCookies >= 5000, type: "click", mult: 3 },
  { id: "quick-tap", name: "Quick-Tap Practice", icon: "⚡", cost: 150, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 25, type: "click", mult: 2 },
  { id: "sticky-fingers", name: "Sticky Fingers", icon: "🫳", cost: 600, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 60, type: "click", mult: 2 },
  { id: "spread-sling", name: "Spread Sling", icon: "🥄", cost: 1800, desc: "Triple spreads per click.", req: (s) => s.totalClicks >= 120, type: "click", mult: 3 },
  { id: "turbo-thumb", name: "Turbo Thumb", icon: "👍", cost: 4500, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 250, type: "click", mult: 2 },
  { id: "power-palm", name: "Power Palm", icon: "🖐️", cost: 10000, desc: "Triple spreads per click.", req: (s) => s.totalClicks >= 500, type: "click", mult: 3 },
  { id: "double-tap", name: "Double-Tap Technique", icon: "✌️", cost: 22000, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 900, type: "click", mult: 2 },
  { id: "mega-mitts", name: "Mega Mitts", icon: "🥊", cost: 48000, desc: "Triple spreads per click.", req: (s) => s.totalClicks >= 1500, type: "click", mult: 3 },
  { id: "lightning-click", name: "Lightning Click", icon: "🌩️", cost: 100000, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 2500, type: "click", mult: 2 },
  { id: "spread-storm", name: "Spreadstorm", icon: "🌪️", cost: 220000, desc: "Triple spreads per click.", req: (s) => s.totalClicks >= 4000, type: "click", mult: 3 },
  { id: "click-cannon", name: "Click Cannon", icon: "🚀", cost: 450000, desc: "Double spreads per click.", req: (s) => s.totalClicks >= 6500, type: "click", mult: 2 },
  { id: "golden-touch-upgrade", name: "Golden Touch", icon: "✨", cost: 900000, desc: "Five times more spreads per click.", req: (s) => s.totalClicks >= 10000, type: "click", mult: 5 },
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

const FISH_TIERS = [
  { name: "Common", count: 40, className: "common" },
  { name: "Uncommon", count: 25, className: "uncommon" },
  { name: "Rare", count: 15, className: "rare" },
  { name: "Epic", count: 10, className: "epic" },
  { name: "Legendary", count: 6, className: "legendary" },
  { name: "Mythic", count: 4, className: "mythic" }
];
const GIRL_FISH_NAMES = [
  "Ava", "Aria", "Amelia", "Abigail", "Alice", "Autumn", "Bella", "Brooklyn", "Claire", "Chloe",
  "Camila", "Delilah", "Eleanor", "Ella", "Elizabeth", "Emma", "Emily", "Evelyn", "Eliana", "Faith",
  "Fiona", "Freya", "Gabriella", "Grace", "Hannah", "Harper", "Hazel", "Isabella", "Ivy", "Jasmine",
  "Josephine", "Julia", "Kaylee", "Layla", "Lillian", "Lily", "Lucy", "Luna", "Madeline", "Maya",
  "Melody", "Mila", "Naomi", "Natalie", "Nora", "Olivia", "Paisley", "Penny", "Quinn", "Riley",
  "Rose", "Ruby", "Sadie", "Samantha", "Sarah", "Savannah", "Scarlett", "Sofia", "Stella", "Summer",
  "Thea", "Valentina", "Violet", "Zoe", "Adelaide", "Beatrice", "Cecilia", "Daphne", "Estelle", "Francesca",
  "Georgia", "Helena", "Imogen", "Juliet", "Kiara", "Lorelei", "Maeve", "Nina", "Opal", "Penelope",
  "Rosalie", "Seraphina", "Tabitha", "Uma", "Veronica", "Willa", "Ximena", "Yasmin", "Zara", "Bonnie",
  "Cleo", "Daisy", "Elsie", "Greta", "Hallie", "Indigo", "Marina", "Noelle", "Petra", "Tessa"
];
const BOY_FISH_NAMES = [
  "Liam", "Noah", "Oliver", "Elijah", "James", "William", "Benjamin", "Lucas", "Henry", "Theodore",
  "Jack", "Levi", "Alexander", "Jackson", "Mateo", "Daniel", "Michael", "Mason", "Sebastian", "Ethan",
  "Logan", "Owen", "Samuel", "Jacob", "Asher", "Aiden", "John", "Joseph", "Wyatt", "David",
  "Leo", "Luke", "Julian", "Hudson", "Grayson", "Matthew", "Ezra", "Gabriel", "Carter", "Isaac",
  "Jayden", "Luca", "Anthony", "Dylan", "Lincoln", "Thomas", "Maverick", "Elias", "Josiah", "Charles",
  "Caleb", "Christopher", "Ezekiel", "Miles", "Jaxon", "Isaiah", "Andrew", "Joshua", "Nathan", "Nolan",
  "Adrian", "Cameron", "Santiago", "Eli", "Aaron", "Ryan", "Angel", "Cooper", "Waylon", "Easton",
  "Kai", "Christian", "Landon", "Colton", "Roman", "Axel", "Brooks", "Jonathan", "Robert", "Jameson",
  "Ian", "Everett", "Greyson", "Wesley", "Jeremiah", "Hunter", "Leonardo", "Jordan", "Jose", "Bennett",
  "Silas", "Nicholas", "Parker", "Beau", "Weston", "Austin", "Connor", "Carson", "Dominic", "Xavier"
];

function createFishCharacters(names, gender, idPrefix) {
  return names.map((name, index) => {
    let tierEnd = 0;
    const tier = FISH_TIERS.find((item) => {
      tierEnd += item.count;
      return index < tierEnd;
    });
    return {
      id: `${idPrefix}-${String(index + 1).padStart(3, "0")}`,
      name,
      tier: tier.name,
      gender
    };
  });
}

const FISH_CHARACTERS = [
  ...createFishCharacters(GIRL_FISH_NAMES, "girl", "fish"),
  ...createFishCharacters(BOY_FISH_NAMES, "boy", "boy")
];
const SECRET_FISH = { id: "oliva", name: "Oliva", tier: "Secret", gender: "secret" };
const MAX_SPREAD_GRANT = 1e60;
const FISH_TIER_SELL_MULTIPLIERS = [0.5, 1, 2, 5, 10, 20];

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
    cursorCollection: { starter: true },
    equippedCursor: "starter",
    fishCollection: {},
    fishLevels: {},
    fishLuckLevel: 0,
    fishRolls: 0,
    fishDailyRollDate: "",
    fishCollectionRewardClaimed: false,
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
    if (!state.cursorCollection || typeof state.cursorCollection !== "object" || Array.isArray(state.cursorCollection)) state.cursorCollection = { starter: true };
    const validCursorIds = new Set(CURSORS.map((cursor) => cursor.id));
    Object.keys(state.cursorCollection).forEach((id) => {
      if (!validCursorIds.has(id) || typeof state.cursorCollection[id] !== "boolean") delete state.cursorCollection[id];
    });
    state.cursorCollection.starter = true;
    if (!validCursorIds.has(state.equippedCursor) || !state.cursorCollection[state.equippedCursor]) state.equippedCursor = "starter";
    if (!state.fishCollection || typeof state.fishCollection !== "object" || Array.isArray(state.fishCollection)) state.fishCollection = {};
    if (!state.fishLevels || typeof state.fishLevels !== "object" || Array.isArray(state.fishLevels)) state.fishLevels = {};
    const validFishIds = new Set([...FISH_CHARACTERS.map((character) => character.id), SECRET_FISH.id]);
    Object.keys(state.fishCollection).forEach((id) => {
      const count = state.fishCollection[id];
      if (!validFishIds.has(id) || !Number.isSafeInteger(count) || count < 0) delete state.fishCollection[id];
    });
    Object.keys(state.fishLevels).forEach((id) => {
      const level = state.fishLevels[id];
      if (!validFishIds.has(id) || !Number.isInteger(level) || level < 1 || level > 10) delete state.fishLevels[id];
    });
    if (!Number.isInteger(state.fishLuckLevel) || state.fishLuckLevel < 0 || state.fishLuckLevel > 5) state.fishLuckLevel = 0;
    if (!Number.isSafeInteger(state.fishRolls) || state.fishRolls < 0) state.fishRolls = 0;
    if (typeof state.fishDailyRollDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(state.fishDailyRollDate)) state.fishDailyRollDate = "";
    state.fishCollectionRewardClaimed = Boolean(state.fishCollectionRewardClaimed);
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
let fishCollectionFilter = "all";
let fishFlightFrame = null;
let fishFlightVersion = 0;
let fishScrollBehavior = null;
let fishOlivaTimer = null;
const SPREAD_CHEAT_CODE = "TimmyTuffJeff";
const ADMIN_PASSWORD = "charlie12032012franke";

const els = {
  cookieCount: document.getElementById("cookie-count"),
  cps: document.getElementById("cps-display"),
  cpc: document.getElementById("cpc-display"),
  total: document.getElementById("stat-total"),
  clicks: document.getElementById("stat-clicks"),
  time: document.getElementById("stat-time"),
  cookieButton: document.getElementById("cookie-btn"),
  upgrades: document.getElementById("upgrades-container"),
  cursorShop: document.getElementById("cursor-shop-container"),
  buildings: document.getElementById("buildings-container"),
  achievements: document.getElementById("achievements-container"),
  achievementCount: document.getElementById("achievements-count"),
  fishRoll: document.getElementById("fish-roll"),
  fishDailyRoll: document.getElementById("fish-daily-roll"),
  fishLuckUpgrade: document.getElementById("fish-luck-upgrade"),
  fishCollection: document.getElementById("fish-collection"),
  fishCollectionDetails: document.getElementById("fish-collection-details"),
  fishCollectionFilters: document.getElementById("fish-collection-filters"),
  fishCollectionCount: document.getElementById("fish-collection-count"),
  fishRollCount: document.getElementById("fish-roll-count"),
  fishProductionBonus: document.getElementById("fish-production-bonus"),
  fishRollCost: document.getElementById("fish-roll-cost"),
  fishLuckStatus: document.getElementById("fish-luck-status"),
  fishTierOdds: document.getElementById("fish-tier-odds"),
  fishStatus: document.getElementById("fish-status"),
  fishAnimationLayer: document.getElementById("fish-animation-layer"),
  fishOlivaCelebration: document.getElementById("fish-oliva-celebration"),
  toastContainer: document.getElementById("toast-container"),
  news: document.getElementById("news-text"),
  frenzyBanner: document.getElementById("frenzy-banner"),
  frenzyTimer: document.getElementById("frenzy-timer"),
  soundButton: document.getElementById("toggle-sfx-btn"),
  resetButton: document.getElementById("reset-btn"),
  buildingSummary: document.getElementById("building-summary"),
  adminPanel: document.getElementById("admin-panel"),
  adminLogin: document.getElementById("admin-login"),
  adminPassword: document.getElementById("admin-password"),
  adminLoginStatus: document.getElementById("admin-login-status"),
  adminTools: document.getElementById("admin-tools"),
  adminClose: document.getElementById("admin-close"),
  adminAmount: document.getElementById("admin-amount"),
  adminAdd: document.getElementById("admin-add"),
  adminRemove: document.getElementById("admin-remove"),
  adminRandom: document.getElementById("admin-random"),
  adminClickBoost: document.getElementById("admin-click-boost"),
  adminProductionBoost: document.getElementById("admin-production-boost"),
  adminEveryBuilding: document.getElementById("admin-every-building"),
  admin100kBuildings: document.getElementById("admin-100k-buildings"),
  adminAllUpgrades: document.getElementById("admin-all-upgrades"),
  adminSugarFrenzy: document.getElementById("admin-sugar-frenzy"),
  adminMystery: document.getElementById("admin-mystery"),
  adminConfetti: document.getElementById("admin-confetti"),
  adminDisco: document.getElementById("admin-disco"),
  adminDance: document.getElementById("admin-dance"),
  adminLuckyClick: document.getElementById("admin-lucky-click"),
  adminRandomFish: document.getElementById("admin-random-fish"),
  adminCompleteFish: document.getElementById("admin-complete-fish"),
  adminClearBoosts: document.getElementById("admin-clear-boosts"),
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
  return Math.min(Number.MAX_VALUE, Math.floor(building.cost * Math.pow(1.15, state.buildings[building.id] || 0)));
}

function getBuildingMultiplier(id) {
  return UPGRADES.filter((upgrade) => upgrade.type === "building" && upgrade.target === id && state.upgrades.includes(upgrade.id))
    .reduce((multiplier, upgrade) => multiplier * upgrade.mult, 1);
}

function getFishRollCost() {
  return Math.min(MAX_SPREAD_GRANT, Math.max(100, Math.floor(state.totalCookies * 0.001)));
}

function getFishDuplicateSaleValue(character) {
  const tierIndex = getFishTierIndex(character);
  return Math.min(MAX_SPREAD_GRANT, Math.floor(getFishRollCost() * FISH_TIER_SELL_MULTIPLIERS[tierIndex]));
}

function getFishLuckUpgradeCost() {
  return Math.min(MAX_SPREAD_GRANT, Math.max(1000, Math.floor(state.totalCookies * 0.00001)) * Math.pow(4, state.fishLuckLevel));
}

function getFishLevelUpCost(id) {
  const character = [...FISH_CHARACTERS, SECRET_FISH].find((item) => item.id === id);
  if (!character) return MAX_SPREAD_GRANT;
  const tierIndex = getFishTierIndex(character);
  const level = state.fishLevels[id] || 1;
  return Math.min(MAX_SPREAD_GRANT, Math.max(1000, Math.floor(getFishRollCost() * 0.1 * (tierIndex + 1) * level)));
}

function getFishProductionMultiplier() {
  const bonusLevels = Object.entries(state.fishLevels).reduce((total, [id, level]) =>
    total + (state.fishCollection[id] ? Math.max(0, level - 1) : 0), 0);
  return 1 + bonusLevels * 0.01;
}

function getFishUniqueCount() {
  return FISH_CHARACTERS.reduce((total, character) => total + (state.fishCollection[character.id] ? 1 : 0), 0);
}

function getLocalDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getFishTierOdds() {
  const level = state.fishLuckLevel;
  return [
    { name: "Common", chance: 50 - 4 * level },
    { name: "Uncommon", chance: 25 },
    { name: "Rare", chance: 15 + 3 * level },
    { name: "Epic", chance: 7 + 0.7 * level },
    { name: "Legendary", chance: 2.9 + 0.25 * level },
    { name: "Mythic", chance: 0.1 + 0.05 * level }
  ];
}

function getCookiesPerSecond() {
  const boost = Date.now() < productionBoostEndTime ? 2 : 1;
  return BUILDINGS.reduce((sum, building) => sum + (state.buildings[building.id] || 0) * building.cps * getBuildingMultiplier(building.id), 0)
    * frenzyMultiplier * boost * getFishProductionMultiplier();
}

function getCookiesPerClick() {
  const multiplier = UPGRADES.filter((upgrade) => upgrade.type === "click" && state.upgrades.includes(upgrade.id))
    .reduce((total, upgrade) => total * upgrade.mult, 1);
  const cursor = CURSORS.find((item) => item.id === state.equippedCursor) || CURSORS[0];
  const boost = Date.now() < clickBoostEndTime ? 2 : 1;
  return Math.max(1, Math.floor(multiplier * cursor.multiplier * frenzyMultiplier * boost));
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

function getFishTierClass(tierName) {
  const tier = FISH_TIERS.find((item) => item.name === tierName);
  return tier ? tier.className : "secret";
}

function getFishTierIndex(character) {
  const tierIndex = FISH_TIERS.findIndex((tier) => tier.name === character.tier);
  return tierIndex < 0 ? FISH_TIERS.length - 1 : tierIndex;
}

function getFishCharacterById(id) {
  return [...FISH_CHARACTERS, SECRET_FISH].find((character) => character.id === id);
}

function renderFishCollection() {
  els.fishCollection.replaceChildren();
  const characters = [...FISH_CHARACTERS, SECRET_FISH].filter((character) =>
    fishCollectionFilter === "all" || character.gender === fishCollectionFilter);
  els.fishCollectionFilters.querySelectorAll("[data-fish-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.fishFilter === fishCollectionFilter));
  });
  characters.forEach((character) => {
    const copies = state.fishCollection[character.id] || 0;
    const level = copies ? state.fishLevels[character.id] || 1 : 0;
    const card = document.createElement("article");
    card.className = `fish-card tier-${getFishTierClass(character.tier)}${copies ? " collected" : ""}`;
    card.dataset.fishId = character.id;

    const name = document.createElement("strong");
    name.className = "fish-name";
    name.textContent = copies || character.id !== SECRET_FISH.id ? character.name : "???";
    const details = document.createElement("span");
    details.className = "fish-card-details";
    const genderLabel = character.gender === "girl" ? "Girl" : character.gender === "boy" ? "Boy" : "Secret";
    details.textContent = copies
      ? `${genderLabel} · ${character.tier} · ${copies} owned · Level ${level}`
      : character.id === SECRET_FISH.id
        ? "Secret · Not discovered"
        : `${genderLabel} · ${character.tier} · Not discovered`;
    card.append(name, details);

    if (copies) {
      if (copies > 1) {
        const sell = document.createElement("button");
        sell.type = "button";
        sell.className = "fish-small-action";
        sell.dataset.fishSell = character.id;
        sell.textContent = `Sell duplicate (+${formatNumber(getFishDuplicateSaleValue(character))})`;
        card.appendChild(sell);
      }

      const levelUp = document.createElement("button");
      levelUp.type = "button";
      levelUp.className = "fish-small-action";
      levelUp.dataset.fishLevelUp = character.id;
      levelUp.disabled = level >= 10 || state.cookies < getFishLevelUpCost(character.id);
      levelUp.textContent = level >= 10
        ? "Max level"
        : `⬆ Level up · ${formatNumber(getFishLevelUpCost(character.id))}`;
      card.appendChild(levelUp);
    }

    els.fishCollection.appendChild(card);
  });
}

function updateFishTankUI() {
  const collectionCount = getFishUniqueCount();
  const rollCost = getFishRollCost();
  const luckCost = getFishLuckUpgradeCost();
  const bonusPercent = Math.round((getFishProductionMultiplier() - 1) * 100);
  const dailyAvailable = state.fishDailyRollDate !== getLocalDateKey();

  els.fishCollectionCount.textContent = `${collectionCount} / ${FISH_CHARACTERS.length}`;
  if (state.fishCollection[SECRET_FISH.id]) {
    els.fishCollectionCount.textContent += " + Oliva";
  }
  els.fishRollCount.textContent = state.fishRolls.toLocaleString();
  els.fishProductionBonus.textContent = `+${bonusPercent}%`;
  els.fishRollCost.textContent = `Paid roll: ${formatNumber(rollCost)} spreads · Secret Oliva chance: 0.0001%`;
  els.fishRoll.disabled = state.cookies < rollCost;
  els.fishDailyRoll.disabled = !dailyAvailable;
  els.fishDailyRoll.textContent = dailyAvailable ? "🎁 Claim daily free roll" : "✅ Daily roll claimed";
  els.fishLuckStatus.textContent = `Luck level ${state.fishLuckLevel} / 5 · Leveling characters adds 1% production each`;
  els.fishLuckUpgrade.disabled = state.fishLuckLevel >= 5 || state.cookies < luckCost;
  els.fishLuckUpgrade.textContent = state.fishLuckLevel >= 5
    ? "🍀 Luck fully upgraded"
    : `🍀 Upgrade luck · ${formatNumber(luckCost)}`;
  els.fishTierOdds.textContent = `Tier odds: ${getFishTierOdds().map((tier) => `${tier.name} ${tier.chance.toFixed(tier.chance < 1 ? 2 : 1)}%`).join(" · ")}`;

  els.fishCollection.querySelectorAll("[data-fish-sell]").forEach((button) => {
    const character = getFishCharacterById(button.dataset.fishSell);
    const payout = character ? getFishDuplicateSaleValue(character) : 0;
    button.textContent = `Sell duplicate (+${formatNumber(payout)})`;
    button.disabled = state.cookies > Number.MAX_VALUE - payout;
  });
  els.fishCollection.querySelectorAll("[data-fish-level-up]").forEach((button) => {
    const id = button.dataset.fishLevelUp;
    const level = state.fishLevels[id] || 1;
    const cost = getFishLevelUpCost(id);
    button.disabled = level >= 10 || state.cookies < cost;
    button.textContent = level >= 10 ? "Max level" : `⬆ Level up · ${formatNumber(cost)}`;
  });
}

function showFishLandingImpact(x, y, rarity) {
  const effects = {
    common: { size: 48, glyph: "✦", duration: 480 },
    uncommon: { size: 64, glyph: "✧", duration: 580 },
    rare: { size: 84, glyph: "✨", duration: 700 },
    epic: { size: 108, glyph: "💥", duration: 840 },
    legendary: { size: 138, glyph: "👑", duration: 1000 },
    mythic: { size: 172, glyph: "🌟", duration: 1200 },
    secret: { size: 220, glyph: "👑", duration: 1500 }
  };
  const effect = effects[rarity] || effects.common;
  const impact = document.createElement("span");
  impact.className = `fish-impact impact-${rarity}`;
  impact.textContent = effect.glyph;
  impact.setAttribute("aria-hidden", "true");
  impact.style.left = `${x}px`;
  impact.style.top = `${y}px`;
  impact.style.setProperty("--impact-size", `${effect.size}px`);
  impact.style.setProperty("--impact-duration", `${effect.duration}ms`);
  els.fishAnimationLayer.appendChild(impact);

  const removeImpact = () => impact.remove();
  impact.addEventListener("animationend", removeImpact, { once: true });
  window.setTimeout(removeImpact, effect.duration + 150);
}

function stopFishCamera() {
  if (fishFlightFrame !== null) {
    window.cancelAnimationFrame(fishFlightFrame);
    fishFlightFrame = null;
  }
  if (fishScrollBehavior !== null) {
    document.documentElement.style.scrollBehavior = fishScrollBehavior;
    fishScrollBehavior = null;
  }
}

function animateFishLanding(character) {
  const card = els.fishCollection.querySelector(`[data-fish-id="${character.id}"]`);
  if (!card) return;
  const flightVersion = ++fishFlightVersion;
  stopFishCamera();

  const listRect = els.fishCollection.getBoundingClientRect();
  const initialCardRect = card.getBoundingClientRect();
  els.fishCollection.scrollTop += initialCardRect.top - listRect.top
    - (els.fishCollection.clientHeight - card.offsetHeight) / 2;
  const targetRect = card.getBoundingClientRect();
  const sourceRect = els.fishRoll.getBoundingClientRect();
  const rarity = getFishTierClass(character.tier);
  const durations = {
    common: 650,
    uncommon: 800,
    rare: 950,
    epic: 1100,
    legendary: 1250,
    mythic: 1450,
    secret: 1900
  };
  const duration = durations[rarity] || 650;
  const landingClasses = ["common", "uncommon", "rare", "epic", "legendary", "mythic", "secret"];
  card.classList.remove("fish-landing", ...landingClasses.map((tier) => `landing-${tier}`));
  void card.offsetWidth;
  card.classList.add("fish-landing", `landing-${rarity}`);
  const clearLanding = () => {
    card.classList.remove("fish-landing", `landing-${rarity}`);
  };
  card.addEventListener("animationend", clearLanding, { once: true });
  window.setTimeout(clearLanding, duration + 300);

  els.fishAnimationLayer.replaceChildren();
  const sourceX = sourceRect.left + sourceRect.width / 2;
  const sourceY = sourceRect.top + sourceRect.height / 2;
  const targetX = targetRect.left + targetRect.width / 2;
  const targetY = targetRect.top + targetRect.height / 2;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    showFishLandingImpact(targetX, targetY, rarity);
    return;
  }

  const flyer = document.createElement("span");
  flyer.className = `fish-flight flight-${rarity}`;
  flyer.textContent = "🐟";
  flyer.setAttribute("aria-hidden", "true");
  flyer.style.left = `${sourceX}px`;
  flyer.style.top = `${sourceY}px`;
  els.fishAnimationLayer.appendChild(flyer);

  if (typeof window.requestAnimationFrame !== "function") {
    flyer.remove();
    showFishLandingImpact(targetX, targetY, rarity);
    return;
  }

  const startScrollX = window.scrollX;
  const startScrollY = window.scrollY;
  const startDocumentX = sourceX + startScrollX;
  const startDocumentY = sourceY + startScrollY;
  const targetDocumentX = targetX + startScrollX;
  const targetDocumentY = targetY + startScrollY;
  const distanceX = targetDocumentX - startDocumentX;
  const distanceY = targetDocumentY - startDocumentY;
  const arcHeight = Math.min(90, Math.abs(distanceY) * 0.18);
  const cameraFollow = 0.82;
  const startTime = performance.now();
  fishScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";

  let landed = false;
  const landFish = () => {
    if (landed || flightVersion !== fishFlightVersion) return;
    landed = true;
    stopFishCamera();
    flyer.remove();
    showFishLandingImpact(targetDocumentX - window.scrollX, targetDocumentY - window.scrollY, rarity);
  };
  const followFish = (timestamp) => {
    if (flightVersion !== fishFlightVersion) return;
    const progress = Math.min(1, (timestamp - startTime) / duration);
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentDocumentX = startDocumentX + distanceX * easedProgress;
    const currentDocumentY = startDocumentY + distanceY * easedProgress
      - Math.sin(Math.PI * easedProgress) * arcHeight;
    const maxScrollY = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const nextScrollY = Math.max(0, Math.min(maxScrollY, startScrollY + (currentDocumentY - startDocumentY) * cameraFollow));
    window.scrollTo(startScrollX, nextScrollY);
    flyer.style.left = `${currentDocumentX - window.scrollX}px`;
    flyer.style.top = `${currentDocumentY - window.scrollY}px`;
    flyer.style.transform = `rotate(${360 * easedProgress}deg) scale(${1 - 0.35 * easedProgress + Math.sin(Math.PI * easedProgress) * 0.12})`;
    flyer.style.opacity = String(1 - 0.15 * easedProgress);

    if (progress === 1) {
      landFish();
      return;
    }
    fishFlightFrame = window.requestAnimationFrame(followFish);
  };
  fishFlightFrame = window.requestAnimationFrame(followFish);
}

function showOlivaCelebration() {
  if (fishOlivaTimer !== null) window.clearTimeout(fishOlivaTimer);
  const overlay = els.fishOlivaCelebration;
  overlay.hidden = false;
  overlay.classList.remove("active");
  void overlay.offsetWidth;
  overlay.classList.add("active");
  fishOlivaTimer = window.setTimeout(() => {
    overlay.hidden = true;
    overlay.classList.remove("active");
    fishOlivaTimer = null;
  }, 5200);
}

function pickFishCharacter() {
  if (Math.random() < 0.000001) return SECRET_FISH;

  const roll = Math.random() * 100;
  const odds = getFishTierOdds();
  let threshold = 0;
  const selectedTier = odds.find((tier) => {
    threshold += tier.chance;
    return roll < threshold;
  }) || odds[odds.length - 1];
  const candidates = FISH_CHARACTERS.filter((character) => character.tier === selectedTier.name);
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function addFishSpreads(amount) {
  if (!Number.isFinite(amount) || amount < 0) return false;
  state.cookies = Math.min(Number.MAX_VALUE, state.cookies + amount);
  state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + amount);
  return true;
}

function checkFishCollectionReward() {
  if (state.fishCollectionRewardClaimed || getFishUniqueCount() !== FISH_CHARACTERS.length) return false;
  const reward = Math.min(MAX_SPREAD_GRANT, getFishRollCost() * 100);
  if (!addFishSpreads(reward)) return false;
  state.fishCollectionRewardClaimed = true;
  showToast(`🏆 Full collection! You earned ${formatNumber(reward)} spreads!`);
  launchConfetti(60);
  return true;
}

function rollFish(useDailyRoll = false) {
  const rollDate = getLocalDateKey();
  if (useDailyRoll) {
    if (state.fishDailyRollDate === rollDate) {
      els.fishStatus.textContent = "Your daily free roll has already been claimed.";
      return;
    }
  } else {
    const rollCost = getFishRollCost();
    if (state.cookies < rollCost) {
      els.fishStatus.textContent = `You need ${formatNumber(rollCost)} spreads for another paid roll.`;
      return;
    }
  }

  els.fishCollectionDetails.open = true;
  fishCollectionFilter = "all";
  renderFishCollection();
  const character = pickFishCharacter();
  const copies = state.fishCollection[character.id] || 0;
  if (!Number.isSafeInteger(copies + 1)) {
    els.fishStatus.textContent = "That character collection has reached its safe storage limit.";
    return;
  }
  if (useDailyRoll) {
    state.fishDailyRollDate = rollDate;
  } else {
    state.cookies -= getFishRollCost();
  }
  state.fishCollection[character.id] = copies + 1;
  state.fishLevels[character.id] = state.fishLevels[character.id] || 1;
  state.fishRolls = Math.min(Number.MAX_SAFE_INTEGER, state.fishRolls + 1);

  if (character.id === SECRET_FISH.id) {
    state.cookies = Math.max(state.cookies, MAX_SPREAD_GRANT);
    state.totalCookies = Math.max(state.totalCookies, MAX_SPREAD_GRANT);
    els.fishStatus.textContent = "✨ SECRET! Oliva appeared! Your jar now has at least 1 Novemdecillion spreads!";
    launchConfetti(100);
    showToast("✨ Oliva! The secret character filled your jar with spreads!");
  } else if (copies) {
    els.fishStatus.textContent = `You rolled ${character.name} (${character.tier}) again. You now own ${copies + 1}.`;
  } else {
    els.fishStatus.textContent = `New character: ${character.name} · ${character.tier}!`;
  }

  checkFishCollectionReward();
  refreshAfterAdminChange();
  animateFishLanding(character);
  if (character.id === SECRET_FISH.id) showOlivaCelebration();
  if (character.tier === "Mythic" || character.tier === "Legendary") launchConfetti(40);
}

function sellFishDuplicate(id) {
  const character = getFishCharacterById(id);
  const copies = state.fishCollection[id] || 0;
  if (!character || copies <= 1) return;
  const payout = getFishDuplicateSaleValue(character);
  if (!Number.isFinite(state.cookies + payout) || !Number.isFinite(state.totalCookies + payout)) {
    els.fishStatus.textContent = "That duplicate’s sale value is too large for this save.";
    return;
  }
  state.fishCollection[id]--;
  state.cookies += payout;
  state.totalCookies += payout;
  els.fishStatus.textContent = `Sold a duplicate ${character.name} for ${formatNumber(payout)} spreads.`;
  refreshAfterAdminChange();
}

function levelUpFish(id) {
  const character = getFishCharacterById(id);
  const copies = state.fishCollection[id] || 0;
  const level = state.fishLevels[id] || 1;
  const cost = getFishLevelUpCost(id);
  if (!character || !copies || level >= 10 || state.cookies < cost) return;
  state.cookies -= cost;
  state.fishLevels[id] = level + 1;
  els.fishStatus.textContent = `${character.name} reached level ${level + 1}! Your production bonus increased.`;
  refreshAfterAdminChange();
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

  renderCursorShop();

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

function renderCursorShop() {
  els.cursorShop.replaceChildren();
  CURSORS.forEach((cursor) => {
    const owned = Boolean(state.cursorCollection[cursor.id]);
    const equipped = state.equippedCursor === cursor.id;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `cursor-card ${owned ? "owned" : "locked"}${equipped ? " equipped" : ""}`;
    button.dataset.cursorId = cursor.id;
    button.dataset.cursorCost = String(cursor.cost);
    button.setAttribute("aria-pressed", String(equipped));
    button.disabled = !owned && state.cookies < cursor.cost;
    const icon = document.createElement("span");
    icon.className = "cursor-icon";
    icon.textContent = cursor.icon;
    const info = document.createElement("span");
    info.className = "cursor-info";
    const name = document.createElement("strong");
    name.textContent = cursor.name;
    const bonus = document.createElement("span");
    bonus.textContent = `${cursor.multiplier}× click power`;
    info.append(name, bonus);
    const action = document.createElement("span");
    action.className = "cursor-action";
    action.textContent = equipped ? "Equipped" : owned ? "Equip" : `${formatNumber(cursor.cost)} spreads`;
    button.append(icon, info, action);
    button.addEventListener("click", () => buyOrEquipCursor(cursor.id));
    els.cursorShop.appendChild(button);
  });
}

function buyOrEquipCursor(id) {
  const cursor = CURSORS.find((item) => item.id === id);
  if (!cursor) return;
  if (!state.cursorCollection[id]) {
    if (state.cookies < cursor.cost) return;
    state.cookies -= cursor.cost;
    state.cursorCollection[id] = true;
  }
  state.equippedCursor = id;
  showToast(`${cursor.icon} ${cursor.name} equipped · ${cursor.multiplier}× click power!`);
  renderShop();
  updateShopAffordability();
  saveGame();
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
  els.cursorShop.querySelectorAll(".cursor-card").forEach((button) => {
    const owned = Boolean(state.cursorCollection[button.dataset.cursorId]);
    button.disabled = !owned && state.cookies < Number(button.dataset.cursorCost);
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
  els.adminLogin.hidden = false;
  els.adminTools.hidden = true;
  els.adminPassword.value = "";
  els.adminLoginStatus.textContent = "";
  els.adminStatus.textContent = "";
  els.adminPassword.focus();
}

function closeAdminPanel() {
  els.adminPanel.hidden = true;
  els.adminLogin.reset();
  els.adminLoginStatus.textContent = "";
  els.adminTools.hidden = true;
  els.cookieButton.focus();
}

els.adminLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  if (els.adminPassword.value !== ADMIN_PASSWORD) {
    els.adminLoginStatus.textContent = "That password is not correct.";
    els.adminPassword.value = "";
    els.adminPassword.focus();
    return;
  }
  els.adminLogin.hidden = true;
  els.adminTools.hidden = false;
  els.adminLoginStatus.textContent = "";
  els.adminPassword.value = "";
  els.adminStatus.textContent = "";
  els.adminAmount.focus();
});

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
  renderFishCollection();
  updateFishTankUI();
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

els.fishRoll.addEventListener("click", () => rollFish());
els.fishDailyRoll.addEventListener("click", () => rollFish(true));
els.fishCollectionFilters.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  const button = event.target.closest("[data-fish-filter]");
  if (!(button instanceof HTMLButtonElement)) return;
  fishCollectionFilter = button.dataset.fishFilter;
  renderFishCollection();
});
els.fishLuckUpgrade.addEventListener("click", () => {
  const cost = getFishLuckUpgradeCost();
  if (state.fishLuckLevel >= 5 || state.cookies < cost) return;
  state.cookies -= cost;
  state.fishLuckLevel++;
  els.fishStatus.textContent = `Luck upgraded to level ${state.fishLuckLevel}! Higher tiers are more likely now.`;
  refreshAfterAdminChange();
});
els.fishCollection.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  const sellButton = event.target.closest("[data-fish-sell]");
  if (sellButton instanceof HTMLButtonElement) {
    sellFishDuplicate(sellButton.dataset.fishSell);
    return;
  }
  const levelButton = event.target.closest("[data-fish-level-up]");
  if (levelButton instanceof HTMLButtonElement) levelUpFish(levelButton.dataset.fishLevelUp);
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

els.admin100kBuildings.addEventListener("click", () => {
  BUILDINGS.forEach((building) => {
    state.buildings[building.id] = (state.buildings[building.id] || 0) + 100000;
  });
  els.adminStatus.textContent = "Added 100,000 of every building to your spreadery!";
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

els.adminRandomFish.addEventListener("click", () => {
  for (let index = 0; index < 25; index++) {
    const character = pickFishCharacter();
    const copies = state.fishCollection[character.id] || 0;
    if (!Number.isSafeInteger(copies + 1)) continue;
    state.fishCollection[character.id] = copies + 1;
    state.fishLevels[character.id] = state.fishLevels[character.id] || 1;
    state.fishRolls = Math.min(Number.MAX_SAFE_INTEGER, state.fishRolls + 1);
    if (character.id === SECRET_FISH.id) {
      state.cookies = Math.max(state.cookies, MAX_SPREAD_GRANT);
      state.totalCookies = Math.max(state.totalCookies, MAX_SPREAD_GRANT);
    }
  }
  checkFishCollectionReward();
  els.adminStatus.textContent = "Added 25 random fish to your aquarium!";
  refreshAfterAdminChange();
  launchConfetti(32);
});

els.adminCompleteFish.addEventListener("click", () => {
  FISH_CHARACTERS.forEach((character) => {
    state.fishCollection[character.id] = Math.max(1, state.fishCollection[character.id] || 0);
    state.fishLevels[character.id] = state.fishLevels[character.id] || 1;
  });
  checkFishCollectionReward();
  els.adminStatus.textContent = "All 200 standard fish are now in your aquarium!";
  refreshAfterAdminChange();
  launchConfetti(60);
});

els.adminClearBoosts.addEventListener("click", () => {
  clickBoostEndTime = 0;
  productionBoostEndTime = 0;
  frenzyMultiplier = 1;
  frenzyEndTime = 0;
  luckyClickArmed = false;
  document.body.classList.remove("disco-mode", "dance-mode");
  els.adminDisco.setAttribute("aria-pressed", "false");
  els.adminDisco.textContent = "🪩 Disco mode: off";
  els.adminDance.setAttribute("aria-pressed", "false");
  els.adminDance.textContent = "💃 Dance mode: off";
  els.adminLuckyClick.setAttribute("aria-pressed", "false");
  els.adminLuckyClick.textContent = "🍀 Arm a 10× lucky click";
  updateAdminBoosterStatus();
  els.frenzyBanner.hidden = true;
  els.adminStatus.textContent = "All temporary boosts and fun modes are off.";
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
  renderFishCollection();
  updateFishTankUI();
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
    updateFishTankUI();
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
  renderFishCollection();
  updateFishTankUI();
  updateNews();
  window.setInterval(saveGame, 10000);
  window.setInterval(updateNews, 10000);
  window.addEventListener("beforeunload", saveGame);
  requestAnimationFrame(gameLoop);
}

startGame();
