class CFicha extends HTMLElement {
    constructor() {
        super();

        // shadow DOM -> abierto
        this.shadow = this.attachShadow({ mode: "open" });

        // atributos
        const imagen = this.getAttribute("imagen");

        // HTML
        this.shadow.innerHTML = `
                <figure class="modelos-article__imagen">
                    <img src="${imagen}" alt="" />
                </figure>
                <div class="modelos-article__info">
                    <h2 class="modelos-article__titulo">Colibrí</h2>
                    <p class="modelos-article_parrafo">
                        Perfecta para parejas, esta cabaña ofrece una
                        experiencia íntima en medio de la naturaleza.
                    </p>
                    <h3 class="modelos-article__sub-titulo">Características</h3>
                    <ul class="modelos-article__lista">
                        <li>
                            <img
                                src="./assets/css/images/sol.svg"
                                alt="sol"
                                aria-hidden="true"
                            />Paneles solares
                        </li>
                        <li>
                            <img
                                src="./assets/css/images/hoja.svg"
                                alt="sol"
                                aria-hidden="true"
                            />Biodigestor
                        </li>
                        <li>
                            <img
                                src="./assets/css/images/agua.svg"
                                alt="sol"
                                aria-hidden="true"
                            />Reciclado de agua
                        </li>
                        <li>
                            <img
                                src="./assets/css/images/cama.svg"
                                alt="sol"
                                aria-hidden="true"
                            />1
                        </li>
                    </ul>
                    <button data-mid="1" class="modelos-article__boton">
                        Más información y presupuesto
                    </button>
                </div>
        `;
    }
}

customElements.define("c-ficha", CFicha);
