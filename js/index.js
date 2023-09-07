document.addEventListener("DOMContentLoaded", function () {
    const iniciarJuegoBtn = document.getElementById("iniciarJuego");
    const mensajesContainer = document.getElementById("mensajesContainer");
    const resultadosContainer = document.getElementById("resultadosContainer");
    const reiniciarBtn = document.getElementById("reiniciarBtn");

    iniciarJuegoBtn.addEventListener("click", function () {
        mensajesContainer.innerHTML = "¡Bienvenido jugador!<br>";

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

        const opciones = ["piedra", "papel", "tijera"];
        const mensajes = ["Elegiste", "El enemigo eligió", "Empate ._.", "¡HAS GANADO! :)", "Perdiste :("];
        let rondasJugadas = 0;

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
            const nombresEnemigosMensaje = document.createElement("p");
            nombresEnemigosMensaje.textContent = `Nombres de enemigos disponibles: ${nombresEnemigos}`;
            mensajesContainer.appendChild(nombresEnemigosMensaje);
        };

        const obtenerNombreEnemigo = () => {
            mostrarNombresEnemigos();

            const nombreEnemigoInput = document.createElement("input");
            nombreEnemigoInput.type = "text";
            nombreEnemigoInput.placeholder = "Elige el nombre de un enemigo para enfrentar:";
            mensajesContainer.appendChild(nombreEnemigoInput);

            return new Promise(resolve => {
                nombreEnemigoInput.addEventListener("change", function () {
                    let nombreEnemigoElegido = nombreEnemigoInput.value.trim();
                    while (!enemy.some(enemigo => enemigo.nombre.toLowerCase() === nombreEnemigoElegido.toLowerCase())) {
                        const noEncontradoMensaje = document.createElement("p");
                        noEncontradoMensaje.textContent = `No se encontró ningún enemigo con el nombre ${nombreEnemigoElegido}.`;
                        mensajesContainer.appendChild(noEncontradoMensaje);
                        nombreEnemigoElegido = nombreEnemigoInput.value.trim();
                    }
                    resolve(nombreEnemigoElegido);
                });
            });
        };

        const obtenerEntrada = mensaje => {
            return new Promise(resolve => {
                const input = document.createElement("input");
                input.type = "number";
                input.placeholder = mensaje;
                mensajesContainer.appendChild(input);

                input.addEventListener("change", function () {
                    resolve(parseInt(input.value));
                });
            });
        };

        const mostrarResultado = (jugadorGana) => {
            const resultadoMensaje = document.createElement("p");
            resultadoMensaje.textContent = mensajes[jugadorGana ? 3 : 4];
            mensajesContainer.appendChild(resultadoMensaje);
        };

        const jugadorNombreInput = document.createElement("input");
        jugadorNombreInput.type = "text";
        jugadorNombreInput.placeholder = "Ingresa tu nombre:";
        mensajesContainer.appendChild(jugadorNombreInput);

        jugadorNombreInput.addEventListener("change", async function () {
            const jugadorNombre = jugadorNombreInput.value;

            // Obtener todos los nombres y progresos almacenados en el localStorage
            const nombresGuardados = JSON.parse(localStorage.getItem('nombres')) || [];
            const partidasGanadasGuardadas = localStorage.getItem('partidasGanadas');

            let jugador;

            // Buscar si el nombre ya está en la lista de nombres guardados
            const jugadorGuardado = nombresGuardados.find(entry => entry.nombre === jugadorNombre);

            if (jugadorGuardado) {
                // Si el nombre ya existe, usar el progreso almacenado
                jugador = new Jugador(jugadorGuardado.nombre);
                jugador.partidasGanadas = parseInt(jugadorGuardado.partidasGanadas);
            } else {
                // Si es un nuevo nombre, crear un nuevo jugador
                jugador = new Jugador(jugadorNombre);
                nombresGuardados.push({ nombre: jugador.nombre, partidasGanadas: jugador.partidasGanadas });
                localStorage.setItem('nombres', JSON.stringify(nombresGuardados));
            }

            const jugar = async () => {
                while (rondasJugadas < 3) {
                    rondasJugadas++;

                    const ataqueMensaje = document.createElement("p");
                    ataqueMensaje.textContent = "Ronda " + rondasJugadas + ": Elige tu ataque:";
                    mensajesContainer.appendChild(ataqueMensaje);

                    const player = await obtenerEntrada("Escribe 0 para piedra, 1 para papel y 2 para tijera:");

                    if (player >= 0 && player <= 2) {
                        const eleccionMensaje = document.createElement("p");
                        eleccionMensaje.textContent = `${mensajes[0]} ${opciones[player]}`;
                        mensajesContainer.appendChild(eleccionMensaje);

                        const nombreEnemigoElegido = await obtenerNombreEnemigo();
                        const enemigo = Enemigo.buscarEnemigoPorNombre(nombreEnemigoElegido);

                        const enemigoAtaque = enemigo.ataque;
                        const enemigoAtaqueMensaje = document.createElement("p");
                        enemigoAtaqueMensaje.textContent = `${enemigo.nombre} eligió ${opciones[enemigoAtaque]}`;
                        mensajesContainer.appendChild(enemigoAtaqueMensaje);

                        const resultado = determinarResultado(player, enemigoAtaque);

                        // Muestra el mensaje de resultado debajo del mensaje del ataque del enemigo
                        const resultadoMensaje = document.createElement("p");
                        resultadoMensaje.textContent = mensajes[resultado];
                        mensajesContainer.appendChild(resultadoMensaje);

                        mostrarResultado(resultado === 3);

                        // Pausa para mostrar el resultado antes de la siguiente ronda
                        await new Promise(resolve => setTimeout(resolve, 1000));
                    } else {
                        const seleccionInvalidaMensaje = document.createElement("p");
                        seleccionInvalidaMensaje.textContent = "Selección inválida. Por favor, elige nuevamente.";
                        mensajesContainer.appendChild(seleccionInvalidaMensaje);
                        rondasJugadas--; // Resta una ronda para que se repita la actual.
                    }
                }

                const partidasGanadasMensaje = document.createElement("p");
                partidasGanadasMensaje.textContent = `Has ganado ${jugador.partidasGanadas} partidas.`;
                resultadosContainer.appendChild(partidasGanadasMensaje);

                localStorage.setItem('jugador', jugador.nombre);
                localStorage.setItem('partidasGanadas', jugador.partidasGanadas.toString());

                // Mostrar el botón para reiniciar
                reiniciarBtn.style.display = "block";
            };

            jugar();
        });

        reiniciarBtn.addEventListener("click", function () {
            // Limpia los mensajes y resultados para reiniciar el juego
            mensajesContainer.innerHTML = "";
            resultadosContainer.innerHTML = "";
            rondasJugadas = 0;
            reiniciarBtn.style.display = "none";
        });

        function determinarResultado(jugador, enemigo) {
            if (jugador === enemigo) {
                return 2; // Empate
            } else if ((jugador === 0 && enemigo === 2) || (jugador === 1 && enemigo === 0) || (jugador === 2 && enemigo === 1)) {
                return 3; // Jugador gana
            } else {
                return 4; // Jugador pierde
            }
        }
    });
});
