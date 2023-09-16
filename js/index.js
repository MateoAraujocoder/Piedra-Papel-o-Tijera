document.addEventListener("DOMContentLoaded", function () {
    const iniciarJuegoBtn = document.getElementById("iniciarJuego");
    const mensajesContainer = document.getElementById("mensajesContainer");
    const resultadosContainer = document.getElementById("resultadosContainer");
    const reiniciarBtn = document.getElementById("reiniciarBtn");

    iniciarJuegoBtn.addEventListener("click", async function () {
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
            constructor(nombre, ataque) {
                this.nombre = nombre;
                this.ataque = ataque;

                this.mostrarAtaque = function () {
                    return opciones[this.ataque];
                };
            }

            static buscarEnemigoPorNombre(nombre) {
                return enemigos.find(enemigo => enemigo.nombre.toLowerCase() === nombre.toLowerCase());
            }
        }

        let opciones;
        let enemigos;

        // Cargar datos desde el archivo JSON a través del enlace
        try {
            const link = document.querySelector('link[rel="json"]');
            const response = await fetch(link.href);
            const data = await response.json();
            opciones = data.opciones;
            enemigos = data.enemigos.map(enemigo => new Enemigo(enemigo.nombre, enemigo.ataque));
        } catch (error) {
            console.error('Error al cargar los datos desde el archivo JSON:', error);
            return;
        }

        const mostrarNombresEnemigos = () => {
            const nombresEnemigos = enemigos.map(enemigo => enemigo.nombre).join(', ');
            const nombresEnemigosMensaje = document.createElement("p");
            nombresEnemigosMensaje.textContent = `Nombres de enemigos disponibles: ${nombresEnemigos}`;
            mensajesContainer.appendChild(nombresEnemigosMensaje);
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

        const jugadorNombreInput = document.createElement("input");
        jugadorNombreInput.type = "text";
        jugadorNombreInput.placeholder = "Ingresa tu nombre:";
        mensajesContainer.appendChild(jugadorNombreInput);

        jugadorNombreInput.addEventListener("change", async function () {
            const jugadorNombre = jugadorNombreInput.value;

            /*Obtener todos los nombres y progresos almacenados en el localStorage*/
            const nombresGuardados = JSON.parse(localStorage.getItem('nombres')) || [];

            let jugador;

            /* Buscar si el nombre ya está en la lista de nombres guardados*/
            const jugadorGuardado = nombresGuardados.find(entry => entry.nombre === jugadorNombre);

            if (jugadorGuardado) {
                /* Si el nombre ya existe, usar el progreso almacenado*/
                jugador = new Jugador(jugadorGuardado.nombre);
                jugador.partidasGanadas = parseInt(jugadorGuardado.partidasGanadas);
            } else {
                /* Si es un nuevo nombre, crear un nuevo jugador*/
                jugador = new Jugador(jugadorNombre);
                nombresGuardados.push({ nombre: jugador.nombre, partidasGanadas: 0 }); // Inicializa en 0
                localStorage.setItem('nombres', JSON.stringify(nombresGuardados));
            }

            // Restablece las partidas ganadas en 0 al inicio del juego
            jugador.partidasGanadas = 0;

            mostrarNombresEnemigos();

            const nombreEnemigoInput = document.createElement("input");
            nombreEnemigoInput.type = "text";
            nombreEnemigoInput.placeholder = "Elige el nombre de un enemigo para enfrentar:";
            mensajesContainer.appendChild(nombreEnemigoInput);

            const nombreEnemigoElegido = await new Promise(resolve => {
                nombreEnemigoInput.addEventListener("change", function () {
                    let nombreEnemigoElegido = nombreEnemigoInput.value.trim();
                    while (!enemigos.some(enemigo => enemigo.nombre.toLowerCase() === nombreEnemigoElegido.toLowerCase())) {
                        const noEncontradoMensaje = document.createElement("p");
                        noEncontradoMensaje.textContent = `No se encontró ningún enemigo con el nombre ${nombreEnemigoElegido}.`;
                        mensajesContainer.appendChild(noEncontradoMensaje);
                        nombreEnemigoElegido = nombreEnemigoInput.value.trim();
                    }
                    resolve(nombreEnemigoElegido);
                });
            });

            const enemigo = Enemigo.buscarEnemigoPorNombre(nombreEnemigoElegido);

            const limpiarMensajes = () => {
                mensajesContainer.innerHTML = "";
            };

            const jugar = async () => {
                let rondasJugadas = 0;
                while (rondasJugadas < 3) {
                    rondasJugadas++;

                    // Limpia el contenido del contenedor de mensajes antes de cada ronda
                    limpiarMensajes();

                    const ataqueMensaje = document.createElement("p");
                    ataqueMensaje.textContent = "Ronda " + rondasJugadas + ": Elige tu ataque:";
                    mensajesContainer.appendChild(ataqueMensaje);

                    const player = await obtenerEntrada("Escribe 0 para piedra, 1 para papel y 2 para tijera:");

                    if (player >= 0 && player <= 2) {
                        const eleccionMensaje = document.createElement("p");
                        eleccionMensaje.textContent = `${opciones[player]}`;
                        mensajesContainer.appendChild(eleccionMensaje);

                        const enemigoAtaque = enemigo.ataque;
                        const enemigoAtaqueMensaje = document.createElement("p");
                        enemigoAtaqueMensaje.textContent = `${enemigo.nombre} eligió ${opciones[enemigoAtaque]}`;
                        mensajesContainer.appendChild(enemigoAtaqueMensaje);

                        const resultado = determinarResultado(player, enemigoAtaque);

                        /* Muestra el mensaje de resultado debajo del mensaje del ataque del enemigo */
                        const resultadoMensaje = document.createElement("p");
                        resultadoMensaje.textContent = resultado === 2 ? "Empate ._."
                            : resultado === 3 ? "¡HAS GANADO! :)"
                            : "Perdiste :(";
                        mensajesContainer.appendChild(resultadoMensaje);

                        // Si el resultado es una victoria, incrementa las partidas ganadas del jugador
                        if (resultado === 3) {
                            jugador.incrementarPartidasGanadas();
                        }

                        // Agrega un botón para continuar a la siguiente ronda
                        const continuarBtn = document.createElement("button");
                        continuarBtn.textContent = "Continuar";
                        mensajesContainer.appendChild(continuarBtn);

                        // Espera a que el jugador presione el botón para continuar
                        await new Promise(resolve => {
                            continuarBtn.addEventListener("click", () => {
                                resolve();
                            });
                        });

                        // Limpia el contenido del contenedor de mensajes antes de la siguiente ronda
                        limpiarMensajes();
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

                localStorage.setItem('nombres', JSON.stringify(nombresGuardados));
                localStorage.setItem('partidasGanadas', jugador.partidasGanadas.toString());

                /* Mostrar el botón para reiniciar */
                reiniciarBtn.style.display = "block";
            };

            jugar();
        });

        reiniciarBtn.addEventListener("click", function () {
            /* Limpia los mensajes y resultados para reiniciar el juego */
            mensajesContainer.innerHTML = "";
            resultadosContainer.innerHTML = "";
            reiniciarBtn.style.display = "none";

            /* Personaliza el mensaje emergente utilizando Swal.fire */
            Swal.fire({
                title: 'Juego reiniciado',
                text: 'El juego ha sido reiniciado con éxito.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
                customClass: {
                    confirmButton: 'swal-confirm-button',
                    container: 'swal-container',
                },
            });
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
