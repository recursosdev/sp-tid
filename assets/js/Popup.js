/**
 * clase Popup
 * gestiona el Popup
 */
export default class Popup {
    constructor(popup) {

        // Elemento HTML popup
        this.popup = popup;

        // Tipos mensajes
        this.tipoMensaje = {
            ENVIADO: Symbol("enviado"),
            CONEXION: Symbol("conexion"),
            ERROR: Symbol("error"),
        };

        // Mensajes
        this.mensajes = {
            [this.tipoMensaje.ENVIADO]: `<img src="./assets/images/check.svg" alt="check" /> 
            Gracias por la consulta, en breve le estaremos enviando a su email todos los datos requeridos.`,
            [this.tipoMensaje.CONEXION]: `<img src="./assets/images/sin-conexion.svg" alt="sin conexion" /> 
            No tiene conexión a internet.`,
            [this.tipoMensaje.ERROR]: `<img src="./assets/images/error.svg" alt="error" />
            Hubo un error en el envío, intente nuevamente.`,
        };
    }
    abrirPopup(datosCaract, datosModelo) {
        // Mostramos el elemento que envuelve el popup
        this.popup.style.display = "flex";

        // Variable que almacenará el temporizador
        let timeoutId;

        // Creamos el HTML a partir de un template y pasamos el modelo seleccionado
        this.popup.innerHTML = this.templateFormulario(
            datosCaract,
            datosModelo,
        );

        // Almacenamos el elemento que contiene el formulario
        const renderPopup = document.getElementById("popup-render");

        // Asignamos escuchador al boton cerrar una vez creadocon templateFormulario()
        const botonCerrar = document.getElementById("btn-cerrar-popup");
        botonCerrar.addEventListener("click", () => {
            this.cerrarPopup();

            // Prevenir que se ejecute si cerramos antes
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        });

        // Asignamos escuchador al formulario
        const formulario = document.querySelector(".popup__formulario");
        formulario.addEventListener("submit", async (evt) => {
            evt.preventDefault();

            const datos = new FormData(formulario);
            const respuestaServidor = await fetch("./modelos.html", {
                method: "post",
                body: datos,
            });
            if (respuestaServidor.status == "200") {
                // Envío satisfactorio
                renderPopup.innerHTML = this.mensaje(this.tipoMensaje.ENVIADO);
            } else if (!navigator.onLine) {
                // No hay conexión a internet
                renderPopup.innerHTML = this.mensaje(this.tipoMensaje.CONEXION);
            } else {
                // Hubo error al enviar datos
                renderPopup.innerHTML = this.mensaje(this.tipoMensaje.ERROR);
            }

            timeoutId = setTimeout(() => {
                this.cerrarPopup();
                console.log("close");
            }, 10000);
        });
    }
    cerrarPopup() {
        // Ocultamos el elemento que envuelve el popup
        this.popup.style.display = "none";
        // vacía HTML del formulario en el popup
        this.popup.innerHTML = "";
    }
    mensaje(tipo){
        return `<p class="popup__mensaje-enviado">
            ${this.mensajes[tipo]}
            <span class="popup__progreso" aria-hidden="true"></span>
            <small>La ventana se cerrará automáticamente en 10seg</small>
        </p>`;
    }
    templateFormulario(datosCaract, datosModelo) {
        // Desestructuramos el nombre del modelo
        const { nombre } = datosModelo;

        // HTML de las características
        let caractHTML = "";
        datosCaract.forEach((elemento, i) => {
            caractHTML += `
            <li>
                <input id="id-caract-${i}" name="caract-${i}" type="checkbox" value="${elemento}" />
                <label for="id-caract-${i}">${elemento}</label>
            </li>
                `;
        });

        // Retornamos el template con sus datos
        return (
            /* html */
            `<aside class="popup" 
            role="dialog"
            aria-labelledby="Pedir presupuesto"
            aria-describedby="Formulario de presupuesto">
                <div class="popup__top-bar">
                    <button class="popup__btn-cerrar" id="btn-cerrar-popup">
                        <img
                            src="./assets/images/cerrar.svg"
                            alt="Cerrar popup"
                        />
                    </button>
                </div>
                <div class="popup__contenido">
                    <div class="popup__contenido-dentro" id="popup-render">
                        <h3 class="popup__titulo">${nombre}</h3>
                        <p class="popup__parrafo">Enviar datos para presupuesto</p>
                        <form class="popup__formulario">
                            <h5 class="popup__sub-titulo"> Agregar características </h5>
                            <ul>
                            ${caractHTML}
                            </ul>
                            <label for="id-nombre"> Nombre </label>
                            <input
                                id="id-nombre"
                                name="nombre"
                                type="text"
                                minlength="3"
                                required
                            />
                            <label for="id-email"> Email </label>
                            <input
                                id="id-email"
                                name="email"
                                type="email"
                                required
                            />
                            <label for="id-email"> Comentarios </label>
                            <textarea
                                name="comentario"
                                id="id-comentario"
                                cols="30"
                                rows="10"
                                minlength="4"
                                required
                            ></textarea>
                            <button class="boton-oscuro" type="submit">Presupuestar</button>
                        </form>
                </div>
            </aside>
        `
        );
    }
}
