* { margin:0; padding:0; box-sizing:border-box; }

body{
    background:#f4efe8;
    font-family:'Cormorant Garamond', serif;
    display:flex;
    justify-content:center;
    align-items:center;
    height:100vh;
    overflow:hidden;
}

/* INTRO */
.intro{
    position:fixed;
    inset:0;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    background:#efe9df;
    transition:opacity 0.8s ease;
}

.intro.fade{
    opacity:0;
    pointer-events:none;
}

.envelope-container{
    position:relative;
    width:420px;
    max-width:90vw;
    cursor:pointer;
    perspective:1000px;
}

.envelope-img{
    width:100%;
    display:block;
    border-radius:6px;
    box-shadow:0 25px 60px rgba(0,0,0,0.15);
    transition:transform 0.8s ease;
}

/* SOLAPA */
.flap{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:50%;
    transform-origin:top;
    transition:transform 0.8s ease;
}

/* CARTA */
.letter{
    position:absolute;
    width:80%;
    left:10%;
    top:45%;
    background:white;
    padding:20px;
    text-align:center;
    transform:translateY(50px);
    transition:transform 0.8s ease;
    box-shadow:0 10px 30px rgba(0,0,0,0.1);
}

.open .flap{
    transform:rotateX(-160deg);
}

.open .letter{
    transform:translateY(-120px);
}

.microcopy{
    margin-top:20px;
    font-size:15px;
    letter-spacing:1px;
    color:#555;
}

.main{
    opacity:0;
    transition:opacity 1s ease;
}

.main.show{
    opacity:1;
}
