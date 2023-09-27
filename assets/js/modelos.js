// Componente
// import "/assets/componentes/c-ficha.js";
const app = document.getElementById("modelos-app");

// creamos una variable que va a almacenar los modelos
let modelos;

// cargamos los modelos
async function init() {
    // verificar si ya están cargados
    if (!modelos) {
        const data = await fetch(`/assets/data/modelos.json`);
        modelos = await data.json();
    }

    // referenciamos modelos en filtrados
    // para luego utilizarlo con un filtro (busqueda)
    let modelosFiltrados = modelos;

    // referenciamos campo buscar
    const filtros = document.querySelectorAll(
        "#id-modelos-filtro [data-filtro]",
    );
    const btnFiltrar = document.getElementById("id-filtrar");
    //
    // const coincidencias = true || false || false; // algo así
    // evento input
    btnFiltrar.addEventListener("click", (e) => {
        e.preventDefault();
        const [dormi, m2] = [...filtros].map((e) => {
            return e.value;
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
                        : true && modelo.m2 >= Number(m2);
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
        app.innerHTML += `
        <article
            class="modelos-article modelos-article--color"
        >
            <figure class="modelos-article__imagen">
                <img src="${modelo.imagen}" alt="" />
            </figure>
            <div class="modelos-article__info">
                <h2 class="modelos-article__titulo">
                ${modelo.nombre}
                </h2>
                <p class="modelos-article_parrafo">
                ${modelo.descrip}
                </p>
                <h3 class="modelos-article__sub-titulo">Características</h3>
                <ul class="modelos-article__lista">
                    <li>
                        <img
                            src="./assets/media/sol.svg"
                            alt="sol"
                            aria-hidden="true"
                        />Paneles solares
                    </li>
                    <li>
                        <img
                            src="./assets/media/hoja.svg"
                            alt="sol"
                            aria-hidden="true"
                        />Biodigestor
                    </li>
                    <li>
                        <img
                            src="./assets/media/agua.svg"
                            alt="sol"
                            aria-hidden="true"
                        />Reciclado de agua
                    </li>
                    <li>
                        <img
                            src="./assets/media/cama.svg"
                            alt="sol"
                            aria-hidden="true"
                        />${modelo.dormi}
                    </li>
                </ul>
                <button data-mid="1" class="modelos-article__boton">
                    Más información y presupuesto
                </button>
            </div>
        </article>`;
    });
}
