import {
    render,
    fetchDatos,
    filtro,
    eventoBotonesPresupuesto,
} from './funciones.js';
import Popup from './Popup.js';
import platillaModelos from './platillaModelos.js';

// inicializamos la app
async function iniciarApp() {
    // Elemento app CSR
    const app = document.getElementById('modelos-app');

    // Elemento HTML que va a contener el popup
    const elementoPopup = document.getElementById('popup-presupuesto');

    // Instanciamos clase popup
    const popup = new Popup(elementoPopup);

    /*
    creamos una variable que va a almacenar los modelos
    y características desde API
    */
    let modelos;
    const urlModelos = './recursos/datos/modelos.json';
    let caracteristicas;
    const urlCaracteristicas = './recursos/datos/caracteristicas.json';

    // verificar si ya están cargados los datos de la API
    // e implementamos una estrategia de caché:

    // Para modelos
    if (!sessionStorage.getItem('modelos')) {
        // cargamos los modelos
        modelos = await fetchDatos(urlModelos);
        sessionStorage.setItem('modelos', JSON.stringify(modelos));
    } else {
        modelos = JSON.parse(sessionStorage.getItem('modelos'));
    }

    // Para características
    if (!sessionStorage.getItem('caracteristicas')) {
        // cargamos los modelos
        caracteristicas = await fetchDatos(urlCaracteristicas);
        sessionStorage.setItem(
            'caracteristicas',
            JSON.stringify(caracteristicas),
        );
    } else {
        caracteristicas = JSON.parse(sessionStorage.getItem('caracteristicas'));
    }

    /*
    asignamos por referencia "modelos" a "modelosFiltrados"
    para luego utilizarlo con un filtro
    */
    let modelosFiltrados = modelos;

    // Componente interactivo select cantidad dormitorios
    const cantDormi = document.getElementById('id-dormitorios');

    // Componente interactivo input type=range metros cuadrados
    const rangoM2 = document.getElementById('id-rango-m2');

    // Elemento muestra los m2
    const rangoInfo = document.getElementById('id-max-m2');

    // Formulario del filtro
    const formFiltro = document.getElementById('id-modelos-filtro');

    // boton filtrar
    const btnFiltrar = document.getElementById('id-filtrar');
    // Se guarda el contenido del boton para luego modificarlo
    // y tener un estado previo a la modificación
    const btnFiltrarLeyenda = btnFiltrar.innerHTML;

    // Boton limpiar formulario
    const btnLimpiar = document.getElementById('id-limpiar');

    // EVENTOS ---------------------------------------------------

    // Asignamos evento al range
    rangoM2.addEventListener('input', (evento) => {
        rangoInfo.textContent = evento.target.value;
    });

    // Asignamos un escuchador de eventos al formulario filtro
    formFiltro.addEventListener('submit', (evento) => {
        // Se previene el funcionamiento por defecto del formulario
        evento.preventDefault();

        // Se verifica que existan las referencias de los filtros
        if (cantDormi && rangoM2) {
            /*
            si modelos tiene datos, filtramos el arreglo
            y obtenemos uno nuevo
            */
            if (modelos) {
                // array.filter() -> devuelve solo los elementos que cumplen la condición verdadera
                modelosFiltrados = modelosFiltrados = filtro(modelos, {
                    cantDormi,
                    rangoM2,
                });
            } else {
                // si no, filtrados tiene todos los datos
                modelosFiltrados = modelos;
            }
            /*
            renderizamos con el HTML
            cada vez que se filtra
            */
            render(app, modelosFiltrados, platillaModelos);
        }

        // Cada vez que filtramos debemos volver a asignar al boton
        eventoBotonesPresupuesto(popup, caracteristicas, modelosFiltrados);
        // cambiamos leyenda agregamos cantidad de modelos encontrados
        btnFiltrar.innerHTML = `${btnFiltrarLeyenda} (${modelosFiltrados.length})`;
    });

    // Asignamos escuchador al boton limpiar
    btnLimpiar.addEventListener('click', () => {
        // Reseteamos los m2
        rangoInfo.textContent = rangoM2.max;
        render(app, modelos, platillaModelos);

        // Cada vez que limpiamos debemos volver a asignar eventos
        eventoBotonesPresupuesto(popup, caracteristicas, modelos);

        // Leyenda del boton
        btnFiltrar.innerHTML = btnFiltrarLeyenda;
    });

    // Renderizamos la primera vez
    render(app, modelos, platillaModelos);

    // asignamos evento al boton "Presupuesto" de cada modelo
    eventoBotonesPresupuesto(popup, caracteristicas, modelos);
}

// Invocamos init
iniciarApp();
