alert("¡Bienvenido jugador!");

/*objetos*/
const opciones = ["piedra", "papel", "tijera"];
const mensajes = ["Elegiste", "El enemigo eligió", "Empate", "¡ HAS GANADO :) !", " Perdiste :( "];

let continuarJugando = true;

while (continuarJugando) {

    for (let i = 0; i < 3; i++) {
        alert("Elige tu ataque:");

        let player = parseInt(prompt("Escribe 0 para piedra, 1 para papel y 2 para tijera"));

        if (player >= 0 && player <= 2) {
            alert(`${mensajes[0]} ${opciones[player]}`);
        } else {
            alert("Selección inválida. Por favor, elige nuevamente.");
            i--; /* se le resta 1 al contador para que el jugador repita la elección*/

            continue;
        }

        let enemy = Math.floor(Math.random() * 3);
        alert(`${mensajes[1]} ${opciones[enemy]}`);

        if (player === enemy) {
            alert(mensajes[2]);

        } else if ((player === 0 && enemy === 2) || (player === 1 && enemy === 0) || (player === 2 && enemy === 1)) {
            alert(mensajes[3]);

        } else {
            alert(mensajes[4]);
        }
    }

    let decision = prompt("¿Quieres jugar de nuevo? (Sí/No)").toLowerCase();
    if (decision == "si") {

        continuarJugando = true;

    } else { (decision!== "si")

        continuarJugando = false;
  
    }
}

alert("¡Gracias por jugar!");