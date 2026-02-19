const stage = document.getElementById("stage");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const wax = document.getElementById("wax");

let opened = false;

// Timing total ~2.5s
const T_CRACK_SHOW = 90;   // aparece grieta
const T_SPLIT = 180;       // separación mínima
const T_OPEN = 420;        // carta sube
const T_FADE = 2500;       // transición

function run(){
  if(opened) return;
  opened = true;

  // grieta
  setTimeout(()=> wax.classList.add("crack"), T_CRACK_SHOW);

  // separación + miguitas
  setTimeout(()=> wax.classList.add("split"), T_SPLIT);

  // carta
  setTimeout(()=> stage.classList.add("open"), T_OPEN);

  // fade a contenido
  setTimeout(()=>{
    intro.classList.add("fade");
    main.classList.add("show");
    main.setAttribute("aria-hidden", "false");
  }, T_FADE);
}

stage.addEventListener("click", run);
stage.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    e.preventDefault();
    run();
  }
});
