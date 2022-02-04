const dropZone = document.querySelector("#drop-on-me-babe"); // Contenedor que recibirá los elementos
const dragZone = document.querySelector("#drag-from-me-babe"); // Contenedor del que se arrastrarán los elementos
const htmlCode = document.querySelector("#html-form-code"); // Código HTML generado, lo guardaríamos en la base de datos
const butonCreateForm = document.querySelector("#boton-form");
const clonado = document.querySelector("#clonar");
let numControls = 0;
let url = ``;

function enableForButton(enable) {
  if (enable) {
    document.querySelector("#boton-form").className = "btn btn-primary";
  } else {
    document.querySelector("#boton-form").className =
      "btn btn-primary disabled";
  }
}

async function handleClick() {
  /* Save value of myText to input variable */
  var input = url;

  /* Copy the text inside the text field */
  await navigator.clipboard.writeText(input);
}

new Sortable(dropZone, {
  group: "shared", // Cambiar de la dropZone a la dragZone
  animation: 150, // Añadimos una pequeña animación cuando se ordenen los elementos
  filtered: ".filtered", // No permitimos que el campo del nombre formulario (de clase .filtered) se pueda mover.
  onAdd() {
    htmlCode.textContent = dropZone.innerHTML; // Si el contenido del contenedor cambia, actualizamos el código HTML
    numControls++;
    if (numControls == 1) {
      enableForButton(true);
    }
  },
});

new Sortable(dragZone, {
  group: {
    name: "shared", // Cambiar de la dragZone a la dropZone
    //put: false, // No permitir poner elementos en esta lista
  },
  sort: false, // En este contenedor no queremos cambiar el orden de los elementos
  onAdd() {
    htmlCode.textContent = dropZone.innerHTML;
    numControls--;
    if (numControls == 0) {
      enableForButton(false);
    }
  },
});

new Sortable(clonado, {
  group: {
    name: "shared", // Cambiar de la dragZone a la dropZone
    pull: "clone", // Permite duplicar el elemento para utilizar varios.
    //put: false, // No permitir poner elementos en esta lista
  },
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
    ' alert-dismissible  position-relative" role="alert">' +
    message +
    ' <a href="#" class="pe-auto" title="Copy"><svg xmlns="http://www.w3.org/2000/svg" id="copy" onclick="handleClick()" width="25" height="25" fill="currentColor" class="bi bi-clipboard-plus position-absolute top-50 end-0 translate-middle-y" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7z"/><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg></a>';

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
      body: JSON.stringify({
        data: dropZone.innerHTML,
        formTitle: document.querySelector("#formTitle").textContent,
      }),
    });

    if (!response.ok) {
      const errorMessage =
        "¡El formulario no se ha podido guardar! Prueba nuevamente en unos minutos.";

      throw new Error(errorMessage);
    }

    const data = await response.json(); // Obtenemos los datos del servidor
    url = `http://localhost:3000/forms/${data.id}`;
    const successMessage = `¡Formulario creado correctamente! Puedes visualizarlo en <a href="http://localhost:3000/forms/${data.id}" class="alert-link" target="_blank">http://localhost:3000/forms/${data.id}</a>.`;
    // Si todo ha ido bien, confirmamos la creación del formulario
    createFeedbackMessage("success", successMessage);
  } catch (error) {
    // Si algo ha fallado, enviamos feedback al usuario
    createFeedbackMessage("danger", error);
  }
});
