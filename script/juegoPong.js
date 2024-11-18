// CONSTANTES DE PANTALLA INICIO
const homeScreen = document.querySelector(".homeScreen");   // PANTALLA INICIO
const game = document.querySelector(".gameScreen"); // PANTALLA DE JUEGO
const btnJugar1 = document.querySelector(".btnJugar1"); // BOTÓN 1 JUGADOR
const btnJugar2 = document.querySelector(".btnJugar2"); // BOTÓN 2 JUGADORES
const btnConfi = document.querySelector(".btnConfi");   // BOTÓN CONFIGURACIONES
const gameMusic = document.getElementById("gameMusic"); // AUDIO JUEGO
const musicBtnOn = document.querySelector(".musicBtnOn");  // BOTÓN MUSICA ON
const musicBtnOff = document.querySelector(".musicBtnOff");  // BOTÓN MUSICA OFF

// CONSTANTES DE PANTALLA JUEGO
const gameWall = document.querySelector(".gameContainer");  // CONTENEDOR DEL JUEGO
const paddle = document.getElementById("paddle"); // PALA
const ball = document.getElementById("ball"); // BOLA
const btnInicio = document.querySelector(".btnInicio"); // BOTÓN PARA VOLVER A LA PANTALLA DE INICIO
const btnPausa = document.querySelector(".btnPausa");   // BOTÓN PAUSA
const btnReanudar = document.querySelector(".btnReanudar");   // BOTÓN REANUDAR
const btnConfig = document.querySelector(".btnConfig"); // BOTÓN CONFIGURACIONES
const btnHomeScreenBG = document.querySelector(".btnHomeScreenBG");   // PANTALLA AL DARLE AL BOTÓN INICIO
const btnHome1 = document.querySelector(".btnHome1");   // BOTÓN VOLVER INICIO
const btnHome2 = document.querySelector(".btnHome2");   // BOTÓN REANUDAR

const ball_radius = 40; // RADIO DE LA BOLA

// PANTALLA CONFIGURACIÓN
const settingScreen = document.querySelector(".settingScreen"); // CONTENEDOR PANTALLA CONFIGURACIÓN
const closeBtn = document.querySelector(".closeBtn");   //  BOTÓN CERRAR PANTALLA CONFIGURACIÓN
$("#tabs").tabs();  // FUNCIONAMIENTO DE TABS CONFIGURACIÓN
const j1Up = document.querySelector("#j1Up");    // BOTÓN J1 SUBIR
const j1Down = document.querySelector("#j1Down");    // BOTÓN J1 BAJAR
const j2Up = document.querySelector("#j2Up");    // BOTÓN J2 SUBIR
const j2Down = document.querySelector("#j2Down");    // BOTÓN J2 BAJAR
const easyBtn = document.querySelector("#easyBtn");   // BOTÓN DIFICULTAD FÁCIL
const mediumBtn = document.querySelector("#mediumBtn");   // BOTÓN DIFICULTAD MEDIA
const hardBtn = document.querySelector("#hardBtn");   // BOTÓN DIFICULTAD DIFÍCIL
const applyBtn = document.querySelector("#applyBtn");   // BOTÓN APLICAR CAMBIOS
const cancelBtn = document.querySelector("#cancelBtn");   // BOTÓN CANCELAR CAMBIOS
const nameJ1 = document.querySelector("#nameJ1");   // INPUT NOMBRE JUGADOR 1
const nameJ2 = document.querySelector("#nameJ1");   // INPUT NOMBRE JUGADOR 2
const j1Name = document.querySelector(".nombreJ1"); // NOMBRE JUGADOR 1
const j2Name = document.querySelector(".nombreJ2"); // NOMBRE JUGADOR 2

// PANTALLA AJUSTES DE SONIDOS
const soundStnScreen = document.querySelector(".soundStnScreen");   // CONTENEDOR PANTALLA AJUSTES DE SONIDO
const btnAjusteSondido = document.querySelector(".btnAjusteSondido");   // BOTÓN AJUSTES DE SONIDOS
const closeSoundBtn = document.querySelector(".closeSoundBtn");


// ESTADO DEL JUEGO
let juegoPausado = false; 

window.addEventListener('load', () => {
    mediumBtn.style.backgroundColor = "#8994e4";
    selectedSpeed = ballSpeedMedium;
});

// VELOCIDADES POR LA DIFICULTAD POSIBLE
let ballSpeedEasy = 3;
let ballSpeedMedium = 5;
let ballSpeedHard = 8;
let selectedSpeed = ballSpeedMedium;

// TECLAS JUGADORES POR DEFECTO
let keyJ1Up = "W";
let keyJ1Down = "S";
let keyJ2Up = "O";
let keyJ2Down = "L";

//Add onkeypress handler
document.onkeypress = move_paddle;

var ball_movement = null;
var velocity_x = 5;
var velocity_y = 5;
let savedVelocity_x = velocity_x;
let savedVelocity_y = velocity_y;



// FUNCIONES
function ocultarMenu() {
    homeScreen.classList.add("hiddenContent");
}

function mostrarMenu() {
    homeScreen.classList.remove("hiddenContent");
}

function mostrarJuego() {
    game.classList.remove("hiddenContent")
}

function ocultarJuego() {
    homeScreen.classList.add("hiddenContent");
}

function musicOn() {
    gameMusic.play()
    musicBtnOn.classList.remove("hiddenContent");
    musicBtnOff.classList.add("hiddenContent");
}

function musicOff() {
    gameMusic.pause();
    gameMusic.currentTime = 0;
    musicBtnOn.classList.add("hiddenContent");
    musicBtnOff.classList.remove("hiddenContent");
}

function mostrarConfig() {
    settingScreen.classList.remove("hiddenContent");
    if (juegoPausado == false) {
        pausarJuego();
    }
}

function closeConfi() {
    settingScreen.classList.add("hiddenContent");
    if (juegoPausado == false) {
        pausarJuego();
    } 
}

function volverInicio() {
    btnHomeScreenBG.classList.add("hiddenContent");
    reanudarJuego();
    finalizarPartida();
}

function reanudarVolver() {
    btnHomeScreenBG.classList.add("hiddenContent");
    reanudarJuego();
}

function preguntaVolverInicio() {
    btnHomeScreenBG.classList.remove("hiddenContent");
    btnHome1.addEventListener("click", volverInicio);
    btnHome2.addEventListener("click", reanudarVolver);
    if (juegoPausado == false) {
        pausarJuego();
    }
    console.log(velocity_x)
}

function setKey(element, keyVariable) {
    function keyPress(event) {
        const newKey = event.key.toUpperCase(); // Captura la tecla presionada
        element.textContent = newKey; // Actualiza el texto del elemento
        keyVariable.value = newKey; // Actualiza la variable correspondiente
        document.removeEventListener("keypress", keyPress); // Remueve el listener
    }
    document.addEventListener("keypress", keyPress);
}

function showSoundStnScreen() {
    soundStnScreen.classList.remove("hiddenContent");
}

function closeSoundStnScreen() {
    soundStnScreen.classList.add("hiddenContent");
}

function pausarJuego() {
    btnPausa.classList.add("hiddenContent");
    btnReanudar.classList.remove("hiddenContent");

    // Guardamos las velocidades actuales
    savedVelocity_x = velocity_x;
    savedVelocity_y = velocity_y;

    clearInterval(ball_movement);  // Detenemos el intervalo de movimiento
    document.removeEventListener("keydown", move_paddle); 
}

function reanudarJuego() {
    btnReanudar.classList.add("hiddenContent");
    btnPausa.classList.remove("hiddenContent");

    // Restauramos las velocidades
    velocity_x = savedVelocity_x;
    velocity_y = savedVelocity_y;

    // Reanudamos el movimiento de la pelota
    ball_movement = setInterval(move_ball, 10);  // Vuelve a iniciar el intervalo con las velocidades restauradas
    document.addEventListener("keydown", move_paddle);
}

function pausarConEspacio(event) {
    if (event.code === "Space") { 
        if (juegoPausado) {
            reanudarJuego();
            juegoPausado = false;
        } else {
            pausarJuego();
            juegoPausado = true;
        }
    }
}

function finalizarPartida() {
    clearInterval(ball_movement);
    document.removeEventListener("keydown", move_paddle);
    ball.style.top = "50%"; // Por ejemplo, posición inicial
    ball.style.left = "50%";
    paddle.style.top = "50%"; // Paddle en el centro
    velocity_x = 5; // Velocidad inicial
    velocity_y = 5;
    ocultarJuego();
    mostrarMenu();
}

function cambiarDificultad(event) {
    // Restablecer todos los botones a su color original
    easyBtn.style.backgroundColor = "";
    mediumBtn.style.backgroundColor = "";
    hardBtn.style.backgroundColor = "";

    // Establecer el nuevo color para el botón seleccionado
    event.target.style.backgroundColor = "#8994e4";

    // Cambiar la velocidad según el botón presionado
    if (event.target === easyBtn) {
        selectedSpeed = ballSpeedEasy;
    } else if (event.target === mediumBtn) {
        selectedSpeed = ballSpeedMedium;
    } else if (event.target === hardBtn) {
        selectedSpeed = ballSpeedHard;
    }
}



// NOMBRES
var nombreJugador1 = document.getElementById('nameJ1').value;
var nombreJugador2 = document.getElementById('nameJ2').value;



// SONIDO
musicBtnOn.addEventListener("click", musicOff);
musicBtnOff.addEventListener("click", musicOn);

// PANTALLA CONFIGURACIONES
btnConfi.addEventListener("click", mostrarConfig);
closeBtn.addEventListener("click", closeConfi);

// BOTONES JUEGO
btnInicio.addEventListener("click", preguntaVolverInicio);
btnPausa.addEventListener("click", pausarJuego);
btnReanudar.addEventListener("click", reanudarJuego);
document.addEventListener("keydown", pausarConEspacio);
btnConfig.addEventListener("click", mostrarConfig)

// BOTONES JUGADORES
j1Up.addEventListener("click", () => setKey(j1Up, keyJ1Up));
j1Down.addEventListener("click", () => setKey(j1Down, keyJ1Down));
j2Up.addEventListener("click", () => setKey(j2Up, keyJ2Up));
j2Down.addEventListener("click", () => setKey(j2Down, keyJ2Down));

// BOTÓN APLICAR CAMBIOS
applyBtn.addEventListener("click", () => {
    keyJ1Up = j1Up.textContent;
    keyJ1Down = j1Down.textContent;
    keyJ2Up = j2Up.textContent;
    keyJ2Down = j2Down.textContent;
});

// BOTÓN CANCELAR
cancelBtn.addEventListener("click", () => {
    // Restaurar las teclas originales
    j1Up.textContent = keyJ1Up;
    j1Down.textContent = keyJ1Down;
    j2Up.textContent = keyJ2Up;
    j2Down.textContent = keyJ2Down;
});

// DIFICULTAD DEL JUEGO
easyBtn.addEventListener("click", cambiarDificultad);
mediumBtn.addEventListener("click", cambiarDificultad);
hardBtn.addEventListener("click", cambiarDificultad);

// PANTALLA AJUSTES DE SONIDOS
btnAjusteSondido.addEventListener("click", showSoundStnScreen);
closeSoundBtn.addEventListener("click", closeSoundStnScreen);



// JUGAR 1 PERSONA
btnJugar1.addEventListener("click", function(){
    ocultarMenu();
    mostrarJuego();
    ball_movement = setInterval(move_ball, 10);
});

function move_ball(){

    //Check Top
    if (ball.offsetTop + ball_radius <= gameWall.offsetTop) {
        velocity_y = -velocity_y;
    }

    //Check right
    if (ball.offsetLeft + (ball_radius*2) >= gameWall.offsetWidth) {
        velocity_x = -velocity_x ;
    }

    //Check bottom
    if (ball.offsetTop - ball_radius <= gameWall.offsetWidth) {
        velocity_y = -velocity_y;
    }

    //Check left
    if (ball.offsetLeft <= 0) {
        clearInterval(ball_movement);
        location.reload();
    }

    // Check collision
    if (ball.offsetLeft <= 90 && ball.offsetTop + ball_radius >= paddle.offsetTop && ball.offsetTop - ball_radius <= paddle.offsetTop + paddle.offsetHeight) {
        velocity_x = -velocity_x;
    }
    ball.style.top = (ball.offsetTop + velocity_y) +"px";
    ball.style.left = (ball.offsetLeft + velocity_x) +"px";
}

function move_paddle(pkey){
    console.log("tecla pulsada: " + pkey.which);  

    if (pkey.which == 56){
        paddle.style.top = (paddle.offsetTop - 10) +"px";
    } else if (pkey.which == 50){
        paddle.style.top = (paddle.offsetTop + 10) +"px";
    }
}