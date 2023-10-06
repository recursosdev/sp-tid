class Popup extends HTMLElement {
    constructor() {
        super();

        // shadow DOM -> abierto
        this.shadow = this.attachShadow({ mode: "open" });

        // atributos
        this.datos = this.getAttribute("datos");
        // this.mostrar = this.hasAttribute("mostrar");
        // HTML
        this.shadow.innerHTML = /* html */ `
        <aside class="popup">
            <div class="popup__top-bar">
                <button class="popup__btn-cerrar" id="btn-cerrar-popup">
                    <img
                        src="./assets/images/cerrar.svg"
                        alt="Cerrar popup"
                    />
                </button>
            </div>
            <div class="popup__contenido">
                <div class="popup__contenido-dentro" id="popup-render">
                    <h3 popup__titulo>Titulo</h3>
                    <p>Enviar datos para presupuesto</p>
                    <form class="popup__formulario">
                        <label for="id-nombre"> Nombre </label>
                        <input
                            id="id-nombre"
                            name="nombre"
                            type="text"
                        />
                        <label for="id-email"> Email </label>
                        <input
                            id="id-email"
                            name="email"
                            type="email"
                        />
                        <label for="id-email"> Comentarios </label>
                        <textarea
                            name="comentario"
                            id="id-comentario"
                            cols="30"
                            rows="10"
                        ></textarea>
                        <button type="submit">Presupuestar</button>
                    </form>
                </div>
            </div>
        </aside>
        `;
    }
    cerrar() {
        this.setAttribute("mostrar", "no");
    }
    connectedCallback() {
        this.cerrar();
        const botonCerrar = this.shadow.getElementById("btn-cerrar-popup");
        botonCerrar.addEventListener("click", this.cerrar);
    }
    disconnectedCallback() {
        this.setAttribute("mostrar", "no");
        botonCerrar.addEventListener("click", this.cerrar);
       console.log("desconectado")
    }
    static get observedAttributes() {
        return ["mostrar"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, newValue);
        // if (name === "mostrar") {
        //     if (newValue != oldValue) {
        //     } else {
        //         //console.log("no se muestra", newValue);
        //     }
        // } 
    }
}

customElements.define("pop-up", Popup);
