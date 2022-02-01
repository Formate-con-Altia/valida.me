const dropZone = document.querySelector("#drop-on-me-babe"); // Contenedor que recibirá los elementos
const dragZone = document.querySelector("#drag-from-me-babe"); // Contenedor del que se arrastrarán los elementos
const htmlCode = document.querySelector("#html-form-code"); // Código HTML generado, lo guardaríamos en la base de datos
const butonCreateForm = document.querySelector("#boton-form");
let numControls = 0;

function enableForButton(enable) {
  if (enable) {
    document.querySelector("#boton-form").className = "btn btn-primary";
  } else {
    document.querySelector("#boton-form").className =
      "btn btn-primary disabled";
  }
}

new Sortable(dropZone, {
  group: "shared", // Cambiar de la dropZone a la dragZone
  animation: 150, // Añadimos una pequeña animación cuando se ordenen los elementos
  onAdd() {
    htmlCode.textContent = dropZone.innerHTML; // Si el contenido del contenedor cambia, actualizamos el código HTML
    numControls++;
    if (numControls == 1) {
      enableForButton(true);
    }
  },
});

new Sortable(dragZone, {
  group: "shared", // Cambiar de la dragZone a la dropZone
  sort: false, // En este contenedor no queremos cambiar el orden de los elementos
  onAdd() {
    htmlCode.textContent = dropZone.innerHTML;
    numControls--;
    if (numControls == 0) {
      enableForButton(false);
    }
  },
});

butonCreateForm.addEventListener("click", (e) => {
  enableForButton(false);
  document.querySelector("#drag-from-me-babe").style.display = "none";
});

// Creamos una función que recibe una clase alert (success, info, error...) y un mensaje.
// Para más información sobre las clases alert visitar: https://getbootstrap.com/docs/5.1/components/alerts/
const createFeedbackMessage = (type, message) => {
  const alertPlaceholder = document.querySelector("#alert-placeholder");
  const wrapper = document.createElement("div");

  wrapper.innerHTML =
    '<div class="alert alert-' +
    type +
    ' alert-dismissible" role="alert">' +
    message;

  alertPlaceholder.append(wrapper);
};

document.querySelector("button").addEventListener("click", async () => {
  try {
    const response = await fetch("/forms/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: dropZone.innerHTML }),
    });

    if (!response.ok) {
      const errorMessage =
        "¡El formulario no se ha podido guardar! Prueba nuevamente en unos minutos.";

      throw new Error(errorMessage);
    }

    const data = await response.json(); // Obtenemos los datos del servidor
    const successMessage = `¡Formulario creado correctamente! Puedes visualizarlo en <a href="http://localhost:3000/forms/${data.id}" class="alert-link" target="_blank">http://localhost:3000/forms/${data.id}</a>.`;
    // Si todo ha ido bien, confirmamos la creación del formulario
    createFeedbackMessage("success", successMessage);
  } catch (error) {
    // Si algo ha fallado, enviamos feedback al usuario
    createFeedbackMessage("danger", error);
  }
});
