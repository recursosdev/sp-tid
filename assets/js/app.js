import { render, fetchData, eventoBotonesPresupuesto } from "./funciones.js";
import Popup from "./Popup.js";
import platillaModelos from "./platillaModelos.js";

// inicializamos la app
async function initApp() {
    // Elemento app CSR
    const app = document.getElementById("modelos-app");

    /*
    creamos una variable que va a almacenar los modelos
    y características desde API
    */
    let modelos;
    const urlModelos = "/assets/data/modelos.json";
    let caracteristicas;
    const urlCaracteristicas = "/assets/data/caracteristicas.json";

    // Elemento HTML que va a contener el popup
    const elementoPopup = document.getElementById("popup-caracteristicas");

    // Instanciamos clase popup
    const popup = new Popup(elementoPopup);

    // verificar si ya están cargados los datos de la API
    // e implementamos una estrategia de caché:

    // Para modelos
    if (!modelos) {
        // cargamos los modelos
        modelos = await fetchData(urlModelos);
        sessionStorage.setItem("modelos", JSON.stringify(modelos))
    }else{
        modelos = JSON.parse(sessionStorage.getItem("modelos"));
    }

    // Para características
    if (!caracteristicas) {
        // cargamos los modelos
        caracteristicas = await fetchData(urlCaracteristicas);
        sessionStorage.setItem("caracteristicas", JSON.stringify(caracteristicas))
    }else{
        caracteristicas = JSON.parse(sessionStorage.getItem("caracteristicas"));
    }

    /*
    referenciamos modelos en filtrados
    para luego utilizarlo con un filtro
    */
    let modelosFiltrados = modelos;

    // Componente interactivo input type=range
    const rangoM2 = document.getElementById("id-rango-m2");

    // Elemento muestra los m2
    const rangoInfo = document.getElementById("id-max-m2");

    // Asignamos evento al range
    rangoM2.addEventListener("input", (evento) => {
        rangoInfo.textContent = evento.target.value;
    });

    // referenciamos campo buscar
    const filtros = document.querySelectorAll(
        "#id-modelos-filtro [data-filtro]",
    );

    // botones filtrar y limpiar
    const btnFiltrar = document.getElementById("id-filtrar");
    const btnLimpiar = document.getElementById("id-limpiar");

    // Asignamos un escuchador de eventos al boton filtrar
    btnFiltrar.addEventListener("click", (evento) => {

        // Se previene el funcionamiento por defecto del formulario
        evento.preventDefault();

        // obtener valores -> utilizacion de asignación desestructurante
        const [dormi, m2] = [...filtros].map((elemento) => {
            return elemento.value;
        });

        // Se verifica que existan las referencias de los filtros
        if (filtros) {

            /*
            si modelos tiene datos, filtramos el arreglo
            y obtenemos uno nuevo
            */
            if (modelos) {

                // array.filter() -> devuelve solo los elementos que cumplen la condición verdadera
                modelosFiltrados = modelos.filter((modelo) => {

                    /* 
                    separamos en dos las evaluaciones
                    y utilizamos un operador ternario
                    */
                    // Condicion:
                    return dormi > 0
                        ? // si hay cantidad de dormitorios, evaluamos los dos
                          modelo.dormi == Number(dormi) &&
                              modelo.m2 <= Number(m2)
                        : // si no hay datos de dormitorios, solamente evaluamos los m2
                          modelo.m2 <= Number(m2);
                    /*
                    es lo mismo que decir:

                    if(dormi > 0){
                        return modelo.dormi == Number(dormi) && modelo.m2 <= Number(m2)
                    }else{
                        return modelo.m2 <= Number(m2)
                    }
                    
                    */
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
    });

    // Asignamos escuchador al boton limpiar
    btnLimpiar.addEventListener("click", () => {

        // Reseteamos los m2
        rangoInfo.textContent = rangoM2.max;
        render(app, modelos, platillaModelos);

        // Cada vez que filtramos debemos volver a asignar eventos
        eventoBotonesPresupuesto(popup, caracteristicas, modelosFiltrados);
    });

    // asignamo evento al boton "Presupuesto" de cada modelo
    eventoBotonesPresupuesto(popup, caracteristicas, modelosFiltrados);
}

// Invocamos init
initApp();
