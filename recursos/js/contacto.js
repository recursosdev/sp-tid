// referencia al formulario
const formulario = document.getElementById("id-form-contacto");

// Referencia al elemento del mensaje
const mensaje = document.getElementById("id-contacto-dialogo");

// Mensajes
const tipoMensaje = {
    ENVIADO: Symbol("enviado"),
    ERROR: Symbol("error"),
};
const mensajes = {
    [tipoMensaje.ENVIADO]: "Gracias por escribirnos!",
    [tipoMensaje.ERROR]: "Hubo un error en el envío del formulario",
};

// URL envío
const urlEnvioFormulario = "./contacto.html";

// Asignamos escuchador "submit" al formulario
// se dispara cuando se envía
formulario.addEventListener("submit", async (evt) => {

    // Prevenimos el comportamiento por defecto
    evt.preventDefault();

    // Obtenemos los datos del formulario
    const datos = new FormData(formulario);


    // Obtenemos los datos del formulario
    const proceso = await fetch(urlEnvioFormulario, {
        method: "post",
        body: datos,
    });

    // Removemos las clases
    mensaje.classList.remove("exito", "error");

    // Verificamos si se envio correctamente
    if (proceso.status == "200") {
        // Agregamos la clase correspondiente
        mensaje.classList.add("exito");

        // Insertamos el mensaje en el elemento
        mensaje.textContent = mensajes[tipoMensaje.ENVIADO];

        // Limpiamos formulario
        formulario.reset();
    } else {
        // Agregamos la clase correspondiente
        mensaje.classList.add("error");

        // Insertamos el mensaje en el elemento
        mensaje.textContent = mensajes[tipoMensaje.ERROR];
    }
});
