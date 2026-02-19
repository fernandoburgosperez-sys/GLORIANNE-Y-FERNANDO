const stage = document.getElementById("stage");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const debug = document.getElementById("debug");
const img = document.querySelector(".envelope-img");

let opened = false;

// Diagnóstico de carga de imagen (para que no volvamos a ciegas)
img.addEventListener("load", () => {
  debug.textContent = "";
});
img.addEventListener("error", () => {
  debug.textContent = "No se encuentra ./assets/envelope-closed.png (ruta o nombre no coincide).";
});

stage.addEventListener("click", () => {
  if (opened) return;
  opened = true;

  stage.classList.add("open");

  // transición simple
  setTimeout(() => {
    intro.classList.add("fade");
    main.classList.add("show");
    main.setAttribute("aria-hidden", "false");
  }, 1400);
});

