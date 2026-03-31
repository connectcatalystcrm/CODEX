const questions = [
  {
    key: "time",
    text: "What time of day gives you the most energy?",
    answers: [
      { label: "Early morning", scores: { deer: 2, eagle: 1, wolf: 1 } },
      { label: "Sunny afternoon", scores: { dolphin: 2, tiger: 1, fox: 1 } },
      { label: "Nighttime", scores: { owl: 2, tiger: 1, wolf: 2 } },
      { label: "Anytime if I am moving", scores: { horse: 2, fox: 1 } },
    ],
  },
  {
    key: "style",
    text: "How do you handle challenges?",
    answers: [
      { label: "Careful and patient", scores: { owl: 2, deer: 1, bear: 1 } },
      { label: "Bold and direct", scores: { tiger: 2, bear: 2 } },
      { label: "Creative and playful", scores: { dolphin: 2, fox: 2 } },
      { label: "Strategic teamwork", scores: { wolf: 2, eagle: 1, horse: 1 } },
    ],
  },
  {
    key: "home",
    text: "Pick your ideal place to relax:",
    answers: [
      { label: "Forest trail", scores: { deer: 2, owl: 1, fox: 1 } },
      { label: "Mountain peak", scores: { eagle: 2, tiger: 1, bear: 1 } },
      { label: "Ocean cove", scores: { dolphin: 3 } },
      { label: "Open grasslands", scores: { horse: 2, wolf: 1 } },
    ],
  },
  {
    key: "team",
    text: "What role do you naturally take in a group?",
    answers: [
      { label: "Quiet observer", scores: { owl: 2, eagle: 1 } },
      { label: "Encouraging friend", scores: { dolphin: 2, deer: 1, horse: 1 } },
      { label: "Protective leader", scores: { tiger: 2, bear: 2 } },
      { label: "Scout and communicator", scores: { fox: 2, wolf: 2 } },
    ],
  },
];

const animalData = {
  owl: { name: "Owl", emoji: "🦉", blurb: "Wise, observant, and calm under pressure.", speed: 2.2, color: "#64748b", region: "Moonwood" },
  tiger: { name: "Tiger", emoji: "🐅", blurb: "Brave, focused, and always ready to act.", speed: 2.9, color: "#f97316", region: "Sunscar Jungle" },
  dolphin: { name: "Dolphin", emoji: "🐬", blurb: "Playful, social, and highly adaptable.", speed: 3.3, color: "#0ea5e9", region: "Azure Coast" },
  deer: { name: "Deer", emoji: "🦌", blurb: "Gentle, intuitive, and quick to respond.", speed: 2.7, color: "#a16207", region: "Emerald Glades" },
  eagle: { name: "Eagle", emoji: "🦅", blurb: "Visionary, independent, and determined.", speed: 3.0, color: "#334155", region: "Highwind Peaks" },
  wolf: { name: "Wolf", emoji: "🐺", blurb: "Loyal, tactical, and strongest with a pack.", speed: 3.1, color: "#475569", region: "Frostpine Range" },
  fox: { name: "Fox", emoji: "🦊", blurb: "Clever, adaptable, and quick-thinking.", speed: 3.2, color: "#ea580c", region: "Maple Hollow" },
  bear: { name: "Bear", emoji: "🐻", blurb: "Steady, protective, and quietly powerful.", speed: 2.4, color: "#7c2d12", region: "Stonebark Wilds" },
  horse: { name: "Horse", emoji: "🐎", blurb: "Energetic, resilient, and freedom-loving.", speed: 3.4, color: "#92400e", region: "Golden Steppe" },
};

const WORLD_SCALE = 20;
const VIEW_WIDTH = 640;
const VIEW_HEIGHT = 420;
const WORLD_WIDTH = VIEW_WIDTH * WORLD_SCALE;
const WORLD_HEIGHT = VIEW_HEIGHT * WORLD_SCALE;

const regions = [
  { name: "Moonwood", color: "#dbeafe", x: 0, y: 0, w: 4200, h: 2600 },
  { name: "Sunscar Jungle", color: "#fde68a", x: 4200, y: 0, w: 4300, h: 3000 },
  { name: "Azure Coast", color: "#bfdbfe", x: 8500, y: 0, w: 4300, h: 2800 },
  { name: "Emerald Glades", color: "#bbf7d0", x: 0, y: 2600, w: 3900, h: 2800 },
  { name: "Highwind Peaks", color: "#cbd5e1", x: 3900, y: 3000, w: 3000, h: 2500 },
  { name: "Frostpine Range", color: "#e2e8f0", x: 6900, y: 2800, w: 3000, h: 3000 },
  { name: "Stonebark Wilds", color: "#fecaca", x: 9900, y: 2800, w: 2900, h: 2600 },
  { name: "Golden Steppe", color: "#fef08a", x: 0, y: 5400, w: 5600, h: 3000 },
  { name: "Maple Hollow", color: "#fed7aa", x: 5600, y: 5800, w: 7200, h: 2600 },
];

const settlements = [
  { name: "Nightfeather City", tribe: "Owls", type: "City", x: 1200, y: 900, r: 120, color: "#6366f1" },
  { name: "Starlit Perch", tribe: "Owls", type: "Village", x: 2200, y: 1700, r: 90, color: "#818cf8" },
  { name: "Amberclaw City", tribe: "Tigers", type: "City", x: 5900, y: 1200, r: 120, color: "#f97316" },
  { name: "Sunfang Village", tribe: "Tigers", type: "Village", x: 7200, y: 2200, r: 90, color: "#fb923c" },
  { name: "Tidecall City", tribe: "Dolphins", type: "City", x: 9800, y: 1300, r: 120, color: "#0ea5e9" },
  { name: "Coral Song Village", tribe: "Dolphins", type: "Village", x: 11400, y: 2100, r: 90, color: "#38bdf8" },
  { name: "Mossheart City", tribe: "Deer", type: "City", x: 1200, y: 3600, r: 120, color: "#a16207" },
  { name: "Willowrun Village", tribe: "Deer", type: "Village", x: 2800, y: 4700, r: 90, color: "#b45309" },
  { name: "Skycrest City", tribe: "Eagles", type: "City", x: 4800, y: 3900, r: 120, color: "#334155" },
  { name: "Cloudspire Village", tribe: "Eagles", type: "Village", x: 6100, y: 5000, r: 90, color: "#64748b" },
  { name: "Fangmoon City", tribe: "Wolves", type: "City", x: 7600, y: 3900, r: 120, color: "#475569" },
  { name: "Pinehowl Village", tribe: "Wolves", type: "Village", x: 9000, y: 5000, r: 90, color: "#64748b" },
  { name: "Embertrail City", tribe: "Foxes", type: "City", x: 8200, y: 7000, r: 120, color: "#ea580c" },
  { name: "Lanterntail Village", tribe: "Foxes", type: "Village", x: 11200, y: 7600, r: 90, color: "#f97316" },
  { name: "Ironroot City", tribe: "Bears", type: "City", x: 10500, y: 3900, r: 120, color: "#7c2d12" },
  { name: "Cinderpaw Village", tribe: "Bears", type: "Village", x: 11750, y: 5200, r: 90, color: "#9a3412" },
  { name: "Windmane City", tribe: "Horses", type: "City", x: 2200, y: 6600, r: 120, color: "#b45309" },
  { name: "Prairielight Village", tribe: "Horses", type: "Village", x: 4300, y: 7600, r: 90, color: "#92400e" },
];

const quizPanel = document.getElementById("quiz");
const resultPanel = document.getElementById("result");
const gamePanel = document.getElementById("game");
const form = document.getElementById("quiz-form");
const startBtn = document.getElementById("start-btn");
const playBtn = document.getElementById("play-btn");
const retakeBtn = document.getElementById("retake-btn");
const restartBtn = document.getElementById("restart-btn");
const animalCard = document.getElementById("animal-card");
const animalName = document.getElementById("animal-name");
const positionEl = document.getElementById("position");
const discoveriesEl = document.getElementById("discoveries");
const canvas = document.getElementById("world");
const ctx = canvas.getContext("2d");

let currentAnimalKey = null;
let gameState = null;
const keys = new Set();

function renderQuiz() {
  form.innerHTML = "";
  questions.forEach((q, i) => {
    const block = document.createElement("fieldset");
    block.className = "question";
    block.innerHTML = `<legend>${i + 1}. ${q.text}</legend>`;
    q.answers.forEach((answer, idx) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="${q.key}" value="${idx}" required /> ${answer.label}`;
      block.appendChild(label);
    });
    form.appendChild(block);
  });
}

function determineAnimal() {
  const score = Object.fromEntries(Object.keys(animalData).map((k) => [k, 0]));
  for (const q of questions) {
    const selected = form.querySelector(`input[name="${q.key}"]:checked`);
    if (!selected) return null;
    const answer = q.answers[Number(selected.value)];
    Object.entries(answer.scores).forEach(([animal, points]) => {
      score[animal] += points;
    });
  }
  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
}

function switchPanel(target) {
  [quizPanel, resultPanel, gamePanel].forEach((p) => p.classList.remove("active"));
  target.classList.add("active");
}

function showResult(animalKey) {
  currentAnimalKey = animalKey;
  const data = animalData[animalKey];
  animalCard.innerHTML = `
    <strong>${data.emoji} ${data.name}</strong>
    <span>${data.blurb}</span>
    <span>Homeland: ${data.region}</span>
    <span>Travel speed: ${data.speed.toFixed(1)} tiles/sec</span>
    <span>World size: ${WORLD_WIDTH} x ${WORLD_HEIGHT} (20x larger than before)</span>
  `;
  switchPanel(resultPanel);
}

function initGame() {
  const data = animalData[currentAnimalKey];
  const home = settlements.find((s) => s.tribe.toLowerCase().startsWith(data.name.toLowerCase().slice(0, 3))) || settlements[0];
  gameState = {
    x: home.x,
    y: home.y,
    speed: data.speed,
    discovered: new Set(),
    cameraX: 0,
    cameraY: 0,
    last: performance.now(),
    won: false,
  };
  animalName.textContent = `${data.emoji} ${data.name}`;
  discoveriesEl.innerHTML = settlements.map((s) => `<li data-name="${s.name}">❔ ${s.name} (${s.tribe} ${s.type})</li>`).join("");
  switchPanel(gamePanel);
  requestAnimationFrame(loop);
}

function getCurrentRegion() {
  return regions.find((r) => gameState.x >= r.x && gameState.x < r.x + r.w && gameState.y >= r.y && gameState.y < r.y + r.h)?.name || "Wilderness";
}

function drawWorld() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  gameState.cameraX = Math.max(0, Math.min(WORLD_WIDTH - VIEW_WIDTH, gameState.x - VIEW_WIDTH / 2));
  gameState.cameraY = Math.max(0, Math.min(WORLD_HEIGHT - VIEW_HEIGHT, gameState.y - VIEW_HEIGHT / 2));

  ctx.fillStyle = "#c7d2fe";
  ctx.fillRect(0, 0, VIEW_WIDTH, VIEW_HEIGHT);

  regions.forEach((region) => {
    const rx = region.x - gameState.cameraX;
    const ry = region.y - gameState.cameraY;
    if (rx + region.w < 0 || ry + region.h < 0 || rx > VIEW_WIDTH || ry > VIEW_HEIGHT) return;
    ctx.fillStyle = region.color;
    ctx.fillRect(rx, ry, region.w, region.h);
    ctx.strokeStyle = "rgba(15,23,42,0.2)";
    ctx.strokeRect(rx, ry, region.w, region.h);
  });

  settlements.forEach((s) => {
    const sx = s.x - gameState.cameraX;
    const sy = s.y - gameState.cameraY;
    if (sx < -130 || sy < -130 || sx > VIEW_WIDTH + 130 || sy > VIEW_HEIGHT + 130) return;
    ctx.beginPath();
    ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = 0.75;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(`${s.type}: ${s.name}`, sx - s.r + 6, sy - 8);
    ctx.font = "11px sans-serif";
    ctx.fillText(`${s.tribe} Tribe`, sx - s.r + 6, sy + 8);
  });

  const me = animalData[currentAnimalKey];
  const px = gameState.x - gameState.cameraX;
  const py = gameState.y - gameState.cameraY;
  ctx.beginPath();
  ctx.fillStyle = me.color;
  ctx.arc(px, py, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "19px sans-serif";
  ctx.fillText(me.emoji, px - 10, py + 7);

  positionEl.textContent = `World (${Math.round(gameState.x)}, ${Math.round(gameState.y)}) · Region: ${getCurrentRegion()}`;
}

function checkDiscoveries() {
  settlements.forEach((s) => {
    const dist = Math.hypot(s.x - gameState.x, s.y - gameState.y);
    if (dist < s.r + 20) {
      gameState.discovered.add(s.name);
      const item = discoveriesEl.querySelector(`[data-name="${s.name}"]`);
      if (item) item.textContent = `✅ ${s.name} (${s.tribe} ${s.type})`;
    }
  });

  if (!gameState.won && gameState.discovered.size === settlements.length) {
    gameState.won = true;
    setTimeout(() => {
      alert(`Legendary journey! As a ${animalData[currentAnimalKey].name}, you visited every city and village across all animal tribes.`);
    }, 50);
  }
}

function update(delta) {
  const amount = gameState.speed * 110 * delta;
  if (keys.has("arrowup") || keys.has("w")) gameState.y -= amount;
  if (keys.has("arrowdown") || keys.has("s")) gameState.y += amount;
  if (keys.has("arrowleft") || keys.has("a")) gameState.x -= amount;
  if (keys.has("arrowright") || keys.has("d")) gameState.x += amount;

  gameState.x = Math.max(14, Math.min(WORLD_WIDTH - 14, gameState.x));
  gameState.y = Math.max(14, Math.min(WORLD_HEIGHT - 14, gameState.y));
  checkDiscoveries();
}

function loop(now) {
  if (!gamePanel.classList.contains("active")) return;
  const delta = Math.min((now - gameState.last) / 1000, 0.033);
  gameState.last = now;
  update(delta);
  drawWorld();
  requestAnimationFrame(loop);
}

startBtn.addEventListener("click", () => {
  const animal = determineAnimal();
  if (!animal) {
    alert("Please answer every question first.");
    return;
  }
  showResult(animal);
});

playBtn.addEventListener("click", initGame);
retakeBtn.addEventListener("click", () => switchPanel(quizPanel));
restartBtn.addEventListener("click", () => {
  renderQuiz();
  switchPanel(quizPanel);
});

window.addEventListener("keydown", (e) => keys.add(e.key.toLowerCase()));
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

renderQuiz();
