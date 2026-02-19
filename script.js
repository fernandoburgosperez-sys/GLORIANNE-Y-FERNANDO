const stage = document.getElementById("stage");
const wax = document.getElementById("wax");

let opened = false;

// timing elegante
const T_CRACK_SHOW = 90;   // aparece grieta
const T_SPLIT = 180;       // separación mínima + miguitas
const T_OPEN = 420;        // aparece folio
// (no hacemos fade a otra página porque has pedido que salga el folio con datos)

function run(){
  if(opened) return;
  opened = true;

  setTimeout(()=> wax.classList.add("crack"), T_CRACK_SHOW);
  setTimeout(()=> wax.classList.add("split"), T_SPLIT);
  setTimeout(()=> stage.classList.add("open"), T_OPEN);
}

stage.addEventListener("click", run);
stage.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    e.preventDefault();
    run();
  }
});
