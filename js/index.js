alert ("Bienvenido jugador")
/* Constructores */
class Jugador {
    constructor(nombre) {
        this.nombre = nombre;
        this.partidasGanadas = 0;

        this.incrementarPartidasGanadas = function () {
            this.partidasGanadas++;
        };
    }
}

class Enemigo {
    constructor(nombre) {
        this.nombre = nombre;
        this.ataque = Math.floor(Math.random() * 3);

        this.mostrarAtaque = function () {
            return opciones[this.ataque];
        };
    }

    static buscarEnemigoPorNombre(nombre) {
        return enemy.find(enemigo => enemigo.nombre.toLowerCase() === nombre.toLowerCase());
    }
}

const alertMessage = message => alert(message);
const promptInput = message => parseInt(prompt(message));

/* Objetos */
const opciones = ["piedra", "papel", "tijera"];
const mensajes = ["Elegiste", "El enemigo eligió", "Empate ._.", "¡HAS GANADO! :)", "Perdiste :("];

let continuarJugando = true;

/* Personas enemigas */
const enemy = [
    new Enemigo("Ana"),
    new Enemigo("Facundo"),
    new Enemigo("Juan"),
    new Enemigo("Franco"),
    new Enemigo("Rosa")
];

const elegirEnemigoAleatorio = () => {
    const indiceAleatorio = Math.floor(Math.random() * enemy.length);
    return enemy[indiceAleatorio];
};

const mostrarNombresEnemigos = () => {
    const nombresEnemigos = enemy.map(enemigo => enemigo.nombre).join(', ');
    alert(`Nombres de enemigos disponibles: ${nombresEnemigos}`);
};


const obtenerNombreEnemigo = () => {
    mostrarNombresEnemigos();
    let nombreEnemigoElegido = prompt("Elige el nombre de un enemigo para enfrentar:").trim();
    while (!enemy.some(enemigo => enemigo.nombre.toLowerCase() === nombreEnemigoElegido.toLowerCase())) {
        alert(`No se encontró ningún enemigo con el nombre ${nombreEnemigoElegido}.`);
        nombreEnemigoElegido = prompt("Por favor, elige un nombre válido de enemigo:").trim();
    }
    return nombreEnemigoElegido;
};

/* Inicio del juego */
const obtenerEntrada = mensaje => promptInput(mensaje);

const mostrarResultado = (mensaje, jugadorGana) => {
    alert(mensaje);
    if (jugadorGana) {
        jugador.incrementarPartidasGanadas(); /* Usando el método personalizado*/
    }
};

const jugadorNombre = prompt("Ingresa tu nombre:");
const jugador = new Jugador(jugadorNombre);

const jugar = () => {
    while (continuarJugando) {
        for (let i = 0; i < 3; i++) {
            alert("Elige tu ataque:");

            let player = obtenerEntrada("Escribe 0 para piedra, 1 para papel y 2 para tijera");

            if (player >= 0 && player <= 2) {
                alert(`${mensajes[0]} ${opciones[player]}`);
            } else {
                alert("Selección inválida. Por favor, elige nuevamente.");
                i--;

                continue;
            }

            let nombreEnemigoElegido = obtenerNombreEnemigo();
            let enemigoElegido = Enemigo.buscarEnemigoPorNombre(nombreEnemigoElegido);

            alert(` ${enemigoElegido.nombre} eligió ${enemigoElegido.mostrarAtaque()}`);

            if (player === enemigoElegido.ataque) {
                alert(mensajes[2]);
            } else if ((player === 0 && enemigoElegido.ataque === 2) || (player === 1 && enemigoElegido.ataque === 0) || (player === 2 && enemigoElegido.ataque === 1)) {
                mostrarResultado(mensajes[3], true);
            } else {
                mostrarResultado(mensajes[4], false);
            }
        }

        alert(`Has ganado ${jugador.partidasGanadas} partidas.`);

        let decision = prompt("¿Quieres jugar de nuevo? (Sí/No)").toLowerCase();

        if (decision.indexOf("no") !== -1) {
            continuarJugando = false;
        }
    }

    alert("¡Gracias por jugar!");
};

jugar();
