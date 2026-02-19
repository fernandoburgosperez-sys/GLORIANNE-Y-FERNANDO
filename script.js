const envelope = document.getElementById("envelope");
const intro = document.getElementById("intro");
const main = document.getElementById("main");
const wax = document.getElementById("wax");

const crack = document.getElementById("crackSound");
const paper = document.getElementById("paperSound");

let opened = false;
let audioPrimed = false;

// Timing total ~2.5s
const T_CRACK_SHOW = 90;     // aparece grieta
const T_SPLIT = 180;         // se separan piezas (pegadas)
const T_OPEN = 420;          // abre solapa + papel
const T_FADE = 2500;         // transicion

function safePlay(a){
  if(!a) return;
  a.currentTime = 0;
  const p = a.play();
  if(p && p.catch) p.catch(()=>{});
}

// iOS warm-up (silencioso) para permitir audio en click
function primeAudio(){
  if(audioPrimed) return;
  audioPrimed = true;

  [crack, paper].forEach(a=>{
    if(!a) return;
    a.muted = true;
    a.currentTime = 0;
    const p = a.play();
    if(p && p.then){
      p.then(()=>{ a.pause(); a.currentTime = 0; a.muted = false; }).catch(()=>{ a.muted = false; });
    } else {
      a.muted = false;
    }
  });
}

function run(){
  if(opened) return;
  opened = true;

  // 1) Sonido crack + grieta visible
  safePlay(crack);
  setTimeout(()=> wax.classList.add("crack"), T_CRACK_SHOW);

  // 2) Separación mínima + miguitas
  setTimeout(()=> wax.classList.add("split"), T_SPLIT);

  // 3) Abrir sobre + sonido papel
  setTimeout(()=>{
    envelope.classList.add("open");
    safePlay(paper);
  }, T_OPEN);

  // 4) Fade y mostrar contenido
  setTimeout(()=>{
    intro.classList.add("fade");
    main.classList.add("show");
    main.setAttribute("aria-hidden", "false");
  }, T_FADE);
}

["pointerdown","touchstart","mousedown"].forEach(evt=>{
  envelope.addEventListener(evt, primeAudio, { passive:true });
});

envelope.addEventListener("click", run);
envelope.addEventListener("keydown", (e)=>{
  if(e.key === "Enter" || e.key === " "){
    e.preventDefault();
    run();
  }
});

