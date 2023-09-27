const templateInfo = (data) => {
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
                    src="./assets/media/m2.svg"
                    alt="Metros cuadrados"
                    aria-hidden="true"
                />${data.m2}
            </li>
            <li>
                <img
                    src="./assets/media/cama.svg"
                    alt="sol"
                    aria-hidden="true"
                />${data.dormi}
            </li>
        </ul>
        <button data-mid="1" class="modelos-article__boton boton1">
            Más información y presupuesto
        </button>
    </div>
</article>`;
};
export default templateInfo;
