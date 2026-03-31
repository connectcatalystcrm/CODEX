const WORLD_SIZE = 30000;
const VIEW_W = 1280;
const VIEW_H = 720;

const questions = [
  {
    q: "When conflict appears, what is your instinct?",
    options: [
      { text: "Observe and gather information", score: { owl: 2, fox: 1 } },
      { text: "Lead from the front", score: { tiger: 2, bear: 1 } },
      { text: "Coordinate the group", score: { wolf: 2, horse: 1 } },
      { text: "Defuse and negotiate", score: { dolphin: 2, deer: 1 } },
    ],
  },
  {
    q: "Pick your ideal home biome.",
    options: [
      { text: "Glacial peaks", score: { eagle: 2, wolf: 1 } },
      { text: "Mystic forest", score: { deer: 2, owl: 1, fox: 1 } },
      { text: "Volcanic frontier", score: { tiger: 2, bear: 1 } },
      { text: "Coastal plains", score: { dolphin: 2, horse: 1 } },
    ],
  },
  {
    q: "Your best battle style?",
    options: [
      { text: "Fast precision strikes", score: { fox: 2, eagle: 1 } },
      { text: "Heavy power attacks", score: { bear: 2, tiger: 1 } },
      { text: "Team-combo tactics", score: { wolf: 2, dolphin: 1 } },
      { text: "Mobility and evasion", score: { horse: 2, deer: 1 } },
    ],
  },
  {
    q: "How do you earn trust?",
    options: [
      { text: "Quiet reliability", score: { owl: 2, deer: 1 } },
      { text: "Courage under pressure", score: { tiger: 2, eagle: 1 } },
      { text: "Smart diplomacy", score: { fox: 2, dolphin: 1 } },
      { text: "Guarding the group", score: { bear: 2, wolf: 1 } },
    ],
  },
  {
    q: "What legacy do you want?",
    options: [
      { text: "A peaceful alliance", score: { dolphin: 2, horse: 1 } },
      { text: "A legendary warrior clan", score: { tiger: 2, bear: 1 } },
      { text: "A thriving adaptive kingdom", score: { fox: 2, wolf: 1 } },
      { text: "A wise and stable realm", score: { owl: 2, eagle: 1, deer: 1 } },
    ],
  },
];

const animals = {
  owl: { name: "Owl", emoji: "🦉", speed: 280, atk: 16, def: 7, skill: "Night Insight" },
  tiger: { name: "Tiger", emoji: "🐅", speed: 320, atk: 20, def: 6, skill: "Pounce" },
  dolphin: { name: "Dolphin", emoji: "🐬", speed: 340, atk: 15, def: 8, skill: "Wave Pulse" },
  deer: { name: "Deer", emoji: "🦌", speed: 300, atk: 14, def: 9, skill: "Grace Dash" },
  eagle: { name: "Eagle", emoji: "🦅", speed: 335, atk: 18, def: 6, skill: "Sky Cut" },
  wolf: { name: "Wolf", emoji: "🐺", speed: 330, atk: 17, def: 8, skill: "Pack Hunt" },
  fox: { name: "Fox", emoji: "🦊", speed: 345, atk: 16, def: 7, skill: "Trickstep" },
  bear: { name: "Bear", emoji: "🐻", speed: 260, atk: 22, def: 12, skill: "Earth Slam" },
  horse: { name: "Horse", emoji: "🐎", speed: 360, atk: 15, def: 7, skill: "Stampede" },
};

const biomes = [
  { name: "Sun Grasslands", x: 0, y: 0, w: 9000, h: 8000, color: "#bef264", grass: true },
  { name: "Moonwood", x: 9000, y: 0, w: 7000, h: 9000, color: "#86efac", grass: true },
  { name: "Storm Ridge", x: 16000, y: 0, w: 7000, h: 9000, color: "#cbd5e1", grass: false },
  { name: "Cinderwild", x: 23000, y: 0, w: 7000, h: 9000, color: "#fdba74", grass: false },
  { name: "Azure Coast", x: 0, y: 8000, w: 12000, h: 7000, color: "#7dd3fc", grass: true },
  { name: "Iron Steppe", x: 12000, y: 9000, w: 10000, h: 9000, color: "#fef08a", grass: true },
  { name: "Frost Reach", x: 22000, y: 9000, w: 8000, h: 8000, color: "#bfdbfe", grass: false },
  { name: "Warfront Basin", x: 5000, y: 17000, w: 12000, h: 7000, color: "#fca5a5", grass: true },
  { name: "Maple Dominion", x: 17000, y: 17000, w: 13000, h: 13000, color: "#fdba74", grass: true },
  { name: "Great Delta", x: 0, y: 24000, w: 17000, h: 6000, color: "#67e8f9", grass: false },
];

const factions = [
  { name: "Sky Parliament", stance: 10, color: "#60a5fa" },
  { name: "Claw Dominion", stance: -8, color: "#f97316" },
  { name: "River Accord", stance: 15, color: "#22d3ee" },
  { name: "Stone Pact", stance: -3, color: "#a78bfa" },
  { name: "Steppe Confederacy", stance: 4, color: "#f59e0b" },
];

const settlements = Array.from({ length: 45 }).map((_, i) => {
  const faction = factions[i % factions.length];
  const biome = biomes[i % biomes.length];
  const isCity = i % 3 === 0;
  const x = biome.x + 1000 + (i * 913) % Math.max(1500, biome.w - 1800);
  const y = biome.y + 900 + (i * 631) % Math.max(1300, biome.h - 1600);
  return {
    name: `${faction.name.split(" ")[0]} ${isCity ? "City" : "Village"} ${i + 1}`,
    type: isCity ? "City" : "Village",
    faction: faction.name,
    x,
    y,
    radius: isCity ? 130 : 95,
    color: faction.color,
    questGiven: false,
  };
});

let questCounter = 1;

const state = {
  quizIndex: 0,
  answers: Array(questions.length).fill(null),
  playerAnimal: null,
  game: null,
  encounter: null,
};

const el = {
  quiz: document.getElementById("quiz"),
  result: document.getElementById("result"),
  game: document.getElementById("game"),
  questionCard: document.getElementById("question-card"),
  progressLabel: document.getElementById("progress-label"),
  progressFill: document.getElementById("progress-fill"),
  backBtn: document.getElementById("back-btn"),
  nextBtn: document.getElementById("next-btn"),
  animalCard: document.getElementById("animal-card"),
  playBtn: document.getElementById("play-btn"),
  retakeBtn: document.getElementById("retake-btn"),
  restartBtn: document.getElementById("restart-btn"),
  playerName: document.getElementById("player-name"),
  coords: document.getElementById("coords"),
  regionName: document.getElementById("region-name"),
  realmStatus: document.getElementById("realm-status"),
  questList: document.getElementById("quest-list"),
  politicsList: document.getElementById("politics-list"),
  eventLog: document.getElementById("event-log"),
  canvas: document.getElementById("world"),
  fsBtn: document.getElementById("toggle-fullscreen"),
  battleModal: document.getElementById("battle-modal"),
  battleTitle: document.getElementById("battle-title"),
  battleDesc: document.getElementById("battle-desc"),
  playerHp: document.getElementById("player-hp"),
  enemyHp: document.getElementById("enemy-hp"),
  attackBtn: document.getElementById("attack-btn"),
  skillBtn: document.getElementById("skill-btn"),
  runBtn: document.getElementById("run-btn"),
};

const ctx = el.canvas.getContext("2d");
const keys = new Set();

function switchPanel(target) {
  [el.quiz, el.result, el.game].forEach((p) => p.classList.remove("active"));
  target.classList.add("active");
}

function renderQuestion() {
  const q = questions[state.quizIndex];
  el.progressLabel.textContent = `Question ${state.quizIndex + 1} / ${questions.length}`;
  el.progressFill.style.width = `${((state.quizIndex + 1) / questions.length) * 100}%`;
  el.questionCard.innerHTML = `<h2>${q.q}</h2>`;
  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = `choice ${state.answers[state.quizIndex] === idx ? "active" : ""}`;
    btn.textContent = opt.text;
    btn.addEventListener("click", () => {
      state.answers[state.quizIndex] = idx;
      renderQuestion();
    });
    el.questionCard.appendChild(btn);
  });
  el.backBtn.disabled = state.quizIndex === 0;
  el.nextBtn.textContent = state.quizIndex === questions.length - 1 ? "Reveal Champion" : "Next";
}

function computeAnimal() {
  const score = Object.fromEntries(Object.keys(animals).map((k) => [k, 0]));
  questions.forEach((q, qi) => {
    const selected = state.answers[qi];
    if (selected == null) return;
    Object.entries(q.options[selected].score).forEach(([k, v]) => (score[k] += v));
  });
  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
}

function showResult() {
  const key = computeAnimal();
  state.playerAnimal = key;
  const a = animals[key];
  el.animalCard.innerHTML = `
    <strong>${a.emoji} ${a.name}</strong>
    <span>Speed: ${a.speed} | Attack: ${a.atk} | Defense: ${a.def}</span>
    <span>Signature Skill: ${a.skill}</span>
    <span>Realm Scale: ${WORLD_SIZE.toLocaleString()} x ${WORLD_SIZE.toLocaleString()}</span>
  `;
  switchPanel(el.result);
}

function initGame() {
  const a = animals[state.playerAnimal];
  state.game = {
    x: WORLD_SIZE / 2,
    y: WORLD_SIZE / 2,
    hp: 100,
    cameraX: 0,
    cameraY: 0,
    speed: a.speed,
    atk: a.atk,
    def: a.def,
    animationTick: 0,
    quests: [],
    logs: ["Entered the realm."],
    discovered: new Set(),
    inBattle: false,
    lastFrame: performance.now(),
    lastWarTick: performance.now(),
    lastEncounter: performance.now(),
  };

  el.playerName.textContent = `${a.emoji} ${a.name}`;
  switchPanel(el.game);
  renderQuestLog();
  renderPolitics();
  renderEvents();
  requestAnimationFrame(loop);
}

function getBiome(x, y) {
  return biomes.find((b) => x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h) || biomes[0];
}

function renderWorld() {
  const g = state.game;
  g.cameraX = Math.max(0, Math.min(WORLD_SIZE - VIEW_W, g.x - VIEW_W / 2));
  g.cameraY = Math.max(0, Math.min(WORLD_SIZE - VIEW_H, g.y - VIEW_H / 2));

  ctx.fillStyle = "#1e3a8a";
  ctx.fillRect(0, 0, VIEW_W, VIEW_H);

  biomes.forEach((b) => {
    const sx = b.x - g.cameraX;
    const sy = b.y - g.cameraY;
    if (sx + b.w < 0 || sy + b.h < 0 || sx > VIEW_W || sy > VIEW_H) return;
    ctx.fillStyle = b.color;
    ctx.fillRect(sx, sy, b.w, b.h);

    if (b.grass) {
      ctx.fillStyle = "rgba(22,163,74,0.35)";
      for (let i = 0; i < 30; i++) {
        const gx = sx + ((i * 97) % b.w);
        const gy = sy + ((i * 131) % b.h);
        if (gx >= 0 && gx <= VIEW_W && gy >= 0 && gy <= VIEW_H) ctx.fillRect(gx, gy, 8, 8);
      }
    }
  });

  settlements.forEach((s) => {
    const sx = s.x - g.cameraX;
    const sy = s.y - g.cameraY;
    if (sx < -160 || sy < -160 || sx > VIEW_W + 160 || sy > VIEW_H + 160) return;
    ctx.beginPath();
    ctx.arc(sx, sy, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = s.color;
    ctx.globalAlpha = 0.65;
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#0f172a";
    ctx.stroke();
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText(`${s.type} · ${s.faction}`, sx - s.radius + 6, sy);
  });

  drawPlayer();

  const biome = getBiome(g.x, g.y);
  el.coords.textContent = `X: ${Math.round(g.x)} · Y: ${Math.round(g.y)} · HP: ${Math.round(g.hp)}`;
  el.regionName.textContent = biome.name;
  el.realmStatus.textContent = `${WORLD_SIZE.toLocaleString()}x${WORLD_SIZE.toLocaleString()} realm · ${settlements.length} settlements`;
}

function drawPlayer() {
  const g = state.game;
  const a = animals[state.playerAnimal];
  const px = g.x - g.cameraX;
  const py = g.y - g.cameraY;
  const frame = Math.floor(g.animationTick / 8) % 2;

  ctx.fillStyle = "rgba(15,23,42,.35)";
  ctx.beginPath();
  ctx.ellipse(px, py + 18, 16, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1f2937";
  ctx.fillRect(px - 8, py + 9, 5, frame === 0 ? 10 : 6);
  ctx.fillRect(px + 3, py + 9, 5, frame === 0 ? 6 : 10);

  ctx.beginPath();
  ctx.fillStyle = "#ffffff";
  ctx.arc(px, py, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.font = "19px sans-serif";
  ctx.fillStyle = a === animals.bear ? "#000" : "#111827";
  ctx.fillText(a.emoji, px - 10, py + 7);
}

function update(dt) {
  const g = state.game;
  if (g.inBattle) return;

  let moving = false;
  if (keys.has("w") || keys.has("arrowup")) {
    g.y -= g.speed * dt;
    moving = true;
  }
  if (keys.has("s") || keys.has("arrowdown")) {
    g.y += g.speed * dt;
    moving = true;
  }
  if (keys.has("a") || keys.has("arrowleft")) {
    g.x -= g.speed * dt;
    moving = true;
  }
  if (keys.has("d") || keys.has("arrowright")) {
    g.x += g.speed * dt;
    moving = true;
  }

  g.x = Math.max(20, Math.min(WORLD_SIZE - 20, g.x));
  g.y = Math.max(20, Math.min(WORLD_SIZE - 20, g.y));

  if (moving) g.animationTick += 1;

  checkSettlements();
  maybeEncounter();
  warTick();
}

function checkSettlements() {
  const g = state.game;
  settlements.forEach((s) => {
    const d = Math.hypot(s.x - g.x, s.y - g.y);
    if (d < s.radius + 18 && !g.discovered.has(s.name)) {
      g.discovered.add(s.name);
      g.logs.unshift(`Visited ${s.name} (${s.faction}).`);

      if (!s.questGiven) {
        s.questGiven = true;
        const target = settlements[(Math.floor(Math.random() * settlements.length))];
        g.quests.push({
          id: `q-${questCounter++}`,
          text: `Deliver treaty from ${s.name} to ${target.name}`,
          target: target.name,
          done: false,
          reward: 8 + Math.floor(Math.random() * 8),
        });
        g.logs.unshift(`${s.faction} assigned a treaty quest.`);
      }
      resolveQuestAt(s.name);
      renderQuestLog();
      renderEvents();
    }
  });
}

function resolveQuestAt(settlementName) {
  const g = state.game;
  g.quests.forEach((q) => {
    if (!q.done && q.target === settlementName) {
      q.done = true;
      g.hp = Math.min(100, g.hp + q.reward);
      g.logs.unshift(`Quest complete: ${q.text}. +${q.reward} morale.`);
    }
  });
}

function maybeEncounter() {
  const g = state.game;
  const biome = getBiome(g.x, g.y);
  const now = performance.now();
  if (!biome.grass || now - g.lastEncounter < 2400) return;
  g.lastEncounter = now;

  const chance = 0.028;
  if (Math.random() < chance) {
    const enemy = Object.values(animals)[Math.floor(Math.random() * Object.keys(animals).length)];
    startBattle(enemy);
  }
}

function startBattle(enemy) {
  const g = state.game;
  g.inBattle = true;
  state.encounter = { enemy, enemyHp: 100, playerHp: Math.max(20, g.hp) };
  el.battleTitle.textContent = `Wild ${enemy.name} challenges you!`;
  el.battleDesc.textContent = "Tall-grass encounter battle. Choose an action.";
  el.playerHp.value = state.encounter.playerHp;
  el.enemyHp.value = state.encounter.enemyHp;
  el.battleModal.classList.remove("hidden");
  el.battleModal.hidden = false;
}

function battleTurn(action) {
  const g = state.game;
  const e = state.encounter;
  if (!e) return;

  if (action === "run" && Math.random() < 0.65) {
    endBattle("Escaped safely.");
    return;
  }

  const baseAtk = g.atk + Math.floor(Math.random() * 8);
  const skillBoost = action === "skill" ? 8 : 0;
  e.enemyHp = Math.max(0, e.enemyHp - (baseAtk + skillBoost));

  if (e.enemyHp <= 0) {
    g.logs.unshift(`Won against wild ${e.enemy.name}.`);
    g.hp = Math.min(100, g.hp + 10);
    endBattle("Victory! You gained morale.");
    renderEvents();
    return;
  }

  const enemyHit = 10 + Math.floor(Math.random() * 10);
  e.playerHp = Math.max(0, e.playerHp - Math.max(2, enemyHit - Math.floor(g.def / 2)));
  if (e.playerHp <= 0) {
    g.hp = 30;
    g.logs.unshift(`Defeated by wild ${e.enemy.name}. You regrouped.`);
    endBattle("You were overwhelmed and retreated.");
    renderEvents();
    return;
  }

  g.hp = e.playerHp;
  el.playerHp.value = e.playerHp;
  el.enemyHp.value = e.enemyHp;
  el.battleDesc.textContent = `You used ${action}. Enemy retaliated.`;
}

function endBattle(message) {
  state.game.inBattle = false;
  el.battleDesc.textContent = message;
  setTimeout(() => {
    state.encounter = null;
    el.battleModal.classList.add("hidden");
    el.battleModal.hidden = true;
  }, 600);
}

function warTick() {
  const g = state.game;
  const now = performance.now();
  if (now - g.lastWarTick < 5000) return;
  g.lastWarTick = now;

  const fa = factions[Math.floor(Math.random() * factions.length)];
  const swing = Math.floor(Math.random() * 7) - 3;
  fa.stance = Math.max(-20, Math.min(20, fa.stance + swing));

  const tension = factions.reduce((acc, f) => acc + Math.abs(f.stance), 0);
  if (tension > 55 && Math.random() < 0.33) {
    const f1 = factions[Math.floor(Math.random() * factions.length)];
    const f2 = factions[Math.floor(Math.random() * factions.length)];
    if (f1 !== f2) g.logs.unshift(`⚔️ Border clash between ${f1.name} and ${f2.name}.`);
  } else {
    g.logs.unshift(`Diplomatic shift in ${fa.name} (${fa.stance > 0 ? "peace" : "war"} leaning).`);
  }
  renderPolitics();
  renderEvents();
}

function renderQuestLog() {
  const g = state.game;
  el.questList.innerHTML = "";
  if (!g.quests.length) {
    el.questList.innerHTML = "<li>Explore settlements to receive quests.</li>";
    return;
  }
  g.quests.slice(-8).reverse().forEach((q) => {
    const li = document.createElement("li");
    li.textContent = `${q.done ? "✅" : "🧭"} ${q.text}`;
    el.questList.appendChild(li);
  });
}

function renderPolitics() {
  el.politicsList.innerHTML = "";
  factions.forEach((f) => {
    const li = document.createElement("li");
    const mood = f.stance >= 8 ? "Peaceful" : f.stance <= -8 ? "Aggressive" : "Unstable";
    li.textContent = `${mood} · ${f.name} (${f.stance})`;
    el.politicsList.appendChild(li);
  });
}

function renderEvents() {
  const g = state.game;
  el.eventLog.innerHTML = "";
  g.logs.slice(0, 8).forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    el.eventLog.appendChild(li);
  });
}

function loop(now) {
  if (!state.game || !el.game.classList.contains("active")) return;
  const dt = Math.min((now - state.game.lastFrame) / 1000, 0.033);
  state.game.lastFrame = now;
  update(dt);
  renderWorld();
  requestAnimationFrame(loop);
}

el.backBtn.addEventListener("click", () => {
  state.quizIndex = Math.max(0, state.quizIndex - 1);
  renderQuestion();
});

el.nextBtn.addEventListener("click", () => {
  if (state.answers[state.quizIndex] == null) return;
  if (state.quizIndex < questions.length - 1) {
    state.quizIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

el.playBtn.addEventListener("click", initGame);
el.retakeBtn.addEventListener("click", () => {
  state.quizIndex = 0;
  state.answers = Array(questions.length).fill(null);
  renderQuestion();
  switchPanel(el.quiz);
});

el.restartBtn.addEventListener("click", () => window.location.reload());
el.fsBtn.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

el.attackBtn.addEventListener("click", () => battleTurn("attack"));
el.skillBtn.addEventListener("click", () => battleTurn("skill"));
el.runBtn.addEventListener("click", () => battleTurn("run"));

window.addEventListener("keydown", (e) => keys.add(e.key.toLowerCase()));
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));

el.battleModal.classList.add("hidden");
el.battleModal.hidden = true;

renderQuestion();
