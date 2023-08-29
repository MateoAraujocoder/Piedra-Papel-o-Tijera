alert("¡Bienvenido jugador!");

/* Objetos */
const opciones = ["piedra", "papel", "tijera"];
const mensajes = ["Elegiste", "El enemigo eligió", "Empate ._.", "¡HAS GANADO! :)", "Perdiste :("];

let continuarJugando = true;

/* Personas enemigas */
const enemigos = [
    { nombre: "Ana", ataque: Math.floor(Math.random() * 3) },
    { nombre: "Pepe", ataque: Math.floor(Math.random() * 3) },
    { nombre: "Juan", ataque: Math.floor(Math.random() * 3) },
    { nombre: "Mateo", ataque: Math.floor(Math.random() * 3) },
    { nombre: "Rosa", ataque: Math.floor(Math.random() * 3) }
];

/* Función para elegir un enemigo aleatorio */
function elegirEnemigoAleatorio() {
    const indiceAleatorio = Math.floor(Math.random() * enemigos.length);
    return enemigos[indiceAleatorio];
}

/* Inicio del juego */

while (continuarJugando) {

    for (let i = 0; i < 3; i++) {
        alert("Elige tu ataque:");

        let player = parseInt(prompt("Escribe 0 para piedra, 1 para papel y 2 para tijera"));

        if (player >= 0 && player <= 2) {
            alert(`${mensajes[0]} ${opciones[player]}`);
        } else {
            alert("Selección inválida. Por favor, elige nuevamente.");
            i--;
            /* se le resta 1 al contador para que el jugador repita la elección*/
            
            continue;
        }

        /* Elegir un enemigo aleatorio para esta ronda */
        let enemigoActual = elegirEnemigoAleatorio();
        let enemy = enemigoActual.ataque;

        alert(` ${enemigoActual.nombre} eligió ${opciones[enemy]}`);

        if (player === enemy) {
            alert(mensajes[2]);
        } else if ((player === 0 && enemy === 2) || (player === 1 && enemy === 0) || (player === 2 && enemy === 1)) {
            alert(mensajes[3]);
        } else {
            alert(mensajes[4]);
        }
    }
    /* Fin de las tres rondas */

    let decision = prompt("¿Quieres jugar de nuevo? (Sí/No)").toLowerCase();

    if (decision.includes("si")) {
        continuarJugando = true;
    } else {
        continuarJugando = false;
    }
}

alert("¡Gracias por jugar!");
