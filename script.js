const envelope = document.getElementById("envelope");
const introScreen = document.getElementById("introScreen");
const mainContent = document.getElementById("mainContent");
const paperSound = document.getElementById("paperSound");

let hasOpened = false;
let audioPrimed = false;

// Ajustes (deben casar con CSS)
const OPEN_ANIM_MS = 1100;
const HOLD_OPEN_MS = 1400;
const FADE_MS = 900;

// Fecha boda (hora local); ajusta si quieres hora exacta
const WEDDING_DATE = new Date("2027-01-30T00:00:00");

// ---- Audio prime (iOS-friendly) ----
function primeAudio() {
  if (!paperSound || audioPrimed) return;
  audioPrimed = true;

  // Truco: reproducir y pausar instantáneamente en el primer gesto del usuario
  paperSound.muted = true;
  paperSound.currentTime = 0;

  const p = paperSound.play();
  if (p && typeof p.then === "function") {
    p.then(() => {
      paperSound.pause();
      paperSound.currentTime = 0;
      paperSound.muted = false;
    }).catch(() => {
      // si falla, no pasa nada; seguirá intentando en el click de abrir
      paperSound.muted = false;
    });
  } else {
    paperSound.muted = false;
  }
}

function playPaperSound() {
  if (!paperSound) return;
  paperSound.muted = false;
  paperSound.currentTime = 0;
  const p = paperSound.play();
  if (p && typeof p.catch === "function") p.catch(() => {});
}

// ---- Animación flujo ----
function openEnvelopeFlow() {
  if (hasOpened) return;
  hasOpened = true;

  envelope.classList.add("open");
  playPaperSound();

  setTimeout(() => {
    setTimeout(() => {
      introScreen.classList.add("fade-out");
      introScreen.setAttribute("aria-hidden", "true");

      mainContent.classList.add("reveal");
      mainContent.setAttribute("aria-hidden", "false");

      setTimeout(() => { introScreen.style.display = "none"; }, FADE_MS + 50);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, HOLD_OPEN_MS);
  }, OPEN_ANIM_MS);
}

// ---- Eventos ----
// Primer toque/click: prepara audio (sin sonar) incluso si luego el usuario tarda en abrir
["pointerdown", "touchstart", "mousedown"].forEach(evt => {
  envelope.addEventListener(evt, primeAudio, { passive: true });
});

// Abrir
envelope.addEventListener("click", openEnvelopeFlow);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openEnvelopeFlow();
  }
});

// ---- Cuenta atrás ----
function pad2(n){ return String(n).padStart(2, "0"); }

function updateCountdown() {
  const now = new Date();
  const diff = WEDDING_DATE - now;

  const daysEl = document.getElementById("cdDays");
  const hoursEl = document.getElementById("cdHours");
  const minEl = document.getElementById("cdMinutes");
  const secEl = document.getElementById("cdSeconds");

  if (!daysEl || !hoursEl || !minEl || !secEl) return;

  if (diff <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minEl.textContent = "00";
    secEl.textContent = "00";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  daysEl.textContent = String(days);
  hoursEl.textContent = pad2(hours);
  minEl.textContent = pad2(minutes);
  secEl.textContent = pad2(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);
