import fetchData from "./fetch.js";
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
    const btnFiltrar = document.getElementById("id-filtrar");
    const btnLimpiar = document.getElementById("id-limpiar");

    btnFiltrar.addEventListener("click", (evento) => {
        evento.preventDefault();
        const [dormi, m2] = [...filtros].map((elemento) => {
            return elemento.value;
        });
        if (filtros) {
            /*
            si modelos tiene datos y campo buscar no está vacío
            filtramos:
            */
            if (modelos) {
                modelosFiltrados = modelos.filter((modelo) => {
                    // console.log(modelo.dormi,Number(dormi),modelo.m2,Number(m2))
                    return dormi > 0
                        ? modelo.dormi == Number(dormi)
                        : true && modelo.m2 <= Number(m2);
                });
            } else {
                // si no, filtrados tiene todos los datos
                modelosFiltrados = modelos;
            }
            /*
        renderizamos con el HTML
        cada vez que cambia
        */
            render(modelosFiltrados);
        }
    });
    btnLimpiar.addEventListener("click", () => {
        render(modelos);
    });
    agregarEventos();
}
init();
function agregarEventos() {
    // const cambioVista = (e) => {
    //     const modeloId = e.currentTarget.dataset.mid;
    //     console.log(modeloId);
    // };
    // const botonPresupuesto = document.querySelectorAll("[data-mid]");
    // botonPresupuesto.forEach((evt) => {
    //     // evt.removeEventListener("click", cambioVista);
    //     evt.addEventListener("click", cambioVista);
    // });
}
function render(modelos) {
    app.innerHTML = "";
    // recorre el arreglo
    modelos.forEach((modelo) => {
        app.innerHTML += templateInfo(modelo);
    });
}
