/*
let nombreJugador = prompt ("elige un nombre").toLowerCase()
alert("¡Bienvenido jugador!" +""+ nombreJugador )

let decision = prompt ("elige izquierda o derecha").toLowerCase()

if (decision == "izquierda"){

let decision1 = prompt ("Elegiste la izquierda, y te encontraste con una cueva ,queres entrar? (si/no)").toLowerCase()

if(decision1 == "si"){
alert("entraste a la cueva y te asusto el oso")
}
if(desicion1 == "no"){
 alert("decidiste evitar la cueva , pero te persigue un oso")
}

}

else if (desicion == "derecha"){
let desicion2 = prompt("Elegiste la derecha y fuiste al bosque , queres entrar al bosque? (si/no)").toLowerCase()

if( decision2 == "si"){
    alert("entraste al bosque y encontraste un tesoro ¡ganaste!").toLowerCase()

    if(desicion2 =="no"){
        alert ("evitaste el bosque , pero te fuiste con las manos vacias")
    }

}
}
*/


/*
for ( let i=3; i <=6 ; i++ ) {


console.log ( " estamos en la repeticion numero"+" "+ i);
console.log ("Hagamos un poco de matematicas");

let ejemplo = parseInt(prompt());

let resultado1 = ejemplo + i;

console.log (ejemplo + "repeticion numero" + i + ";" + resultado1)

}

*/

alert("¡Bienvenido jugador!");

let continuarJugando = true;

while (continuarJugando) {
    alert("Elige tu ataque:");

    let player = parseInt(prompt("Escribe 0 para piedra, 1 para papel y 2 para tijera"));

    if (player === 0) {
        alert("Elegiste piedra");
    } else if (player === 1) {
        alert("Elegiste papel");
    } else if (player === 2) {
        alert("Elegiste tijera");
    } else {
        alert("Selección inválida. Por favor, elige nuevamente.");
        continue; // Regresa al inicio del ciclo para una nueva elección
    }

    let enemy = Math.round(Math.random() * 2);

    if (enemy === 0) {
        alert("El enemigo eligió piedra");
    } else if (enemy === 1) {
        alert("El enemigo eligió papel");
    } else if (enemy === 2) {
        alert("El enemigo eligió tijera");
    }

    if (player === enemy) {
        alert("Empate");
    } else if ((player === 0 && enemy === 2) || (player === 1 && enemy === 0) || (player === 2 && enemy === 1)) {
        alert("¡HAS GANADO!");
    } else {
        alert("Perdiste :(");
    }

    let decision = prompt("¿Quieres jugar de nuevo? (Sí/No)").toLowerCase();
    if (decision == "sí") {
        continuarJugando = true;

    }else if (decision!=="si"){
        continuarJugando = false;
    }
}

alert("¡Gracias por jugar!");