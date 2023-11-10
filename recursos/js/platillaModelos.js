const platillaInfoModelos = (datos, i = 0) => {
    let colorFondoAlternado = "";
    if (i % 2 === 0) {
        colorFondoAlternado = "modelos-article--color";
    }

    return `<article
                class="modelos-article ${colorFondoAlternado}"
            >
                <figure class="modelos-article__imagen">
                    <img src="${datos.imagen}" alt="" />
                </figure>
                <div class="modelos-article__info">
                    <h2 class="modelos-article__titulo">
                    ${datos.nombre}
                    </h2>
                    <p class="modelos-article_parrafo">
                    ${datos.descrip}
                    </p>
                    <h3 class="modelos-article__sub-titulo">Características</h3>
                    <ul class="modelos-article__lista">
                        <li>
                            <img
                                src="./recursos/imagenes/sol.svg"
                                alt="sol"
                                aria-hidden="true"
                            />Paneles solares
                        </li>
                        <li>
                            <img
                                src="./recursos/imagenes/hoja.svg"
                                alt="hoja"
                                aria-hidden="true"
                            />Biodigestor
                        </li>
                        <li>
                            <img
                                src="./recursos/imagenes/agua.svg"
                                alt="agua"
                                aria-hidden="true"
                            />Reciclado de agua
                        </li>
                        <li>
                            <img
                                src="./recursos/imagenes/m2.svg"
                                alt="Metros cuadrados"
                                aria-hidden="true"
                            />${datos.m2} m2
                        </li>
                        <li>
                            <img
                                src="./recursos/imagenes/cama.svg"
                                alt="cama"
                                aria-hidden="true"
                            />${datos.dormi}
                        </li>
                    </ul>
                    <button data-mid="${datos.id}" class="modelos-article__boton boton-oscuro">
                        Presupuesto
                    </button>
                </div>
            </article>`;
};
export default platillaInfoModelos;
