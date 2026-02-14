const lane = document.getElementById("lane");
const countEl = document.getElementById("count");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

let timer = null;
let count = 0;

function createSheep(){
  const sheep = document.createElement("div");
  sheep.className = "sheep run";

  // Daha "ritmik horon": hızlı ve kısa zıplama + hızlı adım
  const tempo = 0.85 + Math.random() * 0.35; // 0.85 - 1.2 (tempo arttıkça daha hızlı)
  const duration = (6.0 / (0.9 + Math.random()*0.6)); // ekrandan geçiş süresi
  const scale = 0.92 + Math.random() * 0.18;

  sheep.style.animationDuration = `${duration}s`;
  sheep.style.transform = `scale(${scale})`;

  // CSS değişkenleriyle animasyon hızlarını ayarla
  // b: bounce, s: shoulder, x: sideShift, p: step, a: arms
  sheep.style.setProperty("--b", `${0.22 / tempo}s`);
  sheep.style.setProperty("--s", `${0.28 / tempo}s`);
  sheep.style.setProperty("--x", `${0.36 / tempo}s`);
  sheep.style.setProperty("--p", `${0.14 / tempo}s`);
  sheep.style.setProperty("--a", `${0.28 / tempo}s`);

  sheep.innerHTML = `
    <div class="dance">
      <div class="puff p1"></div>
      <div class="puff p2"></div>
      <div class="puff p3"></div>
      <div class="body"></div>

      <div class="head"><div class="eye"></div></div>

      <div class="arm a1"></div>
      <div class="arm a2"></div>

      <div class="leg l1"></div>
      <div class="leg l2"></div>
      <div class="leg l3"></div>
      <div class="leg l4"></div>
    </div>
  `;

  setTimeout(() => {
    count++;
    countEl.textContent = String(count);
  }, 220);

  sheep.addEventListener("animationend", () => sheep.remove(), { once:true });
  lane.appendChild(sheep);
}

function start(){
  if (timer) return;
  createSheep();
  timer = setInterval(createSheep, 620);
}

function stop(){
  if (!timer) return;
  clearInterval(timer);
  timer = null;
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
