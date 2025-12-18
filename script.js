// ===============================
// CONFIGURACIÓN FECHA OBJETIVO
// ===============================
const target = new Date('2025-12-17T23:07:00'); // ajusta aquí

// ===============================
// ELEMENTOS
// ===============================
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('minutes');
const secsEl = document.getElementById('seconds');

const countdownSection = document.getElementById('countdown-section');
const miniSection = document.getElementById('mini-countdown');
const miniNumber = document.getElementById('mini');

const envelope = document.querySelector('.envelope');

const bgMusic = document.getElementById('music');
bgMusic.loop = true;
bgMusic.volume = 0;


// ===============================
// ESTADO
// ===============================
let miniCountdownStarted = false;
let timerInterval;

// ===============================
// CONTADOR PRINCIPAL
// ===============================
function updateCountdown() {
  const now = new Date();
  const diff = target - now;

  if (diff <= 0) {
    clearInterval(timerInterval);
    countdownSection.classList.add('hidden');
    miniSection.classList.remove('hidden');
    playMiniCountdown();
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  daysEl.textContent = d;
  hoursEl.textContent = String(h).padStart(2, '0');
  minsEl.textContent = String(m).padStart(2, '0');
  secsEl.textContent = String(s).padStart(2, '0');
}

// ===============================
// MINI COUNTDOWN (3 → 0)
// ===============================
function playMiniCountdown() {
  if (miniCountdownStarted) return;
  miniCountdownStarted = true;

  let n = 3;
  miniNumber.textContent = n;

  // Música fade in
  try {
    bgMusic.play().catch(() => {});
    let vol = 0;
    const TARGET_VOLUME = 0.25; // 🔈 volumen final suave y elegante
    const fade = setInterval(() => {
      if (vol < TARGET_VOLUME) {
        vol += 0.003;           // subida mucho más gradual
        bgMusic.volume = Math.min(vol, TARGET_VOLUME);
      } else {
        clearInterval(fade);
      }
    }, 150);
  } catch (e) {}

  const step = setInterval(() => {
    n--;

    if (n > 0) {
      miniNumber.textContent = n;
      miniNumber.animate(
        [{ transform: 'scale(1)' }, { transform: 'scale(1.15)' }],
        { duration: 300 }
      );
    } else {
      clearInterval(step);

      // Fade out mini contador
      miniSection.classList.add('fade-out');

      setTimeout(() => {
        miniSection.classList.add('hidden');

        // 💌 ABRIR SOBRE
        if (envelope) envelope.classList.add('open');

        if (scrollMessage) {
          scrollMessage.scrollTop = 0;
        }

        // Partículas
        launchParticles(70);
      }, 800);
    }
  }, 900);
}

// ===============================
// PARTÍCULAS
// ===============================
function launchParticles(count) {
  for (let i = 0; i < count; i++) {
    createParticle();
  }
}

function createParticle() {
  const p = document.createElement('div');
  p.className = 'particle';

  const emojis = ['💖','💞','🌸','🌺','🌷','💫','🐈','😸'];
  p.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];

  const size = 18 + Math.random() * 30;
  p.style.fontSize = size + 'px';
  p.style.left = Math.random() * 100 + '%';
  p.style.top = '-10%';

  document.getElementById('particles').appendChild(p);

  const endX = Math.random() * 60 - 30;
  const duration = 4000 + Math.random() * 4000;

  p.animate(
    [
      { transform: 'translate3d(0,0,0)', opacity: 1 },
      {
        transform: `translate3d(${endX}px,110vh,0)`,
        opacity: 0
      }
    ],
    { duration, easing: 'ease-out' }
  );

  setTimeout(() => p.remove(), duration + 50);
}

// ===============================
// INICIO
// ===============================
updateCountdown();
timerInterval = setInterval(updateCountdown, 1000);

window.addEventListener('load', () => {
  if (new Date() >= target) {
    countdownSection.classList.add('hidden');
    miniSection.classList.remove('hidden');
    playMiniCountdown();
  }

  // partículas suaves constantes
  setInterval(() => {
    if (Math.random() > 0.4) createParticle();
  }, 500);
});

// ===============================
// TÍTULO DINÁMICO
// ===============================
const titles = [
  " - Cumple de Bri 👑",
  " - Doc preciosa 🩺",
  " - Feliz Cumple, Bri 🎂",
  " - Ojitos bonitos 👀",
  " - Niña bonita 😍"
];

let index = 0;
setInterval(() => {
  document.title = titles[index % titles.length];
  index++;
}, 3000);

// ===============================
// Botón Reproductor de Canción
// ===============================
const playBtn = document.getElementById("playBtn");
const music = document.getElementById("music");

playBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    playBtn.textContent = "⏸️ Toca para pausar";
    playBtn.classList.add("playing");
  } else {
    music.pause();
    playBtn.textContent = "🎵 Toca para escuchar";
    playBtn.classList.remove("playing");
  }
});
