/*
Funcion que se encarga de peticionar datos
debe ser asíncronaya que trabaja con promesas
*/
export const fetchData = async (url) => {
    const data = await fetch(url);
    return await data.json();
};

/*
Funcion que se encarga de renderizar el HTML
ver modulo -> templateInfo
*/
export const render = (app, modelos, template) => {
    app.innerHTML = "";
    // recorre el arreglo
    modelos.forEach((modelo) => {
        app.innerHTML += template(modelo);
    });
};

export const agregarEventos = () => {
    // const cambioVista = (e) => {
    //     const modeloId = e.currentTarget.dataset.mid;
    //     console.log(modeloId);
    // };
    // const botonPresupuesto = document.querySelectorAll("[data-mid]");
    // botonPresupuesto.forEach((evt) => {
    //     // evt.removeEventListener("click", cambioVista);
    //     evt.addEventListener("click", cambioVista);
    // });
};
