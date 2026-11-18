"use strict";

const SAVE_KEY = "cookie_clicker_save_v2";

const BUILDINGS = [
  { id: "cursor", name: "Spread Cursor", icon: "👆", cost: 15, cps: 0.085, desc: "Clicks the spread for you." },
  { id: "grandma", name: "Spread Grandma", icon: "👵", cost: 100, cps: 0.85, desc: "A nice grandma to make more spreads." },
  { id: "farm", name: "Spread Farm", icon: "🌾", cost: 1100, cps: 6.8, desc: "Grows fresh spreads in the fields." },
  { id: "mine", name: "Spread Mine", icon: "⛏️", cost: 12000, cps: 40, desc: "Mines ingredients for your spreads." },
  { id: "factory", name: "Spread Factory", icon: "🏭", cost: 130000, cps: 220, desc: "Mass-produces freshly made spreads." },
  { id: "bank", name: "Spread Bank", icon: "🏦", cost: 1400000, cps: 1200, desc: "Makes your spread earn interest." },
  { id: "temple", name: "Spread Temple", icon: "🏛️", cost: 20000000, cps: 6600, desc: "A sacred place of spread worship." },
  { id: "lab", name: "Spread Lab", icon: "🧪", cost: 330000000, cps: 37000, desc: "Discovers new ways to make spreads." },
  { id: "portal", name: "Spread Portal", icon: "🌀", cost: 5100000000, cps: 220000, desc: "Brings spreads in from somewhere else." },
  { id: "galaxy", name: "Spread Galaxy", icon: "🌌", cost: 75000000000, cps: 1350000, desc: "Turns an entire galaxy into a spread factory." },
  { id: "dimension", name: "Spread Dimension", icon: "🔮", cost: 1100000000000, cps: 8500000, desc: "Makes spreads across dimensions." },
  { id: "time-machine", name: "Spread Time Machine", icon: "⏳", cost: 14000000000000, cps: 65000000, desc: "Borrows spreads from the future." },
  { id: "antimatter", name: "Spread Antimatter Condenser", icon: "⚛️", cost: 170000000000000, cps: 365000000, desc: "Condenses antimatter into pure spread." },
  { id: "prism", name: "Spread Prism", icon: "🔺", cost: 2100000000000000, cps: 2450000000, desc: "Turns light itself into spreads." },
  { id: "chancemaker", name: "Spread Chancemaker", icon: "🎲", cost: 26000000000000000, cps: 18000000000, desc: "Takes a chance and wins more spreads." },
  { id: "fractal-engine", name: "Spread Fractal Engine", icon: "🧬", cost: 310000000000000000, cps: 127500000000, desc: "Makes tiny spread makers that make more spread makers." },
  { id: "spread-suburb", name: "Spread Suburb", icon: "🏘️", cost: 420000000000000000, cps: 187000000000, desc: "Every home in town gets a tiny spreadery." },
  { id: "spread-city", name: "Spread City", icon: "🌆", cost: 850000000000000000, cps: 306000000000, desc: "A bright city where every billboard sells spreads." },
  { id: "spread-megacity", name: "Spread Megacity", icon: "🏙️", cost: 1600000000000000000, cps: 459000000000, desc: "A whole megacity runs on spread production." },
  { id: "spread-multiverse", name: "Spread Multiverse", icon: "🪐", cost: 2800000000000000000, cps: 612000000000, desc: "Parallel worlds pool their spreads together." },
  { id: "spreadster", name: "Spreadster", icon: "📻", cost: 4200000000000000000, cps: 680000000000, desc: "Broadcasts fresh spreads to everyone." },
  { id: "spreadsheet", name: "Spreadsheet", icon: "📊", cost: 58000000000000000000, cps: 3800000000000, desc: "Organizes spreads into perfectly productive rows." },
  { id: "spreadstergram", name: "Spreadstergram", icon: "📸", cost: 850000000000000000000, cps: 24500000000000, desc: "Shares spreads so fast they make more spreads." }
];

const CURSORS = [
  { id: "starter", name: "Starter Cursor", icon: "👆", cost: 0, multiplier: 1 },
  { id: "bronze", name: "Bronze Pointer", icon: "🖱️", cost: 1000, multiplier: 1.2 },
  { id: "gold", name: "Golden Pointer", icon: "🌟", cost: 7500, multiplier: 1.6 },
  { id: "diamond", name: "Diamond Cursor", icon: "💎", cost: 50000, multiplier: 2.4 },
  { id: "rainbow", name: "Rainbow Cursor", icon: "🌈", cost: 250000, multiplier: 4 },
  { id: "cosmic", name: "Cosmic Cursor", icon: "🪄", cost: 1500000, multiplier: 8 },
  { id: "comet", name: "Comet Cursor", icon: "☄️", cost: 20000000, multiplier: 16 },
  { id: "nebula", name: "Nebula Pointer", icon: "🌌", cost: 500000000, multiplier: 28 },
  { id: "quantum", name: "Quantum Cursor", icon: "⚛️", cost: 25000000000, multiplier: 48 },
  { id: "supernova", name: "Supernova Cursor", icon: "💫", cost: 10000000000000, multiplier: 80 },
  { id: "infinity", name: "Infinity Pointer", icon: "♾️", cost: 1e19, multiplier: 140 },
  { id: "tuff", name: "Tuff Tuff Cursor", icon: "👑", cost: 1e25, multiplier: 240 },
  { id: "ultra", name: "Ultra Cursor", icon: "✨", cost: 1e31, multiplier: 400 },
  { id: "galaxy", name: "Galaxy Pointer", icon: "🌠", cost: 1e37, multiplier: 640 },
  { id: "reality", name: "Reality Bender", icon: "🌀", cost: 1e43, multiplier: 1000 },
  { id: "overdrive", name: "Overdrive Cursor", icon: "⚡", cost: 1e49, multiplier: 1600 },
  { id: "titan", name: "Titan Pointer", icon: "🔱", cost: 1e55, multiplier: 2800 },
  { id: "apex", name: "Apex Cursor", icon: "🏆", cost: 1e61, multiplier: 4800 }
];

const FLAVORS = [
  { id: "hazelnut", name: "Classic Hazelnut", icon: "🌰", bonusLabel: "+10% Clicks", clickMult: 1.1, prodMult: 1, goldenSpeed: 1, desc: "Rich roasted hazelnut butter.", reqText: "Unlocked at start", req: () => true },
  { id: "salted-caramel", name: "Salted Caramel", icon: "🍮", bonusLabel: "+15% Production", clickMult: 1, prodMult: 1.15, goldenSpeed: 1, desc: "Silky caramel for busy helpers.", reqText: "Make 500 total spreads", req: (s) => s.totalCookies >= 500 },
  { id: "strawberry-jam", name: "Strawberry Jam", icon: "🍓", bonusLabel: "+20% Clicks", clickMult: 1.2, prodMult: 1, goldenSpeed: 1, desc: "Bright berry burst for fast tappers.", reqText: "Make 200 manual clicks", req: (s) => s.totalClicks >= 200 },
  { id: "pistachio-cream", name: "Pistachio Cream", icon: "💚", bonusLabel: "+25% Production", clickMult: 1, prodMult: 1.25, goldenSpeed: 1, desc: "Velvety green cream for factories.", reqText: "Own 15 helpers", req: (s) => getBuildingCount(s) >= 15 },
  { id: "golden-truffle", name: "Golden Truffle", icon: "🍯", bonusLabel: "Faster Golden Jars +15%", clickMult: 1.15, prodMult: 1.15, goldenSpeed: 1.35, desc: "Lures Golden Jars 35% more often.", reqText: "Catch 2 Golden Jars or 100K spreads", req: (s) => s.goldenJarsCaught >= 2 || s.totalCookies >= 100000 },
  { id: "cosmic-honey", name: "Cosmic Honey", icon: "🌌", bonusLabel: "+30% All Power", clickMult: 1.3, prodMult: 1.3, goldenSpeed: 1.2, desc: "Starlight nectar for late runs.", reqText: "1+ Rebirth or 25 unique fish", req: (s) => s.rebirthCount >= 1 || getFishUniqueCount(s) >= 25 },
  { id: "matcha-swirl", name: "Matcha Swirl", icon: "🍵", bonusLabel: "+35% Production", clickMult: 1.05, prodMult: 1.35, goldenSpeed: 1.1, desc: "Zen ceremonial cream for unstoppable helpers.", reqText: "Make 1 million total spreads", req: (s) => s.totalCookies >= 1000000 },
  { id: "spiced-chai", name: "Spiced Chai", icon: "🫖", bonusLabel: "+45% Clicks", clickMult: 1.45, prodMult: 1.1, goldenSpeed: 1.15, desc: "Warm cinnamon-ginger whip for massive taps.", reqText: "Make 1,500 manual clicks", req: (s) => s.totalClicks >= 1500 },
  { id: "diamond-glaze", name: "Diamond Glaze", icon: "💎", bonusLabel: "+60% All Power", clickMult: 1.6, prodMult: 1.6, goldenSpeed: 1.25, desc: "Faceted sugar crystal frosting.", reqText: "3+ Rebirths or 1T total spreads", req: (s) => s.rebirthCount >= 3 || s.totalCookies >= 1e12 },
  { id: "nebula-butter", name: "Nebula Butter", icon: "🌠", bonusLabel: "+100% Power & Fast Jars", clickMult: 2, prodMult: 2, goldenSpeed: 1.5, desc: "Cosmic whipped gold forged between stars.", reqText: "10+ Rebirths or 120 unique fish", req: (s) => s.rebirthCount >= 10 || getFishUniqueCount(s) >= 120 }
];

const FISH_HABITATS = [
  { id: "coral-garden", name: "Coral Garden", icon: "🪸", cost: 125000, bonus: 0.04, desc: "Coral comforts your fish. +4% click & production." },
  { id: "bubble-castle", name: "Bubble Castle", icon: "🫧", cost: 2500000, bonus: 0.08, desc: "A bubbly home for your collection. +8% click & production." },
  { id: "sunken-ship", name: "Sunken Treasure Ship", icon: "🚢", cost: 62500000, bonus: 0.16, desc: "Treasures inspire the whole tank. +16% click & production." },
  { id: "rainbow-reef", name: "Rainbow Reef", icon: "🌈", cost: 1250000000, bonus: 0.28, desc: "A legendary reef energizes your fish. +28% click & production." },
  { id: "atlantis-vault", name: "Atlantis Vault", icon: "🔱", cost: 50000000000, bonus: 0.45, desc: "Ancient sea wisdom surges through every tap. +45% click & production." },
  { id: "celestial-lagoon", name: "Celestial Lagoon", icon: "🌠", cost: 2500000000000, bonus: 0.8, desc: "Starlight waters supercharge the entire tank. +80% click & production." }
];

const CLICK_UPGRADES = [
  { id: "strong-fingers", name: "Spread Strong Fingers", icon: "💪", cost: 400, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 10, mult: 1.05 },
  { id: "butter-cookie", name: "Spread Butter", icon: "🧈", cost: 4000, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalCookies >= 250, mult: 1.05 },
  { id: "chocolate-chips", name: "Spread Extra Toppings", icon: "🍫", cost: 16000, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 100, mult: 1.05 },
  { id: "sugar-rush", name: "Spread Sugar Rush", icon: "🍬", cost: 80000, desc: "Each purchase adds 10% more spreads per click.", req: (s) => s.totalCookies >= 5000, mult: 1.1 },
  { id: "quick-tap", name: "Quick-Tap Practice", icon: "⚡", cost: 2400, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 25, mult: 1.05 },
  { id: "sticky-fingers", name: "Sticky Fingers", icon: "🫳", cost: 9600, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 60, mult: 1.05 },
  { id: "spread-sling", name: "Spread Sling", icon: "🥄", cost: 28800, desc: "Each purchase adds 10% more spreads per click.", req: (s) => s.totalClicks >= 120, mult: 1.1 },
  { id: "turbo-thumb", name: "Turbo Thumb", icon: "👍", cost: 72000, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 250, mult: 1.05 },
  { id: "power-palm", name: "Power Palm", icon: "🖐️", cost: 160000, desc: "Each purchase adds 10% more spreads per click.", req: (s) => s.totalClicks >= 500, mult: 1.1 },
  { id: "double-tap", name: "Double-Tap Technique", icon: "✌️", cost: 352000, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 900, mult: 1.05 },
  { id: "mega-mitts", name: "Mega Mitts", icon: "🥊", cost: 768000, desc: "Each purchase adds 10% more spreads per click.", req: (s) => s.totalClicks >= 1500, mult: 1.1 },
  { id: "lightning-click", name: "Lightning Click", icon: "🌩️", cost: 1600000, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 2500, mult: 1.05 },
  { id: "spread-storm", name: "Spreadstorm", icon: "🌪️", cost: 3520000, desc: "Each purchase adds 10% more spreads per click.", req: (s) => s.totalClicks >= 4000, mult: 1.1 },
  { id: "click-cannon", name: "Click Cannon", icon: "🚀", cost: 7200000, desc: "Each purchase adds 5% more spreads per click.", req: (s) => s.totalClicks >= 6500, mult: 1.05 },
  { id: "golden-touch-upgrade", name: "Golden Touch", icon: "✨", cost: 14400000, desc: "Each purchase multiplies spreads per click by 1.2.", req: (s) => s.totalClicks >= 10000, mult: 1.2 }
];

const UPGRADES = [
  { id: "grandmas-rolling-pin", name: "Spread Rolling Pins", icon: "🧑‍🍳", cost: 500, desc: "Grandmas make 75% more spreads.", req: (s) => (s.buildings.grandma || 0) >= 1, type: "building", target: "grandma", mult: 1.75 },
  { id: "fertilizer", name: "Spread Magic Fertilizer", icon: "🌱", cost: 5500, desc: "Spread farms are 75% more productive.", req: (s) => (s.buildings.farm || 0) >= 1, type: "building", target: "farm", mult: 1.75 },
  { id: "laser-drills", name: "Spread Laser Drills", icon: "🔦", cost: 60000, desc: "Spread mines are 75% more productive.", req: (s) => (s.buildings.mine || 0) >= 1, type: "building", target: "mine", mult: 1.75 },
  { id: "robot-bakers", name: "Spread Robot Makers", icon: "🤖", cost: 650000, desc: "Spread factories are 75% more productive.", req: (s) => (s.buildings.factory || 0) >= 1, type: "building", target: "factory", mult: 1.75 },
  { id: "interest", name: "Spread Compound Interest", icon: "💰", cost: 7000000, desc: "Spread banks are 75% more productive.", req: (s) => (s.buildings.bank || 0) >= 1, type: "building", target: "bank", mult: 1.75 },
  { id: "lab-research", name: "Spread Research", icon: "🔬", cost: 990000000, desc: "Spread Labs are 75% more productive.", req: (s) => (s.buildings.lab || 0) >= 1, type: "building", target: "lab", mult: 1.75 },
  { id: "portal-stabilizer", name: "Spread Stabilizer", icon: "🪄", cost: 15300000000, desc: "Spread Portals are 75% more productive.", req: (s) => (s.buildings.portal || 0) >= 1, type: "building", target: "portal", mult: 1.75 },
  { id: "galactic-spread", name: "Spread Galactic Boost", icon: "🌠", cost: 225000000000, desc: "Spread Galaxies are 75% more productive.", req: (s) => (s.buildings.galaxy || 0) >= 1, type: "building", target: "galaxy", mult: 1.75 },
  { id: "dimensional-spread", name: "Spread Dimension Boost", icon: "💫", cost: 3300000000000, desc: "Spread Dimensions are 75% more productive.", req: (s) => (s.buildings.dimension || 0) >= 1, type: "building", target: "dimension", mult: 1.75 },
  { id: "time-tuner", name: "Spread Time Tuner", icon: "⌚", cost: 42000000000000, desc: "Spread Time Machines are 75% more productive.", req: (s) => (s.buildings["time-machine"] || 0) >= 1, type: "building", target: "time-machine", mult: 1.75 },
  { id: "antimatter-coils", name: "Spread Antimatter Coils", icon: "🧲", cost: 510000000000000, desc: "Spread Antimatter Condensers are 75% more productive.", req: (s) => (s.buildings.antimatter || 0) >= 1, type: "building", target: "antimatter", mult: 1.75 },
  { id: "prismatic-lenses", name: "Spread Prismatic Lenses", icon: "🌈", cost: 6300000000000000, desc: "Spread Prisms are 75% more productive.", req: (s) => (s.buildings.prism || 0) >= 1, type: "building", target: "prism", mult: 1.75 },
  { id: "lucky-dice", name: "Spread Lucky Dice", icon: "🎰", cost: 78000000000000000, desc: "Spread Chancemakers are 75% more productive.", req: (s) => (s.buildings.chancemaker || 0) >= 1, type: "building", target: "chancemaker", mult: 1.75 },
  { id: "fractal-blueprints", name: "Spread Fractal Blueprints", icon: "🧩", cost: 930000000000000000, desc: "Spread Fractal Engines are 75% more productive.", req: (s) => (s.buildings["fractal-engine"] || 0) >= 1, type: "building", target: "fractal-engine", mult: 1.75 },
  { id: "spreadster-amplifier", name: "Spreadster Amplifier", icon: "📡", cost: 12600000000000000000, desc: "Spreadsters make 75% more spreads each second.", req: (s) => (s.buildings.spreadster || 0) >= 1, type: "building", target: "spreadster", mult: 1.75 },
  { id: "spreadsheet-formulas", name: "Spreadsheet Formulas", icon: "🧮", cost: 174000000000000000000, desc: "Spreadsheets make 75% more spreads each second.", req: (s) => (s.buildings.spreadsheet || 0) >= 1, type: "building", target: "spreadsheet", mult: 1.75 },
  { id: "spreadstergram-filters", name: "Spreadstergram Filters", icon: "🌈", cost: 2550000000000000000000, desc: "Spreadstergrams make 75% more spreads each second.", req: (s) => (s.buildings.spreadstergram || 0) >= 1, type: "building", target: "spreadstergram", mult: 1.75 }
];

const ACHIEVEMENTS = [
  { id: "first-cookie", icon: "✨", name: "First spread", desc: "Make your first spread.", check: (s) => s.totalClicks >= 1 },
  { id: "busy-hands", icon: "👆", name: "Busy hands", desc: "Make 100 clicks.", check: (s) => s.totalClicks >= 100 },
  { id: "combo-chef", icon: "🔥", name: "Rhythm spreader", desc: "Reach a ×2.0 click combo.", check: (s) => s.bestCombo >= 2 },
  { id: "combo-master", icon: "⚡", name: "Fever pitch", desc: "Reach a ×2.5 max click combo.", check: (s) => s.bestCombo >= 2.5 },
  { id: "dozen", icon: "🥣", name: "Making a batch", desc: "Make 1,000 spreads total.", check: (s) => s.totalCookies >= 1000 },
  { id: "cookie-mogul", icon: "🧁", name: "Spread mogul", desc: "Make 100,000 spreads total.", check: (s) => s.totalCookies >= 100000 },
  { id: "sweet-empire", icon: "🏰", name: "Spread empire", desc: "Make 10 million spreads total.", check: (s) => s.totalCookies >= 10000000 },
  { id: "spread-billionaire", icon: "💎", name: "Spread Billionaire", desc: "Make 1 billion spreads total.", check: (s) => s.totalCookies >= 1000000000 },
  { id: "spread-trillionaire", icon: "👑", name: "Spread Trillionaire", desc: "Make 1 trillion spreads total.", check: (s) => s.totalCookies >= 1000000000000 },
  { id: "big-bakery", icon: "🏠", name: "Big spreadery", desc: "Own 25 helpers.", check: (s) => getBuildingCount(s) >= 25 },
  { id: "spread-collector", icon: "🏪", name: "Spread Collector", desc: "Own 50 helpers.", check: (s) => getBuildingCount(s) >= 50 },
  { id: "metropolis", icon: "🌆", name: "Spreadopolis", desc: "Own 150 helpers.", check: (s) => getBuildingCount(s) >= 150 },
  { id: "golden-spotter", icon: "🍯", name: "Golden eye", desc: "Catch your first Golden Jar.", check: (s) => s.goldenJarsCaught >= 1 },
  { id: "golden-hunter", icon: "🪙", name: "Jar catcher", desc: "Catch 10 Golden Jars.", check: (s) => s.goldenJarsCaught >= 10 },
  { id: "flavor-artisan", icon: "🍓", name: "Flavor artisan", desc: "Unlock 4 Kitchen Flavors.", check: (s) => s.unlockedFlavors.length >= 4 },
  { id: "fish-friend", icon: "🐠", name: "Aquarium starter", desc: "Collect 10 unique fish.", check: (s) => getFishUniqueCount(s) >= 10 },
  { id: "fish-curator", icon: "🫧", name: "Tank curator", desc: "Collect 50 unique fish.", check: (s) => getFishUniqueCount(s) >= 50 },
  { id: "fish-encyclopedia", icon: "🏆", name: "Master angler", desc: "Collect all 200 standard fish.", check: (s) => getFishUniqueCount(s) >= 200 },
  { id: "first-rebirth", icon: "🌟", name: "Born anew", desc: "Complete your first Rebirth.", check: (s) => s.rebirthCount >= 1 },
  { id: "oliva-chosen", icon: "👑", name: "Chosen by Oliva", desc: "Discover the secret fish Oliva.", check: (s) => Boolean(s.fishCollection[SECRET_FISH.id]) },
  { id: "order-runner", icon: "📜", name: "Order runner", desc: "Complete 5 Spread Orders.", check: (s) => s.ordersCompleted >= 5 },
  { id: "order-legend", icon: "🎖️", name: "Master caterer", desc: "Complete 25 Spread Orders.", check: (s) => s.ordersCompleted >= 25 },
  { id: "fish-level-master", icon: "🧬", name: "Fish trainer", desc: "Reach level 10 on any fish.", check: (s) => Object.values(s.fishLevels).some((lvl) => lvl >= 10) },
  { id: "habitat-architect", icon: "🪸", name: "Reef architect", desc: "Build all 6 aquarium habitats.", check: (s) => FISH_HABITATS.every((h) => Boolean(s.fishHabitats[h.id])) },
  { id: "flavor-connoisseur", icon: "🍵", name: "Flavor connoisseur", desc: "Unlock all 10 Kitchen Flavors.", check: (s) => s.unlockedFlavors.length >= FLAVORS.length },
  { id: "rebirth-veteran", icon: "🌠", name: "Star voyager", desc: "Complete 10 Rebirths.", check: (s) => s.rebirthCount >= 10 },
  { id: "rebirth-immortal", icon: "♾️", name: "Spread immortal", desc: "Complete 100 Rebirths.", check: (s) => s.rebirthCount >= 100 }
];

const HEADLINES = [
  { min: 0, text: "Fresh spreads, straight from the jar." },
  { min: 50, text: "Local spread maker's jar mysteriously starts refilling itself." },
  { min: 500, text: "Grandmas everywhere report a sudden rise in spread demand." },
  { min: 5000, text: "Spread farms flourish as the world's taste for spreads grows." },
  { min: 50000, text: "Experts confirm: there is no such thing as too many spreads." },
  { min: 500000, text: "Your spreadery is now visible from space." },
  { min: 100000000, text: "Economists adopt the Spread Standard across three continents." }
];

const MILESTONES = [
  { title: "Make 100 clicks", target: 100, unit: "clicks", value: () => state.totalClicks },
  { title: "Make 500 clicks", target: 500, unit: "clicks", value: () => state.totalClicks },
  { title: "Make 1,000 clicks", target: 1000, unit: "clicks", value: () => state.totalClicks },
  { title: "Earn 1,000 spreads", target: 1000, unit: "spreads", value: () => state.totalCookies },
  { title: "Make 5,000 clicks", target: 5000, unit: "clicks", value: () => state.totalClicks },
  { title: "Earn 1 million spreads", target: 1000000, unit: "spreads", value: () => state.totalCookies },
  { title: "Own 25 helpers", target: 25, unit: "helpers", value: () => getBuildingCount() },
  { title: "Collect 10 fish", target: 10, unit: "fish", value: () => getFishUniqueCount() },
  { title: "Earn 1 billion spreads", target: 1000000000, unit: "spreads", value: () => state.totalCookies },
  { title: "Own 100 helpers", target: 100, unit: "helpers", value: () => getBuildingCount() },
  { title: "Collect 50 fish", target: 50, unit: "fish", value: () => getFishUniqueCount() },
  { title: "Collect all 200 fish", target: 200, unit: "fish", value: () => getFishUniqueCount() }
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
const OLIVA_REWARD = 1e58;
const FISH_BATCH_ROLL_COUNT = 10000;
const MAX_REBIRTHS = 100;
const CLICK_COOLDOWN_MS = 20 * 60 * 60 * 1000;
const FISH_TIER_SELL_MULTIPLIERS = [0.4, 0.75, 1.5, 3.5, 7, 14];
const FISH_TIER_CLICK_FLAT = {
  Common: 1,
  Uncommon: 2,
  Rare: 5,
  Epic: 12,
  Legendary: 30,
  Mythic: 75,
  Secret: 500
};
const FISH_TIER_CLICK_PERCENT = {
  Common: 0.01,
  Uncommon: 0.015,
  Rare: 0.025,
  Epic: 0.04,
  Legendary: 0.07,
  Mythic: 0.12,
  Secret: 0.5
};
const THEMES = [
  { id: "warm", label: "🎨 Warm", className: "" },
  { id: "espresso", label: "🌙 Espresso", className: "theme-espresso" },
  { id: "matcha", label: "🍵 Matcha", className: "theme-matcha" }
];

const REBIRTH_UPGRADES = [
  { id: "star-touched-click", name: "Star-Touched Click", icon: "✨", unlockAt: 1, cost: 1, clickMultiplier: 1.1, productionMultiplier: 1, desc: "+10% click power." },
  { id: "steady-star-bakery", name: "Steady Star Bakery", icon: "🌠", unlockAt: 3, cost: 2, clickMultiplier: 1, productionMultiplier: 1.1, desc: "+10% building production." },
  { id: "orbiting-fingertips", name: "Orbiting Fingertips", icon: "🪐", unlockAt: 5, cost: 3, clickMultiplier: 1.15, productionMultiplier: 1, desc: "+15% click power." },
  { id: "nova-ovens", name: "Nova Ovens", icon: "🌌", unlockAt: 10, cost: 5, clickMultiplier: 1, productionMultiplier: 1.15, desc: "+15% building production." },
  { id: "starlight-synergy", name: "Starlight Synergy", icon: "🌟", unlockAt: 25, cost: 10, clickMultiplier: 1.2, productionMultiplier: 1.2, desc: "+20% click power and production." },
  { id: "galactic-recipe", name: "Galactic Recipe", icon: "🌌", unlockAt: 50, cost: 20, clickMultiplier: 1.25, productionMultiplier: 1.25, desc: "+25% click power and production." },
  { id: "rebirth-mastery", name: "Rebirth Mastery", icon: "👑", unlockAt: 100, cost: 30, clickMultiplier: 1.35, productionMultiplier: 1.35, desc: "+35% click power and production." }
];

function createDefaultState() {
  return {
    cookies: 0,
    totalCookies: 0,
    totalClicks: 0,
    playTimeSeconds: 0,
    rebirthCount: 0,
    rebirthPoints: 0,
    rebirthUpgrades: [],
    buildings: {},
    upgrades: [],
    achievements: [],
    soundEnabled: true,
    voiceEnabled: false,
    theme: "warm",
    goldenJarsCaught: 0,
    bestCombo: 1,
    equippedFlavor: "hazelnut",
    unlockedFlavors: ["hazelnut"],
    freeFishRollTokens: 0,
    bulkBuyMode: "1",
    clickUpgradeLevels: {},
    cursorCollection: { starter: true },
    equippedCursor: "starter",
    fishCollection: {},
    fishLevels: {},
    fishHabitats: {},
    fishLuckLevel: 0,
    fishRolls: 0,
    fishDailyRollDate: "",
    fishCollectionRewardClaimed: false,
    ordersCompleted: 0,
    activeOrders: [],
    clickCooldownEnabled: false,
    lastAcceptedSpreadClickAt: 0,
    whiteoutScreen: false,
    lastSaved: Date.now()
  };
}

function sanitizeStateObject(saved) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) throw new Error("Save data is not an object.");
  const defaults = createDefaultState();
  const s = { ...defaults, ...saved };
  delete s.goldenCaught;
  delete s.dailyBonusDate;
  delete s.dailyBonusStreak;
  ["cookies", "totalCookies", "totalClicks", "playTimeSeconds", "lastSaved"].forEach((key) => {
    if (!Number.isFinite(s[key]) || s[key] < 0) s[key] = defaults[key];
  });
  ["rebirthCount", "rebirthPoints", "goldenJarsCaught", "freeFishRollTokens", "ordersCompleted"].forEach((key) => {
    if (!Number.isSafeInteger(s[key]) || s[key] < 0) s[key] = defaults[key];
  });
  if (!Number.isFinite(s.bestCombo) || s.bestCombo < 1) s.bestCombo = 1;
  s.rebirthCount = Math.min(MAX_REBIRTHS, s.rebirthCount);
  if (!Array.isArray(s.rebirthUpgrades)) s.rebirthUpgrades = [];
  const rebirthUpgradeIds = new Set(REBIRTH_UPGRADES.map((upgrade) => upgrade.id));
  s.rebirthUpgrades = [...new Set(s.rebirthUpgrades.filter((id) => rebirthUpgradeIds.has(id)))];
  if (!s.buildings || typeof s.buildings !== "object" || Array.isArray(s.buildings)) s.buildings = {};
  if (!Array.isArray(s.upgrades)) s.upgrades = [];
  if (!Array.isArray(s.achievements)) s.achievements = [];
  const validAchIds = new Set(ACHIEVEMENTS.map((a) => a.id));
  s.achievements = [...new Set(s.achievements.filter((id) => validAchIds.has(id)))];
  s.soundEnabled = Boolean(s.soundEnabled);
  s.voiceEnabled = Boolean(s.voiceEnabled);
  if (!THEMES.some((t) => t.id === s.theme)) s.theme = "warm";
  if (!["1", "10", "100", "max"].includes(String(s.bulkBuyMode))) s.bulkBuyMode = "1";
  const validFlavorIds = new Set(FLAVORS.map((f) => f.id));
  if (!Array.isArray(s.unlockedFlavors)) s.unlockedFlavors = ["hazelnut"];
  s.unlockedFlavors = [...new Set(["hazelnut", ...s.unlockedFlavors.filter((id) => validFlavorIds.has(id))])];
  if (!validFlavorIds.has(s.equippedFlavor) || !s.unlockedFlavors.includes(s.equippedFlavor)) s.equippedFlavor = "hazelnut";

  if (!s.clickUpgradeLevels || typeof s.clickUpgradeLevels !== "object" || Array.isArray(s.clickUpgradeLevels)) s.clickUpgradeLevels = {};
  const clickUpgradeIds = new Set(CLICK_UPGRADES.map((upgrade) => upgrade.id));
  Object.keys(s.clickUpgradeLevels).forEach((id) => {
    const level = s.clickUpgradeLevels[id];
    if (!clickUpgradeIds.has(id) || !Number.isSafeInteger(level) || level < 0) delete s.clickUpgradeLevels[id];
  });
  CLICK_UPGRADES.forEach((upgrade) => {
    if (s.upgrades.includes(upgrade.id)) {
      s.clickUpgradeLevels[upgrade.id] = Math.max(1, s.clickUpgradeLevels[upgrade.id] || 0);
    }
  });
  s.upgrades = s.upgrades.filter((id) => !clickUpgradeIds.has(id));
  if (!s.cursorCollection || typeof s.cursorCollection !== "object" || Array.isArray(s.cursorCollection)) s.cursorCollection = { starter: true };
  const validCursorIds = new Set(CURSORS.map((cursor) => cursor.id));
  Object.keys(s.cursorCollection).forEach((id) => {
    if (!validCursorIds.has(id) || typeof s.cursorCollection[id] !== "boolean") delete s.cursorCollection[id];
  });
  s.cursorCollection.starter = true;
  if (!validCursorIds.has(s.equippedCursor) || !s.cursorCollection[s.equippedCursor]) s.equippedCursor = "starter";
  if (!s.fishCollection || typeof s.fishCollection !== "object" || Array.isArray(s.fishCollection)) s.fishCollection = {};
  if (!s.fishLevels || typeof s.fishLevels !== "object" || Array.isArray(s.fishLevels)) s.fishLevels = {};
  if (!s.fishHabitats || typeof s.fishHabitats !== "object" || Array.isArray(s.fishHabitats)) s.fishHabitats = {};
  const validHabitatIds = new Set(FISH_HABITATS.map((habitat) => habitat.id));
  Object.keys(s.fishHabitats).forEach((id) => {
    if (!validHabitatIds.has(id) || typeof s.fishHabitats[id] !== "boolean") delete s.fishHabitats[id];
  });
  const validFishIds = new Set([...FISH_CHARACTERS.map((character) => character.id), SECRET_FISH.id]);
  Object.keys(s.fishCollection).forEach((id) => {
    const count = s.fishCollection[id];
    if (!validFishIds.has(id) || !Number.isSafeInteger(count) || count < 0) delete s.fishCollection[id];
  });
  Object.keys(s.fishLevels).forEach((id) => {
    const level = s.fishLevels[id];
    if (!validFishIds.has(id) || !Number.isInteger(level) || level < 1 || level > 10) delete s.fishLevels[id];
  });
  if (!Number.isInteger(s.fishLuckLevel) || s.fishLuckLevel < 0 || s.fishLuckLevel > 5) s.fishLuckLevel = 0;
  if (!Number.isSafeInteger(s.fishRolls) || s.fishRolls < 0) s.fishRolls = 0;
  if (typeof s.fishDailyRollDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s.fishDailyRollDate)) s.fishDailyRollDate = "";
  s.fishCollectionRewardClaimed = Boolean(s.fishCollectionRewardClaimed);
  if (!Array.isArray(s.activeOrders)) s.activeOrders = [];
  s.activeOrders = s.activeOrders
    .filter((order) => order && typeof order.id === "string" && typeof order.kind === "string"
      && Number.isFinite(order.target) && order.target > 0 && Number.isFinite(order.baseline))
    .slice(0, 3);
  s.clickCooldownEnabled = Boolean(s.clickCooldownEnabled);
  if (!Number.isFinite(s.lastAcceptedSpreadClickAt) || s.lastAcceptedSpreadClickAt < 0) {
    s.lastAcceptedSpreadClickAt = 0;
  }
  s.whiteoutScreen = Boolean(s.whiteoutScreen);
  return s;
}

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createDefaultState();
    return sanitizeStateObject(JSON.parse(raw));
  } catch (error) {
    console.warn("Could not load the game save; starting a fresh game.", error);
    return createDefaultState();
  }
}

let state = loadGame();
let frenzyMultiplier = 1;
let frenzyEndTime = 0;
let clickFrenzyMultiplier = 1;
let clickFrenzyEndTime = 0;
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
let fishSearchQuery = "";
let fishFlightFrame = null;
let fishFlightVersion = 0;
let fishScrollBehavior = null;
let fishOlivaTimer = null;
let selectedAchievementId = null;
let displayedCookies = state.cookies;

// Combo & Golden Jar state
let comboCharge = 0;
let lastComboClickAt = 0;
let goldenJarSpawnTimer = null;
let goldenJarDespawnTimer = null;
let confirmActionCallback = null;

// Full-screen 60fps Canvas FX particle queue
const fxParticles = [];
let fxWidth = window.innerWidth;
let fxHeight = window.innerHeight;
let fxDpr = Math.min(2, window.devicePixelRatio || 1);
let ambientMoteTimer = 0;
let countBumpTimer = null;

const SPREAD_CHEAT_CODE = "TimmyTuffJeff";
const ENABLE_COOLDOWN_CODE = "BADHOG";
const REMOVE_COOLDOWN_CODE = "REMOVEE";
const RESET_PROGRESS_CODE = "reset";
const WHITEOUT_CODE = "CallumSpread";
const WHITEOUT_FIX_CODE = "CallumFix";
const ADMIN_PASSWORD = "charlie12032012franke";

const els = {
  cookieCount: document.getElementById("cookie-count"),
  cps: document.getElementById("cps-display"),
  cpc: document.getElementById("cpc-display"),
  milestoneTitle: document.getElementById("milestone-title"),
  milestoneBar: document.getElementById("milestone-bar"),
  milestoneFill: document.getElementById("milestone-fill"),
  milestoneProgress: document.getElementById("milestone-progress"),
  total: document.getElementById("stat-total"),
  clicks: document.getElementById("stat-clicks"),
  goldenStat: document.getElementById("stat-golden"),
  bestComboStat: document.getElementById("stat-best-combo"),
  masteryStat: document.getElementById("stat-mastery"),
  time: document.getElementById("stat-time"),
  rebirthCount: document.getElementById("rebirth-count"),
  rebirthStars: document.getElementById("rebirth-stars"),
  rebirthBoost: document.getElementById("rebirth-boost"),
  rebirthPanel: document.getElementById("rebirth-menu"),
  rebirthStatus: document.getElementById("rebirth-status"),
  rebirthButton: document.getElementById("rebirth-button"),
  rebirthUpgrades: document.getElementById("rebirth-upgrades"),
  rebirthMenuShortcut: document.getElementById("rebirth-menu-shortcut"),
  bakeStage: document.getElementById("bake-stage"),
  ambientSparks: document.getElementById("ambient-sparks"),
  orbitCursors: document.getElementById("orbit-cursors"),
  cookieButton: document.getElementById("cookie-btn"),
  equippedCursorBadge: document.getElementById("equipped-cursor-badge"),
  goldenSpreadLayer: document.getElementById("golden-spread-layer"),
  comboMeter: document.getElementById("combo-meter"),
  comboBadge: document.getElementById("combo-badge"),
  comboFill: document.getElementById("combo-fill"),
  clickCooldownStatus: document.getElementById("click-cooldown-status"),
  clickHint: document.getElementById("click-hint"),
  clickParticles: document.getElementById("click-particles"),
  clickStreak: document.getElementById("click-streak"),
  flavorSummary: document.getElementById("flavor-summary"),
  flavorBonusLabel: document.getElementById("flavor-bonus-label"),
  flavorsContainer: document.getElementById("flavors-container"),
  ordersCompletedCount: document.getElementById("orders-completed-count"),
  ordersContainer: document.getElementById("orders-container"),
  upgrades: document.getElementById("upgrades-container"),
  cursorShop: document.getElementById("cursor-shop-container"),
  bulkBuyControls: document.getElementById("bulk-buy-controls"),
  buildings: document.getElementById("buildings-container"),
  achievements: document.getElementById("achievements-container"),
  achievementCount: document.getElementById("achievements-count"),
  achievementDetail: document.getElementById("achievement-detail"),
  fishRoll: document.getElementById("fish-roll"),
  aquariumSwimmers: document.getElementById("aquarium-swimmers"),
  footer10kRolls: document.getElementById("footer-10k-rolls"),
  footer10kRollsLabel: document.getElementById("footer-10k-rolls-label"),
  fishDailyRoll: document.getElementById("fish-daily-roll"),
  fishFreeRollBtn: document.getElementById("fish-free-roll-btn"),
  fishFreeTokens: document.getElementById("fish-free-tokens"),
  fishLuckUpgrade: document.getElementById("fish-luck-upgrade"),
  fishHabitats: document.getElementById("fish-habitats"),
  fishCollection: document.getElementById("fish-collection"),
  fishCollectionDetails: document.getElementById("fish-collection-details"),
  fishCollectionFilters: document.getElementById("fish-collection-filters"),
  fishSearchInput: document.getElementById("fish-search-input"),
  fishLevelAll: document.getElementById("fish-level-all"),
  fishSellDuplicates: document.getElementById("fish-sell-duplicates"),
  fishCollectionCount: document.getElementById("fish-collection-count"),
  fishRollCount: document.getElementById("fish-roll-count"),
  fishClickBonus: document.getElementById("fish-click-bonus"),
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
  themeToggleBtn: document.getElementById("theme-toggle-btn"),
  soundButton: document.getElementById("toggle-sfx-btn"),
  voiceButton: document.getElementById("toggle-voice-btn"),
  resetButton: document.getElementById("reset-btn"),
  buildingSummary: document.getElementById("building-summary"),
  confirmModal: document.getElementById("confirm-modal"),
  confirmTitle: document.getElementById("confirm-title"),
  confirmMessage: document.getElementById("confirm-message"),
  confirmAccept: document.getElementById("confirm-accept"),
  confirmCancel: document.getElementById("confirm-cancel"),
  confirmClose: document.getElementById("confirm-close"),
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
  adminMult10x: document.getElementById("admin-mult-10x"),
  adminSet1e90: document.getElementById("admin-set-1e90"),
  adminZeroJar: document.getElementById("admin-zero-jar"),
  adminClickBoost: document.getElementById("admin-click-boost"),
  adminProductionBoost: document.getElementById("admin-production-boost"),
  adminToggleCooldown: document.getElementById("admin-toggle-cooldown"),
  adminMaxCombo: document.getElementById("admin-max-combo"),
  adminClickFrenzy: document.getElementById("admin-click-frenzy"),
  adminSpawnGolden: document.getElementById("admin-spawn-golden"),
  adminGoldenRain: document.getElementById("admin-golden-rain"),
  adminFxAll: document.getElementById("admin-fx-all"),
  adminFxFireworks: document.getElementById("admin-fx-fireworks"),
  adminFxSpreadRain: document.getElementById("admin-fx-spread-rain"),
  adminFxShockwave: document.getElementById("admin-fx-shockwave"),
  adminSpinMode: document.getElementById("admin-spin-mode"),
  adminRainbowMode: document.getElementById("admin-rainbow-mode"),
  adminEveryBuilding: document.getElementById("admin-every-building"),
  admin100kBuildings: document.getElementById("admin-100k-buildings"),
  adminAllUpgrades: document.getElementById("admin-all-upgrades"),
  adminAllFlavors: document.getElementById("admin-all-flavors"),
  adminSugarFrenzy: document.getElementById("admin-sugar-frenzy"),
  adminMystery: document.getElementById("admin-mystery"),
  adminConfetti: document.getElementById("admin-confetti"),
  adminDisco: document.getElementById("admin-disco"),
  adminDance: document.getElementById("admin-dance"),
  adminLuckyClick: document.getElementById("admin-lucky-click"),
  adminRandomFish: document.getElementById("admin-random-fish"),
  adminCompleteFish: document.getElementById("admin-complete-fish"),
  adminFree10kFishRolls: document.getElementById("admin-free-10k-fish-rolls"),
  adminMaxFishHabitats: document.getElementById("admin-max-fish-habitats"),
  adminClearBoosts: document.getElementById("admin-clear-boosts"),
  adminUnlockOliva: document.getElementById("admin-unlock-oliva"),
  adminAdd100Fish: document.getElementById("admin-add-100-fish"),
  adminAllCursors: document.getElementById("admin-all-cursors"),
  adminGrantTokens: document.getElementById("admin-grant-tokens"),
  adminMaxLuck: document.getElementById("admin-max-luck"),
  adminResetDailyRoll: document.getElementById("admin-reset-daily-roll"),
  adminMaxRebirths: document.getElementById("admin-max-rebirths"),
  adminAllAchievements: document.getElementById("admin-all-achievements"),
  adminCompleteOrders: document.getElementById("admin-complete-orders"),
  clickBoostStatus: document.getElementById("click-boost-status"),
  productionBoostStatus: document.getElementById("production-boost-status"),
  adminStatus: document.getElementById("admin-status"),
  celebrationLayer: document.getElementById("celebration-layer"),
  fxCanvas: document.getElementById("fx-canvas"),
  stageFlash: document.getElementById("stage-flash")
};
const fxCtx = els.fxCanvas ? els.fxCanvas.getContext("2d") : null;

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

function getBuildingCostAt(building, owned) {
  return Math.min(Number.MAX_VALUE, Math.floor(building.cost * Math.pow(1.16, owned)));
}

function getBuildingCost(building) {
  return getBuildingCostAt(building, state.buildings[building.id] || 0);
}

function getBulkPurchaseInfo(building, mode = state.bulkBuyMode) {
  const owned = state.buildings[building.id] || 0;
  if (mode === "1") {
    const cost = getBuildingCostAt(building, owned);
    return { count: 1, cost, affordable: state.cookies >= cost };
  }
  const limit = mode === "max" ? 500 : Number(mode);
  let totalCost = 0;
  let bought = 0;
  for (let i = 0; i < limit; i++) {
    const nextCost = getBuildingCostAt(building, owned + i);
    if (!Number.isFinite(totalCost + nextCost)) break;
    if (mode === "max" && totalCost + nextCost > state.cookies) break;
    totalCost += nextCost;
    bought++;
  }
  if (mode === "max" && bought === 0) {
    const oneCost = getBuildingCostAt(building, owned);
    return { count: 1, cost: oneCost, affordable: state.cookies >= oneCost };
  }
  return { count: bought, cost: totalCost, affordable: bought > 0 && state.cookies >= totalCost };
}

function getBuildingMultiplier(id) {
  return UPGRADES.filter((upgrade) => upgrade.type === "building" && upgrade.target === id && state.upgrades.includes(upgrade.id))
    .reduce((multiplier, upgrade) => multiplier * upgrade.mult, 1);
}

function getActiveFlavor() {
  return FLAVORS.find((f) => f.id === state.equippedFlavor) || FLAVORS[0];
}

function getAchievementMasteryMultiplier() {
  return 1 + state.achievements.length * 0.02;
}

function getComboMultiplier() {
  if (comboCharge >= 90) return 2.5;
  if (comboCharge >= 70) return 2.0;
  if (comboCharge >= 45) return 1.5;
  if (comboCharge >= 20) return 1.25;
  return 1.0;
}

function getRebirthBuildingRequirement() {
  return state.rebirthCount === 0 ? 1 : Math.min(100, state.rebirthCount * 10);
}

function getRebirthReward() {
  const requiredBuildings = getRebirthBuildingRequirement();
  return state.rebirthCount < MAX_REBIRTHS && (state.buildings.spreadstergram || 0) >= requiredBuildings ? 1 : 0;
}

function getRebirthMultiplier() {
  return 1 + state.rebirthCount * 0.1;
}

function getRebirthUpgradeMultiplier(type) {
  return state.rebirthUpgrades.reduce((multiplier, id) => {
    const upgrade = REBIRTH_UPGRADES.find((item) => item.id === id);
    if (!upgrade) return multiplier;
    return multiplier * (type === "click" ? upgrade.clickMultiplier : upgrade.productionMultiplier);
  }, 1);
}

function getClickUpgradeCost(upgrade) {
  const level = state.clickUpgradeLevels[upgrade.id] || 0;
  return Math.min(MAX_SPREAD_GRANT, Math.floor(upgrade.cost * Math.pow(2.8, level)));
}

function getFishRollCost() {
  return Math.min(MAX_SPREAD_GRANT, Math.max(100, Math.floor(state.totalCookies * 0.0012)));
}

function getFishBatchCost() {
  return Math.min(Number.MAX_VALUE, getFishRollCost() * FISH_BATCH_ROLL_COUNT);
}

function getFishDuplicateSaleValue(character) {
  const tierIndex = getFishTierIndex(character);
  return Math.min(MAX_SPREAD_GRANT, Math.floor(getFishRollCost() * FISH_TIER_SELL_MULTIPLIERS[tierIndex]));
}

function getFishLuckUpgradeCost() {
  return Math.min(MAX_SPREAD_GRANT, Math.max(1000, Math.floor(state.totalCookies * 0.00001)) * Math.pow(5, state.fishLuckLevel));
}

function getFishLevelUpCost(id) {
  const character = [...FISH_CHARACTERS, SECRET_FISH].find((item) => item.id === id);
  if (!character) return MAX_SPREAD_GRANT;
  const tierIndex = getFishTierIndex(character);
  const level = state.fishLevels[id] || 1;
  return Math.min(MAX_SPREAD_GRANT, Math.max(1000, Math.floor(getFishRollCost() * 0.12 * (tierIndex + 1) * level)));
}

function getFishHabitatMultiplier() {
  const habitatBonus = FISH_HABITATS.reduce((total, habitat) =>
    total + (state.fishHabitats[habitat.id] ? habitat.bonus : 0), 0);
  return 1 + habitatBonus;
}

function getFishProductionMultiplier() {
  const bonusLevels = Object.entries(state.fishLevels).reduce((total, [id, level]) =>
    total + (state.fishCollection[id] ? Math.max(0, level - 1) : 0), 0);
  return (1 + bonusLevels * 0.008) * getFishHabitatMultiplier();
}

function getFishFlatClickBonus() {
  return Object.entries(state.fishCollection).reduce((total, [id, copies]) => {
    if (!copies) return total;
    const character = getFishCharacterById(id);
    const level = state.fishLevels[id] || 1;
    const perLevel = character ? (FISH_TIER_CLICK_FLAT[character.tier] || 1) : 1;
    return total + perLevel * level;
  }, 0);
}

function getFishClickMultiplier() {
  const percentBonus = Object.entries(state.fishCollection).reduce((total, [id, copies]) => {
    if (!copies) return total;
    const character = getFishCharacterById(id);
    const level = state.fishLevels[id] || 1;
    const perLevel = character ? (FISH_TIER_CLICK_PERCENT[character.tier] || 0.01) : 0.01;
    return total + perLevel * level;
  }, 0);
  return (1 + percentBonus) * getFishHabitatMultiplier();
}

function getFishUniqueCount(game = state) {
  return FISH_CHARACTERS.reduce((total, character) => total + (game.fishCollection[character.id] ? 1 : 0), 0);
}

function getLocalDateKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function getFishTierOdds() {
  const level = state.fishLuckLevel;
  return [
    { name: "Common", chance: 50 - 2.2 * level },
    { name: "Uncommon", chance: 25 },
    { name: "Rare", chance: 15 + 1.5 * level },
    { name: "Epic", chance: 7 + 0.5 * level },
    { name: "Legendary", chance: 2.9 + 0.15 * level },
    { name: "Mythic", chance: 0.1 + 0.05 * level }
  ];
}

function getBaseBuildingCps(building) {
  const boost = Date.now() < productionBoostEndTime ? 1.5 : 1;
  const flavor = getActiveFlavor();
  return building.cps
    * getBuildingMultiplier(building.id)
    * frenzyMultiplier
    * boost
    * getFishProductionMultiplier()
    * getRebirthMultiplier()
    * getRebirthUpgradeMultiplier("production")
    * getAchievementMasteryMultiplier()
    * flavor.prodMult;
}

function getCookiesPerSecond() {
  return BUILDINGS.reduce((sum, building) => sum + (state.buildings[building.id] || 0) * getBaseBuildingCps(building), 0);
}

function getCookiesPerClick() {
  const baseClick = 1 + getFishFlatClickBonus();
  const multiplier = CLICK_UPGRADES.reduce((total, upgrade) => {
    const level = state.clickUpgradeLevels[upgrade.id] || 0;
    return Math.min(1e100, total * Math.pow(upgrade.mult, level));
  }, 1);
  const cursor = CURSORS.find((item) => item.id === state.equippedCursor) || CURSORS[0];
  const flavor = getActiveFlavor();
  const boost = Date.now() < clickBoostEndTime ? 1.5 : 1;
  return Math.max(1, Math.floor(Math.min(
    1e100,
    baseClick
    * multiplier
    * cursor.multiplier
    * frenzyMultiplier
    * clickFrenzyMultiplier
    * boost
    * getComboMultiplier()
    * getFishClickMultiplier()
    * getRebirthMultiplier()
    * getRebirthUpgradeMultiplier("click")
    * getAchievementMasteryMultiplier()
    * flavor.clickMult
  )));
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
  while (els.toastContainer.childElementCount >= 4) {
    els.toastContainer.firstElementChild.remove();
  }
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  els.toastContainer.appendChild(toast);
  window.setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.25s ease";
    window.setTimeout(() => toast.remove(), 260);
  }, 3000);
}

function applyTheme(themeId) {
  const theme = THEMES.find((t) => t.id === themeId) || THEMES[0];
  state.theme = theme.id;
  document.body.classList.remove("theme-espresso", "theme-matcha");
  if (theme.className) document.body.classList.add(theme.className);
  els.themeToggleBtn.textContent = theme.label;
}

function applyWhiteoutMode() {
  const enabled = Boolean(state.whiteoutScreen);
  document.body.classList.toggle("whiteout-mode", enabled);
  if (enabled && document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

function showConfirmModal(title, message, acceptLabel, onAccept) {
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmAccept.textContent = acceptLabel;
  confirmActionCallback = onAccept;
  els.confirmModal.hidden = false;
  els.confirmAccept.focus();
}

function closeConfirmModal() {
  els.confirmModal.hidden = true;
  confirmActionCallback = null;
}

function updateEquippedCursorBadge() {
  const cursor = CURSORS.find((item) => item.id === state.equippedCursor) || CURSORS[0];
  els.equippedCursorBadge.textContent = `${cursor.icon} ${cursor.name.replace(/\s+(Cursor|Pointer)$/, "")}`;
}

function updateComboUI() {
  const mult = getComboMultiplier();
  const label = mult >= 2.5 ? "FEVER!" : mult >= 2.0 ? "Blazing" : mult >= 1.5 ? "Hot" : mult > 1 ? "Warming" : "Ready";
  els.comboBadge.textContent = `×${mult.toFixed(mult % 1 === 0 ? 1 : 2)} · ${label}`;
  els.comboFill.style.width = `${Math.min(100, Math.max(0, comboCharge))}%`;
  els.comboMeter.classList.toggle("hot", mult >= 2.0);
  if (mult > state.bestCombo) {
    state.bestCombo = mult;
    checkAchievements();
  }
}

function updateMilestone() {
  const milestone = MILESTONES.find((item) => item.value() < item.target);
  if (!milestone) {
    els.milestoneTitle.textContent = "Every milestone reached!";
    els.milestoneProgress.textContent = "You're a spread legend.";
    els.milestoneFill.style.width = "100%";
    els.milestoneBar.setAttribute("aria-valuenow", "100");
    return;
  }

  const progress = Math.max(0, Math.min(milestone.target, milestone.value()));
  const percent = Math.floor((progress / milestone.target) * 100);
  els.milestoneTitle.textContent = milestone.title;
  els.milestoneProgress.textContent = `${formatNumber(progress)} / ${formatNumber(milestone.target)} ${milestone.unit}`;
  els.milestoneFill.style.width = `${percent}%`;
  els.milestoneBar.setAttribute("aria-valuenow", String(percent));
}

function updateRebirthUI(renderUpgrades = false) {
  const reward = getRebirthReward();
  const requiredBuildings = getRebirthBuildingRequirement();
  const ownedBuildings = state.buildings.spreadstergram || 0;
  els.rebirthCount.textContent = state.rebirthCount.toLocaleString();
  els.rebirthStars.textContent = state.rebirthPoints.toLocaleString();
  els.rebirthBoost.textContent = `×${formatNumber(getRebirthMultiplier())}`;
  els.rebirthButton.disabled = reward === 0;
  els.rebirthButton.textContent = state.rebirthCount >= MAX_REBIRTHS
    ? "🌟 All 100 rebirths complete"
    : reward
      ? "🌟 Rebirth · +10% power and 1 Star"
      : `🌟 Rebirth · need ${requiredBuildings} Spreadstergram${requiredBuildings === 1 ? "" : "s"}`;
  els.rebirthStatus.textContent = state.rebirthCount >= MAX_REBIRTHS
    ? "You have reached the 100-rebirth limit. Your permanent rebirth bonus is +1,000%."
    : reward
      ? `You own ${ownedBuildings} Spreadstergram${ownedBuildings === 1 ? "" : "s"}. Rebirth resets current spreads, clicks, buildings, upgrades, and cursors, while keeping fish, habitats, flavors, and achievements.`
      : `Own ${requiredBuildings} Spreadstergram${requiredBuildings === 1 ? "" : "s"} to rebirth (${ownedBuildings} owned). Each rebirth grants 1 Rebirth Star and +10% permanent click and production power.`;
  if (renderUpgrades) renderRebirthUpgrades();
}

function formatCooldownRemaining(ms) {
  const totalSeconds = Math.ceil(ms / 1000);
  if (totalSeconds < 60) return `${(ms / 1000).toFixed(1)}s`;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  }
  return `${minutes}m ${String(seconds).padStart(2, "0")}s`;
}

function syncCooldownHint() {
  if (state.clickCooldownEnabled) {
    els.clickHint.innerHTML = 'Click once every 20 hours (or press <kbd>Space</kbd>) to build your <strong>combo multiplier</strong>';
    els.adminToggleCooldown.setAttribute("aria-pressed", "true");
    els.adminToggleCooldown.textContent = "⏱️ Cooldown: 20h (Remove)";
  } else {
    els.clickHint.innerHTML = 'Tap fast or press <kbd>Space</kbd> to build your <strong>combo multiplier</strong>';
    els.adminToggleCooldown.setAttribute("aria-pressed", "false");
    els.adminToggleCooldown.textContent = "⏱️ Cooldown: Off (Enable 20h)";
  }
}

function updateClickCooldownUI(currentTime = Date.now()) {
  if (!state.clickCooldownEnabled) {
    els.cookieButton.classList.remove("cooling");
    els.clickCooldownStatus.classList.remove("cooling");
    els.clickCooldownStatus.textContent = "Ready to spread";
    return;
  }
  const remainingMs = Math.max(0, CLICK_COOLDOWN_MS - (currentTime - state.lastAcceptedSpreadClickAt));
  const isCooling = remainingMs > 0;
  els.cookieButton.classList.toggle("cooling", isCooling);
  els.clickCooldownStatus.classList.toggle("cooling", isCooling);
  els.clickCooldownStatus.textContent = isCooling
    ? `Next spread in ${formatCooldownRemaining(remainingMs)}`
    : "Ready to spread";
}

function renderRebirthUpgrades() {
  els.rebirthUpgrades.replaceChildren();
  REBIRTH_UPGRADES.forEach((upgrade) => {
    const purchased = state.rebirthUpgrades.includes(upgrade.id);
    const unlocked = state.rebirthCount >= upgrade.unlockAt;
    const button = document.createElement("button");
    button.type = "button";
    button.className = `rebirth-upgrade-card${purchased ? " purchased" : ""}`;
    button.dataset.rebirthUpgradeId = upgrade.id;
    button.disabled = purchased || !unlocked || state.rebirthPoints < upgrade.cost;
    const icon = document.createElement("span");
    icon.className = "rebirth-upgrade-icon";
    icon.textContent = upgrade.icon;
    const info = document.createElement("span");
    info.className = "rebirth-upgrade-info";
    const name = document.createElement("strong");
    name.textContent = upgrade.name;
    const description = document.createElement("span");
    description.textContent = upgrade.desc;
    info.append(name, description);
    const action = document.createElement("span");
    action.className = "rebirth-upgrade-action";
    action.textContent = purchased
      ? "Owned"
      : unlocked
        ? `${upgrade.cost} Star${upgrade.cost === 1 ? "" : "s"}`
        : `Rebirth ${upgrade.unlockAt}`;
    button.append(icon, info, action);
    els.rebirthUpgrades.appendChild(button);
  });
}

function checkFlavorUnlocks() {
  let unlockedAny = false;
  FLAVORS.forEach((flavor) => {
    if (!state.unlockedFlavors.includes(flavor.id) && flavor.req(state)) {
      state.unlockedFlavors.push(flavor.id);
      showToast(`${flavor.icon} New flavor unlocked: ${flavor.name}!`);
      unlockedAny = true;
    }
  });
  if (unlockedAny) renderFlavors();
}

function renderFlavors() {
  const active = getActiveFlavor();
  els.flavorSummary.textContent = `${active.icon} ${active.name}`;
  els.flavorBonusLabel.textContent = `Active: ${active.bonusLabel}`;
  els.flavorsContainer.replaceChildren();

  FLAVORS.forEach((flavor) => {
    const unlocked = state.unlockedFlavors.includes(flavor.id);
    const equipped = state.equippedFlavor === flavor.id;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `flavor-card${equipped ? " equipped" : ""}`;
    btn.disabled = !unlocked;
    btn.title = unlocked ? flavor.desc : `Locked: ${flavor.reqText}`;
    btn.setAttribute("aria-pressed", String(equipped));

    const icon = document.createElement("span");
    icon.className = "flavor-icon";
    icon.textContent = flavor.icon;
    const info = document.createElement("span");
    info.className = "flavor-info";
    const name = document.createElement("strong");
    name.textContent = flavor.name;
    const desc = document.createElement("span");
    desc.textContent = unlocked ? (equipped ? `${flavor.bonusLabel} · Equipped` : flavor.bonusLabel) : flavor.reqText;
    info.append(name, desc);
    btn.append(icon, info);

    btn.addEventListener("click", () => {
      if (!unlocked || state.equippedFlavor === flavor.id) return;
      state.equippedFlavor = flavor.id;
      playTone(540, 760, 0.12, 0.09);
      popElement(btn);
      spawnMiniBurstAtElement(btn, 14);
      showToast(`${flavor.icon} Switched to ${flavor.name} (${flavor.bonusLabel})!`);
      renderFlavors();
      renderShop();
      saveGame();
    });
    els.flavorsContainer.appendChild(btn);
  });
}

function popElement(el) {
  if (!el) return;
  el.classList.remove("purchase-pop");
  void el.offsetWidth;
  el.classList.add("purchase-pop");
}

function triggerCountBump() {
  if (!els.cookieCount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  els.cookieCount.classList.remove("count-bump");
  void els.cookieCount.offsetWidth;
  els.cookieCount.classList.add("count-bump");
  window.clearTimeout(countBumpTimer);
  countBumpTimer = window.setTimeout(() => {
    if (els.cookieCount) els.cookieCount.classList.remove("count-bump");
  }, 340);
}

function resizeFxCanvas() {
  if (!els.fxCanvas || !fxCtx) return;
  fxDpr = Math.min(2, window.devicePixelRatio || 1);
  fxWidth = window.innerWidth;
  fxHeight = window.innerHeight;
  els.fxCanvas.width = Math.floor(fxWidth * fxDpr);
  els.fxCanvas.height = Math.floor(fxHeight * fxDpr);
  fxCtx.setTransform(fxDpr, 0, 0, fxDpr, 0, 0);
}

function spawnFireworkBurst(x, y, count = 42) {
  if (!fxCtx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const palette = ["#ffcf56", "#ff7d5d", "#6de19c", "#6eb8ff", "#d48cff", "#ff72b6"];
  const baseColor = palette[Math.floor(Math.random() * palette.length)];
  fxParticles.push({
    kind: "ring",
    x,
    y,
    radius: 8,
    maxRadius: 110 + Math.random() * 60,
    color: baseColor,
    life: 0,
    maxLife: 0.65
  });
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.25;
    const speed = 130 + Math.random() * 290;
    fxParticles.push({
      kind: "spark",
      x,
      y,
      prevX: x,
      prevY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 40,
      size: 2.2 + Math.random() * 3.2,
      color: Math.random() < 0.65 ? baseColor : palette[Math.floor(Math.random() * palette.length)],
      life: 0,
      maxLife: 0.9 + Math.random() * 0.6
    });
  }
}

function spawnMiniBurstAtElement(el, count = 14) {
  if (!fxCtx || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = el.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) return;
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const palette = ["#ffd45e", "#ff9568", "#7ae0a5", "#7ec4ff", "#e09cff"];
  const baseColor = palette[Math.floor(Math.random() * palette.length)];
  fxParticles.push({
    kind: "ring",
    x,
    y,
    radius: 6,
    maxRadius: Math.max(46, Math.min(90, rect.width * 0.55)),
    color: baseColor,
    life: 0,
    maxLife: 0.45
  });
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.35;
    const speed = 75 + Math.random() * 145;
    fxParticles.push({
      kind: "spark",
      x,
      y,
      prevX: x,
      prevY: y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 24,
      size: 1.8 + Math.random() * 2.2,
      color: palette[Math.floor(Math.random() * palette.length)],
      life: 0,
      maxLife: 0.55 + Math.random() * 0.35
    });
  }
}

function spawnAmbientMote() {
  if (!fxCtx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#ffd86b", "#ffa463", "#84e8b0", "#84c7ff", "#ea9cff"];
  fxParticles.push({
    kind: "mote",
    x: Math.random() * fxWidth,
    y: fxHeight + 16,
    vx: (Math.random() - 0.5) * 28,
    vy: -(48 + Math.random() * 68),
    sway: 12 + Math.random() * 22,
    phase: Math.random() * Math.PI * 2,
    size: 2.2 + Math.random() * 3.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: 0,
    maxLife: 4.2 + Math.random() * 2.5
  });
}

function launchFireworks(burstCount = 5) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < burstCount; i++) {
    window.setTimeout(() => {
      const x = fxWidth * (0.16 + Math.random() * 0.68);
      const y = fxHeight * (0.14 + Math.random() * 0.44);
      spawnFireworkBurst(x, y, 44);
      playTone(460 + i * 70, 880 + i * 90, 0.14, 0.055, "triangle");
    }, i * 180);
  }
}

function launchSpreadRain(count = 48) {
  if (!fxCtx || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const glyphs = ["🫙", "🍯", "🍓", "🌰", "✨", "🌟", "🥐", "🍰"];
  for (let i = 0; i < count; i++) {
    fxParticles.push({
      kind: "rain",
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
      x: Math.random() * fxWidth,
      y: -30 - Math.random() * 240,
      vx: (Math.random() - 0.5) * 80,
      vy: 180 + Math.random() * 240,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 6,
      size: 20 + Math.random() * 14,
      life: 0,
      maxLife: 3.2 + Math.random() * 1.4
    });
  }
}

function triggerShockwave(shake = true) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (els.stageFlash) {
    els.stageFlash.classList.remove("active");
    void els.stageFlash.offsetWidth;
    els.stageFlash.classList.add("active");
  }
  if (shake && els.bakeStage) {
    els.bakeStage.classList.remove("stage-shake");
    void els.bakeStage.offsetWidth;
    els.bakeStage.classList.add("stage-shake");
  }
  if (els.cookieButton) {
    const rect = els.cookieButton.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    spawnFireworkBurst(cx, cy, 38);
    if (fxCtx) {
      fxParticles.push({
        kind: "ring",
        x: cx,
        y: cy,
        radius: 20,
        maxRadius: Math.max(fxWidth, fxHeight) * 0.55,
        color: "#ffd86b",
        life: 0,
        maxLife: 0.9
      });
    }
  }
}

function triggerAllAnimations() {
  launchFireworks(6);
  launchConfetti(85);
  launchSpreadRain(56);
  triggerShockwave(true);
  for (let i = 0; i < 18; i++) spawnAmbientMote();
  playChime([523.25, 659.25, 783.99, 1046.5, 1318.51]);
}

function updateFxCanvas(delta) {
  if (!fxCtx || fxParticles.length === 0) return;
  fxCtx.clearRect(0, 0, fxWidth, fxHeight);
  for (let i = fxParticles.length - 1; i >= 0; i--) {
    const p = fxParticles[i];
    p.life += delta;
    if (p.life >= p.maxLife) {
      fxParticles.splice(i, 1);
      continue;
    }
    const progress = p.life / p.maxLife;
    const alpha = Math.max(0, 1 - progress);
    fxCtx.save();
    fxCtx.globalAlpha = alpha;
    if (p.kind === "spark") {
      p.prevX = p.x;
      p.prevY = p.y;
      p.vy += 320 * delta;
      p.vx *= Math.pow(0.96, delta * 60);
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      const radius = p.size * (1 - progress * 0.45);
      fxCtx.strokeStyle = p.color;
      fxCtx.fillStyle = p.color;
      fxCtx.shadowColor = p.color;
      fxCtx.shadowBlur = 10;
      fxCtx.lineCap = "round";
      fxCtx.lineWidth = Math.max(1.1, radius * 1.15);
      fxCtx.beginPath();
      fxCtx.moveTo(p.prevX, p.prevY);
      fxCtx.lineTo(p.x, p.y);
      fxCtx.stroke();
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      fxCtx.fill();
    } else if (p.kind === "mote") {
      p.x += (p.vx + Math.sin(p.life * 2.4 + p.phase) * p.sway) * delta;
      p.y += p.vy * delta;
      const fadeIn = Math.min(1, p.life * 1.4);
      fxCtx.globalAlpha = alpha * fadeIn * 0.65;
      fxCtx.fillStyle = p.color;
      fxCtx.shadowColor = p.color;
      fxCtx.shadowBlur = 14;
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      fxCtx.fill();
    } else if (p.kind === "ring") {
      const r = p.radius + (p.maxRadius - p.radius) * (1 - Math.pow(1 - progress, 3));
      fxCtx.strokeStyle = p.color;
      fxCtx.lineWidth = Math.max(1.5, 6 * (1 - progress));
      fxCtx.beginPath();
      fxCtx.arc(p.x, p.y, r, 0, Math.PI * 2);
      fxCtx.stroke();
    } else if (p.kind === "rain") {
      p.x += p.vx * delta;
      p.y += p.vy * delta;
      p.rot += p.vrot * delta;
      fxCtx.translate(p.x, p.y);
      fxCtx.rotate(p.rot);
      fxCtx.font = `${p.size}px "Plus Jakarta Sans", sans-serif`;
      fxCtx.textAlign = "center";
      fxCtx.textBaseline = "middle";
      fxCtx.fillText(p.glyph, 0, 0);
    }
    fxCtx.restore();
  }
  if (fxParticles.length === 0) fxCtx.clearRect(0, 0, fxWidth, fxHeight);
}

function initAmbientSparks() {
  if (!els.ambientSparks) return;
  els.ambientSparks.replaceChildren();
  const glyphs = ["✦", "🍯", "✨", "🍓", "🌰", "🧈", "🫧"];
  for (let i = 0; i < 24; i++) {
    const spark = document.createElement("span");
    spark.className = "ambient-spark";
    spark.textContent = glyphs[i % glyphs.length];
    spark.style.left = `${(i * 4.1 + 3) % 95}%`;
    spark.style.setProperty("--spark-duration", `${6.2 + (i % 6) * 1.35}s`);
    spark.style.setProperty("--spark-delay", `${-(i * 0.52).toFixed(2)}s`);
    spark.style.setProperty("--drift-x", `${((i % 2 === 0 ? 1 : -1) * (14 + (i % 5) * 11))}px`);
    els.ambientSparks.appendChild(spark);
  }
}

function initStageParallax() {
  if (!els.bakeStage || !els.cookieButton) return;
  els.bakeStage.addEventListener("pointermove", (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = els.cookieButton.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const normX = Math.max(-1, Math.min(1, (event.clientX - cx) / (rect.width * 1.1)));
    const normY = Math.max(-1, Math.min(1, (event.clientY - cy) / (rect.height * 1.1)));
    els.cookieButton.style.setProperty("--jar-rx", `${(-normY * 7).toFixed(2)}deg`);
    els.cookieButton.style.setProperty("--jar-ry", `${(normX * 7).toFixed(2)}deg`);
  });
  els.bakeStage.addEventListener("pointerleave", () => {
    els.cookieButton.style.setProperty("--jar-rx", "0deg");
    els.cookieButton.style.setProperty("--jar-ry", "0deg");
  });
}

function applyInitialCascade() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const groups = [
    els.flavorsContainer ? els.flavorsContainer.querySelectorAll(".flavor-card") : [],
    els.ordersContainer ? els.ordersContainer.querySelectorAll(".order-card") : [],
    els.upgrades ? els.upgrades.querySelectorAll(".upgrade-btn") : [],
    els.cursorShop ? els.cursorShop.querySelectorAll(".cursor-card") : [],
    els.buildings ? els.buildings.querySelectorAll(".building-card") : [],
    els.fishHabitats ? els.fishHabitats.querySelectorAll(".habitat-card") : [],
    els.rebirthUpgrades ? els.rebirthUpgrades.querySelectorAll(".rebirth-upgrade-card") : [],
    els.achievements ? els.achievements.querySelectorAll(".ach-tile") : []
  ];
  groups.forEach((nodes) => {
    nodes.forEach((node, idx) => {
      node.style.setProperty("--stagger-i", String(Math.min(idx, 14)));
      node.classList.add("cascade-item");
    });
  });
}

function renderOrbitCursors() {
  if (!els.orbitCursors) return;
  els.orbitCursors.replaceChildren();
  const totalOwnedCursors = CURSORS.filter((c) => state.cursorCollection[c.id]);
  const buildingOrbiterCount = Math.min(8, Math.floor(getBuildingCount() / 10));
  const items = [];
  totalOwnedCursors.slice(0, 8).forEach((c) => items.push(c.icon));
  for (let i = 0; i < buildingOrbiterCount && items.length < 12; i++) {
    items.push("✨");
  }
  items.forEach((glyph, idx) => {
    const orb = document.createElement("span");
    orb.className = "orbit-cursor-item";
    orb.textContent = glyph;
    orb.style.setProperty("--orbit-angle", `${(360 / items.length) * idx}deg`);
    els.orbitCursors.appendChild(orb);
  });
}

const ORDER_TEMPLATES = [
  { kind: "clicks", title: "Tap Sprint", label: "manual clicks", base: 15 },
  { kind: "spreads", title: "Sweet Batch", label: "new spreads earned", base: 400 },
  { kind: "helpers", title: "Crew Expansion", label: "more helpers hired", base: 3 },
  { kind: "golden", title: "Jar Hunter", label: "Golden Jar caught", base: 1 },
  { kind: "fish", title: "Aquarium Scout", label: "tank rolls made", base: 3 }
];

function getOrderMetricValue(kind) {
  if (kind === "clicks") return state.totalClicks;
  if (kind === "spreads") return state.totalCookies;
  if (kind === "helpers") return getBuildingCount();
  if (kind === "golden") return state.goldenJarsCaught;
  return state.fishRolls;
}

function createOrder(seedOffset = 0) {
  const index = (state.ordersCompleted + seedOffset) % ORDER_TEMPLATES.length;
  const tmpl = ORDER_TEMPLATES[index];
  const scale = 1 + Math.floor((state.ordersCompleted + seedOffset) / ORDER_TEMPLATES.length);
  let target = tmpl.base;
  if (tmpl.kind === "clicks") target = Math.min(500, 12 + scale * 8);
  else if (tmpl.kind === "spreads") target = Math.max(250, Math.floor((getCookiesPerSecond() * 18 + getCookiesPerClick() * 6) * (1 + scale * 0.2)));
  else if (tmpl.kind === "helpers") target = Math.min(50, 2 + scale * 2);
  else if (tmpl.kind === "golden") target = 1;
  else if (tmpl.kind === "fish") target = Math.min(25, 2 + scale);

  return {
    id: `order-${Date.now()}-${Math.floor(Math.random() * 10000)}-${seedOffset}`,
    kind: tmpl.kind,
    title: `${tmpl.title} #${state.ordersCompleted + seedOffset + 1}`,
    label: tmpl.label,
    baseline: getOrderMetricValue(tmpl.kind),
    target,
    rewardTokens: tmpl.kind === "golden" || scale % 2 === 0 ? 1 : 0
  };
}

function ensureActiveOrders() {
  if (!Array.isArray(state.activeOrders)) state.activeOrders = [];
  let added = false;
  while (state.activeOrders.length < 3) {
    state.activeOrders.push(createOrder(state.activeOrders.length));
    added = true;
  }
  return added;
}

function getOrderProgress(order) {
  const delta = Math.max(0, getOrderMetricValue(order.kind) - order.baseline);
  return {
    current: Math.min(order.target, delta),
    complete: delta >= order.target,
    pct: Math.min(100, Math.floor((delta / order.target) * 100))
  };
}

function claimOrder(orderId) {
  const idx = state.activeOrders.findIndex((o) => o.id === orderId);
  if (idx < 0) return;
  const order = state.activeOrders[idx];
  const progress = getOrderProgress(order);
  if (!progress.complete) return;

  const spreadReward = Math.min(MAX_SPREAD_GRANT, Math.max(500, Math.floor(getCookiesPerSecond() * 35 + getCookiesPerClick() * 25)));
  state.cookies = Math.min(Number.MAX_VALUE, state.cookies + spreadReward);
  state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + spreadReward);
  if (order.rewardTokens > 0) state.freeFishRollTokens += order.rewardTokens;
  state.ordersCompleted++;
  state.activeOrders.splice(idx, 1);
  ensureActiveOrders();

  playChime([523.25, 659.25, 783.99, 1046.5]);
  launchFireworks(2);
  launchConfetti(28);
  const tokenText = order.rewardTokens ? ` + ${order.rewardTokens} 🎟️ Token!` : "";
  showToast(`📜 Order "${order.title}" claimed! +${formatNumber(spreadReward)} spreads${tokenText}`);
  refreshAfterAdminChange();
}

function renderOrders() {
  if (!els.ordersContainer || !els.ordersCompletedCount) return;
  ensureActiveOrders();
  els.ordersCompletedCount.textContent = `${state.ordersCompleted.toLocaleString()} completed`;
  els.ordersContainer.replaceChildren();

  state.activeOrders.forEach((order) => {
    const progress = getOrderProgress(order);
    const card = document.createElement("article");
    card.className = `order-card${progress.complete ? " ready" : ""}`;
    card.dataset.orderId = order.id;

    const head = document.createElement("div");
    head.className = "order-card-head";
    const title = document.createElement("strong");
    title.className = "order-card-title";
    title.textContent = order.title;
    const reward = document.createElement("span");
    reward.className = "order-card-reward";
    reward.textContent = order.rewardTokens ? "Burst + 🎟️" : "Spread Burst";
    head.append(title, reward);

    const progressWrap = document.createElement("div");
    progressWrap.className = "order-progress-wrap";
    const bar = document.createElement("div");
    bar.className = "order-progress-bar";
    const fill = document.createElement("span");
    fill.style.width = `${progress.pct}%`;
    bar.appendChild(fill);
    const text = document.createElement("span");
    text.className = "order-progress-text tabular-nums";
    text.textContent = `${formatNumber(progress.current)} / ${formatNumber(order.target)} ${order.label}`;
    progressWrap.append(bar, text);

    const claimBtn = document.createElement("button");
    claimBtn.type = "button";
    claimBtn.className = "order-claim-btn";
    claimBtn.disabled = !progress.complete;
    claimBtn.textContent = progress.complete ? "✨ Claim reward" : `${progress.pct}%`;
    claimBtn.addEventListener("click", () => claimOrder(order.id));

    card.append(head, progressWrap, claimBtn);
    els.ordersContainer.appendChild(card);
  });
}

function updateOrdersProgress() {
  if (!els.ordersContainer) return;
  state.activeOrders.forEach((order) => {
    const card = els.ordersContainer.querySelector(`[data-order-id="${order.id}"]`);
    if (!card) return;
    const progress = getOrderProgress(order);
    card.classList.toggle("ready", progress.complete);
    const fill = card.querySelector(".order-progress-bar span");
    if (fill) fill.style.width = `${progress.pct}%`;
    const text = card.querySelector(".order-progress-text");
    if (text) text.textContent = `${formatNumber(progress.current)} / ${formatNumber(order.target)} ${order.label}`;
    const btn = card.querySelector(".order-claim-btn");
    if (btn) {
      btn.disabled = !progress.complete;
      btn.textContent = progress.complete ? "✨ Claim reward" : `${progress.pct}%`;
    }
  });
}

function showClickGain(amount, event, streakBonus, isJackpot = false) {
  while (els.clickParticles.childElementCount >= 32) {
    els.clickParticles.firstElementChild.remove();
  }
  const stageRect = els.clickParticles.parentElement.getBoundingClientRect();
  const hasPointer = event && typeof event.clientX === "number" && event.clientX > 0;
  const x = hasPointer ? event.clientX - stageRect.left : stageRect.width / 2 + (Math.random() - 0.5) * 40;
  const y = hasPointer ? event.clientY - stageRect.top : stageRect.height * 0.44 + (Math.random() - 0.5) * 24;

  const ripple = document.createElement("span");
  ripple.className = `click-ripple${isJackpot || streakBonus ? " mega" : ""}`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  els.clickParticles.appendChild(ripple);
  window.setTimeout(() => ripple.remove(), 750);

  const flavor = getActiveFlavor();
  const sparkGlyphs = [flavor.icon, "✨", "🍯", "🌟", "💫"];
  const sparkCount = isJackpot || streakBonus ? 16 : 9;
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement("span");
    spark.className = "click-spark";
    spark.textContent = sparkGlyphs[i % sparkGlyphs.length];
    const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
    const distance = (isJackpot || streakBonus ? 75 : 44) + Math.random() * 68;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--px", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--py", `${Math.sin(angle) * distance - 18}px`);
    spark.style.setProperty("--prot", `${Math.round((Math.random() - 0.5) * 320)}deg`);
    spark.style.setProperty("--pscale", `${(0.8 + Math.random() * 0.65).toFixed(2)}`);
    els.clickParticles.appendChild(spark);
    window.setTimeout(() => spark.remove(), 780);
  }

  const particle = document.createElement("span");
  particle.className = `click-gain${streakBonus || isJackpot ? " click-gain-streak" : ""}`;
  particle.textContent = `+${formatNumber(amount)}${streakBonus ? " streak!" : isJackpot ? " JACKPOT!" : ""}`;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  els.clickParticles.appendChild(particle);
  window.setTimeout(() => particle.remove(), 900);
}

function launchConfetti(count = 32) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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

function scheduleNextGoldenJar() {
  if (goldenJarSpawnTimer) window.clearTimeout(goldenJarSpawnTimer);
  const flavor = getActiveFlavor();
  const baseDelay = (35000 + Math.random() * 30000) / flavor.goldenSpeed;
  goldenJarSpawnTimer = window.setTimeout(() => {
    spawnGoldenJar(false);
  }, baseDelay);
}

function spawnGoldenJar(allowMultiple = false) {
  if (!allowMultiple && els.goldenSpreadLayer.childElementCount > 0) {
    scheduleNextGoldenJar();
    return;
  }
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "golden-jar-btn";
  btn.setAttribute("aria-label", "Catch Golden Spread Jar for a bonus");
  btn.textContent = "🍯";
  btn.style.left = `${10 + Math.random() * 76}%`;
  btn.style.top = `${14 + Math.random() * 62}%`;
  els.goldenSpreadLayer.appendChild(btn);

  const despawnTimer = window.setTimeout(() => {
    btn.remove();
    if (!allowMultiple) scheduleNextGoldenJar();
  }, allowMultiple ? 14000 : 10500);
  if (!allowMultiple) goldenJarDespawnTimer = despawnTimer;

  btn.addEventListener("click", () => {
    window.clearTimeout(despawnTimer);
    const rect = btn.getBoundingClientRect();
    btn.remove();
    state.goldenJarsCaught++;
    playChime([659.25, 783.99, 987.77, 1318.51]);
    launchConfetti(36);
    spawnFireworkBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 34);
    triggerShockwave(false);

    const roll = Math.random();
    if (roll < 0.30) {
      startSugarFrenzy(15000);
    } else if (roll < 0.60) {
      const burst = Math.min(MAX_SPREAD_GRANT, Math.max(250, Math.floor(getCookiesPerSecond() * 25 + getCookiesPerClick() * 40)));
      state.cookies = Math.min(Number.MAX_VALUE, state.cookies + burst);
      state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + burst);
      showToast(`🍯 Golden Jar burst! +${formatNumber(burst)} spreads!`);
    } else if (roll < 0.85) {
      clickFrenzyMultiplier = 5;
      clickFrenzyEndTime = Date.now() + 12000;
      showToast("⚡ Golden Click Frenzy! 5× click power for 12 seconds!");
    } else {
      state.freeFishRollTokens++;
      showToast("🎟️ Golden Jar gift! +1 Free Fish Tank Roll Token!");
    }

    checkAchievements();
    checkFlavorUnlocks();
    updateOrdersProgress();
    updateFishTankUI();
    updateShopAffordability();
    saveGame();
    if (!allowMultiple) scheduleNextGoldenJar();
  });
}

function spawnGoldenJarRain(count = 10) {
  for (let i = 0; i < count; i++) {
    window.setTimeout(() => spawnGoldenJar(true), i * 110);
  }
  launchFireworks(3);
  showToast(`🌧️ Golden Jar Rain! Catch ${count} Golden Jars!`);
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

function getTotalDuplicateSaleInfo() {
  let count = 0;
  let totalPayout = 0;
  Object.entries(state.fishCollection).forEach(([id, copies]) => {
    if (copies > 1) {
      const char = getFishCharacterById(id);
      if (!char) return;
      const extra = copies - 1;
      const val = getFishDuplicateSaleValue(char) * extra;
      if (Number.isFinite(totalPayout + val)) {
        count += extra;
        totalPayout += val;
      }
    }
  });
  return { count, totalPayout };
}

function renderAquariumSwimmers() {
  els.aquariumSwimmers.replaceChildren();
  const ownedIds = Object.keys(state.fishCollection).filter((id) => state.fishCollection[id] > 0);
  if (ownedIds.length === 0) return;

  const priority = { Secret: 6, Mythic: 5, Legendary: 4, Epic: 3, Rare: 2, Uncommon: 1, Common: 0 };
  const topFish = ownedIds
    .map((id) => getFishCharacterById(id))
    .filter(Boolean)
    .sort((a, b) => (priority[b.tier] || 0) - (priority[a.tier] || 0))
    .slice(0, 12);

  topFish.forEach((fish, idx) => {
    const swimmer = document.createElement("span");
    swimmer.className = `aquarium-swimmer${idx % 2 === 1 ? " reverse" : ""}`;
    swimmer.textContent = fish.id === SECRET_FISH.id ? "👑" : fish.tier === "Mythic" ? "🐡" : fish.tier === "Legendary" ? "🦈" : fish.tier === "Epic" ? "🐬" : "🐟";
    swimmer.style.left = `${8 + ((idx * 13) % 78)}%`;
    swimmer.style.top = `${12 + ((idx * 19) % 72)}%`;
    swimmer.style.animationDuration = `${4.8 + (idx % 4) * 1.1}s`;
    swimmer.style.animationDelay = `${(idx * 0.55).toFixed(2)}s`;
    els.aquariumSwimmers.appendChild(swimmer);
  });
}

function renderFishCollection() {
  els.fishCollection.replaceChildren();
  const query = fishSearchQuery.trim().toLowerCase();
  const characters = [...FISH_CHARACTERS, SECRET_FISH].filter((character) => {
    const copies = state.fishCollection[character.id] || 0;
    if (fishCollectionFilter === "girl" || fishCollectionFilter === "boy") {
      if (character.gender !== fishCollectionFilter) return false;
    } else if (fishCollectionFilter === "owned") {
      if (copies === 0) return false;
    } else if (fishCollectionFilter === "missing") {
      if (copies > 0) return false;
    }
    if (query) {
      const displayName = copies || character.id !== SECRET_FISH.id ? character.name.toLowerCase() : "???";
      if (!displayName.includes(query) && !character.tier.toLowerCase().includes(query)) return false;
    }
    return true;
  });

  els.fishCollectionFilters.querySelectorAll("[data-fish-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.fishFilter === fishCollectionFilter));
  });

  if (characters.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-msg";
    empty.textContent = "No characters match your current filter.";
    els.fishCollection.appendChild(empty);
    return;
  }

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
      ? `${genderLabel} · ${character.tier} · ${copies} owned · Lv ${level}`
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
  const flatClickBonus = getFishFlatClickBonus();
  const clickBonusPercent = Math.round((getFishClickMultiplier() - 1) * 100);
  const dailyAvailable = state.fishDailyRollDate !== getLocalDateKey();

  els.fishCollectionCount.textContent = `${collectionCount} / ${FISH_CHARACTERS.length}`;
  if (state.fishCollection[SECRET_FISH.id]) {
    els.fishCollectionCount.textContent += " + Oliva";
  }
  els.fishRollCount.textContent = state.fishRolls.toLocaleString();
  els.fishClickBonus.textContent = `+${formatNumber(flatClickBonus)} · +${clickBonusPercent}%`;
  els.fishProductionBonus.textContent = `+${bonusPercent}%`;
  els.fishRollCost.textContent = `Paid roll: ${formatNumber(rollCost)} spreads · Secret Oliva: 1 in 10,000 (0.01%)`;
  els.fishRoll.disabled = state.cookies < rollCost;
  const batchCost = getFishBatchCost();
  els.footer10kRolls.disabled = state.cookies < batchCost;
  els.footer10kRollsLabel.textContent = `Roll the tank ${FISH_BATCH_ROLL_COUNT.toLocaleString()} times · ${formatNumber(batchCost)} spreads`;
  els.fishDailyRoll.disabled = !dailyAvailable;
  els.fishDailyRoll.textContent = dailyAvailable ? "🎁 Claim daily free roll" : "✅ Daily roll claimed";

  els.fishFreeRollBtn.hidden = state.freeFishRollTokens <= 0;
  els.fishFreeTokens.textContent = state.freeFishRollTokens.toLocaleString();

  els.fishLuckStatus.textContent = `Luck level ${state.fishLuckLevel} / 5 · Owning & leveling fish boosts spreads per click and production`;
  els.fishLuckUpgrade.disabled = state.fishLuckLevel >= 5 || state.cookies < luckCost;
  els.fishLuckUpgrade.textContent = state.fishLuckLevel >= 5
    ? "🍀 Luck fully upgraded"
    : `🍀 Upgrade luck · ${formatNumber(luckCost)}`;
  els.fishTierOdds.textContent = `Tier odds: ${getFishTierOdds().map((tier) => `${tier.name} ${tier.chance.toFixed(tier.chance < 1 ? 2 : 1)}%`).join(" · ")}`;

  const dupInfo = getTotalDuplicateSaleInfo();
  els.fishSellDuplicates.disabled = dupInfo.count === 0;
  els.fishSellDuplicates.textContent = dupInfo.count > 0
    ? `Sell ${dupInfo.count.toLocaleString()} duplicates (+${formatNumber(dupInfo.totalPayout)})`
    : "No duplicates to sell";

  els.fishHabitats.querySelectorAll("[data-habitat-id]").forEach((button) => {
    const habitat = FISH_HABITATS.find((item) => item.id === button.dataset.habitatId);
    if (!habitat) return;
    const owned = Boolean(state.fishHabitats[habitat.id]);
    button.disabled = !owned && state.cookies < habitat.cost;
    button.querySelector(".habitat-action").textContent = owned ? "Built" : `${formatNumber(habitat.cost)} spreads`;
    button.classList.toggle("built", owned);
  });

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

  if (els.fishLevelAll) {
    let budget = state.cookies;
    let affordableCount = 0;
    const ownedUpgradeable = Object.entries(state.fishCollection)
      .filter(([id, copies]) => copies > 0 && (state.fishLevels[id] || 1) < 10)
      .map(([id]) => ({ id, cost: getFishLevelUpCost(id) }))
      .sort((a, b) => a.cost - b.cost);
    for (const entry of ownedUpgradeable) {
      if (budget >= entry.cost) {
        budget -= entry.cost;
        affordableCount++;
      } else {
        break;
      }
    }
    els.fishLevelAll.disabled = affordableCount === 0;
    els.fishLevelAll.textContent = affordableCount > 0
      ? `⬆ Level up ${affordableCount} affordable`
      : "⬆ Level up affordable";
  }
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
  if (Math.random() < 0.0001) return SECRET_FISH;

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
  const reward = Math.min(MAX_SPREAD_GRANT, getFishRollCost() * 50);
  if (!addFishSpreads(reward)) return false;
  state.fishCollectionRewardClaimed = true;
  showToast(`🏆 All 200 characters collected! You earned ${formatNumber(reward)} spreads!`);
  launchConfetti(60);
  return true;
}

function rollFish(mode = "paid") {
  const rollDate = getLocalDateKey();
  if (mode === "daily" || mode === true) {
    mode = "daily";
    if (state.fishDailyRollDate === rollDate) {
      els.fishStatus.textContent = "Your daily free roll has already been claimed.";
      return;
    }
  } else if (mode === "token") {
    if (state.freeFishRollTokens <= 0) {
      els.fishStatus.textContent = "You have no free roll tokens left.";
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
  fishSearchQuery = "";
  els.fishSearchInput.value = "";
  renderFishCollection();
  const character = pickFishCharacter();
  const copies = state.fishCollection[character.id] || 0;
  if (!Number.isSafeInteger(copies + 1)) {
    els.fishStatus.textContent = "That character collection has reached its safe storage limit.";
    return;
  }
  if (mode === "daily") {
    state.fishDailyRollDate = rollDate;
  } else if (mode === "token") {
    state.freeFishRollTokens--;
  } else {
    state.cookies -= getFishRollCost();
  }
  state.fishCollection[character.id] = copies + 1;
  state.fishLevels[character.id] = state.fishLevels[character.id] || 1;
  state.fishRolls = Math.min(Number.MAX_SAFE_INTEGER, state.fishRolls + 1);

  playTone(460, 740, 0.14, 0.09);

  if (character.id === SECRET_FISH.id) {
    state.cookies = Math.max(state.cookies, OLIVA_REWARD);
    state.totalCookies = Math.max(state.totalCookies, OLIVA_REWARD);
    els.fishStatus.textContent = "✨ SECRET! Oliva appeared! A 1-in-10,000 discovery and a huge spread bonus!";
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

function rollFishBatch(free = false) {
  if (state.fishRolls > Number.MAX_SAFE_INTEGER - FISH_BATCH_ROLL_COUNT) {
    els.fishStatus.textContent = "The tank has reached its safe roll counter limit.";
    return false;
  }

  const cost = getFishBatchCost();
  if (!free && state.cookies < cost) {
    els.fishStatus.textContent = `You need ${formatNumber(cost)} spreads for 10,000 tank rolls.`;
    return false;
  }

  if (!free) state.cookies -= cost;
  let newCharacters = 0;
  let olivaRolls = 0;
  let landedCharacter = null;
  let landedHighTier = false;

  for (let index = 0; index < FISH_BATCH_ROLL_COUNT; index++) {
    const character = pickFishCharacter();
    const copies = state.fishCollection[character.id] || 0;
    if (copies < Number.MAX_SAFE_INTEGER) {
      state.fishCollection[character.id] = copies + 1;
      state.fishLevels[character.id] = state.fishLevels[character.id] || 1;
      if (copies === 0 && character.id !== SECRET_FISH.id) newCharacters++;
    }
    if (character.id === SECRET_FISH.id) olivaRolls++;
    if (character.tier === "Mythic" || character.tier === "Legendary") landedHighTier = true;
    landedCharacter = character;
  }

  state.fishRolls += FISH_BATCH_ROLL_COUNT;
  if (olivaRolls > 0) {
    state.cookies = Math.max(state.cookies, OLIVA_REWARD);
    state.totalCookies = Math.max(state.totalCookies, OLIVA_REWARD);
    landedCharacter = SECRET_FISH;
  }

  checkFishCollectionReward();
  const duplicateRolls = FISH_BATCH_ROLL_COUNT - newCharacters - olivaRolls;
  const paymentText = free ? "Free batch complete" : `Spent ${formatNumber(cost)} spreads`;
  els.fishStatus.textContent = `${paymentText}: 10,000 rolls · ${newCharacters} new characters · ${duplicateRolls} duplicates${olivaRolls ? ` · Oliva x${olivaRolls}` : ""}.`;
  els.fishCollectionDetails.open = true;
  fishCollectionFilter = "all";
  fishSearchQuery = "";
  els.fishSearchInput.value = "";
  refreshAfterAdminChange();
  animateFishLanding(landedCharacter);
  if (olivaRolls > 0) {
    showToast(`✨ Oliva appeared ${olivaRolls} time${olivaRolls === 1 ? "" : "s"} in the batch!`);
    showOlivaCelebration();
  } else if (landedHighTier && landedCharacter) {
    launchConfetti(40);
  }
  return true;
}

function sellFishDuplicate(id) {
  const character = getFishCharacterById(id);
  const copies = state.fishCollection[id] || 0;
  if (!character || copies <= 1) return;
  const payout = getFishDuplicateSaleValue(character);
  if (!Number.isFinite(state.cookies + payout) || !Number.isFinite(state.totalCookies + payout)) {
    els.fishStatus.textContent = "That duplicate's sale value is too large for this save.";
    return;
  }
  state.fishCollection[id]--;
  state.cookies += payout;
  state.totalCookies += payout;
  playTone(540, 820, 0.1, 0.08);
  els.fishStatus.textContent = `Sold a duplicate ${character.name} for ${formatNumber(payout)} spreads.`;
  refreshAfterAdminChange();
}

function sellAllDuplicates() {
  const { count, totalPayout } = getTotalDuplicateSaleInfo();
  if (count === 0) return;
  if (!Number.isFinite(state.cookies + totalPayout) || !Number.isFinite(state.totalCookies + totalPayout)) {
    els.fishStatus.textContent = "Duplicate sale total exceeds safe number limits.";
    return;
  }
  Object.keys(state.fishCollection).forEach((id) => {
    if (state.fishCollection[id] > 1) state.fishCollection[id] = 1;
  });
  state.cookies += totalPayout;
  state.totalCookies += totalPayout;
  playChime([523.25, 659.25, 783.99]);
  els.fishStatus.textContent = `Sold ${count.toLocaleString()} duplicate fish for ${formatNumber(totalPayout)} spreads!`;
  showToast(`🐠 Sold ${count.toLocaleString()} duplicates for +${formatNumber(totalPayout)} spreads!`);
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
  playTone(580, 920, 0.12, 0.09);
  const fishCard = els.fishCollection.querySelector(`[data-fish-id="${id}"]`);
  spawnMiniBurstAtElement(fishCard || els.fishRoll, 16);
  els.fishStatus.textContent = `${character.name} reached level ${level + 1}! Your per-click and production bonuses increased.`;
  refreshAfterAdminChange();
}

function levelUpAllAffordableFish() {
  const candidates = Object.entries(state.fishCollection)
    .filter(([id, copies]) => copies > 0 && (state.fishLevels[id] || 1) < 10)
    .map(([id]) => ({ id, cost: getFishLevelUpCost(id) }))
    .sort((a, b) => a.cost - b.cost);
  let upgraded = 0;
  for (const item of candidates) {
    if (state.cookies < item.cost) break;
    state.cookies -= item.cost;
    state.fishLevels[item.id] = (state.fishLevels[item.id] || 1) + 1;
    upgraded++;
  }
  if (upgraded === 0) return;
  playChime([523.25, 659.25, 783.99]);
  launchConfetti(Math.min(40, upgraded * 3 + 12));
  els.fishStatus.textContent = `Leveled up ${upgraded} fish! Your click & production bonuses surged!`;
  showToast(`⬆ Leveled up ${upgraded} fish!`);
  refreshAfterAdminChange();
}

function getAudioContext() {
  if (!state.soundEnabled) return null;
  const AudioContextType = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextType) return null;
  if (!audioContext) audioContext = new AudioContextType();
  if (audioContext.state === "suspended") audioContext.resume();
  return audioContext;
}

function playTone(startFrequency, endFrequency, duration, volume = 0.08, type = "sine") {
  const ctx = getAudioContext();
  if (!ctx) return;
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  const now = ctx.currentTime;
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(startFrequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(Math.max(40, endFrequency), now + duration);
  gain.gain.setValueAtTime(volume, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  oscillator.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(now);
  oscillator.stop(now + duration);
}

function playChime(notes) {
  if (!state.soundEnabled) return;
  notes.forEach((freq, idx) => {
    window.setTimeout(() => playTone(freq, freq * 1.02, 0.16, 0.07, "triangle"), idx * 65);
  });
}

function speakSpread() {
  if (!state.voiceEnabled || !("speechSynthesis" in window) || typeof window.SpeechSynthesisUtterance !== "function") return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance("spread");
  utterance.lang = "en-US";
  utterance.rate = 1.15;
  utterance.pitch = 1;
  const englishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.startsWith("en"));
  if (englishVoice) utterance.voice = englishVoice;
  window.speechSynthesis.speak(utterance);
}

function createUpgradeButton(upgrade, cost, level = 0, repeatable = false) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `upgrade-btn ${state.cookies >= cost ? "affordable" : "locked"}`;
  button.dataset.cost = String(cost);
  button.title = `${upgrade.name}: ${upgrade.desc}`;
  const icon = document.createElement("span");
  icon.className = "upgrade-icon";
  icon.textContent = upgrade.icon;
  const info = document.createElement("span");
  info.className = "upgrade-info";
  const name = document.createElement("span");
  name.className = "upgrade-name";
  name.textContent = upgrade.name;
  const costLabel = document.createElement("span");
  costLabel.className = "upgrade-cost tabular-nums";
  costLabel.textContent = repeatable
    ? `Lv ${level} · ${formatNumber(cost)}`
    : `${formatNumber(cost)} spreads`;
  info.append(name, costLabel);
  button.append(icon, info);
  button.addEventListener("click", () => repeatable ? buyClickUpgrade(upgrade.id) : buyUpgrade(upgrade.id));
  return button;
}

function renderShop() {
  const availableUpgrades = UPGRADES.filter((upgrade) => !state.upgrades.includes(upgrade.id) && upgrade.req(state));
  const availableClickUpgrades = CLICK_UPGRADES.filter((upgrade) => upgrade.req(state));
  els.upgrades.replaceChildren();
  if (availableUpgrades.length === 0 && availableClickUpgrades.length === 0) {
    const message = document.createElement("p");
    message.className = "empty-msg";
    message.textContent = "Make a few more clicks or spreads to unlock your next upgrade.";
    els.upgrades.appendChild(message);
  }
  availableClickUpgrades.forEach((upgrade) => {
    const level = state.clickUpgradeLevels[upgrade.id] || 0;
    els.upgrades.appendChild(createUpgradeButton(upgrade, getClickUpgradeCost(upgrade), level, true));
  });
  availableUpgrades.forEach((upgrade) => {
    els.upgrades.appendChild(createUpgradeButton(upgrade, upgrade.cost));
  });

  renderCursorShop();
  renderFishHabitatShop();

  els.bulkBuyControls.querySelectorAll("[data-bulk]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(btn.dataset.bulk === String(state.bulkBuyMode)));
  });

  const totalCps = getCookiesPerSecond();
  els.buildings.replaceChildren();
  BUILDINGS.forEach((building) => {
    const owned = state.buildings[building.id] || 0;
    const bulk = getBulkPurchaseInfo(building);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `building-card ${bulk.affordable ? "affordable" : "locked"}`;
    button.dataset.buildingId = building.id;
    button.dataset.cost = String(bulk.cost);
    const perUnitCps = getBaseBuildingCps(building);
    const tierTotalCps = owned * perUnitCps;
    const sharePct = totalCps > 0 ? ((tierTotalCps / totalCps) * 100).toFixed(1) : "0.0";
    button.title = `${building.desc}\nTotal producing: ${formatRate(tierTotalCps)}/sec (${sharePct}% of CPS)`;
    const icon = document.createElement("span");
    icon.className = "building-icon";
    icon.textContent = building.icon;
    const info = document.createElement("span");
    info.className = "building-info";
    const name = document.createElement("span");
    name.className = "building-name";
    name.textContent = bulk.count > 1 ? `${building.name} (×${bulk.count})` : building.name;
    const meta = document.createElement("span");
    meta.className = "building-meta tabular-nums";
    meta.innerHTML = `<span class="building-cost">${formatNumber(bulk.cost)}</span> · +${formatRate(perUnitCps * bulk.count)}/s${owned > 0 ? ` · ${sharePct}%` : ""}`;
    info.append(name, meta);
    const count = document.createElement("span");
    count.className = "building-count tabular-nums";
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
    action.className = "cursor-action tabular-nums";
    action.textContent = equipped ? "Equipped" : owned ? "Equip" : `${formatNumber(cursor.cost)}`;
    button.append(icon, info, action);
    button.addEventListener("click", () => buyOrEquipCursor(cursor.id));
    els.cursorShop.appendChild(button);
  });
  updateEquippedCursorBadge();
}

function renderFishHabitatShop() {
  els.fishHabitats.replaceChildren();
  FISH_HABITATS.forEach((habitat) => {
    const button = document.createElement("button");
    const owned = Boolean(state.fishHabitats[habitat.id]);
    button.type = "button";
    button.className = `habitat-card${owned ? " built" : ""}`;
    button.dataset.habitatId = habitat.id;
    button.disabled = !owned && state.cookies < habitat.cost;
    const icon = document.createElement("span");
    icon.className = "habitat-icon";
    icon.textContent = habitat.icon;
    const info = document.createElement("span");
    info.className = "habitat-info";
    const name = document.createElement("strong");
    name.textContent = habitat.name;
    const description = document.createElement("span");
    description.textContent = habitat.desc;
    info.append(name, description);
    const action = document.createElement("span");
    action.className = "habitat-action tabular-nums";
    action.textContent = owned ? "Built" : `${formatNumber(habitat.cost)} spreads`;
    button.append(icon, info, action);
    button.addEventListener("click", () => buyFishHabitat(habitat.id));
    els.fishHabitats.appendChild(button);
  });
}

function buyFishHabitat(id) {
  const habitat = FISH_HABITATS.find((item) => item.id === id);
  if (!habitat || state.fishHabitats[id] || state.cookies < habitat.cost) return;
  state.cookies -= habitat.cost;
  state.fishHabitats[id] = true;
  playChime([440, 554.37, 659.25]);
  launchConfetti(28);
  const card = els.fishHabitats.querySelector(`[data-habitat-id="${id}"]`);
  spawnMiniBurstAtElement(card || els.fishHabitats, 18);
  els.fishStatus.textContent = `${habitat.name} built! Aquarium click & production increased by ${Math.round(habitat.bonus * 100)}%.`;
  showToast(`${habitat.icon} ${habitat.name} built · +${Math.round(habitat.bonus * 100)}% click & production!`);
  refreshAfterAdminChange();
}

function buyOrEquipCursor(id) {
  const cursor = CURSORS.find((item) => item.id === id);
  if (!cursor) return;
  if (!state.cursorCollection[id]) {
    if (state.cookies < cursor.cost) return;
    state.cookies -= cursor.cost;
    state.cursorCollection[id] = true;
    playChime([523.25, 659.25]);
  } else {
    playTone(500, 650, 0.08, 0.07);
  }
  state.equippedCursor = id;
  showToast(`${cursor.icon} ${cursor.name} equipped · ${cursor.multiplier}× click power!`);
  renderShop();
  renderOrbitCursors();
  const card = els.cursorShop.querySelector(`[data-cursor-id="${id}"]`);
  popElement(card);
  spawnMiniBurstAtElement(card || els.cursorShop, 14);
  spawnMiniBurstAtElement(els.cookieButton, 10);
  updateShopAffordability();
  saveGame();
}

function updateShopAffordability() {
  els.upgrades.querySelectorAll(".upgrade-btn").forEach((button) => {
    const cost = Number(button.dataset.cost);
    button.classList.toggle("affordable", state.cookies >= cost);
    button.classList.toggle("locked", state.cookies < cost);
  });
  els.buildings.querySelectorAll(".building-card").forEach((button) => {
    const cost = Number(button.dataset.cost);
    button.classList.toggle("affordable", state.cookies >= cost);
    button.classList.toggle("locked", state.cookies < cost);
  });
  els.cursorShop.querySelectorAll(".cursor-card").forEach((button) => {
    const owned = Boolean(state.cursorCollection[button.dataset.cursorId]);
    button.disabled = !owned && state.cookies < Number(button.dataset.cursorCost);
  });
}

function updateAchievementDetail(achievement) {
  if (!achievement) {
    els.achievementDetail.textContent = "Select any victory tile to inspect its requirement.";
    return;
  }
  const isUnlocked = state.achievements.includes(achievement.id);
  els.achievementDetail.innerHTML = "";
  const strong = document.createElement("strong");
  strong.textContent = `${achievement.icon} ${achievement.name} (${isUnlocked ? "Unlocked" : "Locked"})`;
  const span = document.createElement("span");
  span.textContent = ` — ${achievement.desc}`;
  els.achievementDetail.append(strong, span);
}

function renderAchievements() {
  els.achievements.replaceChildren();
  const unlocked = new Set(state.achievements);
  ACHIEVEMENTS.forEach((achievement) => {
    const tile = document.createElement("button");
    tile.type = "button";
    const isUnlocked = unlocked.has(achievement.id);
    const isSelected = selectedAchievementId === achievement.id;
    tile.className = `ach-tile${isUnlocked ? " unlocked" : ""}${isSelected ? " selected" : ""}`;
    tile.textContent = achievement.icon;
    tile.title = `${achievement.name} — ${achievement.desc}`;
    tile.setAttribute("aria-label", `${achievement.name}: ${achievement.desc}`);
    tile.addEventListener("click", () => {
      selectedAchievementId = achievement.id;
      renderAchievements();
      updateAchievementDetail(achievement);
    });
    els.achievements.appendChild(tile);
  });
  els.achievementCount.textContent = `${unlocked.size} / ${ACHIEVEMENTS.length}`;
  els.masteryStat.textContent = `+${unlocked.size * 2}%`;
  const selected = ACHIEVEMENTS.find((a) => a.id === selectedAchievementId);
  if (selected) updateAchievementDetail(selected);
}

function checkAchievements() {
  let changed = false;
  ACHIEVEMENTS.forEach((achievement) => {
    if (!state.achievements.includes(achievement.id) && achievement.check(state)) {
      state.achievements.push(achievement.id);
      showToast(`🏆 ${achievement.name} unlocked! (+2% permanent power)`);
      playChime([587.33, 739.99, 880]);
      changed = true;
    }
  });
  if (changed) {
    renderAchievements();
    spawnMiniBurstAtElement(els.achievements, 18);
  }
}

function buyBuilding(id) {
  const building = BUILDINGS.find((item) => item.id === id);
  if (!building) return;
  const bulk = getBulkPurchaseInfo(building);
  if (!bulk.affordable || bulk.count <= 0) return;
  state.cookies -= bulk.cost;
  state.buildings[id] = (state.buildings[id] || 0) + bulk.count;
  playTone(440, 660, 0.11, 0.08);
  renderShop();
  renderOrbitCursors();
  const card = els.buildings.querySelector(`[data-building-id="${id}"]`);
  popElement(card);
  spawnMiniBurstAtElement(card || els.buildings, 14);
  checkAchievements();
  checkFlavorUnlocks();
  updateOrdersProgress();
  updateMilestone();
  saveGame();
}

function buyUpgrade(id) {
  const upgrade = UPGRADES.find((item) => item.id === id);
  if (!upgrade || state.upgrades.includes(id) || !upgrade.req(state) || state.cookies < upgrade.cost) return;
  state.cookies -= upgrade.cost;
  state.upgrades.push(id);
  playChime([520, 780]);
  spawnMiniBurstAtElement(els.upgrades, 16);
  showToast(`✨ ${upgrade.name} unlocked!`);
  refreshAfterAdminChange();
}

function buyClickUpgrade(id) {
  const upgrade = CLICK_UPGRADES.find((item) => item.id === id);
  const level = state.clickUpgradeLevels[id] || 0;
  const cost = upgrade ? getClickUpgradeCost(upgrade) : MAX_SPREAD_GRANT;
  if (!upgrade || !upgrade.req(state) || !Number.isSafeInteger(level + 1) || state.cookies < cost) return;
  state.cookies -= cost;
  state.clickUpgradeLevels[id] = level + 1;
  playTone(620, 1040, 0.12, 0.09);
  spawnMiniBurstAtElement(els.upgrades, 14);
  showToast(`✨ ${upgrade.name} upgraded to level ${level + 1}!`);
  refreshAfterAdminChange();
}

function buyRebirthUpgrade(id) {
  const upgrade = REBIRTH_UPGRADES.find((item) => item.id === id);
  if (!upgrade
    || state.rebirthCount < upgrade.unlockAt
    || state.rebirthUpgrades.includes(id)
    || state.rebirthPoints < upgrade.cost) return;
  state.rebirthPoints -= upgrade.cost;
  state.rebirthUpgrades.push(id);
  playChime([523.25, 659.25, 1046.5]);
  spawnMiniBurstAtElement(els.rebirthPanel, 20);
  showToast(`🌟 ${upgrade.name} unlocked!`);
  refreshAfterAdminChange();
}

function startSugarFrenzy(duration = 15000) {
  frenzyMultiplier = 5;
  frenzyEndTime = Date.now() + duration;
  showToast(`🍯 Sugar rush! 5× production for ${Math.ceil(duration / 1000)} seconds!`);
}

function executeRebirth() {
  const reward = getRebirthReward();
  if (!reward) return;

  const retainedProgress = {
    rebirthCount: state.rebirthCount + 1,
    rebirthPoints: state.rebirthPoints + reward,
    rebirthUpgrades: state.rebirthUpgrades,
    achievements: state.achievements,
    soundEnabled: state.soundEnabled,
    voiceEnabled: state.voiceEnabled,
    theme: state.theme,
    goldenJarsCaught: state.goldenJarsCaught,
    bestCombo: state.bestCombo,
    unlockedFlavors: state.unlockedFlavors,
    equippedFlavor: state.equippedFlavor,
    freeFishRollTokens: state.freeFishRollTokens,
    bulkBuyMode: state.bulkBuyMode,
    fishCollection: state.fishCollection,
    fishLevels: state.fishLevels,
    fishHabitats: state.fishHabitats,
    fishLuckLevel: state.fishLuckLevel,
    fishRolls: state.fishRolls,
    fishDailyRollDate: state.fishDailyRollDate,
    fishCollectionRewardClaimed: state.fishCollectionRewardClaimed,
    ordersCompleted: state.ordersCompleted,
    clickCooldownEnabled: state.clickCooldownEnabled,
    lastAcceptedSpreadClickAt: state.lastAcceptedSpreadClickAt,
    whiteoutScreen: state.whiteoutScreen
  };
  if (!Number.isSafeInteger(retainedProgress.rebirthCount) || !Number.isSafeInteger(retainedProgress.rebirthPoints)) {
    showToast("Rebirth points have reached their safe storage limit.");
    return;
  }

  state = { ...createDefaultState(), ...retainedProgress };
  displayedCookies = state.cookies;
  frenzyMultiplier = 1;
  frenzyEndTime = 0;
  clickFrenzyMultiplier = 1;
  clickFrenzyEndTime = 0;
  clickBoostEndTime = 0;
  productionBoostEndTime = 0;
  comboCharge = 0;
  luckyClickArmed = false;
  document.body.classList.remove("disco-mode", "dance-mode", "spin-mode", "rainbow-mode");
  els.adminLuckyClick.setAttribute("aria-pressed", "false");
  els.adminLuckyClick.textContent = "🍀 Arm a 5× lucky click";
  els.adminDisco.setAttribute("aria-pressed", "false");
  els.adminDisco.textContent = "🪩 Disco mode: off";
  els.adminDance.setAttribute("aria-pressed", "false");
  els.adminDance.textContent = "💃 Dance mode: off";
  els.adminSpinMode.setAttribute("aria-pressed", "false");
  els.adminSpinMode.textContent = "🌀 Hyper-spin jar: off";
  els.adminRainbowMode.setAttribute("aria-pressed", "false");
  els.adminRainbowMode.textContent = "🌈 Rainbow aura: off";
  els.frenzyBanner.classList.add("hidden");
  els.clickStreak.textContent = "Click streak bonus every 100 taps";
  updateComboUI();
  updateAdminBoosterStatus();
  checkAchievements();
  checkFlavorUnlocks();
  ensureActiveOrders();
  renderFlavors();
  renderOrders();
  renderShop();
  renderOrbitCursors();
  renderAchievements();
  renderFishCollection();
  renderAquariumSwimmers();
  syncCooldownHint();
  updateClickCooldownUI();
  updateFishTankUI();
  updateRebirthUI(true);
  updateMilestone();
  updateShopAffordability();
  updateNews();
  saveGame();
  playChime([523.25, 659.25, 783.99, 1046.5]);
  triggerAllAnimations();
  showToast(`🌟 Rebirth ${state.rebirthCount} complete! You now have ${formatNumber(state.rebirthPoints)} Spread Stars.`);
}

function performRebirth() {
  const reward = getRebirthReward();
  if (!reward) return;
  showConfirmModal(
    "Rebirth your spreadery?",
    `Gain ${reward} Spread Star and +10% permanent click & production power. Current spreads, clicks, buildings, upgrades, and cursors will reset. Fish, habitats, flavors, and achievements stay.`,
    "🌟 Rebirth Now",
    executeRebirth
  );
}

els.rebirthButton.addEventListener("click", performRebirth);
els.rebirthUpgrades.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  const button = event.target.closest("[data-rebirth-upgrade-id]");
  if (button instanceof HTMLButtonElement) buyRebirthUpgrade(button.dataset.rebirthUpgradeId);
});

els.bulkBuyControls.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  const btn = event.target.closest("[data-bulk]");
  if (!(btn instanceof HTMLButtonElement)) return;
  state.bulkBuyMode = btn.dataset.bulk;
  renderShop();
  saveGame();
});

els.cookieButton.addEventListener("click", (event) => {
  const now = Date.now();
  if (state.clickCooldownEnabled && now - state.lastAcceptedSpreadClickAt < CLICK_COOLDOWN_MS) return;
  state.lastAcceptedSpreadClickAt = state.clickCooldownEnabled ? now : 0;
  updateClickCooldownUI(now);

  // Build combo
  lastComboClickAt = now;
  comboCharge = Math.min(100, comboCharge + 10);
  updateComboUI();

  let gain = getCookiesPerClick();
  let streakBonus = 0;
  let isJackpot = false;
  if (luckyClickArmed) {
    gain *= 5;
    luckyClickArmed = false;
    els.adminLuckyClick.setAttribute("aria-pressed", "false");
    els.adminLuckyClick.textContent = "🍀 Arm a 5× lucky click";
    els.adminStatus.textContent = `Lucky click! You earned ${formatNumber(gain)} spreads.`;
    showToast(`🍀 5× lucky click! +${formatNumber(gain)} spreads`);
    launchConfetti(24);
  } else if (Math.random() < 0.012) {
    gain *= 5;
    isJackpot = true;
    showToast(`🎉 Jackpot! That click made ${formatNumber(gain)} spreads!`);
    launchConfetti(32);
    launchFireworks(2);
    triggerShockwave(true);
    playChime([660, 880, 1100]);
  }
  state.cookies += gain;
  state.totalCookies += gain;
  state.totalClicks++;
  if (state.totalClicks % 100 === 0) {
    streakBonus = gain * 10;
    if (Number.isFinite(state.cookies + streakBonus) && Number.isFinite(state.totalCookies + streakBonus)) {
      state.cookies += streakBonus;
      state.totalCookies += streakBonus;
      showToast(`🎊 100-click streak! Bonus: ${formatNumber(streakBonus)} spreads!`);
      launchConfetti(28);
      launchFireworks(2);
      triggerShockwave(true);
      playChime([523.25, 659.25, 783.99]);
    }
  }
  showClickGain(gain + streakBonus, event, streakBonus > 0, isJackpot);
  triggerCountBump();
  const jarRect = els.cookieButton.getBoundingClientRect();
  const hasPointer = event && typeof event.clientX === "number" && event.clientX > 0;
  const burstX = hasPointer ? event.clientX : jarRect.left + jarRect.width / 2;
  const burstY = hasPointer ? event.clientY : jarRect.top + jarRect.height / 2;
  spawnFireworkBurst(burstX, burstY, isJackpot || streakBonus > 0 ? 28 : 9);
  const clicksUntilStreak = 100 - (state.totalClicks % 100);
  els.clickStreak.textContent = `Next streak bonus in ${clicksUntilStreak} click${clicksUntilStreak === 1 ? "" : "s"}`;
  updateMilestone();
  updateOrdersProgress();
  els.cookieButton.classList.add("clicked");
  window.clearTimeout(spreadAnimationTimer);
  spreadAnimationTimer = window.setTimeout(() => els.cookieButton.classList.remove("clicked"), 120);

  // Tactile pop sound scaling subtly with combo
  const basePitch = 340 + comboCharge * 2.2;
  playTone(basePitch, basePitch * 1.35, 0.065, 0.055, "triangle");
  speakSpread();

  checkAchievements();
  checkFlavorUnlocks();
  updateShopAffordability();
  saveGame();
});

window.addEventListener("keydown", (event) => {
  if (state.whiteoutScreen) {
    if (event.ctrlKey || event.altKey || event.metaKey || event.key.length !== 1) return;
    const maxWhiteoutFixLength = Math.max(WHITEOUT_CODE.length, WHITEOUT_FIX_CODE.length);
    cheatInput = (cheatInput + event.key).slice(-maxWhiteoutFixLength);
    if (cheatInput.toLowerCase().endsWith(WHITEOUT_FIX_CODE.toLowerCase())) {
      cheatInput = "";
      state.whiteoutScreen = false;
      applyWhiteoutMode();
      saveGame();
    }
    return;
  }

  if (event.key === "Escape") {
    if (!els.confirmModal.hidden) {
      closeConfirmModal();
      return;
    }
    if (!els.adminPanel.hidden) {
      closeAdminPanel();
      return;
    }
  }

  const target = event.target;
  const isTyping = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));

  if (event.code === "Space" && !isTyping && els.adminPanel.hidden && els.confirmModal.hidden) {
    if (document.activeElement !== els.cookieButton && !(document.activeElement instanceof HTMLButtonElement)) {
      event.preventDefault();
      els.cookieButton.click();
      return;
    }
  }

  if (event.ctrlKey || event.altKey || event.metaKey || event.key.length !== 1) return;
  if (isTyping) return;
  const maxCheatLength = Math.max(
    SPREAD_CHEAT_CODE.length,
    ENABLE_COOLDOWN_CODE.length,
    REMOVE_COOLDOWN_CODE.length,
    RESET_PROGRESS_CODE.length,
    WHITEOUT_CODE.length,
    WHITEOUT_FIX_CODE.length
  );
  cheatInput = (cheatInput + event.key).slice(-maxCheatLength);
  const lowerCheat = cheatInput.toLowerCase();

  if (lowerCheat.endsWith(SPREAD_CHEAT_CODE.toLowerCase())) {
    cheatInput = "";
    openAdminPanel();
    return;
  }

  if (lowerCheat.endsWith(WHITEOUT_CODE.toLowerCase())) {
    cheatInput = "";
    if (!els.confirmModal.hidden) closeConfirmModal();
    if (!els.adminPanel.hidden) closeAdminPanel();
    state.whiteoutScreen = true;
    applyWhiteoutMode();
    saveGame();
    return;
  }

  if (lowerCheat.endsWith(WHITEOUT_FIX_CODE.toLowerCase())) {
    cheatInput = "";
    if (state.whiteoutScreen) {
      state.whiteoutScreen = false;
      applyWhiteoutMode();
      saveGame();
    }
    return;
  }

  if (lowerCheat.endsWith(RESET_PROGRESS_CODE.toLowerCase())) {
    cheatInput = "";
    if (!els.confirmModal.hidden) closeConfirmModal();
    if (!els.adminPanel.hidden) closeAdminPanel();
    resetAllProgress(false);
    triggerShockwave(true);
    playTone(320, 140, 0.22, 0.08, "triangle");
    showToast("↺ All progress has been reset!");
    return;
  }

  if (lowerCheat.endsWith(ENABLE_COOLDOWN_CODE.toLowerCase())) {
    cheatInput = "";
    if (!state.clickCooldownEnabled) {
      state.clickCooldownEnabled = true;
      state.lastAcceptedSpreadClickAt = Date.now();
      syncCooldownHint();
      updateClickCooldownUI();
      saveGame();
    }
    return;
  }

  if (lowerCheat.endsWith(REMOVE_COOLDOWN_CODE.toLowerCase())) {
    cheatInput = "";
    if (state.clickCooldownEnabled || state.lastAcceptedSpreadClickAt > 0) {
      state.clickCooldownEnabled = false;
      state.lastAcceptedSpreadClickAt = 0;
      syncCooldownHint();
      updateClickCooldownUI();
      saveGame();
    }
  }
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

els.confirmClose.addEventListener("click", closeConfirmModal);
els.confirmCancel.addEventListener("click", closeConfirmModal);
els.confirmModal.addEventListener("click", (event) => {
  if (event.target === els.confirmModal) closeConfirmModal();
});
els.confirmAccept.addEventListener("click", () => {
  const cb = confirmActionCallback;
  closeConfirmModal();
  if (typeof cb === "function") cb();
});

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
  checkFlavorUnlocks();
  ensureActiveOrders();
  renderFlavors();
  renderOrders();
  renderShop();
  renderOrbitCursors();
  renderAchievements();
  renderFishCollection();
  renderAquariumSwimmers();
  updateFishTankUI();
  updateRebirthUI(true);
  updateMilestone();
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

els.fishRoll.addEventListener("click", () => rollFish("paid"));
els.fishDailyRoll.addEventListener("click", () => rollFish("daily"));
els.fishFreeRollBtn.addEventListener("click", () => rollFish("token"));
els.footer10kRolls.addEventListener("click", () => rollFishBatch(false));
if (els.fishLevelAll) els.fishLevelAll.addEventListener("click", levelUpAllAffordableFish);
els.fishSellDuplicates.addEventListener("click", sellAllDuplicates);

els.fishSearchInput.addEventListener("input", () => {
  fishSearchQuery = els.fishSearchInput.value;
  renderFishCollection();
});

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
  playChime([520, 740]);
  els.fishStatus.textContent = `Luck upgraded to level ${state.fishLuckLevel}! Higher tiers are more likely now.`;
  refreshAfterAdminChange();
});
els.fishHabitats.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLElement)) return;
  const button = event.target.closest("[data-habitat-id]");
  if (button instanceof HTMLButtonElement) buyFishHabitat(button.dataset.habitatId);
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

els.adminMult10x.addEventListener("click", () => {
  if (state.cookies <= 0) {
    state.cookies = 1000;
    state.totalCookies = Math.max(state.totalCookies, 1000);
    els.adminStatus.textContent = "Jar started at 1,000 spreads!";
  } else {
    const next = Math.min(Number.MAX_VALUE, state.cookies * 10);
    const added = Math.max(0, next - state.cookies);
    state.cookies = next;
    state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + added);
    els.adminStatus.textContent = `Jar multiplied ×10! Now at ${formatNumber(state.cookies)} spreads.`;
  }
  triggerShockwave(false);
  refreshAfterAdminChange();
});

els.adminSet1e90.addEventListener("click", () => {
  state.cookies = Math.max(state.cookies, 1e90);
  state.totalCookies = Math.max(state.totalCookies, 1e90);
  els.adminStatus.textContent = "Cosmic treasury unlocked! Jar set to 1e90 spreads.";
  launchFireworks(3);
  refreshAfterAdminChange();
});

els.adminZeroJar.addEventListener("click", () => {
  state.cookies = 0;
  displayedCookies = 0;
  els.adminStatus.textContent = "Current jar balance reset to 0 spreads.";
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

els.adminToggleCooldown.addEventListener("click", () => {
  state.clickCooldownEnabled = !state.clickCooldownEnabled;
  state.lastAcceptedSpreadClickAt = state.clickCooldownEnabled ? Date.now() : 0;
  syncCooldownHint();
  updateClickCooldownUI();
  saveGame();
  els.adminStatus.textContent = state.clickCooldownEnabled
    ? "Permanent 20-hour clicker cooldown enabled."
    : "Clicker cooldown permanently removed! Tap as fast as you want.";
  showToast(state.clickCooldownEnabled ? "⏱️ Cooldown set to 20 hours." : "⚡ Clicker cooldown removed!");
});

els.adminMaxCombo.addEventListener("click", () => {
  comboCharge = 100;
  lastComboClickAt = Date.now();
  updateComboUI();
  triggerShockwave(false);
  els.adminStatus.textContent = "Max Combo Fever (×2.5) activated!";
});

els.adminClickFrenzy.addEventListener("click", () => {
  clickFrenzyMultiplier = 5;
  clickFrenzyEndTime = Date.now() + 30000;
  triggerShockwave(true);
  showToast("⚡ 5× Click Frenzy for 30 seconds!");
  els.adminStatus.textContent = "5× Click Frenzy active for 30 seconds!";
});

els.adminSpawnGolden.addEventListener("click", () => {
  spawnGoldenJar(true);
  els.adminStatus.textContent = "Spawned a Golden Jar on stage!";
});

els.adminGoldenRain.addEventListener("click", () => {
  spawnGoldenJarRain(10);
  els.adminStatus.textContent = "Golden Jar Rain launched (10 Golden Jars)!";
});

els.adminFxAll.addEventListener("click", () => {
  triggerAllAnimations();
  els.adminStatus.textContent = "ALL animations triggered! Fireworks, Rain, Confetti & Supernova!";
});

els.adminFxFireworks.addEventListener("click", () => {
  launchFireworks(6);
  els.adminStatus.textContent = "Fireworks show launched!";
});

els.adminFxSpreadRain.addEventListener("click", () => {
  launchSpreadRain(60);
  playChime([523.25, 659.25, 783.99]);
  els.adminStatus.textContent = "Spread Rain Storm unleashed!";
});

els.adminFxShockwave.addEventListener("click", () => {
  triggerShockwave(true);
  playTone(220, 880, 0.28, 0.12, "sawtooth");
  els.adminStatus.textContent = "Supernova Shockwave detonated!";
});

els.adminSpinMode.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("spin-mode");
  els.adminSpinMode.setAttribute("aria-pressed", String(enabled));
  els.adminSpinMode.textContent = `🌀 Hyper-spin jar: ${enabled ? "on" : "off"}`;
  els.adminStatus.textContent = enabled ? "Hyper-spin jar is ON!" : "Hyper-spin jar is off.";
});

els.adminRainbowMode.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("rainbow-mode");
  els.adminRainbowMode.setAttribute("aria-pressed", String(enabled));
  els.adminRainbowMode.textContent = `🌈 Rainbow aura: ${enabled ? "on" : "off"}`;
  els.adminStatus.textContent = enabled ? "Rainbow aura is ON!" : "Rainbow aura is off.";
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
  CLICK_UPGRADES.forEach((upgrade) => {
    state.clickUpgradeLevels[upgrade.id] = Math.max(1, state.clickUpgradeLevels[upgrade.id] || 0);
  });
  els.adminStatus.textContent = "Every upgrade unlocked! All their bonuses are active.";
  refreshAfterAdminChange();
});

els.adminAllFlavors.addEventListener("click", () => {
  state.unlockedFlavors = FLAVORS.map((f) => f.id);
  els.adminStatus.textContent = `Unlocked all ${FLAVORS.length} Kitchen Flavors!`;
  launchConfetti(32);
  refreshAfterAdminChange();
});

els.adminSugarFrenzy.addEventListener("click", () => {
  startSugarFrenzy();
  triggerShockwave(false);
  els.adminStatus.textContent = "Sugar frenzy! All production is 5× for 15 seconds.";
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
    els.adminStatus.textContent = "Mystery jar prize: 1.5× click power for 45 seconds!";
    updateAdminBoosterStatus();
    showToast("⚡ The mystery jar boosted your clicks!");
  } else if (surprise === 2) {
    productionBoostEndTime = Date.now() + 45000;
    els.adminStatus.textContent = "Mystery jar prize: 1.5× production for 45 seconds!";
    updateAdminBoosterStatus();
    showToast("🏭 The mystery jar boosted production!");
  } else {
    els.adminStatus.textContent = "Mystery jar prize: a 5× sugar rush for 10 seconds!";
    startSugarFrenzy(10000);
  }
});

els.adminConfetti.addEventListener("click", () => {
  launchConfetti(80);
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
    : "🍀 Arm a 5× lucky click";
  els.adminStatus.textContent = luckyClickArmed
    ? "Your next spread click will be worth 5×!"
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
      state.cookies = Math.max(state.cookies, OLIVA_REWARD);
      state.totalCookies = Math.max(state.totalCookies, OLIVA_REWARD);
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

els.adminFree10kFishRolls.addEventListener("click", () => {
  if (!rollFishBatch(true)) return;
  els.adminStatus.textContent = "Added 10,000 free tank rolls to your collection!";
});

els.adminMaxFishHabitats.addEventListener("click", () => {
  Object.entries(state.fishCollection).forEach(([id, copies]) => {
    if (copies > 0) state.fishLevels[id] = 10;
  });
  FISH_HABITATS.forEach((habitat) => {
    state.fishHabitats[habitat.id] = true;
  });
  els.adminStatus.textContent = "All owned fish are level 10 and every habitat is built!";
  refreshAfterAdminChange();
});

els.adminClearBoosts.addEventListener("click", () => {
  clickBoostEndTime = 0;
  productionBoostEndTime = 0;
  frenzyMultiplier = 1;
  frenzyEndTime = 0;
  clickFrenzyMultiplier = 1;
  clickFrenzyEndTime = 0;
  luckyClickArmed = false;
  document.body.classList.remove("disco-mode", "dance-mode", "spin-mode", "rainbow-mode");
  els.adminDisco.setAttribute("aria-pressed", "false");
  els.adminDisco.textContent = "🪩 Disco mode: off";
  els.adminDance.setAttribute("aria-pressed", "false");
  els.adminDance.textContent = "💃 Dance mode: off";
  els.adminSpinMode.setAttribute("aria-pressed", "false");
  els.adminSpinMode.textContent = "🌀 Hyper-spin jar: off";
  els.adminRainbowMode.setAttribute("aria-pressed", "false");
  els.adminRainbowMode.textContent = "🌈 Rainbow aura: off";
  els.adminLuckyClick.setAttribute("aria-pressed", "false");
  els.adminLuckyClick.textContent = "🍀 Arm a 5× lucky click";
  updateAdminBoosterStatus();
  els.frenzyBanner.classList.add("hidden");
  els.adminStatus.textContent = "All temporary boosts and fun modes are off.";
});

els.adminUnlockOliva.addEventListener("click", () => {
  state.fishCollection[SECRET_FISH.id] = Math.max(1, state.fishCollection[SECRET_FISH.id] || 0);
  state.fishLevels[SECRET_FISH.id] = state.fishLevels[SECRET_FISH.id] || 1;
  state.cookies = Math.max(state.cookies, OLIVA_REWARD);
  state.totalCookies = Math.max(state.totalCookies, OLIVA_REWARD);
  els.fishStatus.textContent = "✨ Admin reveal! Oliva joined your collection with a huge spread bonus!";
  els.adminStatus.textContent = "Oliva unlocked! The secret fish is in your collection.";
  refreshAfterAdminChange();
  els.fishCollectionDetails.open = true;
  fishCollectionFilter = "all";
  fishSearchQuery = "";
  els.fishSearchInput.value = "";
  renderFishCollection();
  const olivaCard = els.fishCollection.querySelector(`[data-fish-id="${SECRET_FISH.id}"]`);
  if (olivaCard) {
    olivaCard.scrollIntoView({ behavior: "smooth", block: "center" });
    showFishLandingImpact(
      olivaCard.getBoundingClientRect().left + olivaCard.getBoundingClientRect().width / 2,
      olivaCard.getBoundingClientRect().top + olivaCard.getBoundingClientRect().height / 2,
      "secret"
    );
  }
  launchFireworks(4);
  showOlivaCelebration();
});

els.adminAdd100Fish.addEventListener("click", () => {
  let secretUnlocked = false;
  for (let index = 0; index < 100; index++) {
    const character = pickFishCharacter();
    const copies = state.fishCollection[character.id] || 0;
    if (!Number.isSafeInteger(copies + 1)) continue;
    state.fishCollection[character.id] = copies + 1;
    state.fishLevels[character.id] = state.fishLevels[character.id] || 1;
    state.fishRolls = Math.min(Number.MAX_SAFE_INTEGER, state.fishRolls + 1);
    if (character.id === SECRET_FISH.id) secretUnlocked = true;
  }
  if (secretUnlocked) {
    state.cookies = Math.max(state.cookies, OLIVA_REWARD);
    state.totalCookies = Math.max(state.totalCookies, OLIVA_REWARD);
  }
  checkFishCollectionReward();
  els.adminStatus.textContent = `Added 100 random fish${secretUnlocked ? " and unlocked Oliva!" : "!"}`;
  refreshAfterAdminChange();
  if (secretUnlocked) showOlivaCelebration();
  launchConfetti(50);
});

els.adminAllCursors.addEventListener("click", () => {
  CURSORS.forEach((cursor) => {
    state.cursorCollection[cursor.id] = true;
  });
  els.adminStatus.textContent = "Every cursor has been unlocked! Choose one from the Cursor Shop.";
  refreshAfterAdminChange();
});

els.adminGrantTokens.addEventListener("click", () => {
  state.freeFishRollTokens += 50;
  els.adminStatus.textContent = "Granted +50 Free Aquarium Roll Tokens!";
  playChime([523.25, 659.25, 783.99]);
  refreshAfterAdminChange();
});

els.adminMaxLuck.addEventListener("click", () => {
  state.fishLuckLevel = 5;
  els.fishStatus.textContent = "Admin boost! Your tank luck is maxed out.";
  els.adminStatus.textContent = "Tank luck maxed out at level 5!";
  refreshAfterAdminChange();
});

els.adminResetDailyRoll.addEventListener("click", () => {
  state.fishDailyRollDate = "";
  els.fishStatus.textContent = "Your daily free roll is ready to claim!";
  els.adminStatus.textContent = "Today's free fish roll is ready again.";
  refreshAfterAdminChange();
});

els.adminMaxRebirths.addEventListener("click", () => {
  state.rebirthCount = MAX_REBIRTHS;
  state.rebirthPoints = Math.max(state.rebirthPoints, 100);
  state.rebirthUpgrades = REBIRTH_UPGRADES.map((u) => u.id);
  els.adminStatus.textContent = "Maxed rebirths (100) and unlocked all rebirth upgrades!";
  refreshAfterAdminChange();
});

els.adminAllAchievements.addEventListener("click", () => {
  state.achievements = ACHIEVEMENTS.map((a) => a.id);
  els.adminStatus.textContent = `Unlocked all ${ACHIEVEMENTS.length} achievements (+${ACHIEVEMENTS.length * 2}% power)!`;
  launchFireworks(3);
  launchConfetti(48);
  refreshAfterAdminChange();
});

els.adminCompleteOrders.addEventListener("click", () => {
  ensureActiveOrders();
  state.activeOrders.forEach((order) => {
    order.baseline = getOrderMetricValue(order.kind) - order.target;
  });
  els.adminStatus.textContent = "All 3 active Spread Orders are ready to claim!";
  renderOrders();
  saveGame();
});

function updateAdminBoosterStatus() {
  const clickSeconds = Math.max(0, Math.ceil((clickBoostEndTime - Date.now()) / 1000));
  const productionSeconds = Math.max(0, Math.ceil((productionBoostEndTime - Date.now()) / 1000));
  els.clickBoostStatus.textContent = clickSeconds ? `Active · ${clickSeconds}s` : "Ready";
  els.productionBoostStatus.textContent = productionSeconds ? `Active · ${productionSeconds}s` : "Ready";
}

els.themeToggleBtn.addEventListener("click", () => {
  const idx = THEMES.findIndex((t) => t.id === state.theme);
  const next = THEMES[(idx + 1) % THEMES.length];
  applyTheme(next.id);
  saveGame();
});

els.soundButton.addEventListener("click", () => {
  state.soundEnabled = !state.soundEnabled;
  els.soundButton.setAttribute("aria-pressed", String(state.soundEnabled));
  els.soundButton.textContent = state.soundEnabled ? "🔊 Sound on" : "🔇 Sound off";
  if (state.soundEnabled) playTone(520, 740, 0.09, 0.07);
  saveGame();
});

els.voiceButton.addEventListener("click", () => {
  state.voiceEnabled = !state.voiceEnabled;
  els.voiceButton.setAttribute("aria-pressed", String(state.voiceEnabled));
  els.voiceButton.textContent = state.voiceEnabled ? "🗣️ Voice on" : "🗣️ Voice off";
  if (state.voiceEnabled) speakSpread();
  saveGame();
});

els.rebirthMenuShortcut.addEventListener("click", () => {
  els.rebirthPanel.scrollIntoView({ behavior: "smooth", block: "center" });
});

function resetAllProgress(preserveCooldown = false) {
  const savedTheme = state.theme;
  const keepCooldownEnabled = preserveCooldown ? state.clickCooldownEnabled : false;
  const keepLastClickAt = preserveCooldown ? state.lastAcceptedSpreadClickAt : 0;
  const keepWhiteout = state.whiteoutScreen;
  state = createDefaultState();
  state.theme = savedTheme;
  state.clickCooldownEnabled = keepCooldownEnabled;
  state.lastAcceptedSpreadClickAt = keepLastClickAt;
  state.whiteoutScreen = keepWhiteout;
  displayedCookies = 0;
  frenzyMultiplier = 1;
  frenzyEndTime = 0;
  clickFrenzyMultiplier = 1;
  clickFrenzyEndTime = 0;
  clickBoostEndTime = 0;
  productionBoostEndTime = 0;
  comboCharge = 0;
  luckyClickArmed = false;
  selectedAchievementId = null;
  fishCollectionFilter = "all";
  fishSearchQuery = "";
  if (els.fishSearchInput) els.fishSearchInput.value = "";
  document.body.classList.remove("disco-mode", "dance-mode", "spin-mode", "rainbow-mode");
  els.adminLuckyClick.setAttribute("aria-pressed", "false");
  els.adminLuckyClick.textContent = "🍀 Arm a 5× lucky click";
  els.adminDisco.setAttribute("aria-pressed", "false");
  els.adminDisco.textContent = "🪩 Disco mode: off";
  els.adminDance.setAttribute("aria-pressed", "false");
  els.adminDance.textContent = "💃 Dance mode: off";
  els.adminSpinMode.setAttribute("aria-pressed", "false");
  els.adminSpinMode.textContent = "🌀 Hyper-spin jar: off";
  els.adminRainbowMode.setAttribute("aria-pressed", "false");
  els.adminRainbowMode.textContent = "🌈 Rainbow aura: off";
  els.frenzyBanner.classList.add("hidden");
  els.clickStreak.textContent = "Click streak bonus every 100 taps";
  updateComboUI();
  updateAdminBoosterStatus();
  saveGame();
  ensureActiveOrders();
  renderFlavors();
  renderOrders();
  renderShop();
  renderOrbitCursors();
  renderAchievements();
  renderFishCollection();
  renderAquariumSwimmers();
  syncCooldownHint();
  updateClickCooldownUI();
  updateFishTankUI();
  updateRebirthUI(true);
  updateMilestone();
  updateShopAffordability();
  updateNews();
}

els.resetButton.addEventListener("click", () => {
  showConfirmModal(
    "Start a fresh spreadery?",
    "This will erase all saved progress including spreads, buildings, rebirths, and your aquarium collection.",
    "↺ Reset Everything",
    () => {
      resetAllProgress(true);
      showToast("Your spreadery is ready for a fresh start!");
    }
  );
});

function updateNews() {
  const eligible = HEADLINES.filter((headline) => state.totalCookies >= headline.min);
  const nextText = eligible[Math.floor(Math.random() * eligible.length)].text;
  if (els.news.textContent !== nextText) {
    els.news.textContent = nextText;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.news.classList.remove("news-swap");
      void els.news.offsetWidth;
      els.news.classList.add("news-swap");
    }
  }
}

function gameLoop(now) {
  const delta = Math.min((now - lastFrameTime) / 1000, 1);
  lastFrameTime = now;
  const currentTime = Date.now();

  if (frenzyMultiplier > 1 && currentTime >= frenzyEndTime) {
    frenzyMultiplier = 1;
  }
  if (clickFrenzyMultiplier > 1 && currentTime >= clickFrenzyEndTime) {
    clickFrenzyMultiplier = 1;
  }

  const rushActive = frenzyMultiplier > 1 || clickFrenzyMultiplier > 1;
  if (rushActive) {
    els.frenzyBanner.classList.remove("hidden");
    const prodSecs = frenzyMultiplier > 1 ? Math.ceil((frenzyEndTime - currentTime) / 1000) : 0;
    const clickSecs = clickFrenzyMultiplier > 1 ? Math.ceil((clickFrenzyEndTime - currentTime) / 1000) : 0;
    const parts = [];
    if (prodSecs > 0) parts.push(`🍯 Sugar rush ${prodSecs}s (5× CPS)`);
    if (clickSecs > 0) parts.push(`⚡ Click frenzy ${clickSecs}s (5× Clicks)`);
    els.frenzyBanner.textContent = parts.join(" · ");
  } else {
    els.frenzyBanner.classList.add("hidden");
  }

  const feverActive = getComboMultiplier() >= 2.0;
  if (els.bakeStage) {
    els.bakeStage.classList.toggle("fever-active", feverActive);
    els.bakeStage.classList.toggle("frenzy-active", rushActive);
  }

  const visualModeActive = document.body.classList.contains("disco-mode")
    || document.body.classList.contains("spin-mode")
    || document.body.classList.contains("rainbow-mode");
  if (rushActive || feverActive || visualModeActive) {
    ambientMoteTimer += delta;
    const interval = rushActive ? 0.14 : 0.28;
    if (ambientMoteTimer >= interval) {
      ambientMoteTimer = 0;
      spawnAmbientMote();
    }
  } else {
    ambientMoteTimer = 0;
  }

  const comboGraceMs = state.clickCooldownEnabled ? CLICK_COOLDOWN_MS + 60000 : 1400;
  if (comboCharge > 0 && currentTime - lastComboClickAt > comboGraceMs) {
    comboCharge = Math.max(0, comboCharge - delta * 28);
    updateComboUI();
  }
  updateClickCooldownUI(currentTime);

  const cookiesPerSecond = getCookiesPerSecond();
  if (cookiesPerSecond > 0) {
    const earned = cookiesPerSecond * delta;
    state.cookies += earned;
    state.totalCookies += earned;
  }
  state.playTimeSeconds += delta;

  // Smooth rolling number counter
  if (!Number.isFinite(displayedCookies)) displayedCookies = state.cookies;
  const diff = state.cookies - displayedCookies;
  if (Math.abs(diff) < 1 || !Number.isFinite(diff)) {
    displayedCookies = state.cookies;
  } else {
    displayedCookies += diff * Math.min(1, delta * 14);
  }

  updateFxCanvas(delta);

  unlockCheckTime += delta;
  shopRenderTime += delta;
  if (unlockCheckTime >= 1) {
    unlockCheckTime = 0;
    checkAchievements();
    checkFlavorUnlocks();
    updateMilestone();
    updateOrdersProgress();
    const eligibleCount = UPGRADES.filter((upgrade) => !state.upgrades.includes(upgrade.id) && upgrade.req(state)).length
      + CLICK_UPGRADES.filter((upgrade) => upgrade.req(state)).length;
    if (eligibleCount !== els.upgrades.querySelectorAll(".upgrade-btn").length) renderShop();
  }
  if (shopRenderTime >= 1) {
    shopRenderTime = 0;
    updateShopAffordability();
    updateAdminBoosterStatus();
    updateFishTankUI();
    updateRebirthUI();
  }

  els.cookieCount.textContent = formatNumber(displayedCookies);
  els.cps.textContent = formatRate(cookiesPerSecond);
  els.cpc.textContent = `+${formatNumber(getCookiesPerClick())}`;
  els.total.textContent = formatNumber(state.totalCookies);
  els.clicks.textContent = state.totalClicks.toLocaleString();
  els.goldenStat.textContent = state.goldenJarsCaught.toLocaleString();
  els.bestComboStat.textContent = `×${state.bestCombo.toFixed(1)}`;
  els.time.textContent = formatTime(state.playTimeSeconds);
  const buildingCount = getBuildingCount();
  els.buildingSummary.textContent = buildingCount
    ? `${buildingCount.toLocaleString()} helper${buildingCount === 1 ? "" : "s"} making spreads`
    : "Your spreadery is just getting started";
  document.title = `${formatNumber(state.cookies)} spreads — Spread Clicker`;
  requestAnimationFrame(gameLoop);
}

function startGame() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./service-worker.js", { updateViaCache: "none" })
      .then((registration) => registration.update().catch(() => {}))
      .catch((error) => {
        console.warn("Could not enable the offline app cache.", error);
      });
  }
  resizeFxCanvas();
  window.addEventListener("resize", resizeFxCanvas);
  initAmbientSparks();
  initStageParallax();
  applyTheme(state.theme);
  applyWhiteoutMode();
  const awaySeconds = Math.max(0, (Date.now() - state.lastSaved) / 1000);
  const offlineCookies = Math.min(awaySeconds, 8 * 60 * 60) * getCookiesPerSecond() * 0.5;
  if (offlineCookies > 0) {
    state.cookies += offlineCookies;
    state.totalCookies += offlineCookies;
    saveGame();
    window.setTimeout(() => showToast(`Welcome back! Your spreadery made ${formatNumber(offlineCookies)} spreads.`), 400);
  }
  displayedCookies = state.cookies;
  els.soundButton.setAttribute("aria-pressed", String(state.soundEnabled));
  els.soundButton.textContent = state.soundEnabled ? "🔊 Sound on" : "🔇 Sound off";
  els.voiceButton.setAttribute("aria-pressed", String(state.voiceEnabled));
  els.voiceButton.textContent = state.voiceEnabled ? "🗣️ Voice on" : "🗣️ Voice off";
  ensureActiveOrders();
  syncCooldownHint();
  checkAchievements();
  checkFlavorUnlocks();
  renderFlavors();
  renderOrders();
  renderShop();
  renderOrbitCursors();
  renderAchievements();
  renderFishCollection();
  renderAquariumSwimmers();
  updateFishTankUI();
  updateRebirthUI(true);
  updateComboUI();
  updateClickCooldownUI();
  updateMilestone();
  updateNews();
  applyInitialCascade();
  scheduleNextGoldenJar();
  window.setInterval(saveGame, 3000);
  window.setInterval(updateNews, 10000);
  window.addEventListener("beforeunload", saveGame);
  window.addEventListener("pagehide", saveGame);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") saveGame();
  });
  requestAnimationFrame(gameLoop);
}

startGame();
