const templateInfoModelos = (data) => {
    return `<article
    class="modelos-article modelos-article--color"
>
    <figure class="modelos-article__imagen">
        <img src="${data.imagen}" alt="" />
    </figure>
    <div class="modelos-article__info">
        <h2 class="modelos-article__titulo">
        ${data.nombre}
        </h2>
        <p class="modelos-article_parrafo">
        ${data.descrip}
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
                />${data.m2} m2
            </li>
            <li>
                <img
                    src="./recursos/imagenes/cama.svg"
                    alt="cama"
                    aria-hidden="true"
                />${data.dormi}
            </li>
        </ul>
        <button data-mid="${data.id}" class="modelos-article__boton boton-oscuro">
            Presupuesto
        </button>
    </div>
</article>`;
};
export default templateInfoModelos;
