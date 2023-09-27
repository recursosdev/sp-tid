import { render, fetchData } from "./funciones.js";
import templateInfo from "./templateInfo.js";

// Elemento app CSR
const app = document.getElementById("modelos-app");

// creamos una variable que va a almacenar los modelos
let modelos;

// inicializamos la app
async function init() {
    // verificar si ya están cargados
    if (!modelos) {
        // cargamos los modelos
        modelos = await fetchData(`/assets/data/modelos.json`);
    }

    /*
    referenciamos modelos en filtrados
    para luego utilizarlo con un filtro (busqueda)
    */
    let modelosFiltrados = modelos;

    // componente interactivo input range
    const rangoM2 = document.getElementById("id-rango-m2");
    const rangoMax = document.getElementById("id-max-m2");
    rangoM2.addEventListener("input", (evento) => {
        rangoMax.textContent = evento.target.value;
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
                modelosFiltrados = modelos.filter((modelo) => {
                    /* 
                    separamos en dos las evaluaciones
                    y utilizamos un operador ternario
                    */
                    return dormi > 0
                        // si hay cantidad de dormitorios, evaluamos los dos
                        ? modelo.dormi == Number(dormi) && modelo.m2 <= Number(m2)
                        // si no, simplemente evaluamos los m2
                        : modelo.m2 <= Number(m2);
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
            cada vez que cambia
            */
            render(app, modelosFiltrados, templateInfo);
        }
    });
    btnLimpiar.addEventListener("click", () => {
        render(app, modelos, templateInfo);
    });
    agregarEventos();
}
init();
