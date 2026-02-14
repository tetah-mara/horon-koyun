const lane = document.getElementById("lane");
const countEl = document.getElementById("count");
const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");

let timer = null;
let count = 0;

function createSheep(){
  const sheep = document.createElement("div");
  sheep.className = "sheep run";

  // Her koyun biraz farklı hız/ölçekte olsun (daha canlı)
  const speed = 0.9 + Math.random() * 0.6;  // 0.9x - 1.5x
  const duration = (6.2 / speed) + (Math.random() * 0.7);
  const scale = 0.92 + Math.random() * 0.22;

  sheep.style.animationDuration = `${duration}s`;
  sheep.style.transform = `scale(${scale})`;

  // “horon tempo” değişikliği: bacak/bounce hızlarını randomlaştır
  const danceRate = 0.85 + Math.random() * 0.35; // 0.85 - 1.2
  sheep.style.setProperty("--danceRate", danceRate);

  // İç yapı (yün + gövde + kafa + bacaklar)
  sheep.innerHTML = `
    <div class="dance">
      <div class="puff p1"></div>
      <div class="puff p2"></div>
      <div class="puff p3"></div>
      <div class="body"></div>
      <div class="head"><div class="eye"></div></div>
      <div class="ear"></div>
      <div class="leg l1"></div>
      <div class="leg l2"></div>
      <div class="leg l3"></div>
      <div class="leg l4"></div>
    </div>
  `;

  // küçük tempo hack: her koyuna ayrı animasyon-duration verelim
  const dance = sheep.querySelector(".dance");
  dance.style.animationDuration = `${0.34 / danceRate}s, ${0.55 / danceRate}s`;

  sheep.querySelectorAll(".leg").forEach((leg, i) => {
    leg.style.animationDuration = `${0.20 / danceRate}s`;
    // minik faz kayması
    leg.style.animationDelay = `${(i % 2) * (0.04 / danceRate)}s`;
  });

  const ear = sheep.querySelector(".ear");
  ear.style.animationDuration = `${0.34 / danceRate}s`;

  // Sayacı koyun görünürken artır (biraz gecikme daha doğal)
  setTimeout(() => {
    count++;
    countEl.textContent = String(count);
  }, 250);

  // Animasyon bitince temizle
  sheep.addEventListener("animationend", () => sheep.remove(), { once: true });

  lane.appendChild(sheep);
}

function start(){
  if (timer) return;

  createSheep();
  timer = setInterval(() => createSheep(), 650);
}

function stop(){
  if (!timer) return;
  clearInterval(timer);
  timer = null;
}

startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);

