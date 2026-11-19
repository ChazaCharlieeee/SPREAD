"use strict";

const SAVE_KEY = "cookie_clicker_save_v2";
const UPDATE_RESET_VERSION = 53;
const AUTOCLICKER_CPS_LIMIT = 50;

const BUILDINGS = [
  { id: "cursor", name: "Auto-Spreader", icon: "🤸‍♂️", cost: 20, cps: 0.075, desc: "Swirls warm hazelnut & butter jars onto toast automatically." },
  { id: "grandma", name: "Spread Grandma", icon: "🤸‍♀️", cost: 130, cps: 0.72, desc: "A cheerful bakery grandma whisking warm spreadery batches by the dozen." },
  { id: "farm", name: "Nut Farm", icon: "🧘‍♀️", cost: 1400, cps: 5.8, desc: "Grows roasted hazelnuts, almonds, strawberries & sweet toppings." },
  { id: "mine", name: "Cocoa Mine", icon: "🤸", cost: 15000, cps: 34, desc: "Digs rich dark chocolate & sea-salt veins for the spreadery kettles." },
  { id: "factory", name: "Spread Factory", icon: "🧘‍♂️", cost: 165000, cps: 190, desc: "Mixes, simmers, and seals artisan glass spread jars round the clock." },
  { id: "bank", name: "Spread Bank", icon: "🤸‍♂️", cost: 1800000, cps: 1020, desc: "Generates compound interest paid in warm golden caramel spreads." },
  { id: "temple", name: "Spread Temple", icon: "🧘", cost: 25000000, cps: 5600, desc: "Honors ancient sourdough recipes and secret spreadery kitchen craft." },
  { id: "lab", name: "Spread Lab", icon: "🤸‍♀️", cost: 420000000, cps: 31500, desc: "Invents silky whipped textures and weightless honey-cream spreads." },
  { id: "portal", name: "Spread Portal mat", icon: "🤸‍♂️", cost: 6500000000, cps: 185000, desc: "Opens delicious shortcuts straight from the spreadery pantry." },
  { id: "galaxy", name: "Galaxy Bakery", icon: "🧘‍♀️", cost: 95000000000, cps: 1150000, desc: "Harvests stardust sugar across spiral nebulas." },
  { id: "dimension", name: "Dimension Oven", icon: "🤸", cost: 1400000000000, cps: 7200000, desc: "Bakes warm batches across parallel timelines." },
  { id: "time-machine", name: "Time Machine", icon: "🧘‍♂️", cost: 18000000000000, cps: 55000000, desc: "Brings fresh morning jars back from the future." },
  { id: "antimatter", name: "Antimatter Condenser", icon: "🤸‍♂️", cost: 220000000000000, cps: 310000000, desc: "Turns pure subatomic energy into velvety spread." },
  { id: "prism", name: "Prism Spreadery", icon: "🧘", cost: 2700000000000000, cps: 2100000000, desc: "Focuses beams of warm sunlight into golden glaze." },
  { id: "chancemaker", name: "Chancemaker", icon: "🤸‍♀️", cost: 33000000000000000, cps: 15000000000, desc: "Turns lucky breaks into overflowing jars." },
  { id: "fractal-engine", name: "Fractal Engine", icon: "🤸", cost: 400000000000000000, cps: 108000000000, desc: "Mirrors every spoonful into endless miniature swirls." },
  { id: "spread-suburb", name: "Spread Suburb", icon: "🧘‍♂️", cost: 540000000000000000, cps: 158000000000, desc: "Every front porch stocks fresh artisan jars." },
  { id: "spread-city", name: "Spread City", icon: "🤸‍♂️", cost: 1100000000000000000, cps: 260000000000, desc: "A sunlit skyline built around busy spread cafés." },
  { id: "spread-megacity", name: "Spread Megacity", icon: "🧘‍♀️", cost: 2100000000000000000, cps: 390000000000, desc: "Every skyscraper hosts an artisan tasting room." },
  { id: "spread-multiverse", name: "Spread Multiverse", icon: "🤸‍♀️", cost: 3600000000000000000, cps: 520000000000, desc: "Links every cozy bakery across countless worlds." },
  { id: "spreadster", name: "Spreadster", icon: "🤸", cost: 5400000000000000000, cps: 580000000000, desc: "Broadcasts fresh spread recipes to kitchens everywhere." },
  { id: "spreadsheet", name: "Spreadsheet", icon: "🧘", cost: 75000000000000000000, cps: 3200000000000, desc: "Optimizes every jar ratio down to the last drop." },
  { id: "spreadstergram", name: "Spreadstergram", icon: "🤸‍♂️", cost: 1100000000000000000000, cps: 21000000000000, desc: "Shares glistening swirl photos that spark global cravings." }
];

const CURSORS = [
  { id: "starter", name: "Starter Cursor", icon: "🤸‍♂️", cost: 0, multiplier: 1 },
  { id: "bronze", name: "Bronze Pointer", icon: "🤸‍♀️", cost: 1300, multiplier: 1.2 },
  { id: "gold", name: "Golden Pointer", icon: "🤸", cost: 9500, multiplier: 1.6 },
  { id: "diamond", name: "Diamond Cursor", icon: "🧘‍♂️", cost: 65000, multiplier: 2.4 },
  { id: "rainbow", name: "Rainbow Cursor", icon: "🧘‍♀️", cost: 325000, multiplier: 4 },
  { id: "cosmic", name: "Cosmic Cursor", icon: "🧘", cost: 2000000, multiplier: 8 },
  { id: "comet", name: "Comet Pointer", icon: "🤸‍♂️", cost: 26000000, multiplier: 16 },
  { id: "nebula", name: "Nebula Pointer", icon: "🤸‍♀️", cost: 650000000, multiplier: 28 },
  { id: "quantum", name: "Quantum Cursor", icon: "🤸", cost: 32000000000, multiplier: 48 },
  { id: "supernova", name: "Supernova Cursor", icon: "🧘‍♂️", cost: 13000000000000, multiplier: 80 },
  { id: "infinity", name: "Infinity Pointer", icon: "🧘‍♀️", cost: 1.3e19, multiplier: 140 },
  { id: "tuff", name: "Varsity Crown Cursor", icon: "🤸‍♂️", cost: 1.3e25, multiplier: 240 },
  { id: "ultra", name: "Ultra Carbon Cursor", icon: "🤸‍♀️", cost: 1.3e31, multiplier: 400 },
  { id: "galaxy", name: "Starlight Cursor", icon: "🧘", cost: 1.3e37, multiplier: 640 },
  { id: "reality", name: "Reality Cursor", icon: "🤸", cost: 1.3e43, multiplier: 1000 },
  { id: "overdrive", name: "Overdrive Pointer", icon: "🧘‍♂️", cost: 1.3e49, multiplier: 1600 },
  { id: "titan", name: "Titan Cursor", icon: "🤸‍♂️", cost: 1.3e55, multiplier: 2800 },
  { id: "apex", name: "Apex Gold Cursor", icon: "🧘‍♀️", cost: 1.3e61, multiplier: 4800 }
];

const FLAVORS = [
  { id: "hazelnut", name: "Classic Hazelnut", icon: "🤸‍♂️", bonusLabel: "+10% Clicks", clickMult: 1.1, prodMult: 1, goldenSpeed: 1, desc: "Silky roasted hazelnut spread baked fresh every morning.", reqText: "Unlocked at start", req: () => true },
  { id: "salted-caramel", name: "Salted Caramel", icon: "🤸‍♀️", bonusLabel: "+15% Production", clickMult: 1, prodMult: 1.15, goldenSpeed: 1, desc: "Warm golden caramel with flaky sea salt for busy ovens.", reqText: "Make 800 total spreads", req: (s) => s.totalCookies >= 800 },
  { id: "strawberry-jam", name: "Strawberry Jam", icon: "🧘‍♀️", bonusLabel: "+20% Clicks", clickMult: 1.2, prodMult: 1, goldenSpeed: 1, desc: "Bright berry preserve packed with snappy click energy.", reqText: "Make 300 manual clicks", req: (s) => s.totalClicks >= 300 },
  { id: "pistachio-cream", name: "Pistachio Cream", icon: "🤸", bonusLabel: "+25% Production", clickMult: 1, prodMult: 1.25, goldenSpeed: 1, desc: "Velvety roasted pistachio swirl prized by master helpers.", reqText: "Own 20 helpers & shops", req: (s) => getBuildingCount(s) >= 20 },
  { id: "golden-truffle", name: "Golden Truffle", icon: "🧘‍♂️", bonusLabel: "Faster Golden Jars +15%", clickMult: 1.15, prodMult: 1.15, goldenSpeed: 1.35, desc: "Attracts floating Golden Jars 35% more often.", reqText: "Catch 3 Golden Jars or 150K spreads", req: (s) => s.goldenJarsCaught >= 3 || s.totalCookies >= 150000 },
  { id: "cosmic-honey", name: "Cosmic Honey", icon: "🤸‍♂️", bonusLabel: "+30% All Power", clickMult: 1.3, prodMult: 1.3, goldenSpeed: 1.2, desc: "Starlight nectar drizzle for elite bakery runs.", reqText: "1+ Rebirth or 30 unique fish", req: (s) => s.rebirthCount >= 1 || getFishUniqueCount(s) >= 30 },
  { id: "matcha-swirl", name: "Matcha Swirl", icon: "🧘", bonusLabel: "+35% Production", clickMult: 1.05, prodMult: 1.35, goldenSpeed: 1.1, desc: "Stone-ground green tea cream for calm, steady production.", reqText: "Make 1.5 million total spreads", req: (s) => s.totalCookies >= 1500000 },
  { id: "spiced-chai", name: "Spiced Chai", icon: "🤸‍♀️", bonusLabel: "+45% Clicks", clickMult: 1.45, prodMult: 1.1, goldenSpeed: 1.15, desc: "Cinnamon-cardamom warmth for massive manual clicks.", reqText: "Make 2,000 manual clicks", req: (s) => s.totalClicks >= 2000 },
  { id: "diamond-glaze", name: "Diamond Glaze", icon: "🧘‍♂️", bonusLabel: "+60% All Power", clickMult: 1.6, prodMult: 1.6, goldenSpeed: 1.25, desc: "Mirror-shine sugar crystal finish fit for royalty.", reqText: "3+ Rebirths or 1.5T total spreads", req: (s) => s.rebirthCount >= 3 || s.totalCookies >= 1.5e12 },
  { id: "nebula-butter", name: "Nebula Butter", icon: "🤸‍♂️", bonusLabel: "+100% Power & Fast Jars", clickMult: 2, prodMult: 2, goldenSpeed: 1.5, desc: "Swirling cosmic spread whipped inside oven starlight.", reqText: "10+ Rebirths or 130 unique fish", req: (s) => s.rebirthCount >= 10 || getFishUniqueCount(s) >= 130 }
];

const FISH_HABITATS = [
  { id: "coral-garden", name: "Coral Garden 🤸‍♂️", icon: "🪸", cost: 160000, bonus: 0.04, desc: "Peaceful reef hideaway. +4% click & production." },
  { id: "bubble-castle", name: "Bubble Castle 🤸‍♀️", icon: "🫧", cost: 3200000, bonus: 0.08, desc: "Shimmery castle towers for happy swimmers. +8% click & production." },
  { id: "sunken-ship", name: "Sunken Treasure Ship 🧘", icon: "🚢", cost: 80000000, bonus: 0.16, desc: "Antique chest overflowing with golden glaze. +16% click & production." },
  { id: "rainbow-reef", name: "Rainbow Reef 🤸", icon: "🌈", cost: 1600000000, bonus: 0.28, desc: "Vibrant prism coral energizing the whole tank. +28% click & production." },
  { id: "atlantis-vault", name: "Atlantis Vault 🧘‍♂️", icon: "🔱", cost: 64000000000, bonus: 0.45, desc: "Ancient sea vault brimming with spread power. +45% click & production." },
  { id: "celestial-lagoon", name: "Celestial Lagoon 🤸‍♂️", icon: "🌠", cost: 3200000000000, bonus: 0.8, desc: "Starlight waters supercharging every bakery helper. +80% click & production." }
];

const CLICK_UPGRADES = [
  { id: "strong-fingers", name: "Spread Strong Fingers", icon: "🤸‍♂️", cost: 500, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 12, mult: 1.05 },
  { id: "butter-cookie", name: "Butter Spread", icon: "🧘‍♀️", cost: 5000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalCookies >= 350, mult: 1.05 },
  { id: "chocolate-chips", name: "Spread Extra Topping", icon: "🤸‍♀️", cost: 20000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 120, mult: 1.05 },
  { id: "sugar-rush", name: "Sugar Rush", icon: "🔥", cost: 100000, desc: "Each level adds 10% more spreads per click.", req: (s) => s.totalCookies >= 6500, mult: 1.1 },
  { id: "quick-tap", name: "Quick-Tap Practice", icon: "🤸", cost: 3000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 30, mult: 1.05 },
  { id: "sticky-fingers", name: "Sticky Fingers", icon: "🧘‍♂️", cost: 12000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 75, mult: 1.05 },
  { id: "spread-sling", name: "Spread Sling", icon: "🤸‍♂️", cost: 36000, desc: "Each level adds 10% more spreads per click.", req: (s) => s.totalClicks >= 150, mult: 1.1 },
  { id: "turbo-thumb", name: "Turbo Thumb", icon: "🧘", cost: 90000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 300, mult: 1.05 },
  { id: "power-palm", name: "Power Palm", icon: "🤸‍♀️", cost: 200000, desc: "Each level adds 10% more spreads per click.", req: (s) => s.totalClicks >= 600, mult: 1.1 },
  { id: "double-tap", name: "Double-Tap Knack", icon: "🤸", cost: 440000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 1000, mult: 1.05 },
  { id: "mega-mitts", name: "Mega Mitts", icon: "🧘‍♀️", cost: 960000, desc: "Each level adds 10% more spreads per click.", req: (s) => s.totalClicks >= 1800, mult: 1.1 },
  { id: "lightning-click", name: "Lightning Click", icon: "🤸‍♂️", cost: 2000000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 3000, mult: 1.05 },
  { id: "spread-storm", name: "Spread Storm", icon: "🧘‍♂️", cost: 4400000, desc: "Each level adds 10% more spreads per click.", req: (s) => s.totalClicks >= 4800, mult: 1.1 },
  { id: "click-cannon", name: "Click Cannon", icon: "🤸‍♀️", cost: 9000000, desc: "Each level adds 5% more spreads per click.", req: (s) => s.totalClicks >= 7500, mult: 1.05 },
  { id: "golden-touch-upgrade", name: "Golden Touch", icon: "🤸‍♂️", cost: 18000000, desc: "Each level multiplies spreads per click by 1.2.", req: (s) => s.totalClicks >= 12000, mult: 1.2 }
];

const UPGRADES = [
  { id: "grandmas-rolling-pin", name: "Rolling Pins 🤸‍♀️", icon: "🤸‍♀️", cost: 650, desc: "Spread Grandmas produce 60% more spreads.", req: (s) => (s.buildings.grandma || 0) >= 1, type: "building", target: "grandma", mult: 1.6 },
  { id: "fertilizer", name: "Rich Compost 🧘", icon: "🧘", cost: 7000, desc: "Nut Farms produce 60% more spreads.", req: (s) => (s.buildings.farm || 0) >= 1, type: "building", target: "farm", mult: 1.6 },
  { id: "laser-drills", name: "Laser Drills 🤸", icon: "🤸", cost: 75000, desc: "Cocoa Mines produce 60% more spreads.", req: (s) => (s.buildings.mine || 0) >= 1, type: "building", target: "mine", mult: 1.6 },
  { id: "robot-bakers", name: "Robot Mixers 🤸‍♂️", icon: "🤸‍♂️", cost: 825000, desc: "Spread Factories produce 60% more spreads.", req: (s) => (s.buildings.factory || 0) >= 1, type: "building", target: "factory", mult: 1.6 },
  { id: "interest", name: "Golden Interest 🧘‍♂️", icon: "🧘‍♂️", cost: 9000000, desc: "Spread Banks produce 60% more spreads.", req: (s) => (s.buildings.bank || 0) >= 1, type: "building", target: "bank", mult: 1.6 },
  { id: "lab-research", name: "Whisk Labs 🤸‍♀️", icon: "🤸‍♀️", cost: 1250000000, desc: "Spread Labs produce 60% more spreads.", req: (s) => (s.buildings.lab || 0) >= 1, type: "building", target: "lab", mult: 1.6 },
  { id: "portal-stabilizer", name: "Portal Stabilizer 🤸", icon: "🤸", cost: 19500000000, desc: "Spread Portal Mats produce 60% more spreads.", req: (s) => (s.buildings.portal || 0) >= 1, type: "building", target: "portal", mult: 1.6 },
  { id: "galactic-spread", name: "Starlight Glaze 🧘‍♀️", icon: "🧘‍♀️", cost: 285000000000, desc: "Galaxy Bakeries produce 60% more spreads.", req: (s) => (s.buildings.galaxy || 0) >= 1, type: "building", target: "galaxy", mult: 1.6 },
  { id: "dimensional-spread", name: "Timeline Seasoning 🤸‍♂️", icon: "🤸‍♂️", cost: 4200000000000, desc: "Dimension Ovens produce 60% more spreads.", req: (s) => (s.buildings.dimension || 0) >= 1, type: "building", target: "dimension", mult: 1.6 },
  { id: "time-tuner", name: "Chrono Timer 🧘", icon: "🧘", cost: 54000000000000, desc: "Time Machines produce 60% more spreads.", req: (s) => (s.buildings["time-machine"] || 0) >= 1, type: "building", target: "time-machine", mult: 1.6 },
  { id: "antimatter-coils", name: "Flavor Coils 🤸‍♀️", icon: "🤸‍♀️", cost: 660000000000000, desc: "Antimatter Condensers produce 60% more spreads.", req: (s) => (s.buildings.antimatter || 0) >= 1, type: "building", target: "antimatter", mult: 1.6 },
  { id: "prismatic-lenses", name: "Prismatic Lenses 🤸", icon: "🤸", cost: 8100000000000000, desc: "Prism Spreaderies produce 60% more spreads.", req: (s) => (s.buildings.prism || 0) >= 1, type: "building", target: "prism", mult: 1.6 },
  { id: "lucky-dice", name: "Lucky Dice 🧘‍♂️", icon: "🧘‍♂️", cost: 99000000000000000, desc: "Chancemakers produce 60% more spreads.", req: (s) => (s.buildings.chancemaker || 0) >= 1, type: "building", target: "chancemaker", mult: 1.6 },
  { id: "fractal-blueprints", name: "Recursive Blueprints 🤸‍♂️", icon: "🤸‍♂️", cost: 1200000000000000000, desc: "Fractal Engines produce 60% more spreads.", req: (s) => (s.buildings["fractal-engine"] || 0) >= 1, type: "building", target: "fractal-engine", mult: 1.6 },
  { id: "spreadster-amplifier", name: "Spreadster Amplifier 🧘‍♀️", icon: "🧘‍♀️", cost: 16200000000000000000, desc: "Spreadsters produce 60% more spreads each second.", req: (s) => (s.buildings.spreadster || 0) >= 1, type: "building", target: "spreadster", mult: 1.6 },
  { id: "spreadsheet-formulas", name: "Spreadsheet Formulas 🤸‍♀️", icon: "🤸‍♀️", cost: 225000000000000000000, desc: "Spreadsheets produce 60% more spreads each second.", req: (s) => (s.buildings.spreadsheet || 0) >= 1, type: "building", target: "spreadsheet", mult: 1.6 },
  { id: "spreadstergram-filters", name: "Swirl Filters 🤸‍♂️", icon: "🤸‍♂️", cost: 3300000000000000000000, desc: "Spreadstergrams produce 60% more spreads each second.", req: (s) => (s.buildings.spreadstergram || 0) >= 1, type: "building", target: "spreadstergram", mult: 1.6 }
];

const ACHIEVEMENTS = [
  { id: "first-cookie", icon: "🤸‍♂️", name: "First Spread", desc: "Click the spread jar once.", check: (s) => s.totalClicks >= 1 },
  { id: "busy-hands", icon: "🤸‍♀️", name: "Busy Hands", desc: "Click 100 times manually.", check: (s) => s.totalClicks >= 100 },
  { id: "combo-chef", icon: "🤸", name: "Combo Maker", desc: "Reach a ×2.0 click combo.", check: (s) => s.bestCombo >= 2 },
  { id: "combo-master", icon: "🧘‍♂️", name: "Combo Master", desc: "Reach the maximum ×2.5 combo.", check: (s) => s.bestCombo >= 2.5 },
  { id: "dozen", icon: "🧘‍♀️", name: "Warm Pantry", desc: "Bake 1,000 spreads total.", check: (s) => s.totalCookies >= 1000 },
  { id: "cookie-mogul", icon: "🤸‍♂️", name: "Spread Mogul", desc: "Bake 100,000 spreads total.", check: (s) => s.totalCookies >= 100000 },
  { id: "sweet-empire", icon: "🧘", name: "Spread Empire", desc: "Bake 10 million spreads total.", check: (s) => s.totalCookies >= 10000000 },
  { id: "spread-billionaire", icon: "🤸‍♀️", name: "Spread Billionaire", desc: "Bake 1 billion spreads total.", check: (s) => s.totalCookies >= 1000000000 },
  { id: "spread-trillionaire", icon: "🤸", name: "Spread Trillionaire", desc: "Bake 1 trillion spreads total.", check: (s) => s.totalCookies >= 1000000000000 },
  { id: "big-bakery", icon: "🧘‍♂️", name: "Busy Bakery", desc: "Own 25 helpers & shops.", check: (s) => getBuildingCount(s) >= 25 },
  { id: "spread-collector", icon: "🤸‍♂️", name: "Shop Collector", desc: "Own 50 helpers & shops.", check: (s) => getBuildingCount(s) >= 50 },
  { id: "metropolis", icon: "🤸‍♀️", name: "Spread Metropolis", desc: "Own 150 helpers & shops.", check: (s) => getBuildingCount(s) >= 150 },
  { id: "golden-spotter", icon: "🧘‍♀️", name: "Golden Eye", desc: "Catch your first Golden Jar.", check: (s) => s.goldenJarsCaught >= 1 },
  { id: "golden-hunter", icon: "🤸", name: "Golden Hunter", desc: "Catch 10 Golden Jars.", check: (s) => s.goldenJarsCaught >= 10 },
  { id: "flavor-artisan", icon: "🧘", name: "Flavor Artisan", desc: "Unlock 4 Kitchen Flavors.", check: (s) => s.unlockedFlavors.length >= 4 },
  { id: "fish-friend", icon: "🤸‍♂️", name: "Aquarium Friend", desc: "Collect 10 unique fish.", check: (s) => getFishUniqueCount(s) >= 10 },
  { id: "fish-curator", icon: "🤸‍♀️", name: "Tank Curator", desc: "Collect 50 unique fish.", check: (s) => getFishUniqueCount(s) >= 50 },
  { id: "fish-encyclopedia", icon: "🧘‍♂️", name: "Master Collector", desc: "Collect all 200 standard fish.", check: (s) => getFishUniqueCount(s) >= 200 },
  { id: "first-rebirth", icon: "🤸", name: "Fresh Batch", desc: "Complete your first Rebirth.", check: (s) => s.rebirthCount >= 1 },
  { id: "oliva-chosen", icon: "🧘‍♀️", name: "Chosen by Oliva", desc: "Discover the secret fish Oliva.", check: (s) => Boolean(s.fishCollection[SECRET_FISH.id]) },
  { id: "order-runner", icon: "🤸‍♂️", name: "Order Runner", desc: "Complete 5 Bakery Orders.", check: (s) => s.ordersCompleted >= 5 },
  { id: "order-legend", icon: "🤸‍♀️", name: "Master Baker", desc: "Complete 25 Bakery Orders.", check: (s) => s.ordersCompleted >= 25 },
  { id: "fish-level-master", icon: "🧘", name: "Fish Trainer", desc: "Reach level 10 on any swimmer.", check: (s) => Object.values(s.fishLevels).some((lvl) => lvl >= 10) },
  { id: "habitat-architect", icon: "🤸", name: "Reef Architect", desc: "Build all 6 aquarium habitats.", check: (s) => FISH_HABITATS.every((h) => Boolean(s.fishHabitats[h.id])) },
  { id: "flavor-connoisseur", icon: "🧘‍♂️", name: "Flavor Connoisseur", desc: "Unlock all 10 Kitchen Flavors.", check: (s) => s.unlockedFlavors.length >= FLAVORS.length },
  { id: "rebirth-veteran", icon: "🤸‍♂️", name: "Rebirth Veteran", desc: "Complete 10 Rebirths.", check: (s) => s.rebirthCount >= 10 },
  { id: "rebirth-immortal", icon: "🤸‍♀️", name: "Immortal Baker", desc: "Complete 100 Rebirths.", check: (s) => s.rebirthCount >= 100 },
  { id: "split-180", icon: "🤸‍♂️", name: "180° Full Flex", desc: "Reach a 180° full split on the flex gauge.", check: (s) => getSplitAngleInfo(s).angle >= 180 },
  { id: "wheel-winner", icon: "🧘‍♀️", name: "Wheel Spinner", desc: "Spin the Prize Wheel 5 times.", check: (s) => (s.totalWheelSpins || 0) >= 5 },
  { id: "pnf-master", icon: "🤸", name: "Deep Split Hold", desc: "Complete 3 Deep Split Holds.", check: (s) => (s.pnfHoldsCompleted || 0) >= 3 }
];

const HEADLINES = [
  { min: 0, text: "Warm sourdough, swirling spatulas & refilling jars at The Little Spreadery. 🤸‍♂️" },
  { min: 50, text: "Neighbors line up outside The Little Spreadery for fresh hazelnut toast swirls. 🤸‍♀️" },
  { min: 500, text: "Spread Grandmas invent a zero-spill spatula flip — mid-cartwheel! 🤸" },
  { min: 2500, text: "Morning toast aroma draws crowds from three bakeries over to your tasting bar. 🍯 🧘‍♂️" },
  { min: 5000, text: "Nut Farms plant three new orchards to keep your copper kettles bubbling. 🥐 🧘‍♂️" },
  { min: 25000, text: "Spreadery tasting flights sell out in minutes as caramel batches simmer all afternoon. 🤸‍♀️" },
  { min: 50000, text: "Food critics award The Little Spreadery five golden spoons and a 10/10 floor flip. 🧘‍♀️" },
  { min: 500000, text: "Your Little Spreadery now ships warm artisan glass jars to six continents. 🤸‍♂️" },
  { min: 5000000, text: "Bakers celebrate National Spreadery Day with synchronized whisk routines. 🤸 🧘‍♀️" },
  { min: 100000000, text: "Space stations request emergency shipments of your Cosmic Honey spreadery jars. 🧘" }
];

const MILESTONES = [
  { title: "Swirl 100 clicks 🤸‍♂️", target: 100, unit: "clicks", value: () => state.totalClicks },
  { title: "Swirl 500 clicks 🤸‍♀️", target: 500, unit: "clicks", value: () => state.totalClicks },
  { title: "Swirl 1,000 clicks 🤸", target: 1000, unit: "clicks", value: () => state.totalClicks },
  { title: "Jar 1,000 warm spreads 🧘‍♂️", target: 1000, unit: "spreads", value: () => state.totalCookies },
  { title: "Swirl 5,000 clicks 🤸‍♂️", target: 5000, unit: "clicks", value: () => state.totalClicks },
  { title: "Bake 1M spreadery jars 🧘‍♀️", target: 1000000, unit: "spreads", value: () => state.totalCookies },
  { title: "Hire 25 bakery helpers 🤸‍♀️", target: 25, unit: "helpers", value: () => getBuildingCount() },
  { title: "Collect 10 tank fish 🤸", target: 10, unit: "fish", value: () => getFishUniqueCount() },
  { title: "Bake 1B spreadery jars 🧘", target: 1000000000, unit: "spreads", value: () => state.totalCookies },
  { title: "Hire 100 bakery helpers 🤸‍♂️", target: 100, unit: "helpers", value: () => getBuildingCount() },
  { title: "Collect 50 tank fish 🧘‍♂️", target: 50, unit: "fish", value: () => getFishUniqueCount() },
  { title: "Collect all 200 fish 🤸‍♀️", target: 200, unit: "fish", value: () => getFishUniqueCount() }
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
  { id: "espresso", label: "☕ Espresso", className: "theme-espresso" },
  { id: "matcha", label: "🍵 Matcha", className: "theme-matcha" }
];

const REBIRTH_UPGRADES = [
  { id: "star-touched-click", name: "Star-Touched Spoon 🤸‍♂️", icon: "🤸‍♂️", unlockAt: 1, cost: 1, clickMultiplier: 1.1, productionMultiplier: 1, desc: "+10% click power." },
  { id: "steady-star-bakery", name: "Steady Star Bakery 🤸‍♀️", icon: "🤸‍♀️", unlockAt: 3, cost: 2, clickMultiplier: 1, productionMultiplier: 1.1, desc: "+10% helper production." },
  { id: "orbiting-fingertips", name: "Orbiting Fingertips 🤸", icon: "🤸", unlockAt: 5, cost: 3, clickMultiplier: 1.15, productionMultiplier: 1, desc: "+15% click power." },
  { id: "nova-ovens", name: "Nova Ovens 🧘‍♂️", icon: "🧘‍♂️", unlockAt: 10, cost: 5, clickMultiplier: 1, productionMultiplier: 1.15, desc: "+15% helper production." },
  { id: "starlight-synergy", name: "Starlight Synergy 🧘‍♀️", icon: "🧘‍♀️", unlockAt: 25, cost: 10, clickMultiplier: 1.2, productionMultiplier: 1.2, desc: "+20% click power and production." },
  { id: "galactic-recipe", name: "Galactic Recipe 🧘", icon: "🧘", unlockAt: 50, cost: 20, clickMultiplier: 1.25, productionMultiplier: 1.25, desc: "+25% click power and production." },
  { id: "rebirth-mastery", name: "Rebirth Mastery 🤸‍♂️", icon: "🤸‍♂️", unlockAt: 100, cost: 30, clickMultiplier: 1.35, productionMultiplier: 1.35, desc: "+35% click power and production." }
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
    beatModeEnabled: false,
    wheelSpins: 0,
    wheelRotation: 0,
    totalWheelSpins: 0,
    dailyStreak: 0,
    dailyClaimDate: "",
    highestSplitRank: 0,
    pnfHoldsCompleted: 0,
    updateVersion: UPDATE_RESET_VERSION,
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
  ["rebirthCount", "rebirthPoints", "goldenJarsCaught", "freeFishRollTokens", "ordersCompleted", "wheelSpins", "totalWheelSpins", "dailyStreak", "highestSplitRank", "pnfHoldsCompleted"].forEach((key) => {
    if (!Number.isSafeInteger(s[key]) || s[key] < 0) s[key] = defaults[key];
  });
  s.dailyStreak = Math.min(7, s.dailyStreak);
  s.beatModeEnabled = Boolean(s.beatModeEnabled);
  if (!Number.isFinite(s.wheelRotation)) s.wheelRotation = 0;
  if (typeof s.dailyClaimDate !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(s.dailyClaimDate)) s.dailyClaimDate = "";
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
  s.updateVersion = UPDATE_RESET_VERSION;
  return s;
}

let sessionWipedForUpdate = false;

function loadGame() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return createDefaultState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || parsed.updateVersion !== UPDATE_RESET_VERSION) {
      localStorage.removeItem(SAVE_KEY);
      sessionWipedForUpdate = true;
      return createDefaultState();
    }
    return sanitizeStateObject(parsed);
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
let lastTrailSparkAt = 0;
let splitSurgeEndTime = 0;
let splitHoldActive = false;
let splitHoldCharge = 0;
let isWheelSpinning = false;
let lastBeatIndex = -1;
let beatHitTimeout = null;
let temporaryLegSpreadBoost = 0;
let lastMilestoneIndex = -1;
let jarPulseTimeout = null;
const heldActivationKeys = new Set();
let enterClickConsumed = false;
let spaceClickConsumed = false;
let clickAuditTimestamps = [];
let clickAuditHead = 0;

function recordAndCheckAutoclicker(perfNow = performance.now()) {
  clickAuditTimestamps.push(perfNow);
  const cutoff = perfNow - 1000;
  while (clickAuditHead < clickAuditTimestamps.length && clickAuditTimestamps[clickAuditHead] < cutoff) {
    clickAuditHead++;
  }
  const activeCount = clickAuditTimestamps.length - clickAuditHead;
  if (clickAuditHead > 1024) {
    clickAuditTimestamps = clickAuditTimestamps.slice(clickAuditHead);
    clickAuditHead = 0;
  }
  if (activeCount > AUTOCLICKER_CPS_LIMIT) {
    clickAuditTimestamps = [];
    clickAuditHead = 0;
    heldActivationKeys.clear();
    enterClickConsumed = false;
    spaceClickConsumed = false;
    resetAllProgress(false);
    triggerShockwave(true);
    playTone(460, 110, 0.36, 0.12, "sawtooth");
    showToast(`🚨 Autoclicker detected (${activeCount} clicks/sec > ${AUTOCLICKER_CPS_LIMIT})! Progress reset!`);
    return true;
  }
  return false;
}

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
  toggleBeatBtn: document.getElementById("toggle-beat-btn"),
  soundButton: document.getElementById("toggle-sfx-btn"),
  voiceButton: document.getElementById("toggle-voice-btn"),
  resetButton: document.getElementById("reset-btn"),
  splitRankLabel: document.getElementById("split-rank-label"),
  splitArcFill: document.getElementById("split-arc-fill"),
  splitLegLeft: document.getElementById("split-leg-left"),
  splitLegRight: document.getElementById("split-leg-right"),
  splitAngleValue: document.getElementById("split-angle-value"),
  splitAngleSub: document.getElementById("split-angle-sub"),
  beatRing: document.getElementById("beat-ring"),
  splitHoldBtn: document.getElementById("split-hold-btn"),
  splitHoldLabel: document.getElementById("split-hold-label"),
  splitHoldPct: document.getElementById("split-hold-pct"),
  splitHoldFill: document.getElementById("split-hold-fill"),
  wheelSpinsBadge: document.getElementById("wheel-spins-badge"),
  dailyStreakLabel: document.getElementById("daily-streak-label"),
  dailyClaimBtn: document.getElementById("daily-claim-btn"),
  dailyStreakDays: document.getElementById("daily-streak-days"),
  dailyStreakStatus: document.getElementById("daily-streak-status"),
  prizeWheel: document.getElementById("prize-wheel"),
  spinWheelBtn: document.getElementById("spin-wheel-btn"),
  wheelResultStatus: document.getElementById("wheel-result-status"),
  buyAllUpgradesBtn: document.getElementById("buy-all-upgrades-btn"),
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
  adminGrantSpins: document.getElementById("admin-grant-spins"),
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
  return Math.min(Number.MAX_VALUE, Math.floor(building.cost * Math.pow(1.20, owned)));
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
  return state.rebirthCount === 0 ? 2 : Math.min(120, state.rebirthCount * 12);
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
  return Math.min(MAX_SPREAD_GRANT, Math.floor(upgrade.cost * Math.pow(3.15, level)));
}

function getFishRollCost() {
  return Math.min(MAX_SPREAD_GRANT, Math.max(150, Math.floor(state.totalCookies * 0.0015)));
}

function getFishBatchCost() {
  return Math.min(Number.MAX_VALUE, getFishRollCost() * FISH_BATCH_ROLL_COUNT);
}

function getFishDuplicateSaleValue(character) {
  const tierIndex = getFishTierIndex(character);
  return Math.min(MAX_SPREAD_GRANT, Math.floor(getFishRollCost() * FISH_TIER_SELL_MULTIPLIERS[tierIndex]));
}

function getFishLuckUpgradeCost() {
  return Math.min(MAX_SPREAD_GRANT, Math.max(1500, Math.floor(state.totalCookies * 0.000015)) * Math.pow(6, state.fishLuckLevel));
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
  const splitSurge = Date.now() < splitSurgeEndTime ? 1.5 : 1;
  const flavor = getActiveFlavor();
  return building.cps
    * getBuildingMultiplier(building.id)
    * frenzyMultiplier
    * boost
    * splitSurge
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
  const splitSurge = Date.now() < splitSurgeEndTime ? 1.5 : 1;
  return Math.max(1, Math.floor(Math.min(
    1e100,
    baseClick
    * multiplier
    * cursor.multiplier
    * frenzyMultiplier
    * clickFrenzyMultiplier
    * boost
    * splitSurge
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
  if (window.Spread3D) window.Spread3D.setTheme(theme.id);
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
  const label = mult >= 2.5 ? "FEVER!" : mult >= 2.0 ? "On Fire" : mult >= 1.5 ? "Sizzling" : mult > 1 ? "Warm" : "Ready";
  els.comboBadge.textContent = `×${mult.toFixed(mult % 1 === 0 ? 1 : 2)} · ${label}`;
  els.comboFill.style.width = `${Math.min(100, Math.max(0, comboCharge))}%`;
  els.comboMeter.classList.toggle("hot", mult >= 2.0);
  if (mult > state.bestCombo) {
    state.bestCombo = mult;
    checkAchievements();
  }
}

function updateMilestone(celebrate = true) {
  const idx = MILESTONES.findIndex((item) => item.value() < item.target);
  const currentIndex = idx < 0 ? MILESTONES.length : idx;
  if (celebrate && lastMilestoneIndex >= 0 && currentIndex > lastMilestoneIndex) {
    const tracker = els.milestoneBar ? els.milestoneBar.closest(".milestone-tracker") : null;
    if (tracker) {
      tracker.classList.remove("milestone-celebrate");
      void tracker.offsetWidth;
      tracker.classList.add("milestone-celebrate");
    }
    spawnMiniBurstAtElement(els.milestoneBar, 18);
    launchConfetti(28);
    playChime([523.25, 659.25, 783.99]);
    showToast(`🏅 Milestone complete! Next spreadery goal unlocked! 🤸‍♂️`);
  }
  lastMilestoneIndex = currentIndex;

  const milestone = idx >= 0 ? MILESTONES[idx] : null;
  if (!milestone) {
    els.milestoneTitle.textContent = "Every milestone reached! 🤸‍♂️";
    els.milestoneProgress.textContent = "You're a spreadery legend. 🍯";
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

const SPLIT_RANKS = [
  { minAngle: 45, label: "Warm-Up Straddle 🤸‍♂️", hint: "Keep spreading toward 180°! 🤸‍♀️" },
  { minAngle: 75, label: "Seated V-Stretch 🧘‍♂️", hint: "Loosening up nicely — keep clicking! 🤸" },
  { minAngle: 105, label: "Wide Straddle (105°) 🤸‍♀️", hint: "Past a right angle! Headed for flat splits." },
  { minAngle: 135, label: "Deep Middle Split 🧘‍♀️", hint: "Awesome form — mat contact is getting close! 🤸‍♂️" },
  { minAngle: 160, label: "Near-Floor Split 🤸", hint: "Only inches above the mat! 🧘" },
  { minAngle: 180, label: "180° Full Splits! 🤸‍♂️", hint: "Flat 180° splits unlocked — reach for oversplit! 🤸‍♀️" },
  { minAngle: 195, label: "195° Oversplit! 🤸‍♀️", hint: "World-champion flexibility achieved! 🤸‍♂️ 🧘‍♂️" }
];

function getSplitAngleInfo(game = state) {
  const total = Math.max(0, game.totalCookies || 0);
  const clicks = Math.max(0, game.totalClicks || 0);
  const rebirths = Math.max(0, game.rebirthCount || 0);
  const pnf = Math.max(0, game.pnfHoldsCompleted || 0);
  const score = Math.log10(1 + total) * 9.5 + rebirths * 4 + pnf * 1.2 + Math.min(20, clicks * 0.012);
  const angle = Math.min(210, 45 + score);
  let rankIndex = 0;
  SPLIT_RANKS.forEach((rank, idx) => {
    if (angle >= rank.minAngle) rankIndex = idx;
  });
  return {
    angle,
    rankIndex,
    rank: SPLIT_RANKS[rankIndex],
    pct: Math.min(100, Math.max(0, ((angle - 45) / 165) * 100))
  };
}

function updateSplitGauge(announceRankUp = true) {
  if (!els.splitAngleValue || !els.splitArcFill) return;
  const info = getSplitAngleInfo();
  els.splitAngleValue.textContent = `${info.angle.toFixed(1)}°`;
  els.splitRankLabel.textContent = info.rank.label;
  els.splitAngleSub.textContent = info.rank.hint;
  els.splitArcFill.style.strokeDashoffset = (100 - info.pct).toFixed(2);
  els.splitArcFill.style.stroke = info.angle >= 180 ? "#d97706" : "var(--caramel)";
  const gaugeCard = els.splitAngleValue.closest(".split-gauge-card");
  if (gaugeCard) gaugeCard.classList.toggle("full-flex", info.angle >= 180);

  if (els.splitLegLeft && els.splitLegRight) {
    const visualAngle = Math.min(208, info.angle + temporaryLegSpreadBoost);
    const halfRad = (visualAngle / 2) * (Math.PI / 180);
    const legLen = 22;
    const dx = Math.sin(halfRad) * legLen;
    const dy = Math.cos(halfRad) * legLen;
    els.splitLegLeft.setAttribute("x2", (60 - dx).toFixed(1));
    els.splitLegLeft.setAttribute("y2", (44 + dy).toFixed(1));
    els.splitLegRight.setAttribute("x2", (60 + dx).toFixed(1));
    els.splitLegRight.setAttribute("y2", (44 + dy).toFixed(1));
    const legColor = info.angle >= 180 ? "#d97706" : "var(--caramel)";
    els.splitLegLeft.style.stroke = legColor;
    els.splitLegRight.style.stroke = legColor;
  }

  if (announceRankUp && info.rankIndex > state.highestSplitRank) {
    state.highestSplitRank = info.rankIndex;
    showToast(`🤸‍♂️ Flex milestone unlocked: ${info.rank.label}!`);
    playChime([523.25, 659.25, 783.99, 1046.5]);
    launchConfetti(32);
    launchFireworks(2);
  }
}

function syncBeatUI() {
  const on = Boolean(state.beatModeEnabled);
  if (els.toggleBeatBtn) {
    els.toggleBeatBtn.setAttribute("aria-pressed", String(on));
    els.toggleBeatBtn.textContent = on ? "🎵 Beat on" : "🎵 Beat off";
  }
  if (els.beatRing) {
    els.beatRing.classList.toggle("active", on);
  }
}

function updateSplitHoldUI() {
  if (!els.splitHoldBtn || !els.splitHoldFill || !els.splitHoldLabel || !els.splitHoldPct) return;
  const surgeLeft = Math.max(0, Math.ceil((splitSurgeEndTime - Date.now()) / 1000));
  els.splitHoldBtn.classList.toggle("holding", splitHoldActive);
  els.splitHoldBtn.classList.toggle("surging", surgeLeft > 0);
  els.splitHoldFill.style.width = `${Math.min(100, Math.max(0, splitHoldCharge)).toFixed(1)}%`;
  if (splitHoldActive) {
    els.splitHoldLabel.textContent = "🧘‍♂️ Holding Deep Split...";
    els.splitHoldPct.textContent = `${Math.floor(splitHoldCharge)}%`;
  } else if (surgeLeft > 0) {
    els.splitHoldLabel.textContent = "🤸‍♀️ Split Surge Active (+50% Power)";
    els.splitHoldPct.textContent = `${surgeLeft}s`;
  } else {
    els.splitHoldLabel.textContent = "🤸‍♂️ Hold Deep Split (3.0s · +50% Power)";
    els.splitHoldPct.textContent = "Ready";
  }
}

function startSplitHold() {
  if (splitHoldActive) return;
  splitHoldActive = true;
  updateSplitHoldUI();
}

function stopSplitHold() {
  if (!splitHoldActive) return;
  splitHoldActive = false;
  updateSplitHoldUI();
}

function completeSplitHold() {
  splitHoldActive = false;
  splitHoldCharge = 0;
  splitSurgeEndTime = Date.now() + 20000;
  state.pnfHoldsCompleted = (state.pnfHoldsCompleted || 0) + 1;
  const holdReward = Math.min(MAX_SPREAD_GRANT, Math.max(150, Math.floor(getCookiesPerClick() * 18 + getCookiesPerSecond() * 8)));
  state.cookies = Math.min(Number.MAX_VALUE, state.cookies + holdReward);
  state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + holdReward);
  temporaryLegSpreadBoost = 16;
  playChime([523.25, 659.25, 783.99, 1046.5]);
  launchConfetti(34);
  launchFireworks(2);
  spawnMiniBurstAtElement(els.splitHoldBtn, 22);
  showToast(`🤸‍♂️ Deep Split Hold complete! +${formatNumber(holdReward)} spreads & +50% Power (20s)!`);
  updateSplitHoldUI();
  updateSplitGauge();
  checkAchievements();
  updateMilestone();
  updateShopAffordability();
  saveGame();
}

const DAILY_STREAK_REWARDS = [
  { day: 1, icon: "🤸‍♂️", label: "1 Spin", desc: "+1 Prize Spin & 1K spreads", grant: (game) => { game.wheelSpins += 1; return 1000; } },
  { day: 2, icon: "🤸‍♀️", label: "1 Spin+", desc: "+1 Prize Spin & 2.5K spreads", grant: (game) => { game.wheelSpins += 1; return 2500; } },
  { day: 3, icon: "🧘‍♂️", label: "1 Token", desc: "+1 Tank Token & 5K spreads", grant: (game) => { game.freeFishRollTokens += 1; return 5000; } },
  { day: 4, icon: "🤸", label: "2 Spins", desc: "+2 Prize Spins & 15K spreads", grant: (game) => { game.wheelSpins += 2; return 15000; } },
  { day: 5, icon: "🧘‍♀️", label: "2 Tokens", desc: "+2 Tank Tokens & 35K spreads", grant: (game) => { game.freeFishRollTokens += 2; return 35000; } },
  { day: 6, icon: "🧘", label: "2 Spins+", desc: "+2 Prize Spins & 75K spreads", grant: (game) => { game.wheelSpins += 2; return 75000; } },
  { day: 7, icon: "🤸‍♂️", label: "JACKPOT · 5× + 3 Spins", desc: "5× Frenzy + 3 Spins + 2 Tokens!", grant: (game) => { game.wheelSpins += 3; game.freeFishRollTokens += 2; startSugarFrenzy(20000); return 150000; } }
];

function daysBetweenDateKeys(prevKey, currKey) {
  if (!prevKey || !currKey) return Infinity;
  const [py, pm, pd] = prevKey.split("-").map(Number);
  const [cy, cm, cd] = currKey.split("-").map(Number);
  const prevUtc = Date.UTC(py, pm - 1, pd);
  const currUtc = Date.UTC(cy, cm - 1, cd);
  return Math.round((currUtc - prevUtc) / 86400000);
}

function renderDailyCheckIn() {
  if (!els.dailyStreakDays || !els.dailyClaimBtn || !els.dailyStreakStatus) return;
  const todayKey = getLocalDateKey();
  const alreadyClaimedToday = state.dailyClaimDate === todayKey;
  const dayGap = daysBetweenDateKeys(state.dailyClaimDate, todayKey);
  const effectiveStreak = !state.dailyClaimDate
    ? 0
    : alreadyClaimedToday
      ? state.dailyStreak
      : dayGap === 1
        ? (state.dailyStreak >= 7 ? 0 : state.dailyStreak)
        : 0;
  const activeDayNumber = alreadyClaimedToday ? effectiveStreak : effectiveStreak + 1;

  els.dailyStreakDays.replaceChildren();
  DAILY_STREAK_REWARDS.forEach((reward) => {
    const tile = document.createElement("div");
    const isClaimed = reward.day <= effectiveStreak;
    const isCurrent = !alreadyClaimedToday && reward.day === activeDayNumber;
    const isJackpot = reward.day === 7;
    tile.className = `streak-day-tile${isClaimed ? " claimed" : ""}${isCurrent ? " current" : ""}${isJackpot ? " jackpot" : ""}`;
    tile.title = `Day ${reward.day}: ${reward.desc}`;

    const icon = document.createElement("span");
    icon.className = "streak-day-icon";
    icon.textContent = reward.icon;

    const num = document.createElement("span");
    num.className = "streak-day-num";
    num.textContent = isClaimed ? `✓ Day ${reward.day}` : `Day ${reward.day}`;

    const label = document.createElement("span");
    label.className = "streak-day-reward";
    label.textContent = reward.label;

    tile.append(icon, num, label);
    els.dailyStreakDays.appendChild(tile);
  });

  els.dailyStreakLabel.textContent = `7-Day Spread Streak (${effectiveStreak}/7) 🤸‍♀️`;
  els.dailyClaimBtn.disabled = alreadyClaimedToday;
  els.dailyClaimBtn.textContent = alreadyClaimedToday ? "✓ Checked In Today 🤸" : `🎁 Claim Day ${activeDayNumber} 🤸‍♂️`;
  els.dailyStreakStatus.textContent = alreadyClaimedToday
    ? `Day ${state.dailyStreak} checked in at the spreadery counter! Come back tomorrow for Day ${state.dailyStreak >= 7 ? 1 : state.dailyStreak + 1} 🤸‍♀️.`
    : `Ready to claim Day ${activeDayNumber}: ${DAILY_STREAK_REWARDS[activeDayNumber - 1].desc}`;
}

function claimDailyCheckIn() {
  const todayKey = getLocalDateKey();
  if (state.dailyClaimDate === todayKey) return;
  const dayGap = daysBetweenDateKeys(state.dailyClaimDate, todayKey);
  const nextStreak = state.dailyClaimDate && dayGap === 1 && state.dailyStreak < 7 ? state.dailyStreak + 1 : 1;
  const rewardDef = DAILY_STREAK_REWARDS[nextStreak - 1];
  const baseGain = rewardDef.grant(state);
  const scaledGain = Math.min(MAX_SPREAD_GRANT, Math.max(baseGain, Math.floor(getCookiesPerSecond() * 40 + getCookiesPerClick() * 30)));
  state.cookies = Math.min(Number.MAX_VALUE, state.cookies + scaledGain);
  state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + scaledGain);
  state.dailyStreak = nextStreak;
  state.dailyClaimDate = todayKey;

  playChime([523.25, 659.25, 783.99, 1046.5]);
  launchConfetti(42);
  launchFireworks(2);
  launchSpreadRain(20);
  spawnMiniBurstAtElement(els.dailyClaimBtn, 22);
  showToast(`🤸‍♂️ Day ${nextStreak} Pantry Check-In claimed! ${rewardDef.desc} (+${formatNumber(scaledGain)} spreads)`);
  refreshAfterAdminChange();
}

const WHEEL_PRIZES = [
  { icon: "🤸‍♂️", label: "2× Burst", run: () => {
    const gain = Math.min(MAX_SPREAD_GRANT, Math.max(1000, Math.floor(getCookiesPerSecond() * 45 + getCookiesPerClick() * 60)));
    state.cookies = Math.min(Number.MAX_VALUE, state.cookies + gain);
    state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + gain);
    return `🤸‍♂️ Spread Burst! +${formatNumber(gain)} spreads!`;
  }},
  { icon: "🏅", label: "5× Frenzy (20s)", run: () => {
    startSugarFrenzy(20000);
    return "🏅 5× Sugar Frenzy active for 20s!";
  }},
  { icon: "🎟️", label: "+2 Roll Tokens", run: () => {
    state.freeFishRollTokens += 2;
    return "🎟️ +2 Free Aquarium Roll Tokens! 🤸‍♀️";
  }},
  { icon: "🌟", label: "Golden Rain", run: () => {
    spawnGoldenJarRain(5);
    return "🌟 Golden Jar Rain (5 Golden Jars launched)! 🤸";
  }},
  { icon: "🤸‍♀️", label: "5× Click Frenzy (25s)", run: () => {
    clickFrenzyMultiplier = 5;
    clickFrenzyEndTime = Date.now() + 25000;
    return "🤸‍♀️ 5× Click Frenzy active for 25s!";
  }},
  { icon: "🧘‍♂️", label: "+2 Bonus Spins", run: () => {
    state.wheelSpins += 2;
    return "🧘‍♂️ Jackpot Respin! +2 Free Prize Wheel Spins!";
  }},
  { icon: "💥", label: "100× Click Surge", run: () => {
    const gain = Math.min(MAX_SPREAD_GRANT, Math.max(2000, getCookiesPerClick() * 100));
    state.cookies = Math.min(Number.MAX_VALUE, state.cookies + gain);
    state.totalCookies = Math.min(Number.MAX_VALUE, state.totalCookies + gain);
    return `💥 100× Click Surge! +${formatNumber(gain)} spreads! 🤸‍♂️`;
  }},
  { icon: "🍀", label: "Lucky 5× + Fireworks", run: () => {
    luckyClickArmed = true;
    els.adminLuckyClick.setAttribute("aria-pressed", "true");
    els.adminLuckyClick.textContent = "🍀 Lucky click armed!";
    launchFireworks(5);
    return "🍀 Next click armed for 5× + Fireworks! 🤸‍♀️";
  }}
];

function initPrizeWheel() {
  if (!els.prizeWheel) return;
  els.prizeWheel.replaceChildren();
  WHEEL_PRIZES.forEach((prize, i) => {
    const iconEl = document.createElement("span");
    iconEl.className = "wheel-wedge-icon";
    iconEl.textContent = prize.icon;
    iconEl.title = prize.label;
    iconEl.style.setProperty("--wedge-angle", `${i * 45 + 22.5}deg`);
    els.prizeWheel.appendChild(iconEl);
  });
  els.prizeWheel.style.transform = `rotate(${state.wheelRotation || 0}deg)`;
}

function updateWheelUI() {
  if (!els.wheelSpinsBadge || !els.spinWheelBtn) return;
  const spins = state.wheelSpins || 0;
  els.wheelSpinsBadge.textContent = `${spins.toLocaleString()} spin${spins === 1 ? "" : "s"} ready`;
  els.spinWheelBtn.disabled = isWheelSpinning || spins <= 0;
  els.spinWheelBtn.textContent = isWheelSpinning ? "..." : "SPIN";
}

function spinPrizeWheel() {
  if (isWheelSpinning || (state.wheelSpins || 0) <= 0 || !els.prizeWheel) return;
  isWheelSpinning = true;
  state.wheelSpins--;
  state.totalWheelSpins = (state.totalWheelSpins || 0) + 1;
  updateWheelUI();
  els.wheelResultStatus.textContent = "Spinning the Spreadery Prize Wheel... 🤸‍♂️";
  els.prizeWheel.classList.add("spinning");
  const pointerEl = els.prizeWheel.parentElement ? els.prizeWheel.parentElement.querySelector(".wheel-pointer") : null;
  if (pointerEl) pointerEl.classList.add("ticking");

  const prizeIndex = Math.floor(Math.random() * WHEEL_PRIZES.length);
  const targetMod = (360 - (prizeIndex * 45 + 22.5 + (Math.random() - 0.5) * 26) + 360) % 360;
  const currentMod = ((state.wheelRotation % 360) + 360) % 360;
  const deltaMod = (targetMod - currentMod + 360) % 360;
  state.wheelRotation += 5 * 360 + deltaMod;
  els.prizeWheel.style.transform = `rotate(${state.wheelRotation}deg)`;

  for (let i = 0; i < 16; i++) {
    const delay = Math.floor(Math.pow(i / 16, 1.55) * 3900);
    window.setTimeout(() => playTone(680 - i * 16, 480 - i * 12, 0.035, 0.04, "triangle"), delay);
  }

  window.setTimeout(() => {
    isWheelSpinning = false;
    els.prizeWheel.classList.remove("spinning");
    if (pointerEl) pointerEl.classList.remove("ticking");
    const prize = WHEEL_PRIZES[prizeIndex];
    const msg = prize.run();
    els.wheelResultStatus.textContent = msg;
    playChime([523.25, 659.25, 783.99, 1046.5]);
    launchConfetti(42);
    launchFireworks(3);
    launchSpreadRain(24);
    spawnMiniBurstAtElement(els.prizeWheel, 24);
    showToast(msg);
    refreshAfterAdminChange();
  }, 4250);
}

function buyAllAffordableUpgrades() {
  let boughtCount = 0;
  let totalSpent = 0;

  UPGRADES.forEach((upgrade) => {
    if (!state.upgrades.includes(upgrade.id) && upgrade.req(state) && state.cookies >= upgrade.cost) {
      state.cookies -= upgrade.cost;
      totalSpent += upgrade.cost;
      state.upgrades.push(upgrade.id);
      boughtCount++;
    }
  });

  for (let iter = 0; iter < 50; iter++) {
    let bestUpgrade = null;
    let bestCost = Infinity;
    CLICK_UPGRADES.forEach((upgrade) => {
      if (!upgrade.req(state)) return;
      const level = state.clickUpgradeLevels[upgrade.id] || 0;
      if (!Number.isSafeInteger(level + 1)) return;
      const cost = getClickUpgradeCost(upgrade);
      if (state.cookies >= cost && cost < bestCost) {
        bestCost = cost;
        bestUpgrade = upgrade;
      }
    });
    if (!bestUpgrade) break;
    state.cookies -= bestCost;
    totalSpent += bestCost;
    state.clickUpgradeLevels[bestUpgrade.id] = (state.clickUpgradeLevels[bestUpgrade.id] || 0) + 1;
    boughtCount++;
  }

  if (boughtCount === 0) return;
  playChime([523.25, 659.25, 783.99, 1046.5]);
  launchConfetti(Math.min(48, 12 + boughtCount * 3));
  spawnMiniBurstAtElement(els.upgrades, 22);
  showToast(`✨ Bought ${boughtCount} upgrade${boughtCount === 1 ? "" : "s"} for ${formatNumber(totalSpent)} stretches!`);
  refreshAfterAdminChange();
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
    ? "🌟 All 100 rebirths complete 🤸‍♂️"
    : reward
      ? "🌟 Rebirth · +10% power and 1 Star 🤸‍♂️"
      : `🌟 Rebirth · need ${requiredBuildings} Spreadstergram${requiredBuildings === 1 ? "" : "s"} 🤸‍♂️`;
  els.rebirthStatus.textContent = state.rebirthCount >= MAX_REBIRTHS
    ? "You have reached the 100-rebirth limit. Your permanent rebirth bonus is +1,000% 🤸‍♂️."
    : reward
      ? `You own ${ownedBuildings} Spreadstergram${ownedBuildings === 1 ? "" : "s"}. Rebirth resets current spreads, clicks, shops, upgrades, and cursors, while keeping fish, habitats, flavors, and achievements 🤸‍♀️.`
      : `Own ${requiredBuildings} Spreadstergram${requiredBuildings === 1 ? "" : "s"} to rebirth (${ownedBuildings} owned). Each rebirth grants 1 Golden Star and +10% permanent click and production power 🤸.`;
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
    els.clickHint.innerHTML = 'Click once every 20 hours (or press <kbd>Space</kbd>) to build your <strong>combo multiplier</strong> 🤸‍♂️';
    els.adminToggleCooldown.setAttribute("aria-pressed", "true");
    els.adminToggleCooldown.textContent = "⏱️ Cooldown: 20h (Remove)";
  } else {
    els.clickHint.innerHTML = 'Click fast or press <kbd>Space</kbd> to build your <strong>combo multiplier</strong> 🤸‍♂️';
    els.adminToggleCooldown.setAttribute("aria-pressed", "false");
    els.adminToggleCooldown.textContent = "⏱️ Cooldown: Off (Enable 20h)";
  }
}

function updateClickCooldownUI(currentTime = Date.now()) {
  if (!state.clickCooldownEnabled) {
    els.cookieButton.classList.remove("cooling");
    els.clickCooldownStatus.classList.remove("cooling");
    els.clickCooldownStatus.textContent = "Ready to click 🤸‍♂️";
    return;
  }
  const remainingMs = Math.max(0, CLICK_COOLDOWN_MS - (currentTime - state.lastAcceptedSpreadClickAt));
  const isCooling = remainingMs > 0;
  els.cookieButton.classList.toggle("cooling", isCooling);
  els.clickCooldownStatus.classList.toggle("cooling", isCooling);
  els.clickCooldownStatus.textContent = isCooling
    ? `Next click in ${formatCooldownRemaining(remainingMs)}`
    : "Ready to click 🤸‍♂️";
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
      showToast(`${flavor.icon} New kitchen flavor unlocked: ${flavor.name}!`);
      unlockedAny = true;
    }
  });
  if (unlockedAny) renderFlavors();
}

function renderFlavors() {
  const active = getActiveFlavor();
  els.flavorSummary.textContent = `${active.icon} ${active.name}`;
  els.flavorBonusLabel.textContent = `Active: ${active.bonusLabel}`;
  if (window.Spread3D) window.Spread3D.setFlavor(active.id);
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
      if (window.Spread3D) window.Spread3D.setFlavor(flavor.id);
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
  const palette = ["#ffcf56", "#ff9e5d", "#93aa67", "#e08458", "#d4a45a", "#f4b860"];
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
  const palette = ["#ffd45e", "#ff9568", "#93aa67", "#e6aa42", "#c47d2e"];
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
  const colors = ["#e6aa42", "#c8822e", "#93aa67", "#d97757", "#f2cf7c"];
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
  const glyphs = ["🤸‍♂️", "🤸‍♀️", "🤸", "🧘‍♂️", "🧘‍♀️", "🧘", "✨", "🌟"];
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
  const glyphs = ["🤸‍♂️", "🤸‍♀️", "🤸", "🧘‍♂️", "🧘‍♀️", "🧘", "🤸‍♂️", "🤸‍♀️"];
  for (let i = 0; i < 36; i++) {
    const spark = document.createElement("span");
    spark.className = "ambient-spark";
    spark.textContent = glyphs[i % glyphs.length];
    spark.style.left = `${(i * 2.8 + 2) % 96}%`;
    spark.style.setProperty("--spark-duration", `${6.2 + (i % 6) * 1.35}s`);
    spark.style.setProperty("--spark-delay", `${-(i * 0.42).toFixed(2)}s`);
    spark.style.setProperty("--drift-x", `${((i % 2 === 0 ? 1 : -1) * (14 + (i % 5) * 11))}px`);
    els.ambientSparks.appendChild(spark);
  }
}

function initStageParallax() {
  if (!els.bakeStage || !els.cookieButton) return;
  const trailColors = ["#c8822e", "#e6aa42", "#93aa67", "#d97757", "#7c4418"];
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

    const nowMs = performance.now();
    if (fxCtx && nowMs - lastTrailSparkAt >= 48) {
      lastTrailSparkAt = nowMs;
      const color = trailColors[Math.floor(Math.random() * trailColors.length)];
      fxParticles.push({
        kind: "spark",
        x: event.clientX,
        y: event.clientY,
        prevX: event.clientX,
        prevY: event.clientY,
        vx: (Math.random() - 0.5) * 48,
        vy: -25 - Math.random() * 45,
        size: 1.4 + Math.random() * 1.8,
        color,
        life: 0,
        maxLife: 0.42 + Math.random() * 0.22
      });
    }
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
  const extraGlyphs = ["🤸‍♂️", "🤸‍♀️", "🤸", "🧘‍♂️", "🧘‍♀️", "🧘", "🍯", "🥐"];
  const items = [];
  totalOwnedCursors.slice(0, 6).forEach((c) => items.push(c.icon));
  while (items.length < 6 + buildingOrbiterCount && items.length < 12) {
    items.push(extraGlyphs[items.length % extraGlyphs.length]);
  }
  items.forEach((glyph, idx) => {
    const orb = document.createElement("span");
    orb.className = "orbit-cursor-item";
    orb.textContent = glyph;
    orb.style.setProperty("--orbit-angle", `${(360 / items.length) * idx}deg`);
    orb.style.setProperty("--orbit-i", String(idx));
    els.orbitCursors.appendChild(orb);
  });
}

const ORDER_TEMPLATES = [
  { kind: "clicks", title: "Morning Toast Tray 🥐 🤸‍♂️", label: "manual clicks", base: 15 },
  { kind: "spreads", title: "Warm Jar Crate 🍯 🤸‍♀️", label: "new spreads baked", base: 400 },
  { kind: "helpers", title: "Spreadery Kitchen Shift 🥣 🧘‍♂️", label: "more helpers hired", base: 3 },
  { kind: "golden", title: "Golden Spoon Inspection 🥄 🤸", label: "Golden Jar caught", base: 1 },
  { kind: "fish", title: "Aquarium Tasting Flight 🐠 🧘‍♀️", label: "tank rolls made", base: 3 }
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
  showToast(`📜 Order "${order.title}" delivered! +${formatNumber(spreadReward)} spreads${tokenText}`);
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
  const sparkGlyphs = ["🤸‍♂️", "🤸‍♀️", "🤸", "🧘‍♂️", "🧘‍♀️", "🧘", flavor.icon, "🍯", "✨"];
  const sparkCount = isJackpot || streakBonus ? 18 : 10;
  for (let i = 0; i < sparkCount; i++) {
    const spark = document.createElement("span");
    spark.className = "click-spark";
    spark.textContent = sparkGlyphs[i % sparkGlyphs.length];
    const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
    const distance = (isJackpot || streakBonus ? 78 : 46) + Math.random() * 72;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--px", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--py", `${Math.sin(angle) * distance - 18}px`);
    spark.style.setProperty("--prot", `${Math.round((Math.random() - 0.5) * 320)}deg`);
    spark.style.setProperty("--pscale", `${(0.85 + Math.random() * 0.65).toFixed(2)}`);
    els.clickParticles.appendChild(spark);
    window.setTimeout(() => spark.remove(), 780);
  }

  const spreadPopWords = ["Swirled!", "Velvety!", "Fresh jar!", "Smooth!"];
  const particle = document.createElement("span");
  particle.className = `click-gain${streakBonus || isJackpot ? " click-gain-streak" : ""}`;
  const bonusLabel = streakBonus
    ? ` ${spreadPopWords[Math.floor(Math.random() * spreadPopWords.length)]} 🤸‍♂️`
    : isJackpot
      ? " JACKPOT JAR! 🤸‍♀️"
      : "";
  particle.textContent = `+${formatNumber(amount)}${bonusLabel}`;
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;
  els.clickParticles.appendChild(particle);
  window.setTimeout(() => particle.remove(), 900);
}

function launchConfetti(count = 32) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const colors = ["#c8822e", "#e6aa42", "#6a8b4e", "#d97757", "#7c4418"];
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
  btn.setAttribute("aria-label", "Catch Golden Jar for a bonus");
  btn.textContent = "🤸‍♂️";
  const onLeftSide = Math.random() < 0.5;
  btn.style.left = `${onLeftSide ? 6 + Math.random() * 14 : 76 + Math.random() * 14}%`;
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
      showToast(`🤸‍♂️ Golden Jar burst! +${formatNumber(burst)} spreads!`);
    } else if (roll < 0.85) {
      clickFrenzyMultiplier = 5;
      clickFrenzyEndTime = Date.now() + 12000;
      showToast("⚡ Click Frenzy! 5× click power for 12 seconds! 🤸‍♀️");
    } else {
      state.freeFishRollTokens++;
      showToast("🎟️ Golden Jar bonus! +1 Free Aquarium Roll Token! 🤸");
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
  showToast(`🌧️ Golden Jar Rain! Catch ${count} Golden Jars! 🤸‍♂️`);
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
    swimmer.textContent = fish.id === SECRET_FISH.id ? "👑" : idx % 3 === 0 ? "🤸‍♂️" : idx % 3 === 1 ? "🤸‍♀️" : fish.tier === "Mythic" ? "🐡" : fish.tier === "Legendary" ? "🦈" : fish.tier === "Epic" ? "🐬" : "🐟";
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
  els.fishRollCost.textContent = `Paid roll: ${formatNumber(rollCost)} spreads · Secret Oliva: 1 in 10,000 (0.01%) 🤸‍♂️`;
  els.fishRoll.disabled = state.cookies < rollCost;
  const batchCost = getFishBatchCost();
  els.footer10kRolls.disabled = state.cookies < batchCost;
  els.footer10kRollsLabel.textContent = `Roll the tank ${FISH_BATCH_ROLL_COUNT.toLocaleString()} times · ${formatNumber(batchCost)} spreads 🤸‍♀️`;
  els.fishDailyRoll.disabled = !dailyAvailable;
  els.fishDailyRoll.textContent = dailyAvailable ? "🎁 Claim daily free roll" : "✅ Daily roll claimed";

  els.fishFreeRollBtn.hidden = state.freeFishRollTokens <= 0;
  els.fishFreeTokens.textContent = state.freeFishRollTokens.toLocaleString();

  els.fishLuckStatus.textContent = `Luck level ${state.fishLuckLevel} / 5 · Owning & leveling swimmers boosts spreads per click and production 🤸`;
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
  showToast(`🏆 All 200 swimmers collected! You earned ${formatNumber(reward)} spreads! 🤸‍♂️`);
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
    els.fishStatus.textContent = "That swimmer collection has reached its safe storage limit.";
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
  if (els.fishRoll) {
    els.fishRoll.classList.remove("aquarium-splash");
    void els.fishRoll.offsetWidth;
    els.fishRoll.classList.add("aquarium-splash");
    spawnMiniBurstAtElement(els.fishRoll, 16);
  }

  if (character.id === SECRET_FISH.id) {
    state.cookies = Math.max(state.cookies, OLIVA_REWARD);
    state.totalCookies = Math.max(state.totalCookies, OLIVA_REWARD);
    els.fishStatus.textContent = "✨ SECRET! Oliva appeared! A 1-in-10,000 discovery and a huge spread bonus! 🤸‍♂️";
    launchConfetti(100);
    showToast("✨ Oliva! The secret fish filled your spread jar! 🤸‍♂️");
  } else if (copies) {
    els.fishStatus.textContent = `You rolled ${character.name} (${character.tier}) again. You now own ${copies + 1}. 🤸‍♀️`;
  } else {
    els.fishStatus.textContent = `New fish: ${character.name} · ${character.tier}! 🤸‍♂️`;
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
    els.fishStatus.textContent = `You need ${formatNumber(cost)} spreads for 10,000 aquarium rolls.`;
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
  els.fishStatus.textContent = `${paymentText}: 10,000 rolls · ${newCharacters} new swimmers · ${duplicateRolls} duplicates${olivaRolls ? ` · Oliva x${olivaRolls}` : ""}. 🤸‍♂️`;
  els.fishCollectionDetails.open = true;
  fishCollectionFilter = "all";
  fishSearchQuery = "";
  els.fishSearchInput.value = "";
  refreshAfterAdminChange();
  animateFishLanding(landedCharacter);
  if (olivaRolls > 0) {
    showToast(`✨ Oliva appeared ${olivaRolls} time${olivaRolls === 1 ? "" : "s"} in the batch! 🤸‍♂️`);
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
  els.fishStatus.textContent = `Sold a duplicate ${character.name} for ${formatNumber(payout)} spreads. 🤸‍♀️`;
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
  els.fishStatus.textContent = `Sold ${count.toLocaleString()} duplicate swimmers for ${formatNumber(totalPayout)} spreads! 🤸‍♂️`;
  showToast(`🐠 Sold ${count.toLocaleString()} duplicates for +${formatNumber(totalPayout)} spreads! 🤸‍♀️`);
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
  els.fishStatus.textContent = `${character.name} reached level ${level + 1}! Your click and production bonuses increased. 🤸`;
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
  els.fishStatus.textContent = `Leveled up ${upgraded} swimmers! Your aquarium bonuses surged! 🤸‍♂️`;
  showToast(`⬆ Leveled up ${upgraded} swimmers! 🤸‍♀️`);
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
    message.textContent = "Click or collect a little more to unlock your first upgrade. 🤸‍♂️";
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
    button.title = `${building.desc}\nProducing: ${formatRate(tierTotalCps)}/sec (${sharePct}% of total)`;
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
  els.fishStatus.textContent = `${habitat.name} built! Aquarium click & production boost increased by ${Math.round(habitat.bonus * 100)}%. 🤸‍♂️`;
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
  let hasAffordableUpgrade = false;
  els.upgrades.querySelectorAll(".upgrade-btn").forEach((button) => {
    const cost = Number(button.dataset.cost);
    const canAfford = state.cookies >= cost;
    if (canAfford) hasAffordableUpgrade = true;
    button.classList.toggle("affordable", canAfford);
    button.classList.toggle("locked", !canAfford);
  });
  if (els.buyAllUpgradesBtn) {
    els.buyAllUpgradesBtn.disabled = !hasAffordableUpgrade;
  }
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
    els.achievementDetail.textContent = "Select any achievement tile to inspect its requirement. 🤸‍♂️";
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
      showToast(`${achievement.icon} ${achievement.name} unlocked! (+2% permanent power)`);
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
  showToast(`✨ ${upgrade.name} unlocked! 🤸‍♂️`);
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
  showToast(`${upgrade.icon} ${upgrade.name} leveled to ${level + 1}!`);
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
  showToast(`🏅 Sugar frenzy! 5× production for ${Math.ceil(duration / 1000)} seconds! 🤸‍♂️`);
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
    whiteoutScreen: state.whiteoutScreen,
    beatModeEnabled: state.beatModeEnabled,
    wheelSpins: state.wheelSpins,
    totalWheelSpins: state.totalWheelSpins,
    wheelRotation: state.wheelRotation,
    dailyStreak: state.dailyStreak,
    dailyClaimDate: state.dailyClaimDate,
    pnfHoldsCompleted: state.pnfHoldsCompleted
  };
  if (!Number.isSafeInteger(retainedProgress.rebirthCount) || !Number.isSafeInteger(retainedProgress.rebirthPoints)) {
    showToast("Golden Stars have reached their safe storage limit.");
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
  splitSurgeEndTime = 0;
  splitHoldActive = false;
  splitHoldCharge = 0;
  comboCharge = 0;
  luckyClickArmed = false;
  document.body.classList.remove("disco-mode", "dance-mode", "spin-mode", "rainbow-mode");
  els.adminLuckyClick.setAttribute("aria-pressed", "false");
  els.adminLuckyClick.textContent = "🍀 Arm a 5× lucky click";
  els.adminDisco.setAttribute("aria-pressed", "false");
  els.adminDisco.textContent = "🪩 Disco lighting: off";
  els.adminDance.setAttribute("aria-pressed", "false");
  els.adminDance.textContent = "💃 Dance mode: off";
  els.adminSpinMode.setAttribute("aria-pressed", "false");
  els.adminSpinMode.textContent = "🌀 Hyper-spin jar: off";
  els.adminRainbowMode.setAttribute("aria-pressed", "false");
  els.adminRainbowMode.textContent = "🌈 Rainbow aura: off";
  els.frenzyBanner.classList.add("hidden");
  els.clickStreak.textContent = "Golden jar streak bonus every 100 clicks 🤸";
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
  updateSplitGauge(false);
  updateSplitHoldUI();
  renderDailyCheckIn();
  updateWheelUI();
  syncBeatUI();
  updateShopAffordability();
  updateNews();
  saveGame();
  playChime([523.25, 659.25, 783.99, 1046.5]);
  triggerAllAnimations();
  showToast(`🌟 Rebirth ${state.rebirthCount} complete! You now have ${formatNumber(state.rebirthPoints)} Golden Stars. 🤸‍♂️`);
}

function performRebirth() {
  const reward = getRebirthReward();
  if (!reward) return;
  showConfirmModal(
    "Rebirth your spreadery? 🤸‍♂️",
    `Gain ${reward} Golden Star and +10% permanent click & production power. Current spreads, clicks, shops, upgrades, and cursors will reset. Fish, habitats, flavors, and achievements stay.`,
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
  if (event.detail === 0) {
    if (heldActivationKeys.has("Enter")) {
      if (enterClickConsumed) return;
      enterClickConsumed = true;
    } else if (heldActivationKeys.has("Space")) {
      if (spaceClickConsumed) return;
      spaceClickConsumed = true;
    }
  }
  if (recordAndCheckAutoclicker(performance.now())) return;
  const now = Date.now();
  if (state.clickCooldownEnabled && now - state.lastAcceptedSpreadClickAt < CLICK_COOLDOWN_MS) return;
  state.lastAcceptedSpreadClickAt = state.clickCooldownEnabled ? now : 0;
  updateClickCooldownUI(now);

  // Build combo
  lastComboClickAt = now;
  comboCharge = Math.min(100, comboCharge + 7.5);
  updateComboUI();

  let gain = getCookiesPerClick();
  let streakBonus = 0;
  let isJackpot = false;
  let isOnBeat = false;
  if (state.beatModeEnabled) {
    const phase = (performance.now() % 500) / 500;
    if (phase < 0.24 || phase > 0.76) {
      isOnBeat = true;
      gain = Math.floor(gain * 1.3);
      if (els.beatRing) {
        els.beatRing.classList.add("beat-hit");
        window.clearTimeout(beatHitTimeout);
        beatHitTimeout = window.setTimeout(() => {
          if (els.beatRing) els.beatRing.classList.remove("beat-hit");
        }, 210);
      }
    }
  }
  if (luckyClickArmed) {
    gain *= 5;
    luckyClickArmed = false;
    els.adminLuckyClick.setAttribute("aria-pressed", "false");
    els.adminLuckyClick.textContent = "🍀 Arm a 5× lucky click";
    els.adminStatus.textContent = `Lucky click! That jar tap baked ${formatNumber(gain)} spreads.`;
    showToast(`🍀 5× lucky click! +${formatNumber(gain)} spreads 🤸‍♂️`);
    launchConfetti(24);
  } else if (Math.random() < 0.012) {
    gain *= 5;
    isJackpot = true;
    showToast(`🤸‍♂️ Jackpot jar! That click made ${formatNumber(gain)} spreads! 🤸‍♀️`);
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
      showToast(`🎊 100-click streak! Bonus: ${formatNumber(streakBonus)} spreads! 🤸‍♂️`);
      launchConfetti(28);
      launchFireworks(2);
      triggerShockwave(true);
      playChime([523.25, 659.25, 783.99]);
    }
  }
  if (state.totalClicks % 300 === 0) {
    state.wheelSpins = (state.wheelSpins || 0) + 1;
    updateWheelUI();
    showToast("🎡 +1 Prize Wheel Spin unlocked for 300 clicks! 🤸‍♀️");
    launchConfetti(22);
  }
  if (window.Spread3D) window.Spread3D.pulseClick(isJackpot ? 1.5 : 1.0);
  temporaryLegSpreadBoost = Math.max(temporaryLegSpreadBoost, isJackpot ? 16 : 9);
  showClickGain(gain + streakBonus, event, streakBonus > 0 || isOnBeat, isJackpot);
  triggerCountBump();
  const jarRect = els.cookieButton.getBoundingClientRect();
  const hasPointer = event && typeof event.clientX === "number" && event.clientX > 0;
  const burstX = hasPointer ? event.clientX : jarRect.left + jarRect.width / 2;
  const burstY = hasPointer ? event.clientY : jarRect.top + jarRect.height / 2;
  spawnFireworkBurst(burstX, burstY, isJackpot || streakBonus > 0 ? 28 : isOnBeat ? 15 : 9);
  const clicksUntilStreak = 100 - (state.totalClicks % 100);
  els.clickStreak.textContent = `Next streak bonus in ${clicksUntilStreak} click${clicksUntilStreak === 1 ? "" : "s"} 🤸`;
  updateMilestone();
  updateSplitGauge(true);
  updateOrdersProgress();
  els.cookieButton.classList.add("clicked");
  const jarWrap = els.cookieButton.parentElement;
  if (jarWrap) {
    jarWrap.classList.remove("jar-pulse");
    void jarWrap.offsetWidth;
    jarWrap.classList.add("jar-pulse");
    window.clearTimeout(jarPulseTimeout);
    jarPulseTimeout = window.setTimeout(() => jarWrap.classList.remove("jar-pulse"), 360);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && jarWrap.querySelectorAll(".jar-click-ring").length < 4) {
      const clickRing = document.createElement("span");
      clickRing.className = "jar-click-ring";
      clickRing.setAttribute("aria-hidden", "true");
      jarWrap.appendChild(clickRing);
      window.setTimeout(() => clickRing.remove(), 580);
    }
  }
  window.clearTimeout(spreadAnimationTimer);
  spreadAnimationTimer = window.setTimeout(() => els.cookieButton.classList.remove("clicked"), 120);

  // Tactile pop sound scaling subtly with combo
  const basePitch = isOnBeat ? 520 + comboCharge * 2.4 : 340 + comboCharge * 2.2;
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

  if (event.key === "Shift" && !isTyping && !state.whiteoutScreen && els.adminPanel.hidden && els.confirmModal.hidden) {
    startSplitHold();
  }

  if (event.code === "Space" && !isTyping && !event.repeat && els.adminPanel.hidden && els.confirmModal.hidden) {
    if (document.activeElement !== els.cookieButton && !(document.activeElement instanceof HTMLButtonElement)) {
      event.preventDefault();
      if (!spaceClickConsumed) {
        spaceClickConsumed = true;
        els.cookieButton.click();
      }
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

window.addEventListener("keydown", (event) => {
  const isActivationKey = event.key === "Enter" || event.code === "Space" || event.key === " ";
  if (!isActivationKey) return;
  const target = event.target;
  const isTyping = target instanceof HTMLElement && (
    target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
  );
  if (isTyping) return;
  const keyId = event.key === "Enter" ? "Enter" : "Space";
  if (event.repeat || heldActivationKeys.has(keyId)) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }
  heldActivationKeys.add(keyId);
}, true);

window.addEventListener("keyup", (event) => {
  if (event.key === "Shift") stopSplitHold();
  if (event.key === "Enter") {
    heldActivationKeys.delete("Enter");
    enterClickConsumed = false;
  } else if (event.code === "Space" || event.key === " ") {
    heldActivationKeys.delete("Space");
    spaceClickConsumed = false;
  }
}, true);

window.addEventListener("blur", () => {
  heldActivationKeys.clear();
  enterClickConsumed = false;
  spaceClickConsumed = false;
  stopSplitHold();
});

if (els.splitHoldBtn) {
  els.splitHoldBtn.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    startSplitHold();
  });
  ["pointerup", "pointerleave", "pointercancel", "blur"].forEach((evt) => {
    els.splitHoldBtn.addEventListener(evt, stopSplitHold);
  });
}

if (els.toggleBeatBtn) {
  els.toggleBeatBtn.addEventListener("click", () => {
    state.beatModeEnabled = !state.beatModeEnabled;
    lastBeatIndex = -1;
    syncBeatUI();
    saveGame();
    showToast(state.beatModeEnabled ? "🎵 Beat Mode ON — click on the ring pulse for +30% spreads! 🤸‍♂️" : "🎵 Beat Mode off.");
  });
}

if (els.dailyClaimBtn) els.dailyClaimBtn.addEventListener("click", claimDailyCheckIn);
if (els.spinWheelBtn) els.spinWheelBtn.addEventListener("click", spinPrizeWheel);
if (els.buyAllUpgradesBtn) els.buyAllUpgradesBtn.addEventListener("click", buyAllAffordableUpgrades);

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
  updateSplitGauge(true);
  updateSplitHoldUI();
  renderDailyCheckIn();
  updateWheelUI();
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
    if (!grantAdminSpreads(amount, `Sweet luck! You gained ${formatNumber(amount)} spreads.`)) return;
  } else {
    const lost = Math.min(amount, state.cookies);
    state.cookies -= lost;
    els.adminStatus.textContent = `Sticky spill! You lost ${formatNumber(lost)} spreads.`;
  }
  refreshAfterAdminChange();
});

els.adminMult10x.addEventListener("click", () => {
  if (state.cookies <= 0) {
    state.cookies = 1000;
    state.totalCookies = Math.max(state.totalCookies, 1000);
    els.adminStatus.textContent = "Jar filled to 1,000 spreads!";
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
  els.adminStatus.textContent = "Cosmic spreadery unlocked! Jar set to 1e90 spreads.";
  launchFireworks(3);
  refreshAfterAdminChange();
});

els.adminZeroJar.addEventListener("click", () => {
  state.cookies = 0;
  displayedCookies = 0;
  els.adminStatus.textContent = "Spread jar emptied to 0.";
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
    ? "Permanent 20-hour click cooldown enabled."
    : "Click cooldown permanently removed! Click as fast as you want.";
  showToast(state.clickCooldownEnabled ? "⏱️ Click cooldown set to 20 hours." : "⚡ Click cooldown removed!");
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
  showToast("⚡ 5× Click Frenzy for 30 seconds! 🤸‍♂️");
  els.adminStatus.textContent = "5× Click Frenzy active for 30 seconds!";
});

els.adminSpawnGolden.addEventListener("click", () => {
  spawnGoldenJar(true);
  els.adminStatus.textContent = "Spawned a Golden Jar on the stage!";
});

els.adminGoldenRain.addEventListener("click", () => {
  spawnGoldenJarRain(10);
  els.adminStatus.textContent = "Golden Jar Rain launched (10 Golden Jars)!";
});

els.adminFxAll.addEventListener("click", () => {
  triggerAllAnimations();
  els.adminStatus.textContent = "ALL animations triggered! Fireworks, Cartwheel Rain, Confetti & Supernova!";
});

els.adminFxFireworks.addEventListener("click", () => {
  launchFireworks(6);
  els.adminStatus.textContent = "Fireworks show launched!";
});

els.adminFxSpreadRain.addEventListener("click", () => {
  launchSpreadRain(60);
  playChime([523.25, 659.25, 783.99]);
  els.adminStatus.textContent = "Cartwheel Rain Storm unleashed! 🤸‍♂️";
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
  els.adminStatus.textContent = "Your spreadery gained one of every helper!";
  refreshAfterAdminChange();
});

els.admin100kBuildings.addEventListener("click", () => {
  BUILDINGS.forEach((building) => {
    state.buildings[building.id] = (state.buildings[building.id] || 0) + 100000;
  });
  els.adminStatus.textContent = "Added 100,000 of every bakery helper & shop!";
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
  els.adminStatus.textContent = "Sugar rush! All helper production is 5× for 15 seconds.";
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
    showToast("🤸‍♂️ The mystery jar boosted your bakery!");
  } else {
    els.adminStatus.textContent = "Mystery jar prize: a 5× sugar frenzy for 10 seconds!";
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
  els.adminDisco.textContent = `🪩 Disco lighting: ${enabled ? "on" : "off"}`;
  els.adminStatus.textContent = enabled ? "Disco lighting is on. Let the kitchen sparkle!" : "Disco lighting is off.";
});

els.adminDance.addEventListener("click", () => {
  const enabled = document.body.classList.toggle("dance-mode");
  els.adminDance.setAttribute("aria-pressed", String(enabled));
  els.adminDance.textContent = `💃 Dance mode: ${enabled ? "on" : "off"}`;
  els.adminStatus.textContent = enabled ? "Dance mode is on. Watch your jar groove!" : "Dance mode is off.";
});

els.adminLuckyClick.addEventListener("click", () => {
  luckyClickArmed = !luckyClickArmed;
  els.adminLuckyClick.setAttribute("aria-pressed", String(luckyClickArmed));
  els.adminLuckyClick.textContent = luckyClickArmed
    ? "🍀 Lucky click armed!"
    : "🍀 Arm a 5× lucky click";
  els.adminStatus.textContent = luckyClickArmed
    ? "Your next jar click will be worth 5×!"
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
  els.adminStatus.textContent = "Added 25 random swimmers to your aquarium!";
  refreshAfterAdminChange();
  launchConfetti(32);
});

els.adminCompleteFish.addEventListener("click", () => {
  FISH_CHARACTERS.forEach((character) => {
    state.fishCollection[character.id] = Math.max(1, state.fishCollection[character.id] || 0);
    state.fishLevels[character.id] = state.fishLevels[character.id] || 1;
  });
  checkFishCollectionReward();
  els.adminStatus.textContent = "All 200 standard swimmers are now in your aquarium!";
  refreshAfterAdminChange();
  launchConfetti(60);
});

els.adminFree10kFishRolls.addEventListener("click", () => {
  if (!rollFishBatch(true)) return;
  els.adminStatus.textContent = "Added 10,000 free aquarium rolls to your collection!";
});

els.adminMaxFishHabitats.addEventListener("click", () => {
  Object.entries(state.fishCollection).forEach(([id, copies]) => {
    if (copies > 0) state.fishLevels[id] = 10;
  });
  FISH_HABITATS.forEach((habitat) => {
    state.fishHabitats[habitat.id] = true;
  });
  els.adminStatus.textContent = "All owned swimmers are level 10 and every habitat is built!";
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
  els.adminDisco.textContent = "🪩 Disco lighting: off";
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
  els.fishStatus.textContent = "✨ Admin reveal! Oliva joined your aquarium with a huge spread bonus!";
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
  els.adminStatus.textContent = `Added 100 random swimmers${secretUnlocked ? " and unlocked Oliva!" : "!"}`;
  refreshAfterAdminChange();
  if (secretUnlocked) showOlivaCelebration();
  launchConfetti(50);
});

els.adminAllCursors.addEventListener("click", () => {
  CURSORS.forEach((cursor) => {
    state.cursorCollection[cursor.id] = true;
  });
  els.adminStatus.textContent = "Every cursor tier has been unlocked! Choose one from the Cursor Shop.";
  refreshAfterAdminChange();
});

els.adminGrantTokens.addEventListener("click", () => {
  state.freeFishRollTokens += 50;
  els.adminStatus.textContent = "Granted +50 Free Aquarium Roll Tokens!";
  playChime([523.25, 659.25, 783.99]);
  refreshAfterAdminChange();
});

if (els.adminGrantSpins) {
  els.adminGrantSpins.addEventListener("click", () => {
    state.wheelSpins = (state.wheelSpins || 0) + 10;
    els.adminStatus.textContent = "Granted +10 Prize Wheel Spins!";
    playChime([523.25, 659.25, 783.99, 1046.5]);
    launchConfetti(28);
    refreshAfterAdminChange();
  });
}

els.adminMaxLuck.addEventListener("click", () => {
  state.fishLuckLevel = 5;
  els.fishStatus.textContent = "Admin boost! Your aquarium luck is maxed out.";
  els.adminStatus.textContent = "Aquarium luck maxed out at level 5!";
  refreshAfterAdminChange();
});

els.adminResetDailyRoll.addEventListener("click", () => {
  state.fishDailyRollDate = "";
  els.fishStatus.textContent = "Your daily free roll is ready to claim!";
  els.adminStatus.textContent = "Today's free aquarium roll is ready again.";
  refreshAfterAdminChange();
});

els.adminMaxRebirths.addEventListener("click", () => {
  state.rebirthCount = MAX_REBIRTHS;
  state.rebirthPoints = Math.max(state.rebirthPoints, 100);
  state.rebirthUpgrades = REBIRTH_UPGRADES.map((u) => u.id);
  els.adminStatus.textContent = "Maxed rebirths (100) and unlocked all rebirth perks!";
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
  els.adminStatus.textContent = "All 3 active Bakery Orders are ready to claim!";
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
  splitSurgeEndTime = 0;
  splitHoldActive = false;
  splitHoldCharge = 0;
  temporaryLegSpreadBoost = 0;
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
  els.adminDisco.textContent = "🪩 Disco lighting: off";
  els.adminDance.setAttribute("aria-pressed", "false");
  els.adminDance.textContent = "💃 Dance mode: off";
  els.adminSpinMode.setAttribute("aria-pressed", "false");
  els.adminSpinMode.textContent = "🌀 Hyper-spin jar: off";
  els.adminRainbowMode.setAttribute("aria-pressed", "false");
  els.adminRainbowMode.textContent = "🌈 Rainbow aura: off";
  els.frenzyBanner.classList.add("hidden");
  els.clickStreak.textContent = "Golden jar streak bonus every 100 clicks 🤸";
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
  syncBeatUI();
  initPrizeWheel();
  updateClickCooldownUI();
  updateFishTankUI();
  updateRebirthUI(true);
  lastMilestoneIndex = -1;
  updateMilestone(false);
  updateSplitGauge(false);
  updateSplitHoldUI();
  renderDailyCheckIn();
  updateWheelUI();
  updateShopAffordability();
  updateNews();
}

els.resetButton.addEventListener("click", () => {
  showConfirmModal(
    "Reset your spreadery? 🤸‍♂️",
    "This will erase all saved progress including spreads, shops, rebirths, and your aquarium collection.",
    "↺ Reset Everything",
    () => {
      resetAllProgress(true);
      showToast("Your spreadery is fresh and ready for a new batch! 🤸‍♀️");
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

  const surgeSecs = currentTime < splitSurgeEndTime ? Math.ceil((splitSurgeEndTime - currentTime) / 1000) : 0;
  const rushActive = frenzyMultiplier > 1 || clickFrenzyMultiplier > 1 || surgeSecs > 0;
  if (rushActive) {
    els.frenzyBanner.classList.remove("hidden");
    const prodSecs = frenzyMultiplier > 1 ? Math.ceil((frenzyEndTime - currentTime) / 1000) : 0;
    const clickSecs = clickFrenzyMultiplier > 1 ? Math.ceil((clickFrenzyEndTime - currentTime) / 1000) : 0;
    const parts = [];
    if (prodSecs > 0) parts.push(`🏅 Sugar frenzy ${prodSecs}s (5× Production)`);
    if (clickSecs > 0) parts.push(`⚡ Click frenzy ${clickSecs}s (5× Clicks)`);
    if (surgeSecs > 0) parts.push(`🤸‍♂️ Split Surge ${surgeSecs}s (+50% Power)`);
    els.frenzyBanner.textContent = parts.join(" · ");
  } else {
    els.frenzyBanner.classList.add("hidden");
  }

  if (state.beatModeEnabled) {
    const beatIdx = Math.floor(now / 500);
    if (beatIdx !== lastBeatIndex) {
      lastBeatIndex = beatIdx;
      if (state.soundEnabled) playTone(760, 480, 0.03, 0.018, "triangle");
    }
  }

  if (splitHoldActive) {
    splitHoldCharge = Math.min(100, splitHoldCharge + delta * 33.34);
    temporaryLegSpreadBoost = Math.max(temporaryLegSpreadBoost, splitHoldCharge * 0.16);
    updateSplitHoldUI();
    updateSplitGauge(true);
    if (splitHoldCharge >= 100) completeSplitHold();
  } else {
    if (splitHoldCharge > 0) {
      splitHoldCharge = Math.max(0, splitHoldCharge - delta * 55);
      updateSplitHoldUI();
    }
    if (temporaryLegSpreadBoost > 0) {
      temporaryLegSpreadBoost = Math.max(0, temporaryLegSpreadBoost - delta * 24);
      updateSplitGauge(false);
    }
  }

  const feverActive = getComboMultiplier() >= 2.0;
  if (els.bakeStage) {
    els.bakeStage.classList.toggle("fever-active", feverActive);
    els.bakeStage.classList.toggle("frenzy-active", rushActive);
  }
  if (window.Spread3D) {
    window.Spread3D.setState({
      frenzy: rushActive,
      fever: feverActive,
      splitAngle: getSplitAngleInfo().angle
    });
  }

  const visualModeActive = document.body.classList.contains("disco-mode")
    || document.body.classList.contains("spin-mode")
    || document.body.classList.contains("rainbow-mode");
  ambientMoteTimer += delta;
  const moteInterval = rushActive ? 0.14 : (feverActive || visualModeActive || splitHoldActive) ? 0.28 : 0.65;
  if (ambientMoteTimer >= moteInterval && fxParticles.length < 180) {
    ambientMoteTimer = 0;
    spawnAmbientMote();
  }

  const comboGraceMs = state.clickCooldownEnabled ? CLICK_COOLDOWN_MS + 60000 : 1150;
  if (comboCharge > 0 && currentTime - lastComboClickAt > comboGraceMs) {
    comboCharge = Math.max(0, comboCharge - delta * 34);
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
    updateSplitGauge(true);
    updateSplitHoldUI();
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
    updateWheelUI();
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
    ? `${buildingCount.toLocaleString()} helper${buildingCount === 1 ? "" : "s"} & shop${buildingCount === 1 ? "" : "s"} spreading 🤸‍♂️`
    : "Your spreadery is just getting started 🧘‍♂️";
  document.title = `${formatNumber(state.cookies)} spreads — Spread Clicker 🤸‍♂️`;
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
  syncBeatUI();
  initPrizeWheel();
  const awaySeconds = Math.max(0, (Date.now() - state.lastSaved) / 1000);
  const offlineCookies = Math.min(awaySeconds, 8 * 60 * 60) * getCookiesPerSecond() * 0.35;
  if (offlineCookies > 0) {
    state.cookies += offlineCookies;
    state.totalCookies += offlineCookies;
    saveGame();
    window.setTimeout(() => showToast(`Welcome back! Your spreadery baked ${formatNumber(offlineCookies)} spreads. 🤸‍♂️`), 400);
  }
  if (sessionWipedForUpdate) {
    sessionWipedForUpdate = false;
    saveGame();
    window.setTimeout(() => showToast("🔄 Complete Update Reset applied! New 3D Studio & tougher balance — good luck! 🤸‍♂️"), 350);
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
  renderDailyCheckIn();
  updateWheelUI();
  updateFishTankUI();
  updateRebirthUI(true);
  updateComboUI();
  updateClickCooldownUI();
  const brandLink = document.querySelector(".brand");
  if (brandLink) {
    brandLink.addEventListener("click", (event) => {
      event.preventDefault();
      spawnMiniBurstAtElement(brandLink, 18);
      launchConfetti(18);
      playChime([523.25, 659.25, 783.99]);
      showToast("🥐 The Little Spreadery is swirling fresh jars! 🤸‍♂️");
    });
  }
  const handstandCard = document.getElementById("handstand-loop-card");
  if (handstandCard) {
    handstandCard.addEventListener("click", () => {
      spawnMiniBurstAtElement(handstandCard, 16);
      playTone(540, 860, 0.1, 0.06, "triangle");
      temporaryLegSpreadBoost = Math.max(temporaryLegSpreadBoost, 14);
      if (window.Spread3D) window.Spread3D.pulseClick(0.9);
      updateSplitGauge(false);
    });
  }
  updateMilestone(false);
  updateSplitGauge(false);
  updateSplitHoldUI();
  updateShopAffordability();
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
