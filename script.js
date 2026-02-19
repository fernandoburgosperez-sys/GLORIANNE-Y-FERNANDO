const stage = document.getElementById("stage");
const wax = document.getElementById("wax");

let opened = false;

stage.addEventListener("click", () => {

  if(opened) return;
  opened = true;

  // grieta visible
  wax.querySelector(".wax-crack").style.opacity = 1;

  // miguitas
  document.querySelectorAll(".crumb").forEach(c => {
    c.style.opacity = 1;
    c.style.animation = "crumb .5s forwards";
  });

  // abrir
  setTimeout(() => {
    stage.classList.add("open");
  }, 400);
});
