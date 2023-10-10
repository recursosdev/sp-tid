/*
Funcion que se encarga de peticionar datos
debe ser asíncronaya que trabaja con promesas
*/
/**
 *
 * @param {string} url
 * @returns {json}
 */
export const fetchData = async (url) => {
    const data = await fetch(url);
    return data.json();
};

/*
Funcion que se encarga de renderizar el HTML
ver modulo -> templateInfo
*/
/**
 *
 * @param {HTMLElement} app
 * @param {Array} modelos
 * @param {string} template
 */
export const render = (app, modelos, template) => {
    app.innerHTML = "";
    // recorre el arreglo
    modelos.forEach((modelo) => {
        app.innerHTML += template(modelo);
    });
};
/**
 *
 * @param {Popup} popup
 * @param {string} url
 * @param {Array} modelos
 */
export const eventoBotonesPresupuesto = (popup, datosCaract, modelos) => {
    // Se obtienen todos los botones
    const btnsPresupuesto = document.querySelectorAll("[data-mid]");

    // se palican escuchadores a los botones
    btnsPresupuesto.forEach((btn) => {

        // Recorrer todos los botones y asignarles un escuchador
        btn.addEventListener("click", async () => {

            // obtiene ID del modelo desde stributo "data-mid"
            const idModelo = btn.dataset.mid;

            // Se filtra el que coincide con el id y
            // como es uno solo lo desestructuramos
            const [datosModelo] = modelos.filter((m) => idModelo == m.id);

            // Abre popup -> ver clase Popup
            // y pasamos los datos del fetch recibidos como parámetros
            popup.abrirPopup(datosCaract, datosModelo);
        });
    });

};
